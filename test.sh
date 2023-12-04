TOKEN=$(curl -H 'Content-Type: application/json' -XPOST http://localhost:1337/api/auth/local  -d '{"identifier":"test@path.org","password":"Path@123"}' | jq -r '.jwt')

curl  -H "Authorization: Bearer $TOKEN" -XGET http://localhost:1337/api/dash
