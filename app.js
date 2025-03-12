// create an api endpoint for client sending a post request for the original url
// long/original url is hashed to make it a small url
import express from 'express';
import {extractUrl} from './utils/extractUrl.js';
import storage from './models/storage.js';
import { check, validationResult } from 'express-validator';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
//  This endpoint is used for validating the url and extracting client URL
app.post('/shortenUrl', [
    // Validate 'longUrl' directly in the middleware
    check('longUrl').isURL().withMessage('Invalid URL format')
], async(req, res) => {
    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract the URL using the extractUrl function
    const clientUrl = extractUrl(req);  // This will return the longUrl from the request body
  
    const hashGenerator = await storage.storeURL(clientUrl);
    if (!hashGenerator){
        return res.status(500).json({error:"hash not found"})

    }
    
    const shortenedURL = `http://localhost:3000/${hashGenerator}`
    await storage.storeHashToUrl(hashGenerator,clientUrl)

    res.json({shortenedUrl: shortenedURL})
    

});

app.get('/:hashGenerator',async(req,res)=>{
    const hashedURL = req.params.hashGenerator
    const shortenedURL = `http://localhost:3000/${hashedURL}`
   
    const originalURL = await storage.UrlHashMapping.get(`short_url:${shortenedURL}`)

    

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
