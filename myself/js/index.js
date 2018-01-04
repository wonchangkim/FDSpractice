moment.locale('EN');
const amtime = moment().format('LT');
let toptime = document.querySelector('.time');
toptime.innerHTML = `${amtime}`;

moment.locale('ko');

const nowtime = moment().format('LT');
console.log(nowtime);

let answerArry = ['이름',['어디','일산']];


function myFunction() {
    let chatarea = document.querySelector('.chat-messages-list');
    var node = document.createElement("div");
    let awsdiv = document.createElement("div");
    let txt = document.querySelector('#inputres');
    let awstxt = document.querySelector('.anwtext');
    node.classList.add('block');
    chatarea.appendChild(node);
    let itxt = txt.value;
    node.innerHTML = `<span class="txttime">${nowtime}</span> 
    <span class="anwtext reschatbubble">${txt.value}</span>`;
    document.querySelector('.inputform').reset();
   
    if (answerArry.includes(itxt)) {
        console.log('ddd');
        chatarea.appendChild(awsdiv);
       
        awsdiv.innerHTML = `<div class="anwtxtwrap">
                                <span class="name">김원창</span>
                                <span class="anwtext awschatbubble">김원창</span>
                                <span class= "txttime">${nowtime}</span>
                            </div>`;
        
    }
}



