const express = require('express');
const bodyParser = require('body-parser');
var axios = require('axios');
const dotenv = require('dotenv');
const port = 3000;


// create a new Express application
// the object holds the entire API
// we're gonna design
const app = express();

// tranform the request object into json
// useful for handling application/json
// contentTypes in a simpler way
app.use(bodyParser.json());

const headersConst = { 
    'accept': 'application/json', 
    'Authorization': 'Bearer da808279-e43c-32b4-8a59-5f024fc955cd', 
    'Content-Type': 'application/json', 
    'Cookie': 'incap_ses_1562_1634122=DT5XAuDZawM/PuMi01atFcJJuWIAAAAA7EnsZcnmPzGM2966uMp5iA==; nlbi_1634122=RhExRYmb8S1qHIytZPv8YwAAAAB3s3ChRACm+kKyR2JliIb/; visid_incap_1634122=zZQWBtD8RkO1zNezfDfgp6lGuWIAAAAAQUIPAAAAAACKk/k+ZlWQspvpRo2+s7TW'
}

app.get("/", 
    (requestObject, responseObject) => {
    // magic happens here
    console.log(requestObject)
    responseObject.send(requestObject.body)
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

app.post("/payNowQR", 
    async (req, res) => {
        // var axios = require('axios');
        var data = JSON.stringify({
          "ProxyType": "NRIC",
          "ProxyValue": "S12xxx67A",
          "Amount": 11.11,
          "ReferenceText": "Test123",
          "QRCodeSize": 50,
          "ExpiryDate": "20191220"
        });
        
        // var config = {
        //   method: 'post',
        //   url: 'https://api.ocbc.com:8243/transactional/paynowqr/1.0/payNowQR',
        //   headers: { 
        //     'accept': 'application/json', 
        //     'Content-Type': 'application/json', 
        //     'Authorization': 'Bearer da808279-e43c-32b4-8a59-5f024fc955cd'
        //   },
        //   data : data
        // };


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
          res.send("notnull");
        })
        .catch(function (error) {
          console.log(error);
          res.send("null");
        });
        

    // responseObject.send("yesss")
});

app.post("/SGQRCorporate",  
async (req, res) => {

    // var data = req.body["data"]

    var axios = require('axios');
var data = JSON.stringify(
    {
  "SGQRID": "XXXXXXXXXXXXXXX",
  "IsAmountEditable": "True",
  "ExpiryDateTime": "20201231",
  "ReferenceText": "REF123AB",
  "Amount": "11",
  "QRImageSize": "200",
  "QROutput": "02"
}
);

var config = {
  method: 'post',
  url: 'https://api.ocbc.com:8243/transactional/sgqr/1.0/corporate',
  headers: { 
    'accept': 'application/json', 
    'Content-Type': 'application/json', 
    'Authorization': 'Bearer da808279-e43c-32b4-8a59-5f024fc955cd',
    'Cookie': 'incap_ses_1562_1634122=DT5XAuDZawM/PuMi01atFcJJuWIAAAAA7EnsZcnmPzGM2966uMp5iA==; nlbi_1634122=RhExRYmb8S1qHIytZPv8YwAAAAB3s3ChRACm+kKyR2JliIb/; visid_incap_1634122=zZQWBtD8RkO1zNezfDfgp6lGuWIAAAAAQUIPAAAAAACKk/k+ZlWQspvpRo2+s7TW'
  },
  data : data
};

await axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  res.send(response);
})
.catch(function (error) {
  console.log(error);
  res.send("null");
});


});

app.post("/NETSQREnquiry",  
async (req, res) => {
    var axios = require('axios');
    var data = JSON.stringify({
      "RetrievalReference": "Ref001",
      "RetrievalTime": "101130000",
      "QRString": "XXXXXXXXXXXXXXXXXXXXXXXX"
    });
    
    var config = {
      method: 'post',
      url: 'https://api.ocbc.com:8243/ocbc/sg/corp/nets/qr/1.0/transaction-inquiry',
      headers: { 
        'accept': 'application/json', 
        'Authorization': 'Bearer da808279-e43c-32b4-8a59-5f024fc955cd', 
        'Content-Type': 'application/json', 
      },
      data : data
    };

    // var config = {
    //     method: 'post',
    //     url: 'https://api.ocbc.com:8243/transactional/paynowqr/1.0/payNowQR',
    //     headers: { 
    //         'accept': 'application/json', 
    //         'Authorization': 'Bearer da808279-e43c-32b4-8a59-5f024fc955cd', 
    //         'Content-Type': 'application/json', 
    //         // 'Cookie': 'incap_ses_1562_1634122=DT5XAuDZawM/PuMi01atFcJJuWIAAAAA7EnsZcnmPzGM2966uMp5iA==; nlbi_1634122=RhExRYmb8S1qHIytZPv8YwAAAAB3s3ChRACm+kKyR2JliIb/; visid_incap_1634122=zZQWBtD8RkO1zNezfDfgp6lGuWIAAAAAQUIPAAAAAACKk/k+ZlWQspvpRo2+s7TW'
    //     },
    //     data : data
    //     };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send(response);
    })
    .catch(function (error) {
      console.log(error);
      res.send("null");
    });
    

})


// ALL NEW ONES:


app.post("/getlast6MonthsStatement",  
async (req, res) => {
    var config = {
      method: 'get',
      url: 'https://api.ocbc.com:8243/transactional/account/1.0/recentAccountActivity*?accountNo=201770161001&accountType=D',
      headers: headersConst,
    };
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.send("null");
    });

})



app.post("/getIncomingFundsByType",  
async (req, res) => {

    
    var config = {
      method: 'get',
      url: `https://api.ocbc.com:8243/transactional/account/1.0/incomingFundsByType*?accountNo=${req.body["accountNo"]}&accountType=${req.body["accountType"]}&transactionType=${req.body["method"]}`,
    //   `https://api.ocbc.com:8243/transactional/account/1.0/incomingFundsByType*?accountNo=201770161001&accountType=D&transactionType=${method}`,
      headers: headersConst,
    };
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error);
      res.send("null");
    });

})






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



// DBS:
app.get("/getAuth",  
async (req, res) => {

    // res.send('id: ' + JSON.stringify(req.query));
    res.send(req.query);
    // var config = {
    //   method: 'get',
    //   url: `https://api.ocbc.com:8243/transactional/account/1.0/incomingFundsByType*?accountNo=${req.body["accountNo"]}&accountType=${req.body["accountType"]}&transactionType=${req.body["method"]}`,
    // //   `https://api.ocbc.com:8243/transactional/account/1.0/incomingFundsByType*?accountNo=201770161001&accountType=D&transactionType=${method}`,
    //   headers: headersConst,
    // };
    // axios(config)
    // .then(function (response) {
    //   console.log(JSON.stringify(response.data));
    //   res.send(response.data);
    // })
    // .catch(function (error) {
    //   console.log(error);
    //   res.send("null");
    // });

})


app.get("/dbs/cashLineApplication",  
async (req, res) => {

    var config = {
      method: 'get',
      url: 'https://www.dbs.com/sandbox/api/sg/v1/cashline/application/c5ca0209a71c4b7cb04abc535901e100',
      headers: { 
        'Content-Type': 'application/json', 
        'clientId': 'clientId4', 
        'accessToken': 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiIDogImh0dHBzOi8vY2FwaS5kYnMuY29tIiwiaWF0IiA6IDE2NTY4OTY4MzA5MjEsICJleHAiIDogMTY1NjkwMDQzMDkyMSwic3ViIiA6ICJNVEl6TkE9PSIsInB0eXR5cGUiIDogMSwiY2xuaWQiIDogImNsaWVudElkNCIsImNsbnR5cGUiIDogIjIiLCAiYWNjZXNzIiA6ICIxRkEiLCJzY29wZSIgOiAiUkVBRCIgLCJhdWQiIDogImh0dHBzOi8vY2FwaS5kYnMuY29tL2FjY2VzcyIgLCJqdGkiIDogIjY0OTMyMDE1ODM1NTQzNzYxMDAiICwiY2luIiA6ICJRMGxPTURBd01EQXoifQ.2fZqMECu4WX_7cvhjkLO_v2PP1xMI3D5gM3Yz4yN-hU', 
        'Authorization': 'Bearer da808279-e43c-32b4-8a59-5f024fc955cd', 
        'Cookie': 'AWSELB=31F5558F1A9D3BE2D05D00ABC3BE73F13FA7B19FFBCE78B3F0BDCAF48DC14190D38581497D12170CA1EC33A1CFDC46389D591DB2931FD6109527A1C2B56FCB7F88E26E164D; AWSELBCORS=31F5558F1A9D3BE2D05D00ABC3BE73F13FA7B19FFBCE78B3F0BDCAF48DC14190D38581497D12170CA1EC33A1CFDC46389D591DB2931FD6109527A1C2B56FCB7F88E26E164D'
      }
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      res.send(response.data)
    })
    .catch(function (error) {
      console.log(error);
      res.send("Error")
    });
})



app.get("/dbs/retrieveCashlineDetails",  
async (req, res) => {


    // const getAuthToken = async () => {
        var data = JSON.stringify({
            "client_id": "demo",
            "client_assertion": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJEQlMiLCJpYXQiOjE2NTY4OTgzODEsImV4cCI6MTY1Njk4NDc4MSwic3ViIjoiSnd0IFNpZ25lZCBUb2tlbiBmb3IgRGVtZSBBcHAgUGFydG5lciBUb2tlbiBmbG93IiwiUEFSVFlfVFlQRSI6MywiQ0xJRU5UX0lEIjoiY2xpZW50SWQzIiwiQ0xJRU5UX1RZUEUiOiJQYXJ0bmVyIiwiQUNDRVNTIjoiQ29tbXVuaXR5IiwiU0NPUEUiOiJSRUFEIiwiYXVkIjoiUGFydG5lcnMiLCJqdGkiOiJTdGFuZGVyZEpXVFRva2VuMSJ9.cM_n55NQlgUAyO-WRE_JO6UHLeu3LkpiaFIC8RZZNW4ulLsxLZxA_XwKDwbFR-08JvcXgZ2wivJVshy4C_0tMGWP9gEU5fimxm9aT5H9VdbeEQXhALDFiORW2sH8F340GRZTn7G1BVMOw605jcqaQVH_70QbK-EuElhFVLSgCyQhjhtYcl0bStellUHU28F8_N1hvlRPJ7ugPJt3QBMckX-_dT8gBFSEaA05FSu722jrXJPI0_7rWvJOvyBcyJBClYXE3sylqu4BMoJhpinqjybOEH9L-Lm2ERV4vKrMUcCePrm51e_DzSd4MuNeUzsf0tr9ddX8LZsT0qyfuCDtaA"
          });
          
          var config = {
            method: 'post',
            url: 'https://www.dbs.com/sandbox/api/sg/v1/oauth/authorize',
            headers: { 
              'Content-Type': 'application/json', 
              'clientId': 'clientId3', 
              'Authorization': 'Bearer da808279-e43c-32b4-8a59-5f024fc955cd', 
              'Cookie': 'AWSELB=31F5558F1A9D3BE2D05D00ABC3BE73F13FA7B19FFBCE78B3F0BDCAF48DC14190D38581497D12170CA1EC33A1CFDC46389D591DB2931FD6109527A1C2B56FCB7F88E26E164D; AWSELBCORS=31F5558F1A9D3BE2D05D00ABC3BE73F13FA7B19FFBCE78B3F0BDCAF48DC14190D38581497D12170CA1EC33A1CFDC46389D591DB2931FD6109527A1C2B56FCB7F88E26E164D'
            },
            data : data
          };
          
          axios(config)
          .then(async function (response) {
            console.log(JSON.stringify("token data:", response.data));

            var config = {
                method: 'get',
                url: 'https://www.dbs.com/sandbox/api/sg/v1/cashline/26cc5e4e1e174f6dbd88110539550020',
                headers: { 
                  'Content-Type': 'application/json', 
                  'clientId': 'clientId3', 
                  'accessToken': response.data["access_token"], 
                  'Authorization': 'Bearer da808279-e43c-32b4-8a59-5f024fc955cd', 
                  'Cookie': 'AWSELB=31F5558F1A9D3BE2D05D00ABC3BE73F13FA7B19FFBCE78B3F0BDCAF48DC14190D38581497D12170CA1EC33A1CFDC46389D591DB2931FD6109527A1C2B56FCB7F88E26E164D; AWSELBCORS=31F5558F1A9D3BE2D05D00ABC3BE73F13FA7B19FFBCE78B3F0BDCAF48DC14190D38581497D12170CA1EC33A1CFDC46389D591DB2931FD6109527A1C2B56FCB7F88E26E164D'
                }
              };
              
              axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
                res.send(response.data)
              })
              .catch(function (error) {
                console.log(error);
                res.send("Error getting info")
              });



            return response.data
          })
          .catch(function (error) {
            console.log(error);
            // return "Error"
            res.send("Error with auth token")
          });
          
    // }



    // AuthTokenDetails = ""
    // response = await getAuthToken()
    // console.log("response", response)
    // if (response == "Error"){
    //     res.send("Error with retrieving auth token")
    // }else{
    //     AuthTokenDetails = response["access_token"]
    // }
   
})


app.get("/citibank/getAccountsDetails",  
async (req, res) => {

    var config = {
    method: 'get',
    url: 'https://sandbox.apihub.citi.com/gcb/api/v2/accounts/details?accept=application/json',
    // headers: { 
    //     'client_id': '3906dd6d-534b-4d20-81d7-0e78848013a3', 
    //     'content-type': 'application/json', 
    //     'uuid': '9cdf014f-002f-418f-30cd-dee31d57ddda', 
    //     'accept': 'application/json', 
    //     'Authorization': 'Bearer AAIkMzkwNmRkNmQtNTM0Yi00ZDIwLTgxZDctMGU3ODg0ODAxM2EzWW5rMLGJJMvuHKQurvfUuUL4dricNSaDU4B4q2N-cB96Xt58wUTp_SObpt_xFTBQEamAhaT0sMwNJDKALXP9i_RRbIklaJZa1uMvU3ywVfq1oJ6ZUfUFz3wlMuhUPbYbL4zfj6XUjAPfo_nzrbs-jz2pXTdPRk1fZL2bmR6X8jGuFZHWBricPoD2cZkJui4gdv_6BcpJSstm73Cy7ZbiLDsBA58aJK1yzvabSUHu0r8HDffcspxpwNxskGQHf8fwJ-6XCEeQcqG2cvhrlO26C5gGUWo8LFBDVmYMA47kaDnuPcKP7s3G-SsGmaGD7BUybgD1hAo3kLew5p-9a0zrkk-GAkOTFnZ91y6KbC5CDd4CouFy4yGX1gJhz25cppOfJVfyueiF7hE3NyaRqeSal8sK-19A5xviIKNXknM0uHhs1CN7qYmD5PInb90FCjKnIXmS1rW6IEpo6dGQKtOQzUN62IvZNDS-LmU9ceIAe5hd-V9IpURovrgcXofDkRK3HlwL_Mq9-dVhkhJGh-OaTw', 
    //     'Cookie': '_abck=8B9EA8BF446FABBF1D3580ADE6DE6BE7~-1~YAAQzd6bfI8sSoiBAQAAWeHzxgi57Dwf95uotjmyMsXmNZE+kThCI3iZbtAgTXXqglrh/Y7A72DsTX4pNYiBlS8lRLXzPMiWYQBsDSKx+cnvwpAhDTcvd/wL9+rtYXqp59NHAoS35mhreUGl2NMwKUvWBFJJo/C1VZ++SjAjrL1bnQdr0AGhQvIMt/8tuxugKHR6X4eyy7ISFqyQntKZuaOl3LYmcpZFTybOFDz69KS3pxmx9ADLuzrSIfO0yD9kR+98mkURjnz10exw8ctDbk5hWUy0xg7sWI9LRkFHjJynjhKSknkCr37LIaDk3rTRDRJVn924zgoaj+F2WNrhHzQZiXra4A+YXPiCo73tN+udZO5kuTwS~-1~-1~-1; bm_sz=628B3671F1ED6EF5CEDD43E316C0321F~YAAQzd6bfJAsSoiBAQAAWeHzxhB85swDZ8ejCw7n5dG9ruj5UJEptYNLegL4q+CPTcL50eR3Sf/9BM7C1dVvgPgaIBipu9vxZbsZc3erqQ3fSzVAIzegRryj5ZgdGQzRbmbPjtlsAYZwhoqKYKthvPscUt4pmlF7pikpw48GHVexf+OCbUVuoDVhsht+706Y7L6f3y3weCwTscvq9/qf3+2HJa2vmC0S9M44T/gYmkxp4/PuFvivIsr0Te/amFlNbVut5hdaYY8QYhuJwTfei70S3a1oMOeksOlyyGhADR5I~3748658~4273990; CITI_SITE=gtdc'
    // }

    headers: { 
      'client_id': '3906dd6d-534b-4d20-81d7-0e78848013a3', 
      'content-type': 'application/json', 
      'uuid': '02ba9477-f656-44fb-3f4f-85453521d128', 
      'accept': 'application/json', 
      'Authorization': 'Bearer AAIkMzkwNmRkNmQtNTM0Yi00ZDIwLTgxZDctMGU3ODg0ODAxM2Ez07pTL1RH5S5exfaHidxYfPpF5WcnAbD0Aw_cc22u1Zu0GN_fNXRrTnQefooPw_5XwBb9ZDwb8YQkjxJ7YFPEfinzmVa4extLKLh45VMi1r_4h77K-bdMOeXRMxq4npjLVWDPVIxPBVTjV5Xxg-Bn7K4G_-9Yt-RbBuBdyotO5TCSxLhIvo7Iy6OG6nFOSWhXrAI4slYOSvc9KCGia9z6uejsGmP0uxhvLfOhNNidPFsoIu5E_8QXoFxOpCo31TmA4N-WQ0bi2WAS9TMO4JScD3iK_Gq3YKv2EMGTunDdXy5URxJNFvWVULfiq_wVVHmKwTaJu_HjdeT61gHgBdVhsrVtYerLFX1i42foeNtuOMA_m3O00ENsqecV_Uj_FUoF1Jkd71UxD5bT6LnSGNYhmoNz9hETgVwNpIOqI_jP6LKlJ5DyAo_SD2HCLJ86UK4J-UpfOJEjEOGcNxaIBcw8Ag60DgMF_bCey5sZOfQnMFXrNUv8sFmxQGsYN3q4jRCsJXbtHjp8T_bW0pbAHZycmQ', 
      'Cookie': '_abck=8B9EA8BF446FABBF1D3580ADE6DE6BE7~-1~YAAQzd6bfKPp3x+CAQAAI2WHJAh87HBIMzbO/pEg3KZ9Q+wkZLBRA5PPbDYb+YwvH5CWNGz4ajUGc9OBC/Xb5+fl+j2qREyMyzzLeyHNOP5bgFgj7yGowE/qu/NyOfi6+YoUWOa/qLjSbbpHW1PKHBfFKyDIx5D2XXtrbxhgYbOP2UsWSt17JhMx/80+JmR3bMf7xVKo+iQHHVKznt8UU34MIo8gkT8WRoCfkW1fdLSrtNGkWJT64dpZ2e0etOIq1ehJngsHTSqg/iOudgDLnJxTtZI4sWD/f/YASzw2CKYmXC6vgwCbimiwS3bMG987YII4Ve1rTrwOID7yaZOfWMhaiyhqDs9lUMe9L3rvVcJigjL8/RMZDVH5kr0imijBdujOOdg=~-1~-1~-1; bm_sz=F416FE436506934B7AF347A4C5F2158C~YAAQzd6bfKTp3x+CAQAAI2WHJBAIjXOmpD+aNSZk1vz1f7Kh/7dXWE0vQSipJGAA61fnQNHm+QqymgzYzxD7bqqCWjKiWE1ergyrD3iFIsPVvz1hON2Nb4+MesLwFyAtlSoEIYcMRVx8ofEYMhPDAbJOmzsr7N7+DS3Sl1ZUpcHKFTmvHM3QhUGAH8OGbKcA/JQJknAmmhKfhunplnPLqpCLBwXYvS0Y7cex9/mSvdQfTdJoQSMRkpNkdWxsOTSeB83SJ7OqOwNjWycir76LeeL1Rh2nbE3WZUU+nYnzvYdt~3490096~3159108; CITI_SITE=gtdc'
    }
    };

    axios(config)
    .then(function (response) {
    console.log(JSON.stringify(response.data));
    res.send(response.data)
    })
    .catch(function (error) {
    console.log(error);
    res.send("Error")
    });


})



dotenv.config();
console.log(process.env.PORT)
app.listen(process.env.PORT || 5000, () => {
    console.log("server started to listen on " + port);
});

// .listen(process.env.PORT || 5000)