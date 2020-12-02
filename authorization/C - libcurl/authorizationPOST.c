#include <stdio.h>
#include <curl/curl.h>

char *token;

void response_handler(void *ptr, size_t size, size_t nmemb, void *stream) {
    token = (char *) ptr;
}

int main() {
    CURL *curl;
    curl = curl_easy_init();
    if (curl) {
        CURLcode res;
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "POST");
        curl_easy_setopt(curl, CURLOPT_URL, "http://localhost/api/system/auth");
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, response_handler);
        curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
        curl_easy_setopt(curl, CURLOPT_DEFAULT_PROTOCOL, "https");
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        const char *data = "{\"login\": \"admin\",\"password\": \"admin_password\"}";
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data);
        res = curl_easy_perform(curl);
    }
    curl_easy_cleanup(curl);
    printf("Authorization response: %s", token);
    return 0;
}
