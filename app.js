// create an api endpoint for client sending a post request for the original url
// long/original url is hashed to make it a small url
const express = require('express')
const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
var tools = require('./utils/extractUrl.js');
const { check, validationResult } = require('express-validator');


app.post('/shortenUrl', [
    // Validate 'longUrl' directly in the middleware
    check('longurl').isURL().withMessage('Invalid URL format')
], (req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the URL using the extractUrl function
    const clientUrl = tools.extractUrl(req);  // This will return the longUrl from the request body

    // Your URL shortening logic goes here
    // For now, we will simply send back the original URL as a "shortened" example
    res.send(`Shortened URL: ${clientUrl}`);
});
app.listen(3000,()=>{
   
    console.log("This is working as expected")
})
