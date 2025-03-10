// data is not persistent
const URL_hash_Mapping = new Map();
const original_URL_Mapping = new Map();

function storeURL(clientURL){
    if (!URL_hash_Mapping.has(clientURL)){
        const hash = generateHash()
        URL_hash_Mapping.set(clientURL,hash)
        return hash
    }
    URL_hash_Mapping.get(clientURL)
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
