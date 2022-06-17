const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let xhr = new XMLHttpRequest();
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.post('/search', (req,res) => {
    console.log(req.body)
    var name = req.body.searchValue
    var xhr = new XMLHttpRequest();
    console.log(xhr)
    xhr.open('GET', `https://api.nationalize.io/?name=${name}`, true);
    xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && xhr.status == 200){
        res.send(xhr.responseText)
    }
}
xhr.send()
    

})
app.listen(3001)