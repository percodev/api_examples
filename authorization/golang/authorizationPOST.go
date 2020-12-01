package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"
)

type Auth struct {
	Login    string `json:"login"`
	Password string `json:"password"`
}

type AuthResponse struct {
	Token string `json:"token"`
	Error string `json:"error"`
}

func main() {
	// Request url
	url := "http://localhost/api/system/auth"
	// Request method
	method := "POST"
	// Authorization data
	data := &Auth{
		Login:    "admin",
		Password: "password",
	}
	// Convert struct to json
	payload, err := json.Marshal(data)
	if err != nil {
		fmt.Println(err)
		return
	}
	// Make http client
	client := &http.Client{}
	// Make request
	req, err := http.NewRequest(method, url, strings.NewReader(string(payload)))
	if err != nil {
		fmt.Println(err)
		return
	}
	// Adding request content type
	req.Header.Add("Content-Type", "application/json")
	// Do request
	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer res.Body.Close()
	// Read response
	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	var token AuthResponse
	// Write response json to struct
	err = json.Unmarshal(body, &token)
	if err != nil {
		fmt.Println(err)
		return
	}
	// Print response data
	if res.StatusCode == 200 {
		fmt.Println("Your token", token.Token) // Your token here!
	} else {
		fmt.Println("Error :(", token.Error) // Response error
	}
}
