// create an api endpoint for client sending a post request for the original url
// long/original url is hashed to make it a small url
const express = require('express')
const app = express()

app.get('/user',(req,res)=>{
    res.send("Hellow World")

})
app.listen(3000,()=>{
    console.log("This is working as expected")
})
