const express = require('express');
const bodyParser = require('body-parser');
const fast2sms= require('fast-two-sms');
const dotenv= require('dotenv');
const Vonage = require('@vonage/server-sdk')

require('dotenv').config();
dotenv.config({path: '.env'});

const app= express();


const vonage = new Vonage({
  apiKey: process.env.API_KEY_NEXMO,
  apiSecret: process.env.API_SECRET_NEXMO
}, { debug: true });

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/success', (req, res) => {
  res.render('success');
});

app.post('/send', async (req, res)=>{
  const sendMethod= req.body.method;
  if(sendMethod=="VonageAPI"){
    //using Vonage API
    const from= "Teekam";
    const to= "+91"+req.body.phone;
    const text= req.body.message;
    vonage.message.sendSms(from, to, text, { type: 'unicode' },
    (err, responseData) => {
      if(err) {
        console.log(err);
      } else {
        console.dir(responseData);
      }
    } );
    res.render('success');
  }
  else{
    //using fast-two-sms api
    const response= await fast2sms.sendMessage({
      authorization: process.env.API_KEY_F2S,
      message: req.body.message,
      numbers: [req.body.phone]
    });
    console.log(response);
    res.render('success');
  }
})


module.exports= app;