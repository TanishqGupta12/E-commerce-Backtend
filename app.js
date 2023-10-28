var express = require('express');
var app = express();
var cookieParser = require("cookie-parser");
const bodyParserz = require("body-parser");
const fileUpload = require('express-fileupload');
app.use(fileUpload());
const cors = require("cors")
app.use(cors())

const path = require("path"); 
app.use("/upload", express.static(path.join("/upload")));  

const port = process.env.Port || 4000
//  handling uncought exception

process.on("uncaughtException",(err)=>{
    console.log(`Error : ${err.message}` );
    console.log(`Error : ${err.stack}` );
    console.log(`Shutting down the server  due to  unhandler promise` );
})

app.use(express.json())
app.use(bodyParserz.json())
app.use(cookieParser())
app.use(bodyParserz.urlencoded({ extended : true }));

app.use("/api/v1" ,  require("./Router/producder_router"))
app.use("/api/v1" , require("./Router/user_router"))
app.use("/api/v2" , require("./Router/order_router"))
app.use("/api/v2" , require("./Router/paymentRoute"))


app.use(require("./middleware/err"))
// require("../client/build/index.html")
app.use(express.static(path.join(__dirname ,"../client/build")))
// console.log(path.resolve(__dirname ,"../client/build/index.html"));
app.get("*" , (req , res)=>{
    // res.send("dvnn")
    res.sendFile(path.resolve(__dirname ,"../client/build/index.html"))

});

 const server = app.listen(port ,()=>{
    console.log(`http://localhost:${port}/ `);
})

process.on("unhandledRejection" , (err)=>{
    console.log(`Error : ${err.message}` );
    console.log(`Shutting down the server  due to unhandled Rejection` );

    server.closeAllConnections(()=>{
        process.exit(1)
    })


})
