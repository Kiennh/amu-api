'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }) {
    if (strapi.plugin('documentation')) {
      const override = {
        // Only run this override for version 1.0.0
        info: { version: '1.0.0' },
        paths: {
          "/api/report/summary": {
            "get": {
              "summary": "1.1 Characteristics of the eligible patients in the PPS",
              "tags": [
                "Report"
              ],
              "parameters": [
                {
                  "name": "populate",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "enum": [
                      "*"
                    ],
                    "default": "*"
                  }
                },
                {
                  "name": "sort[0]",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "default": "id:ASC"
                  }
                },
                {
                  "name": "pagination[page]",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "integer",
                    "default": 1
                  }
                },
                {
                  "name": "pagination[pageSize]",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "integer",
                    "default": 10
                  }
                },
                {
                  "name": "filters[hospital][$eq]",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "default": "BINHDINH"
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Successful response",
                  "content": {
                    "application/json": {
                      "example": {
                        "data": [
                          {
                            "id": 0,
                            "GIOI_TINH": {
                              "": {
                                "GIOI_TINH": "",
                                "number": "1"
                              },
                              "nam": {
                                "GIOI_TINH": "nam",
                                "number": "230"
                              },
                              "nu": {
                                "GIOI_TINH": "nu",
                                "number": "234"
                              }
                            },
                            "total": {
                              "total": {
                                "number": "465",
                                "total": "total"
                              }
                            },
                            "NHOM_TUOI": {
                              "<2 year (infants)": {
                                "number": "21",
                                "NHOM_TUOI": "<2 year (infants)"
                              },
                              "<28 days (neonates)": {
                                "number": "1",
                                "NHOM_TUOI": "<28 days (neonates)"
                              },
                              ">12 year": {
                                "number": "397",
                                "NHOM_TUOI": ">12 year"
                              },
                              "2-12 year": {
                                "number": "33",
                                "NHOM_TUOI": "2-12 year"
                              },
                              "Missing": {
                                "number": "13",
                                "NHOM_TUOI": "Missing"
                              }
                            },
                            "PHAU_THUAT": {
                              "NHSN surgey": {
                                "number": "71",
                                "PHAU_THUAT": "NHSN surgey"
                              },
                              "No surgery": {
                                "number": "368",
                                "PHAU_THUAT": "No surgery"
                              },
                              "Non-NHSN surgey": {
                                "number": "26",
                                "PHAU_THUAT": "Non-NHSN surgey"
                              }
                            },
                            "CO_CATHETER_TRUNG_TAM": {
                              "no": {
                                "number": "459",
                                "CO_CATHETER_TRUNG_TAM": "no"
                              },
                              "None": {
                                "number": "1",
                                "CO_CATHETER_TRUNG_TAM": "None"
                              },
                              "yes": {
                                "number": "5",
                                "CO_CATHETER_TRUNG_TAM": "yes"
                              }
                            },
                            "CO_THONG_TIEU": {
                              "no": {
                                "number": "445",
                                "CO_THONG_TIEU": "no"
                              },
                              "None": {
                                "number": "1",
                                "CO_THONG_TIEU": "None"
                              },
                              "yes": {
                                "number": "19",
                                "CO_THONG_TIEU": "yes"
                              }
                            },
                            "CO_NOI_KHI_QUAN": {
                              "no": {
                                "number": "449",
                                "CO_NOI_KHI_QUAN": "no"
                              },
                              "None": {
                                "number": "1",
                                "CO_NOI_KHI_QUAN": "None"
                              },
                              "yes": {
                                "number": "15",
                                "CO_NOI_KHI_QUAN": "yes"
                              }
                            },
                            "CO_SD_KHANG_SINH": {
                              "no": {
                                "number": "139",
                                "CO_SD_KHANG_SINH": "no"
                              },
                              "None": {
                                "number": "1",
                                "CO_SD_KHANG_SINH": "None"
                              },
                              "yes": {
                                "number": "325",
                                "CO_SD_KHANG_SINH": "yes"
                              }
                            },
                            "NHOM_NGAY_NAM_VIEN": {
                              "< 4": {
                                "number": "228",
                                "NHOM_NGAY_NAM_VIEN": "< 4"
                              },
                              "> 14 days": {
                                "number": "27",
                                "NHOM_NGAY_NAM_VIEN": "> 14 days"
                              },
                              "4-7 days": {
                                "number": "139",
                                "NHOM_NGAY_NAM_VIEN": "4-7 days"
                              },
                              "8-14 days": {
                                "number": "71",
                                "NHOM_NGAY_NAM_VIEN": "8-14 days"
                              }
                            }
                          }
                        ],
                        "meta": {
                          "pagination": {
                            "total": 1
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "/api/report/patientCharacteristicsTable2_1": {
            "get": {
              "summary": "2.1 Ward type prevalence antibiotic use ",
              "tags": [
                "Report"
              ],
              "parameters": [
                {
                  "name": "filters[hospital][$eq]",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "default": "BINHDINH"
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Successful response",
                  "content": {
                    "application/json": {
                      "example": {
                        "data": [
                          {
                            "id": "0",
                            "BENH_VIEN": "BINHDINH",
                            "type": "ICU",
                            "so_benh_nhan": 39,
                            "so_benh_nhan_hop_le": 39,
                            "so_benh_nhan_khao_sat": 13,
                            "name": "BINHDINH",
                            "benh_nhan_sd_khang_sinh": "10"
                          },
                          {
                            "id": "1",
                            "BENH_VIEN": "BINHDINH",
                            "type": "In-patient",
                            "so_benh_nhan": 936,
                            "so_benh_nhan_hop_le": 936,
                            "so_benh_nhan_khao_sat": 311,
                            "name": "BINHDINH",
                            "benh_nhan_sd_khang_sinh": "243"
                          },
                          {
                            "id": "2",
                            "BENH_VIEN": "BINHDINH",
                            "type": "Surgery",
                            "so_benh_nhan": 424,
                            "so_benh_nhan_hop_le": 424,
                            "so_benh_nhan_khao_sat": 140,
                            "name": "BINHDINH",
                            "benh_nhan_sd_khang_sinh": "135"
                          }
                        ],
                        "meta": {
                          "pagination": {
                            "total": 3
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },

          "/api/report/patientCharacteristicsTable2_2": {
            "get": {
              "summary": "2.2 Prevalence antibiotic use by age groups",
              "tags": [
                "Report"
              ],
              "parameters": [
                {
                  "name": "filters[hospital][$eq]",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "default": "BINHDINH"
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Successful response",
                  "content": {
                    "application/json": {
                      "example": {
                        "data": [
                          {
                            "id": "0",
                            "number": "1",
                            "NHOM_TUOI": "<28 days (neonates)",
                            "number_use_antibiotics": "1"
                          },
                          {
                            "id": "1",
                            "number": "21",
                            "NHOM_TUOI": "<2 year (infants)",
                            "number_use_antibiotics": "18"
                          },
                          {
                            "id": "2",
                            "number": "33",
                            "NHOM_TUOI": "2-12 year",
                            "number_use_antibiotics": "25"
                          },
                          {
                            "id": "3",
                            "number": "397",
                            "NHOM_TUOI": ">12 year",
                            "number_use_antibiotics": "272"
                          },
                          {
                            "id": "4",
                            "number": "13",
                            "NHOM_TUOI": "Missing",
                            "number_use_antibiotics": "9"
                          }
                        ],
                        "meta": {
                          "pagination": {
                            "total": 5
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "/api/report/treatmentsTable3": {
            "get": {
              "summary": "3 Treatment data",
              "tags": [
                "Report"
              ],
              "parameters": [
                {
                  "name": "populate",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "enum": [
                      "*"
                    ],
                    "default": "*"
                  }
                },
                {
                  "name": "sort[0]",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "default": "id:ASC"
                  }
                },
                {
                  "name": "pagination[page]",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "integer",
                    "default": 1
                  }
                },
                {
                  "name": "pagination[pageSize]",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "integer",
                    "default": 10
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Successful response",
                  "content": {
                    "application/json": {
                      "example": {
                        "data": [
                          {
                            "id": 0,
                            "DUONG_DUNG": {
                              "IF": {
                                "number": "132",
                                "DUONG_DUNG": "IF"
                              },
                              "IJ": {
                                "number": "28",
                                "DUONG_DUNG": "IJ"
                              },
                              "O": {
                                "number": "66",
                                "DUONG_DUNG": "O"
                              },
                              "P": {
                                "number": "419",
                                "DUONG_DUNG": "P"
                              }
                            },
                            "TOTAL_LIEU_KHANG_SINH": {
                              "TOTAL_LIEU_KHANG_SINH": {
                                "number": "644",
                                "TOTAL_LIEU_KHANG_SINH": "TOTAL_LIEU_KHANG_SINH"
                              }
                            },
                            "CO_KET_QUA_NUOI_CAY": {
                              "no": {
                                "number": "321",
                                "CO_KET_QUA_NUOI_CAY": "no"
                              },
                              "unknown": {
                                "number": "87",
                                "CO_KET_QUA_NUOI_CAY": "unknown"
                              },
                              "yes": {
                                "number": "65",
                                "CO_KET_QUA_NUOI_CAY": "yes"
                              }
                            },
                            "TOTAL_SU_DUNG_KHANG_SINH": {
                              "TOTAL_SU_DUNG_KHANG_SINH": {
                                "number": "470",
                                "TOTAL_SU_DUNG_KHANG_SINH": "TOTAL_SU_DUNG_KHANG_SINH"
                              }
                            },
                            "THOI_GIAN_SD_KS_DP_NGOAI_KHOA": {
                              "": {
                                "number": "379",
                                "THOI_GIAN_SD_KS_DP_NGOAI_KHOA": ""
                              },
                              "SP1": {
                                "number": "2",
                                "THOI_GIAN_SD_KS_DP_NGOAI_KHOA": "SP1"
                              },
                              "SP2": {
                                "number": "10",
                                "THOI_GIAN_SD_KS_DP_NGOAI_KHOA": "SP2"
                              },
                              "SP3": {
                                "number": "97",
                                "THOI_GIAN_SD_KS_DP_NGOAI_KHOA": "SP3"
                              }
                            },
                            "LOAI_CHI_DINH": {
                              "CAI": {
                                "number": "273",
                                "LOAI_CHI_DINH": "CAI"
                              },
                              "HAI": {
                                "number": "22",
                                "LOAI_CHI_DINH": "HAI"
                              },
                              "MP": {
                                "number": "82",
                                "LOAI_CHI_DINH": "MP"
                              },
                              "O": {
                                "number": "2",
                                "LOAI_CHI_DINH": "O"
                              },
                              "SP": {
                                "number": "109",
                                "LOAI_CHI_DINH": "SP"
                              }
                            },
                            "KHANG_SINH_DON_LIEU_DA_LIEU": {
                              "Combinned antibiotics": {
                                "number": "158",
                                "KHANG_SINH_DON_LIEU_DA_LIEU": "Combinned antibiotics"
                              },
                              "fixed dose combination antibiotic": {
                                "number": "165",
                                "KHANG_SINH_DON_LIEU_DA_LIEU": "fixed dose combination antibiotic"
                              },
                              "Single antibiotic": {
                                "number": "373",
                                "KHANG_SINH_DON_LIEU_DA_LIEU": "Single antibiotic"
                              }
                            },
                            "DIEU_TRI_THEO": {
                              "": {
                                "number": "102",
                                "DIEU_TRI_THEO": ""
                              },
                              "Điều trị theo đích": {
                                "number": "32",
                                "DIEU_TRI_THEO": "Điều trị theo đích"
                              },
                              "Điều trị theo kinh nghệm": {
                                "number": "510",
                                "DIEU_TRI_THEO": "Điều trị theo kinh nghệm"
                              }
                            },
                            "TUAN_THU_HUONG_DAN_DIEU_TRI": {
                              "Compliance": {
                                "number": "371",
                                "TUAN_THU_HUONG_DAN_DIEU_TRI": "Compliance"
                              },
                              "Non-compliance": {
                                "number": "273",
                                "TUAN_THU_HUONG_DAN_DIEU_TRI": "Non-compliance"
                              }
                            }
                          }
                        ],
                        "meta": {
                          "pagination": {
                            "total": 1
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "/api/report/antibioticsTable4_1": {
            "get": {
              "summary": "4.1 % Prevalence of antibiotic use based on class",
              "tags": [
                "Report"
              ],
              "parameters": [
                {
                  "name": "populate",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "enum": [
                      "*"
                    ],
                    "default": "*"
                  }
                },
                {
                  "name": "sort[0]",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "default": "id:ASC"
                  }
                },
                {
                  "name": "pagination[page]",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "integer",
                    "default": 1
                  }
                },
                {
                  "name": "pagination[pageSize]",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "integer",
                    "default": 10
                  }
                },
                {
                  "name": "filters[age][$eq]",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "default": "<28 days (neonates)"
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Successful response",
                  "content": {
                    "application/json": {
                      "example": {
                        "data": [
                          {
                            "id": 0,
                            "KHANG_SINH": [
                              {
                                "number": "1",
                                "class": "Carbapenems",
                                "name": "Imipenem/cilastatin"
                              },
                              {
                                "number": "1",
                                "class": "Glycopeptides",
                                "name": "Vancomycin"
                              }
                            ],
                            "NHOM_KHANG_SINH": [
                              {
                                "number": "1",
                                "class": "Carbapenems"
                              },
                              {
                                "number": "1",
                                "class": "Glycopeptides"
                              }
                            ],
                            "SD_KHANG_SINH": [
                              {
                                "number": "2",
                                "antibiotic_use": "Use Antibiotic"
                              }
                            ]
                          }
                        ],
                        "meta": {
                          "pagination": {
                            "total": 1
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          "/api/report/antibioticsTable4_2": {
            "get": {
              "summary": "4.2 Antibiotic used by AWaRe (WHO)",
              "tags": [
                "Report"
              ],
              "parameters": [
                {
                  "name": "filters[hospital][$eq]",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "default": "BINHDINH"
                  }
                },
                {
                  "name": "filters[age][$eq]",
                  "in": "query",
                  "required": true,
                  "schema": {
                    "type": "string",
                    "default": "2-12 year"
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Successful response",
                  "content": {
                    "application/json": {
                      "example": {
                        "data": [
                          {
                            "id": "0",
                            "number": "6",
                            "who_aware": "Access",
                            "type": "In-patient"
                          },
                          {
                            "id": "1",
                            "number": "5",
                            "who_aware": "Access",
                            "type": "Missing"
                          },
                          {
                            "id": "2",
                            "number": "4",
                            "who_aware": "Access",
                            "type": "Surgery"
                          },
                          {
                            "id": "3",
                            "number": "15",
                            "who_aware": "Watch",
                            "type": "In-patient"
                          }
                        ],
                        "meta": {
                          "pagination": {
                            "total": 4
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
      }

      strapi
        .plugin('documentation')
        .service('override')
        .registerOverride(override, { });
    }
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/*{ strapi }*/) {},
};
