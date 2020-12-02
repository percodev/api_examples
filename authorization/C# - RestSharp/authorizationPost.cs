using System;
using RestSharp;

namespace authRequest
{
    class Program
    {
        static void Main(string[] args)
        {
            var client = new RestClient("http://localhost/api/system/auth");
            client.Timeout = -1;
            var request = new RestRequest(Method.POST);
            request.AddHeader("Content-Type", "application/json");
            request.AddParameter("application/json", "{\"login\": \"admin\",\"password\": \"admin_password\"}",  ParameterType.RequestBody);
            IRestResponse response = client.Execute(request);
            Console.WriteLine(response.Content);
        }
    }
}
