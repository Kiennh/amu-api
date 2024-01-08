TOKEN=$(curl -H 'Content-Type: application/json' -XPOST http://localhost:1337/api/auth/local  -d '{"identifier":"test@path.org","password":"Path@2023##"}' | jq -r '.jwt')

curl  -H "Authorization: Bearer $TOKEN" -XGET http://localhost:1337/api/report/patientCharacteristicsTable2_2
