function random255() {
  return Math.floor(Math.random() * 256);
}

function randomColor() {
  return `rgb(${random255()},${random255()},${random255()})`
}



let stage;
let problem;
let correctAnswer;

function nextStage() {
  stage++;
  problem = [randomColor(), randomColor(), randomColor()];
  correctAnswer = Math.floor(Math.random() * 3);

}

function init() {
  stage = 0;
  problem = [randomColor(), randomColor(), randomColor()];
  correctAnswer = Math.floor(Math.random() * 3);

}

function draw() {
  document.querySelectorAll('.box').forEach((el, index) => {
    el.style.backgroundColor = problem[index];
  })
  document.querySelector('.rgb-text').textContent = problem[correctAnswer];
  document.querySelector('.score').textContent = `SCORE: ${stage}`;
}



function correct() {
  nextStage();
  draw();
  let correct = document.querySelector('.correct')

  correct.classList.add('show')
  document.querySelector('.box').classList.add('show')

  let mobutton = correct.querySelector('.modal-button')
  mobutton.addEventListener('click', e => {

    correct.classList.remove('show');
    document.querySelectorAll('.box').forEach(el => {
      el.classList.remove('show')
    });

  });
}

function wrong() {

  let wrong = document.querySelector('.wrong')
  wrong.classList.add('show')
  document.querySelector('.modal-score').textContent = `SCORE: ${stage}`;
  document.querySelector('.box').classList.add('show')
  let mobutton = wrong.querySelector('.modal-button')
  mobutton.addEventListener('click', a => {
    wrong.classList.remove('show');

    document.querySelectorAll('.box').forEach(el => {
      el.classList.remove('show')
    });

  });
  init();
  draw();
}

document.querySelectorAll('.box').forEach((el, index) => {
  el.addEventListener('click', e => {
    if (index === correctAnswer) {
      correct();
    } else {
      wrong();
    }
  });
})


init();
draw();
