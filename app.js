const express = require('express');
const bodyParser = require('body-parser');
var axios = require('axios');
const port = 3000;


// create a new Express application
// the object holds the entire API
// we're gonna design
const app = express();

// tranform the request object into json
// useful for handling application/json
// contentTypes in a simpler way
app.use(bodyParser.json());

app.get("/", 
    (requestObject, responseObject) => {
    // magic happens here
    responseObject.send("yesss")
});


app.get("/yes", 
    (requestObject, responseObject) => {
    // magic happens here
    responseObject.send("yesss")
});


app.post("/savingsAccounts", 
    async (req, res) => {
        console.log(req.body);      // your JSON
        if (req.body["endpoint"] == "savingsAccounts"){
            await savings(req, res)
        }else if (req.body["endpoint"] == "payNowQR"){
            await payNowQR(req, res)
        }else{
            res.send("default")
        }
    

    // responseObject.send("yesss")
});


async function savings(req, res){
    console.log(req.body);      // your JSON
    // magic happens here
    var config = {
        method: 'get',
        url: 'https://api.ocbc.com:8243/accounts/savings/1.0/*',
        headers: { 
          'accept': 'application/json', 
          'Authorization': 'Bearer da808279-e43c-32b4-8a59-5f024fc955cd'
        }
      };
      let data = "";
      await axios(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        // console.log(JSON.stringify(Object.keys(response.data["CASAAccountsList"])))
        response = JSON.stringify(response.data)
        res.send(response);
      })
      .catch(function (error) {
        console.log(error);
        res.send("null");
      });

}


async function payNowQR(req, res){

    // var data = JSON.stringify({
    // "ProxyType": "NRIC",
    // "ProxyValue": "S12xxx67A",
    // "Amount": 11.11,
    // "ReferenceText": "Test123",
    // "QRCodeSize": 50,
    // "ExpiryDate": "20191220"
    // });

    var data = req.body["data"]

    var config = {
    method: 'post',
    url: 'https://api.ocbc.com:8243/transactional/paynowqr/1.0/payNowQR',
    headers: { 
        'accept': 'application/json', 
        'Authorization': 'Bearer da808279-e43c-32b4-8a59-5f024fc955cd', 
        'Content-Type': 'application/json', 
        'Cookie': 'incap_ses_1562_1634122=DT5XAuDZawM/PuMi01atFcJJuWIAAAAA7EnsZcnmPzGM2966uMp5iA==; nlbi_1634122=RhExRYmb8S1qHIytZPv8YwAAAAB3s3ChRACm+kKyR2JliIb/; visid_incap_1634122=zZQWBtD8RkO1zNezfDfgp6lGuWIAAAAAQUIPAAAAAACKk/k+ZlWQspvpRo2+s7TW'
    },
    data : data
    };

    await axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    res.send(response.data);
    })
    .catch(function (error) {
    console.log(error);
    res.send("null");
    });
}

// curl -X GET "https://api.ocbc.com:8243/transactional/currentAccount/1.0/accountDetails*?accountNo=582133233022" -H  
// "accept: application/json" -H  "Authorization: Bearer da808279-e43c-32b4-8a59-5f024fc955cd"


// curl -X POST "https://api.ocbc.com:8243/transactional/sgqr/1.0/corporate" -H  "accept: application/json" -H  
// "Content-Type: application/json" -H  "Authorization: Bearer da808279-e43c-32b4-8a59-5f024fc955cd" 
// -d "{  \"SGQRID\": \"XXXXXXXXXXXXXXX\",  \"IsAmountEditable\": \"True\",  \"ExpiryDateTime\": \"20201231\",  \"ReferenceText\": \"REF123AB\",  \"Amount\": \"11\",  \"QRImageSize\": \"200\",  \"QROutput\": \"02\"}"

// // paynow request qr code generated:
// curl -X POST "https://api.ocbc.com:8243/transactional/paynowqr/1.0/payNowQR" -H  "accept: application/json" -H  
// "Content-Type: application/json" -H  "Authorization: Bearer da808279-e43c-32b4-8a59-5f024fc955cd" 
// -d "{  \"ProxyType\": \"NRIC\",  \"ProxyValue\": \"S12xxx67A\",  \"Amount\": 11.11,  \"ReferenceText\": \"Test123\",  \"QRCodeSize\": 50,  \"ExpiryDate\": \"20191220\"}"


app.listen(port, () => {
    console.log("server started to listen on " + port);
});