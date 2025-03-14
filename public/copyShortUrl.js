export function copyShortURL(){
    var copyText = document.getElementById("shortUrlText").textContent;
    navigator.clipboard.writeText(copyText)
    .then(()=>(
        alert("copied")
    ))
    .catch(err=> console.error("copy failed",err))
    

}

