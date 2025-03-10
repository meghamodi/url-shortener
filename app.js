// create an api endpoint for client sending a post request for the original url
// long/original url is hashed to make it a small url
const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
var tools = require('./utils/extractUrl.js');
var storage = require('./models/storage.js');
const { check, validationResult } = require('express-validator');


app.post('/shortenUrl', [
    // Validate 'longUrl' directly in the middleware
    check('longUrl').isURL().withMessage('Invalid URL format')
], (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the URL using the extractUrl function
    const clientUrl = tools.extractUrl(req);  // This will return the longUrl from the request body
  
    const hashGenerator = storage.storeURL(clientUrl);
    if (!hashGenerator){
        return res.status(500).json({error:"hash not found"})

    }

    shortenedURL = `http://localhost.com:3000/${hashGenerator}`
    storage.storeHashToUrl(shortenedURL,clientUrl)

    res.json({shortenedUrl: shortenedURL})
    console.log("Shortened URL Mapping:", storage.URL_hash_Mapping);
    console.log("Original URL Mapping:", storage.original_URL_Mapping);
});

app.get('/:hashGenerator',(req,res)=>{
    const hashedURL = req.params.hashGenerator
    const shortenedURL = `http://localhost.com:3000/${hashedURL}`
    const originalURL = storage.original_URL_Mapping.get(shortenedURL)
    

    if (originalURL){
        res.redirect(originalURL)
    }
    else{
        res.status(400).json({error:"something went wrong"})
    }
    
}
   

)


app.listen(3000,()=>{
   
    console.log("This is working as expected")
})
