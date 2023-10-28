const secert_key = "sk_test_51NEw5sSJxwj0CTsYBob4xAdsA4fcI8qL6l5OQPRdVkjPdiMoZHzikcRQJ2Fofuwv55MvNeiWauec1BSD34pfP1dH00Z43vg6tp"
const api_key = "pk_test_51NEw5sSJxwj0CTsYBikeWdGAcgFMKp7bKJ97uhboNO1AspaVCpOhpfsUYUHq9YIKXTKmWfnBLkNWYJZCkQTyTltF00Ri503cYF"
 
const stripe = require("stripe")(secert_key)



exports.processPayment = async (req , res , next) =>{
    console.log(req.body.amount);
    const myparents = await stripe.paymentIntents.create({
        amount : req.body.amount,
        currency : "inr",
        metadata :{
            company : "Ecommerce"
        }
    })

    res
    .status(200)
    .json({success : true , client_secret : myparents.client_secret})
}

exports.sendApiPayment = async (req , res , next) =>{
    res.status(200).json({api_key})
}