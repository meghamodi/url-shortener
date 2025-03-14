export function copyShortURL(){
    var copyText = document.getElementById("pre")
    copyText.select();
    navigator.clipboard.writeText(copyText.value);
    alert("copied")


}
export default{
    copyShortURL
}