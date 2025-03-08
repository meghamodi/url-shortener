const URL_hash_Mapping = new Map();

function storeURL(clientURL){
    if (!URL_hash_Mapping.has(clientURL)){
        const hash = generateHash()
        URL_hash_Mapping.set(clientURL,hash)
    }
    console.log(URL_hash_Mapping)
}

function generateHash(){
    return Math.random().toString(36).slice(2,6)
}


module.exports={
    storeURL,generateHash,URL_hash_Mapping
}
