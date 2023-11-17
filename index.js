const express = require('express')

const bodyParser = require('body-parser')

const path = require('path')
const { error } = require('console')


const PUBLISHABLE_KEY ="pk_test_51OCoUiC7ZY2LK9KDhQDZ26Vww7adClVdHvxaTV5KUgBiTkxdWst6H6WX7sg1pUrkhVlsc0SNFSTez4zEGS3dDBI200yFM7YIw3"

const SECRET_KEY = "sk_test_51OCoUiC7ZY2LK9KDSRUvrn5vtkBIbunNNAZD27TR3ASqtmfTGqJBnoETH2BChQqSoQFSID67UO2KQVlQtxx0ZixI00nWcttJWt" 

const stripe = require('stripe')(SECRET_KEY)

const app= express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.set("view engine","ejs")

const PORT = process.env.PORT || 8856 //if my specified port value not work then usual universal value would be work

app.get('/',(req,res) =>{                             //Here I have used callback funtion
      res.render('HOME',{
        key: PUBLISHABLE_KEY
      })
})

app.post('/payment',(req,res) =>{ 
     stripe.customers.create({
        email:req.body.stripeEmail,
        source:req.body.stripeToken,
        name:'OKPAY',
        address:{
            line1:'na ulitsya korenovsk',
            postal_code:'353180',
            city:'korenovsk',
            state:'Krasnodar',
            country:'Russia'
        }
     })
     .then((customer) => {
        return stripe.charges.create({
            amount:7000,
            description: ' package product',
        currency: 'usd',
        customer:customer.id
        })
     })
     .then((charge) => {
             console.log(charge) 
        res.send("Payment successfull")
      })

        .catch((err) => {
       res.send(err)
     })
})

app.listen(PORT,() =>{
        console.log(`App is listening on ${PORT}`)
})