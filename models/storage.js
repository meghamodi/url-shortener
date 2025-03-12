// data is not persistent
// const URL_hash_Mapping = new Map();
// const original_URL_Mapping = new Map();
import redis from 'redis'
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const UrlHashMapping = redis.createClient({
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    socket: {
        host: process.env.HOST,
        port: process.env.PORT
    }
});

UrlHashMapping.on('error', err => console.log('Redis Client Error', err));
    
(async()=>{
    await UrlHashMapping.connect();

})();


async function storeURL(clientURL){
    let hash = await UrlHashMapping.get(`original_url:${clientURL}`)
    if (!hash){
        hash = generateHash()
        await UrlHashMapping.set(`original_url:${clientURL}`,hash)

    }
    return hash

}

async function storeHashToUrl(hash,clientURL){
    const shortURL = `http://localhost:3000/${hash}`

    await UrlHashMapping.set(`short_url:${shortURL}`,clientURL)
    
}

function generateHash(){
    return Math.random().toString(36).slice(2,6)
}


export default{
    storeURL,generateHash,UrlHashMapping,storeHashToUrl
}
