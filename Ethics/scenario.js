let timer;
let timeLeft = 10;
let currentQuestion = 0;
let score = 0;
const totalQuestions = 5;
const questions =[
    {
        "scenario": "You are at a busy park and see a child crying because they are lost. The child looks scared and alone, and there are many people around who might not have noticed the situation. You feel a responsibility to help, but you're not sure of the best course of action. What should you do? ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------",
        "options": ["Walk away and let someone else handle it.", "Call the police immediately and wait with the child.", "Try to comfort the child and look around for their parents.", "Take the child to the nearest park security or information desk."],
        "correct": 4,
        "feedback": ["Walking away is wrong.", "Calling the police immediately is not necessary unless the parents cannot be found quickly.", "Comforting the child and looking around is good, but it's better to take them to a secure location.", "Correct! Taking the child to the nearest park security or information desk is the safest option."],
        "scores": [0, 1, 2, 3]
    },
    {
        "scenario": "You see someone accidentally drop their wallet in a crowded place. The wallet has fallen unnoticed by its owner, and there is a lot of foot traffic around. You are the only one who has seen it happen, and you have a chance to do the right thing. What should you do?",
        "options": ["Pick it up and keep it for yourself.", "Yell out loud to get the person's attention.", "Pick it up and try to catch up with the person to return it.", "Pick it up and hand it to the nearest security personnel."],
        "correct": 3,
        "feedback": ["Keeping it for yourself is wrong.", "Yelling might cause confusion or embarrassment.", "Correct! Returning it to the person directly is the best action.", "Handing it to security is good, but it's better to return it directly if possible."],
        "scores": [0, 1, 3, 2]
    },
    {
        "scenario": "You notice a new student in your class who looks lonely and is not interacting with anyone. They sit alone at lunch and do not engage in any group activities. You remember how hard it was to be new at school and wonder how you can make them feel welcome. What should you do?",
        "options": ["Ignore them since they are not your responsibility.", "Talk to them and invite them to join your group during lunch.", "Tell a teacher about the new student's behavior.", "Make fun of them to get a laugh from your friends."],
        "correct": 2,
        "feedback": ["Ignoring them is not helpful.", "Correct! Talking to them and inviting them to join your group is a kind action.", "Telling a teacher is good, but it's better to approach the student directly.", "Making fun of them is mean and wrong."],
        "scores": [0, 3, 2, 0]
    },
    {
        "scenario": "You find out that a friend is cheating on their homework. They have been copying answers from another student and are getting good grades unfairly. You are concerned about your friend, but you don't want to betray their trust either. What should you do?",
        "options": ["Ignore it and let them continue.", "Join them and cheat as well.", "Talk to your friend about why cheating is wrong and offer to help them study.", "Report them to the teacher immediately."],
        "correct": 3,
        "feedback": ["Ignoring it is not helpful.", "Cheating as well is wrong.", "Correct! Talking to your friend and offering help is the best course of action.", "Reporting them to the teacher is good, but discussing it with your friend first is better."],
        "scores": [0, 0, 3, 2]
    },
    {
        "scenario": "You accidentally spill your drink on a stranger's laptop at a café. The laptop looks expensive, and the stranger is clearly upset and worried about the damage. You feel terrible about the accident and want to make things right. What should you do?",
        "options": ["Quickly leave before anyone notices.", "Apologize and offer to pay for any damages.", "Blame it on someone else nearby.", "Offer to help clean up and apologize but leave it at that."],
        "correct": 2,
        "feedback": ["Leaving quickly is irresponsible.", "Correct! Apologizing and offering to pay for damages is the right thing to do.", "Blaming someone else is unfair and dishonest.", "Helping clean up and apologizing is good, but offering to pay for damages is better."],
        "scores": [0, 3, 0, 2]
    }
]

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion(currentQuestion);
    startTimer();
});

function startTimer() {
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            const timerElement = document.getElementById("timer");
            timerElement.innerText = `${timeLeft}s`;
            if (timeLeft <= 5) {
                timerElement.classList.add("red");
            } else {
                timerElement.classList.remove("red");
            }
        } else {
            clearInterval(timer);
            showOptions();
        }
    }, 1000);
}

function loadQuestion(index) {
    const scenarioElement = document.getElementById("scenario");
    const optionsElement = document.getElementById("options");
    const prevButton = document.getElementById("prev");
    scenarioElement.innerText = questions[index].scenario;
    for (let i = 0; i < 4; i++) {
        optionsElement.children[i].innerText = questions[index].options[i];
        optionsElement.children[i].style.backgroundColor = "#e0aaff";
    }
    document.getElementById("feedback").style.display = "none";
    prevButton.style.display = index === 0 ? "none" : "inline-block";
    document.getElementById("next").innerText = index === totalQuestions - 1 ? "Submit" : "Next";
}

function showOptions() {
    document.getElementById("scenario").style.height = "200px";
    document.getElementById("options").style.display = "flex";
}

function selectOption(option) {
    clearInterval(timer);
    const correctOption = questions[currentQuestion].correct;
    const feedbackElement = document.getElementById("feedback");
    if (option === correctOption) {
        document.getElementById(`option${option}`).style.backgroundColor = "#33fd8e";
        score += 5;
        feedbackElement.innerText = "Correct! " + questions[currentQuestion].feedback[option - 1];
    } else {
        document.getElementById(`option${option}`).style.backgroundColor = "#fd3333";
        document.getElementById(`option${correctOption}`).style.backgroundColor = "#33fd8e";
        feedbackElement.innerText = "Wrong! " + questions[currentQuestion].feedback[option - 1];
    }
    feedbackElement.style.display = "block";
}

function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        resetQuestion();
    }
}

function nextQuestion() {
    if (currentQuestion < totalQuestions - 1) {
        currentQuestion++;
        resetQuestion();
    } else {
        showScore();
    }
}

function resetQuestion() {
    timeLeft = 10;
    document.getElementById("timer").innerText = "10s";
    document.getElementById("timer").classList.remove("red");
    document.getElementById("scenario").style.height = "300px";
    document.getElementById("options").style.display = "none";
    loadQuestion(currentQuestion);
    startTimer();
}

function showScore() {
    document.getElementById("scenario").innerText = `Your score is ${score} out of ${totalQuestions * 5}`;
    document.getElementById("options").style.display = "none";
    document.getElementById("feedback").style.display = "none";
    document.getElementById("timer").style.display = "none";
    const nav = document.getElementsByClassName("navigation")[0];
    nav.innerHTML = '<button onclick="playAgain()">Play Again</button> <button onclick="goHome()">Home</button>';
}

function playAgain() {
    score = 0;
    currentQuestion = 0;
    resetQuestion();
    document.getElementById("timer").style.display = "block";
}

function goHome() {
    window.location.href = "../index.html"; // Assuming there's a home page
}
