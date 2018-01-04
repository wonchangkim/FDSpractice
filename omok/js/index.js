//타이머
let progressValue = document.querySelector('.progress__value');
let progressValue2 = document.querySelector('.progress__value2');
let limitValue = document.querySelector('.limit__value');
let limitValue2 = document.querySelector('.limit__value2');

let RADIUS = 54;
let r = 30;
let CIRCUMFERENCE = 2 * Math.PI * RADIUS;
let cr = 2 * Math.PI * r;


let whitetimer = 5;
let whiteinterval = 0;
let blackinterval = 0;
let whitetime = 3;
let blacktimer = 5;
let blacktime = 3;


function whitePause() {
    if (whiteinterval === 0) {
        whiteinterval = setInterval(function () {
            whitetimer--;
            progressValue.style.strokeDashoffset = CIRCUMFERENCE * (1 - (whitetimer * 2 / 10));
            progressValue.style.strokeDasharray = CIRCUMFERENCE;
            limitValue.style.strokeDashoffset = cr * (1 - (whitetime * 3 / 9));
            limitValue.style.strokeDasharray = cr;
            document.querySelector('.whitecounttxt').innerHTML = whitetimer;
            document.querySelector('.whitelimittxt').innerHTML = whitetime;
            if (whitetimer === 0) {
                whitetimer = 5;
                whitetime--;
                if (whitetime < 0) {
                    alert("게임끝")
                }
            }
        }, 1000);

    } else {
        clearInterval(whiteinterval);
        whiteinterval = 0;

    }
}
function blakcPause() {
    if (blackinterval === 0) {
        blackinterval = setInterval(function () {
            blacktimer--;
            progressValue2.style.strokeDashoffset = CIRCUMFERENCE * (1 - (blacktimer * 2 / 10));
            progressValue2.style.strokeDasharray = CIRCUMFERENCE;
            limitValue2.style.strokeDashoffset = cr * (1 - (blacktime * 3 / 9));
            limitValue2.style.strokeDasharray = cr;
            document.querySelector('.blackcounttxt').innerHTML = blacktimer;
            document.querySelector('.blacklimittxt').innerHTML = blacktime;
            if (blacktimer === 0) {
                blacktimer = 5;
                blacktime--;
                if (blacktime < 0) {
                    alert("게임끝")
                }
            }
        }, 1000);

    } else {
        clearInterval(blackinterval);
        blackinterval = 0;
    }
}

function whitetimeReset() {
    clearInterval(whiteinterval);
    whiteinterval = 0;
}

function blacktimeReset() {
    clearInterval(blackinterval);
    blackinterval = 0;
}
///타이머끝
//승리이벤트
let victory = document.querySelector('.victory')
let content = document.querySelector('.victorycontent')
function vicwhite(){
  if(victory.classList.contains('victoryshow')){

  }else{
    victory.classList.add('victoryshow');
    clearInterval(blackinterval);
    blackinterval = 0;
  }
  if(content.classList.contains('showing')){

  }else{
    content.classList.add('showing');
    document.querySelector('.victorytxt').textContent = '화이트가 이겼습니다.';
  }
}
function vicblack() {
  if (victory.classList.contains('victoryshow')) {

  } else {
    victory.classList.add('victoryshow');
    clearInterval(whiteinterval);
    whiteinterval = 0;
  }
  if (content.classList.contains('showing')) {

  } else {
    content.classList.add('showing');
    document.querySelector('.victorytxt').textContent = '블랙이 이겼습니다.';
    document.querySelector('.victoryradius').classList.add('victoryradiusbalck');
  }
}
let vicbtn = document.querySelector('.victorybutton');
vicbtn.addEventListener('click',e =>{
  if (victory.classList.contains('victoryshow')){
    victory.classList.remove('victoryshow');
  }
  if (content.classList.contains('showing')){
    content.classList.remove('showing');
  }
  init();
});

//게임세팅
let turn = 1;
let wrows = new Array();
let brows = new Array();

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.col').forEach(el => {
        el.addEventListener('click', e => {
            if (turn % 2 !== 0) {
                if (el.classList.contains('white') || el.classList.contains('black')) {
                    alert("이미바둑알이있습니다.");
                    turn+= 2;
                } else {
                    el.classList.add('white');
                    blakcPause();
                    whitetimeReset();
                    let wrr = new Array();
                    wrr.push(Number(el.closest('.row').classList[0].slice(4, 7)), Number(el.classList[0].slice(4, 7)));
                    wrows.push(wrr);
                    judgewhite();
                    turn++;
                };

            } else {
                if (el.classList.contains('white') || el.classList.contains('black')) {
                    alert("이미바둑알이있습니다.");
                    turn += 2;
                } else {
                    el.classList.add('black');
                    whitePause();
                    blacktimeReset();
                    let brr = new Array();
                    brr.push(Number(el.closest('.row').classList[0].slice(4, 7)), Number(el.classList[0].slice(4, 7)));
                    brows.push(brr);
                    judgebalck();
                    turn++;
                };

            };
        });
    });
});

function judgewhite() {
    const samediagonalarry = [];
    const samediagonalarry1 = [];
    const samecol = [];
    const samerow = [];
    wrows.sort(function (a, b) {
        if (a[0] === b[0]) {
            let x = a[1];
            let y = b[1];
            return x < y ? -1 : 1; //이중배열정렬
        }
        return a[0] - b[0];
    });
    for (let i = 0; i < wrows.length - 1; i++) {
        samediagonalarry[wrows[i]] = [];
        samediagonalarry1[wrows[i]] = [];
        samecol[wrows[i]] = [];
        samerow[wrows[i]] = [];

        for (let j = 1; j < wrows.length; j++) {
            if (wrows[i][0] === wrows[j][0] && wrows[i][1] === wrows[j][1] - 1 || wrows[i][0] === wrows[j][0] && wrows[i][1] === wrows[j][1] - 2 || wrows[i][0] === wrows[j][0] && wrows[i][1] === wrows[j][1] - 3 || wrows[i][0] === wrows[j][0] && wrows[i][1] === wrows[j][1] - 4) {
                samerow[wrows[i]].push(wrows[j]);
                console.log(samerow);
                console.log(wrows);
            }
            if (wrows[i][0] === wrows[j][0] - 1 && wrows[i][1] === wrows[j][1] || wrows[i][0] === wrows[j][0] - 2 && wrows[i][1] === wrows[j][1] || wrows[i][0] === wrows[j][0] - 3 && wrows[i][1] === wrows[j][1] || wrows[i][0] === wrows[j][0] - 4 && wrows[i][1] === wrows[j][1]) {
                samecol[wrows[i]].push(wrows[j]);
                console.log(samecol);
                console.log(wrows);
            }
            if (wrows[i][0] === wrows[j][0] - 1 && wrows[i][1] === wrows[j][1] - 1 || wrows[i][0] === wrows[j][0] - 2 && wrows[i][1] === wrows[j][1] - 2 || wrows[i][0] === wrows[j][0] - 3 && wrows[i][1] === wrows[j][1] - 3 || wrows[i][0] === wrows[j][0] - 4 && wrows[i][1] === wrows[j][1] - 4) {
                samediagonalarry[wrows[i]].push(wrows[j]);
                console.log(samediagonalarry);
            }
            if (wrows[i][0] === wrows[j][0] - 1 && wrows[i][1] === wrows[j][1] + 1 || wrows[i][0] === wrows[j][0] - 2 && wrows[i][1] === wrows[j][1] + 2 || wrows[i][0] === wrows[j][0] - 3 && wrows[i][1] === wrows[j][1] + 3 || wrows[i][0] === wrows[j][0] - 4 && wrows[i][1] === wrows[j][1] + 4) {
                samediagonalarry1[wrows[i]].push(wrows[j]);
                console.log(samediagonalarry1);
            }
            if (samediagonalarry[wrows[i]].length >= 4 || samediagonalarry1[wrows[i]].length >= 4 || samecol[wrows[i]].length >= 4 || samerow[wrows[i]].length >= 4) {
              vicwhite();

            }
        }
    }
}
function judgebalck() {
    const samediagonalarryblack = [];
    const samediagonalarryblack1 = [];
    const samecolblack = [];
    const samerowblack = [];
    brows.sort(function (a, b) {
        if (a[0] === b[0]) {
            let x = a[1];
            let y = b[1];
            return x < y ? -1 : 1; //이중배열정렬
        }
        return a[0] - b[0];
    });
    for (let i = 0; i <brows.length - 1; i++) {
        samediagonalarryblack[brows[i]] = [];
        samediagonalarryblack1[brows[i]] = [];
        samecolblack[brows[i]] = [];
        samerowblack[brows[i]] = [];

        for (let j = 1; j < brows.length; j++) {
            if (brows[i][0] === brows[j][0] && brows[i][1] === brows[j][1] - 1 || brows[i][0] === brows[j][0] && brows[i][1] === brows[j][1] - 2 || brows[i][0] === brows[j][0] && brows[i][1] === brows[j][1] - 3 || brows[i][0] === brows[j][0] && brows[i][1] === brows[j][1] - 4) {
                samerowblack[brows[i]].push(brows[j]);
                console.log(samerowblack);
                console.log(brows);
            }
            if (brows[i][0] === brows[j][0] - 1 && brows[i][1] === brows[j][1] || brows[i][0] === brows[j][0] - 2 && brows[i][1] === brows[j][1] || brows[i][0] === brows[j][0] - 3 && brows[i][1] === brows[j][1] || brows[i][0] === brows[j][0] - 4 && brows[i][1] === brows[j][1]) {
                samecolblack[brows[i]].push(brows[j]);
                console.log(samecolblack);
                console.log(brows);
            }
            if (brows[i][0] === brows[j][0] - 1 && brows[i][1] === brows[j][1] - 1 || brows[i][0] === brows[j][0] - 2 && brows[i][1] === brows[j][1] - 2 || brows[i][0] === brows[j][0] - 3 && brows[i][1] === brows[j][1] - 3 || brows[i][0] === brows[j][0] - 4 && brows[i][1] === brows[j][1] - 4) {
                samediagonalarryblack[brows[i]].push(brows[j]);
                console.log(samediagonalarryblack);
            }
            if (brows[i][0] === brows[j][0] - 1 && brows[i][1] === brows[j][1] + 1 || brows[i][0] === brows[j][0] - 2 && brows[i][1] === brows[j][1] + 2 || brows[i][0] === brows[j][0] - 3 && brows[i][1] === brows[j][1] + 3 || brows[i][0] === brows[j][0] - 4 && brows[i][1] === brows[j][1] + 4) {
                samediagonalarryblack1[brows[i]].push(brows[j]);
                console.log(samediagonalarryblack1);
            }
            if (samediagonalarryblack[brows[i]].length >= 4 || samediagonalarryblack1[brows[i]].length >= 4 || samecolblack[brows[i]].length >= 4 || samerowblack[brows[i]].length >= 4) {
              vicblack();

            }
        }
    }
}

//리셋
function init() {
  turn = 1;
  wrows = [];
  brows = [];
  document.querySelectorAll('.col').forEach(el => {
    if (el.classList.contains('white') || el.classList.contains('black')) {
      el.remove('white');
     el.remove('black');
    }
  });
}
