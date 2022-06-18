const express = require("express") //import frameworku express
const app = express() //zainicjowane aplikacji
const cors = require("cors")
const bodyParser = require("body-parser")
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest; //import XMLHttpRequest żeby móc go użyć aby dostać dane z API
app.use(cors())
app.use(bodyParser.json()) //wszystkie requesty które przychodzą na serwer będą konwertowane na format JSON
//app.post czyli wszyskie requesty które przyjdą metodą POST na ścieżkę 'http://localhost:3001/search' będą obsłużone przez funkcję (req,res) => {}
//req to request który przychodzi od klienta, res to response, czyli wszystko co się dzieje z res to klient dostanie jako odpowiedź 
app.post('/search', (req,res) => {
    var name = req.body.searchValue //wyjmujemy z body requesta pole searchValue -> to jest to co po stronie klienta wpisujemy jako imię i wysyłamy na serwer
    //to co jest niżej to pobieranie z Internetu wartości prawdopodobieńtw narodowości imion
    //tak dokładniej to jest jakieś bardzo proste API które po prostu zwraca dane po wysłaniu zapytania ich stronę
    //żeby dostać te dane też używam XMLHttpRequest tak samo jak na połączeniu klient -> serwer
    var xhr = new XMLHttpRequest(); //tworzymy obiekt XMLHttpRequest
    xhr.open('GET', `https://api.nationalize.io/?name=${name}`, true); //wysyłamy request na api https://api.nationalize.io/?name=${name} i wrzucamy tam to imię które dostaliśmi od klienta
    xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && xhr.status == 200){
        res.send(xhr.responseText) // wysyłamy klientowi dane które dostaliśmy z internetu
    }
}
xhr.send() //wysyłamy XMLHttpRequest
    

})
app.listen(3001)//ustawiamy serwer żeby czuwał na porcie 3001 czyli tak dokładniej będzie odpalony na http://localhost:3001