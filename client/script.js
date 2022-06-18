const inputBox = document.querySelector('#input_box')//wyciągamy z html obiekt o id input_box czyli miejsce na wpisanie imienia
const submitBtn= document.querySelector('#submit_btn')//analogicznie jak u góry tylko przycisk submit
const replyBox = document.querySelector('.content__reply-list')//wyciągamy z html obiekt o klasie input_box
const replyText = document.querySelector('.reply_text')
const firstReplyNode = document.querySelector('.content__reply-list-header')
import {countries} from './countries.js' //import listy krajów z ich kodami

//funkcja która się odpala gdy ktoś kliknie ENTER albo kliknie przycisk Submit
const searchRequest = (inputValue) =>{
    inputBox.value='' // gdy ktoś kliknie ENTER albo Submit czyścimi pole do wpisywania
    //XMLHttpRequest opisałem w wyjasnienia.txt
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3001/search', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && xhr.status == 200){
        let serverRes = JSON.parse(xhr.response) // konwertujemy odpowiedź serwera JSON na obiekt JavaScript
        let tmp = document.createElement('div') //tworzymy głowny obiekt który włożymy do html, poniższe instrukcje są podobne
        let nameTxt = document.createElement('p')
        nameTxt.innerText = `Name: ${serverRes.name}` // ustawiamy tekst na imię które sprawdzamy
        nameTxt.style.fontWeight = 'bold'
        console.log(nameTxt)
        replyText.classList.add('toggle-reply') // klasa toggle-reply wyłącza widoczność obiektu html,
        //do replyText dodajemy tą klase czyli wyłączamy widoczność, z replyBox usuwamy tą klasę czyli włączamy widoczność
        // czyli gdy przyjdą jakieś wyniki wyłączamy napis 'Reply from server should appear here' i zamiast tego będą się wyświetlać wyniki
        replyBox.classList.remove('toggle-reply')
        tmp.appendChild(nameTxt) // dodaje element z tekstem do obiektu div
        //na dole funkcja forEach przechodzi przez wszystkie pola odpowiedzi serwera
        serverRes.country.forEach((item) => {
            if(item.country_id != ''){
                let country = document.createElement('p')//tworzy obiekt p (paragraf) HTML
                let name=countries.find(c => c.code == item.country_id).name //znajduje w liście krajów z ich kodami kod i przypisuje nazwe tego kraju
                country.innerText = `${name}:  ${(100*parseFloat(item.probability)).toPrecision(4)}%` //jako tekst obiektu HTML wpisujemy nazwe kraju i prawdopodobieństwo
                //prawdopodobieństwo jest jako ciąg znaków w formie dziesiętnej wiec zeby przerobić na procenty
                //przekształcam ciąg znaków w liczbę zmiennoprzecinkowa Float(parseFloat) zaokrąglam do 4 miejsc po przecinku(.toPrecision(4)) i mnożę razy 100 
                tmp.appendChild(country)// dodaje to do obietku głownego
                firstReplyNode.after(tmp)//dodaje ten głowny element zaraz po pierwszym elemencie w tym okienku z wynikami
                }
        })
    }
}
let body = JSON.stringify({searchValue: inputValue})//body requestu ma być JSON (tak jest w wymaganiach) funkcja JSON.stringify przeksztalca te dane w JSON
xhr.send(body) //wysyłamy request z body
}


//Eventy
inputBox.addEventListener('keyup', (e) =>{e.key === 'Enter' ? searchRequest(e.target.value): ()=>{}})
//dodajemy event do pola gdzie się wpisuje dane
//keyup znaczy że kiedy w tym polu ktoś puści jakikolwiek przycisk na klawiaturze opada się ta funkcja
//sprawdza czy ten przycisk to ENTER jeżeli tak to opadala tą funkcje searchRequest która jest napisana u góry
//e.targer.value to wartość tekstowa tego pola czyli to co ktoś wpisał w pole
submitBtn.addEventListener('click', (e) =>{
    searchRequest(inputBox.value)
})
//dodajemy event click
//jak ktoś kliknie na przycisk Submit to się odpala ta sama funkcja inputBox.value to wartość tekstowa tego pola czyli to co ktoś wpisał w pole