// data is not persistent
// const URL_hash_Mapping = new Map();
// const original_URL_Mapping = new Map();
const redis = require('redis')

const UrlHashMapping = redis.createClient({
    username: 'default',
    password: '*****',
    socket: {
        host: 'r*****edis-cloud.com',
        port: 10360
    }
});

UrlHashMapping.on('error', err => console.log('Redis Client Error', err));
    
await UrlHashMapping.connect();


async function storeURL(clientURL){
    let hash = await UrlHashMapping.get(`original_url: ${clientURL}`)
    if (!hash){
        hash = generateHash()
        await UrlHashMapping.set(`original_url: ${clientURL}`,hash)
        await UrlHashMapping.set(`url_hash: ${hash}`,clientURL)

    }
    return hash
    // if (!UrlHashMapping.has(clientURL)){
    //     const hash = generateHash()
    //     UrlHashMapping.set(clientURL,hash)
    //     return hash
    // }
    // UrlHashMapping.get(clientURL)
}

function storeHashToUrl(shortURL,clientURL){
    original_URL_Mapping.set(shortURL,clientURL)
    
}

function generateHash(){
    return Math.random().toString(36).slice(2,6)
}


module.exports={
    storeURL,generateHash,URL_hash_Mapping,storeHashToUrl,original_URL_Mapping
}
