const inputBox = document.querySelector('#input_box')
const submitBtn= document.querySelector('#submit_btn')
const replyBox = document.querySelector('.content__reply-list')
const replyText = document.querySelector('.reply_text')
const firstReplyNode = document.querySelector('.content__reply-list-header')
import {countries} from './countries.js'
const searchRequest = (inputValue) =>{
    inputBox.value=''
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3001/search', true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && xhr.status == 200){
        let serverRes = JSON.parse(xhr.response)
        let tmp = document.createElement('div')
        let nameTxt = document.createElement('p')
        nameTxt.innerText = `Name: ${serverRes.name}`
        nameTxt.style.fontWeight = 'bold'
        console.log(nameTxt)
        replyText.classList.add('toggle-reply')
        replyBox.classList.remove('toggle-reply')
        tmp.appendChild(nameTxt)
        serverRes.country.forEach((item) => {
            if(item.country_id != ''){
                let country = document.createElement('p')
                let name=countries.find(c => c.code == item.country_id).name
                country.innerText = `${name}:  ${(100*parseFloat(item.probability)).toPrecision(4)}%`
                tmp.appendChild(country)
                firstReplyNode.after(tmp)
                }
        })
    }
}
let body = JSON.stringify({searchValue: inputValue})
xhr.send(body)
}


inputBox.addEventListener('keyup', (e) =>{e.key === 'Enter' ? searchRequest(e.target.value): ()=>{}})
submitBtn.addEventListener('click', (e) =>{
    searchRequest(inputBox.value)
})
