const questions=[
    {
        questions:"Quem arrancou a mão direita de Týr",
        answers:[
            {text: "Fenrir", correct: true},
            {text: "Geri e Freki", correct: false},
            {text: "Jörmungandr", correct: false},
            {text: "Ratatosk", correct: false},
        ]
    },
    {
        questions:"Quais destes animais é um esquilo ",
        answers:[
            {text: "Fenrir", correct: false},
            {text: "Geri e Freki", correct: false},
            {text: "Jörmungandr", correct: false},
            {text: "Ratatosk", correct: true},
        ]
    },
    {
        questions:"Qual é a serpente na mitologia nórdica",
        answers:[
            {text: "Fenrir", correct: false},
            {text: "Geri e Freki", correct: false},
            {text: "Jörmungandr", correct: true},
            {text: "Ratatosk", correct: false},
        ]
    },
    {
        questions:"Qual é o nome dos lobos de odin",
        answers:[
            {text: "Huginn e Munin", correct: false},
            {text: "Geri e Freki", correct: true},
            {text: "Jörmungandr", correct: false},
            {text: "Ratatosk", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons= document.getElementById("answer-buttons");
const nextButton= document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.
    questions;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `O seu score foi ${score} em ${questions.length}!`;
    nextButton.innerHTML ="Jogue novamente";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex< questions.length){
        showQuestion();
    }else{
       showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();