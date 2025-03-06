// create an api endpoint for client sending a post request for the original url
// long/original url is hashed to make it a small url
const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.post('/shortenUrl',(req,res)=>{
    var client_url = req.body.longUrl;
    console.log(client_url)
    
    res.send("Hellow World")

})
app.listen(3000,()=>{
   
    console.log("This is working as expected")
})
