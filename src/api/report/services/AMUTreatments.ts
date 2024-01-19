import {Base} from "./base";
import {Knex} from "knex";


export class AMUTreatments extends Base {

  // 3.2
  // select count(distinct MS_BENH_NHAN) as number, KET_QUA_NUOI_CAY
  // from medical_records where type = 'VI_SINH'
  // group by KET_QUA_NUOI_CAY
  // Tử số: số bệnh nhân sử dụng kháng sinh có lấy mẫu nuôi cấy. Mẫu số: tổng số bệnh nhân sử dụng kháng sinh

  public queryKET_QUA_NUOI_CAY() {
    const CO_KET_QUA_NUOI_CAY = `case when medical_records.CO_LAY_MAU_CHO_XN_VI_SINH = 'yes' then 'yes' when medical_records.CO_LAY_MAU_CHO_XN_VI_SINH = 'no' then 'no' else 'unknown' end`
    const connection = this.connection;
    this.query = this.connection
      .with('use_antibiotics',
        this.connection.raw(`select  MS_BENH_NHAN, 'yes' as label
                    from medical_records where type in ('KHANG_SINH') and CO_SD_KHANG_SINH = 'yes' and MS_BENH_NHAN <> '' `)
      )
      .countDistinct('use_antibiotics.MS_BENH_NHAN as number')
      .select(this.connection.raw(`${CO_KET_QUA_NUOI_CAY} as CO_KET_QUA_NUOI_CAY`))
      .from("use_antibiotics")
      .leftJoin("medical_records", function () {
        this.on(connection.raw(`medical_records.MS_BENH_NHAN = use_antibiotics.MS_BENH_NHAN  and medical_records.type = 'CHI_DINH' `))
      })
      .groupByRaw(CO_KET_QUA_NUOI_CAY);

    return this.filter().named("CO_KET_QUA_NUOI_CAY")
  }

  // select count(distinct MS_BENH_NHAN) as number, LOAI_CHI_DINH
  // from medical_records where type = 'CHI_DINH'
  // group by LOAI_CHI_DINH
  // Tử số: số lượt chỉ định sử dụng kháng sinh theo từng loại chỉ định. Mẫu số: Tổng số lượt chỉ định kháng sinh
  public queryLOAI_CHI_DINH() {
    this.query = this.connection
      .countDistinct('medical_records.id as number')
      .select(this.connection.raw(`case when LOAI_CHI_DINH = '' then 'Missing' else LOAI_CHI_DINH end as LOAI_CHI_DINH`))
      .from("medical_records")
      .where("type", 'in', ["CHI_DINH"])
      .groupByRaw("case when LOAI_CHI_DINH = '' then 'Missing' else LOAI_CHI_DINH end");

    return this.filter().named("LOAI_CHI_DINH")
  }

  // Tử số: số lượt sử dụng kháng sinh dự phòng liều đơn (SP1) hoặc trong vòng 1 ngày (SP2) hoặc >1 ngày (SP3). Mẫu số: tổng số lượt chỉ định kháng sinh dự phòng phẫu thuật
  public queryTHOI_GIAN_SD_KS_DP_NGOAI_KHOA() {
    this.query = this.connection
      .countDistinct('medical_records.id as number')
      .select("THOI_GIAN_SD_KS_DP_NGOAI_KHOA")
      .from("medical_records")
      .where("type", 'in', ["CHI_DINH"])
      .andWhere("LOAI_CHI_DINH", "<>", "")
      .groupBy("THOI_GIAN_SD_KS_DP_NGOAI_KHOA");

    return this.filter().named("THOI_GIAN_SD_KS_DP_NGOAI_KHOA")
  }

  // Tử số: số lượt sử dụng kháng sinh dự phòng liều đơn (SP1) hoặc trong vòng 1 ngày (SP2) hoặc >1 ngày (SP3). Mẫu số: tổng số lượt chỉ định kháng sinh dự phòng phẫu thuật
  public queryKHANG_SINH_DON_LIEU_DA_LIEU() {
    const baseQuery = this.connection.raw(`select MS_BENH_NHAN,
                                                  NGAY_KHAO_SAT,
                                                  BENH_VIEN,
                                                  count(*)                                                     as SO_KHANG_SINH,
                                                  sum(case when ten_hoat_chat_ks like '%/%' then 1 else 0 end) as SO_KHANG_SINH_DA_LIEU,
                                                  sum(case when ten_hoat_chat_ks like '%/%' then 0 else 1 end) as SO_KHANG_SINH_DON_LIEU
                                           from medical_records
                                           where type in ('KHANG_SINH')
                                             and TEN_HOAT_CHAT_KS <> ''
                                           group by medical_records.MS_BENH_NHAN, medical_records.NGAY_KHAO_SAT,
                                                    medical_records.BENH_VIEN `);
    this.query = this.connection
      .with('medical_records', baseQuery)
      .select(this.connection.raw(`count(distinct medical_records.MS_BENH_NHAN,medical_records.NGAY_KHAO_SAT,medical_records.BENH_VIEN) as number,
      'Combinned antibiotics' as KHANG_SINH_DON_LIEU_DA_LIEU`))
      .where("SO_KHANG_SINH", ">", "1")
      .from("medical_records")
      .unionAll(
        [this.connection
          .select(this.connection.raw(`count(distinct medical_records.MS_BENH_NHAN,medical_records.NGAY_KHAO_SAT,medical_records.BENH_VIEN) as number,
      'fixed dose combination antibiotic' as KHANG_SINH_DON_LIEU_DA_LIEU`))
          .where("SO_KHANG_SINH_DA_LIEU", ">=", "1")
          .from("medical_records"),
          this.connection
            .select(this.connection.raw(`count(distinct medical_records.MS_BENH_NHAN,medical_records.NGAY_KHAO_SAT,medical_records.BENH_VIEN) as number,
      'Single antibiotic' as KHANG_SINH_DON_LIEU_DA_LIEU`))
            .where("SO_KHANG_SINH_DON_LIEU", ">=", "1")
            .from("medical_records"),
        ]
      )

    return this.filter().named("KHANG_SINH_DON_LIEU_DA_LIEU")
  }


  public queryTOTAL_SU_DUNG_KHANG_SINH() {
    this.query = this.connection
      .countDistinct('medical_records.MS_BENH_NHAN as number')
      .select(this.connection.raw(`'TOTAL_SU_DUNG_KHANG_SINH' as TOTAL_SU_DUNG_KHANG_SINH`))
      .from("medical_records")
      .where("type", 'in', ["KHANG_SINH"])
      .andWhere("TEN_HOAT_CHAT_KS", "<>", "");

    return this.filter().named("TOTAL_SU_DUNG_KHANG_SINH")
  }

  public queryTOTAL_LIEU_KHANG_SINH() {
    this.query = this.connection
      .countDistinct('medical_records.id as number')
      .select(this.connection.raw(`'TOTAL_LIEU_KHANG_SINH' as TOTAL_LIEU_KHANG_SINH`))
      .from("medical_records")
      .where("type", 'in', ["KHANG_SINH"])
      .andWhere("TEN_HOAT_CHAT_KS", "<>", "");

    return this.filter().named("TOTAL_LIEU_KHANG_SINH")
  }

  // select count(distinct MS_BENH_NHAN) as number,
  // case when lower(DIEU_TRI_THEO) like '%kinh nghiệm%' then 'Điều trị theo kinh nghệm' when lower(DIEU_TRI_THEO) like '%đích%' then 'Điều trị theo đích' else DIEU_TRI_THEO end as DIEU_TRI_THEO
  // from medical_records where type = 'KHANG_SINH'
  // group by case when lower(DIEU_TRI_THEO) like '%kinh nghiệm%' then 'Điều trị theo kinh nghệm'
  // when lower(DIEU_TRI_THEO) like '%đích%' then 'Điều trị theo đích'
  // else DIEU_TRI_THEO end
  public queryDIEU_TRI_THEO() {
    const DIEU_TRI_THEO = `case when lower(DIEU_TRI_THEO) like '%kinh nghiệm%' then 'Điều trị theo kinh nghệm' when lower(DIEU_TRI_THEO) like '%đích%' then 'Điều trị theo đích' else DIEU_TRI_THEO end`
    this.query = this.connection
      .countDistinct('medical_records.id as number')
      .select(this.connection.raw(`${DIEU_TRI_THEO} as DIEU_TRI_THEO`))
      .from("medical_records")
      .where("type", 'in', ["KHANG_SINH"])
      .andWhere("TEN_HOAT_CHAT_KS", "<>", "")
      .groupByRaw(DIEU_TRI_THEO);

    return this.filter().named("DIEU_TRI_THEO")
  }

  // select count(distinct MS_BENH_NHAN) as number, TUAN_THU_HUONG_DAN_DIEU_TRI
  // from medical_records where type = 'KHANG_SINH'
  // group by
  public queryTUAN_THU_HUONG_DAN_DIEU_TRI() {
    const TUAN_THU_HUONG_DAN_DIEU_TRI = `case when TUAN_THU_HUONG_DAN_DIEU_TRI like '%HD%' then 'Compliance' else 'Non-compliance' end`
    this.query = this.connection
      .countDistinct('medical_records.id as number')
      .select(this.connection.raw(`${TUAN_THU_HUONG_DAN_DIEU_TRI} as TUAN_THU_HUONG_DAN_DIEU_TRI`))
      .from("medical_records")
      .where("type", 'in', ["KHANG_SINH"])
      .andWhere("TEN_HOAT_CHAT_KS", "<>", "")
      .groupByRaw(TUAN_THU_HUONG_DAN_DIEU_TRI);

    return this.filter().named("TUAN_THU_HUONG_DAN_DIEU_TRI")

  }

  public queryDUONG_DUNG() {
    const connection = this.connection;
    this.query = this.connection
      .countDistinct('medical_records.id as number')
      .select("administration_routes.code as DUONG_DUNG")
      .from("medical_records")
      .leftJoin("administration_routes", function () {
        this.on(connection.raw("medical_records.DUONG_DUNG = administration_routes.DUONG_DUNG and lower(medical_records.LOAI_DUONG_TIEM_TRUYEN) = lower(administration_routes.LOAI_DUONG_TIEM_TRUYEN)"));
      })
      .where("type", 'in', ["KHANG_SINH"])
      .andWhere("medical_records.DUONG_DUNG", "<>", "")
      .groupBy("administration_routes.code");
    console.warn(this.query.toSQL())
    return this.filter().named("DUONG_DUNG")
  }

  protected named = (name) => {
    return this.query.then((response: any[]) => {
      const object = {};
      response.forEach(res => {
        object[res[name]] = res;
      })
      return {[name]: object}
    })
  }

  //administration_routes
  static of(connection: Knex, params: URLSearchParams) {
    return new AMUTreatments(connection, params);
  }
}
