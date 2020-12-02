import http.client

conn = http.client.HTTPConnection("localhost", 80)
payload = "{\"login\": \"admin\",\"password\": \"admin_password\"}"
headers = {
  'Content-Type': 'application/json'
}
conn.request("POST", "/api/system/auth", payload, headers)
res = conn.getresponse()
data = res.read()
print(data.decode("utf-8"))
