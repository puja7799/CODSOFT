const startBtn = document.getElementById("startBtn");
const quizBox = document.getElementById("quizBox");
const questionUI = document.getElementById("question");
const answersUI = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const timerUI = document.getElementById("time");
const progressUI = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const scoreUI = document.getElementById("finalScore");
const bestUI = document.getElementById("topScore");
const popup = document.getElementById("popup");

/* STATE VARIABLES */
let currentIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval = null;
let answerLocked = false;

/* QUESTIONS */
const questions = [
{
question:"What does HTML stand for?",
options:[
"Hyper Trainer Marking Language",
"Hyper Text Markup Language",
"Hyper Text Marketing Language",
"Hyper Tool Multi Language"
],
answer:"Hyper Text Markup Language"
},
{
question:"Which language is used for styling web pages?",
options:["HTML","JQuery","CSS","XML"],
answer:"CSS"
},
{
question:"Which is not a JavaScript framework?",
options:["React","Angular","Vue","Django"],
answer:"Django"
},
{
question:"Which symbol is used for comments in JavaScript?",
options:["//","<!-- -->","#","**"],
answer:"//"
},
{
question:"Inside which HTML element do we put JavaScript?",
options:["<script>","<js>","<javascript>","<code>"],
answer:"<script>"
}
];

/* START QUIZ */
startBtn.addEventListener("click", () => {
startBtn.style.display="none";
quizBox.style.display="block";
loadQuestion();
startTimer();
});

/* LOAD QUESTION */
function loadQuestion(){

answerLocked=false;

const q = questions[currentIndex];

progressText.textContent=`Question ${currentIndex+1} / ${questions.length}`;
progressUI.style.width=((currentIndex+1)/questions.length)*100+"%";

questionUI.textContent=q.question;
answersUI.innerHTML="";

q.options.forEach(option=>{

const div=document.createElement("div");
div.textContent=option;
div.className="option";

div.addEventListener("click",()=>{

if(answerLocked) return;

document.querySelectorAll(".option")
.forEach(el=>el.classList.remove("selected"));

div.classList.add("selected");

});

answersUI.appendChild(div);

});
}

/* NEXT BUTTON */
nextBtn.addEventListener("click",()=>{

const selected=document.querySelector(".selected");

if(!selected && !answerLocked){
showMsg("Select an answer first");
return;
}

if(!answerLocked){
checkAnswer(selected);
return;
}

currentIndex++;

if(currentIndex < questions.length){
loadQuestion();
resetTimer();
}else{
finishQuiz();
}

});

/* CHECK ANSWER */
function checkAnswer(choice){

answerLocked=true;

const correctAnswer = questions[currentIndex].answer;

document.querySelectorAll(".option").forEach(opt=>{

opt.style.pointerEvents="none";

if(opt.textContent===correctAnswer)
opt.classList.add("correct");

if(opt===choice && opt.textContent!==correctAnswer)
opt.classList.add("wrong");

});

if(choice.textContent===correctAnswer){
score++;
showMsg("Correct Answer");
}else{
showMsg("Wrong Answer");
}

}

/* TIMER */
function startTimer(){

clearInterval(timerInterval);

timerInterval=setInterval(()=>{

timeLeft--;
timerUI.textContent=timeLeft;

if(timeLeft>10) timerUI.style.borderColor="lime";
else if(timeLeft>5) timerUI.style.borderColor="orange";
else timerUI.style.borderColor="red";

if(timeLeft<=0){
finishQuiz();
}

},1000);
}

function resetTimer(){
timeLeft=15;
timerUI.textContent=timeLeft;
startTimer();
}

/* FINISH */
function finishQuiz(){

clearInterval(timerInterval);

questionUI.textContent="Quiz Completed!";
answersUI.innerHTML="";
nextBtn.style.display="none";

scoreUI.textContent=`Score: ${score} / ${questions.length}`;

let bestScore = localStorage.getItem("pujaBestScore") || 0;

if(score>bestScore){
localStorage.setItem("pujaBestScore",score);
bestScore=score;
}

bestUI.textContent=`Best Score: ${bestScore}`;
}

/* MESSAGE */
function showMsg(text){

popup.style.display="block";
popup.textContent=text;

setTimeout(()=>{
popup.style.display="none";
},1500);

}
