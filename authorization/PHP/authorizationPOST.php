<?php
/* Example for PHP - cURL  */
$curl = curl_init();
curl_setopt_array($curl, array(
  CURLOPT_URL => 'http://localhost/api/system/auth', // Request url
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  /*** Request data ***/
  CURLOPT_POSTFIELDS =>'{
    "login": "admin",
    "password": "password"
  }',
  /*******************/
  CURLOPT_HTTPHEADER => array(
    'Content-Type: application/json'
  ),
));

$response = curl_exec($curl);
curl_close($curl);
echo $response;

?>
