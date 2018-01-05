moment.locale('EN');
const amtime = moment().format('LT');
let toptime = document.querySelector('.time');
toptime.innerHTML = `${amtime}`;

moment.locale('ko');

const nowtime = moment().format('LT');
console.log(nowtime);

let answerArry = ['이름','어디','나이'];
let answerArry1 = ['김원창','일산','']

let kakaosuund = document.querySelector('#myAudio');

function playsound() {
    kakaosuund.play();
} 

function myFunction() {
    let chatmes = document.querySelector('.chat-messages');
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
        let anserIndex;
        for (let i = 0; i < answerArry.length; i++){
            if(answerArry[i] === itxt){
                anserIndex = i
            }
        }
        
        console.log('ddd');
        chatarea.appendChild(awsdiv);
        
        setTimeout(function () {
            awsdiv.innerHTML = `<div class="anwser">
                                 <div class="profileimg"></div>
                                <div class="anwtxtwrap">
                                <span class="name">김원창</span>
                                <span class = "anwtext awschatbubble"> ${answerArry1[anserIndex]}</span>
                                <span class="txttime">${nowtime}</span>
                            </div> 
                            </div>`;
            playsound();             
            chatmes.lastElementChild.lastElementChild.scrollIntoView(true);
        }, 800);

   
        //scroll 마지막 div로 이동
       
    }
    chatmes.lastElementChild.lastElementChild.scrollIntoView(true);
}