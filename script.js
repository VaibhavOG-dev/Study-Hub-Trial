/* =========================
   PAGE NAVIGATION
========================= */

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");
    const buttons = document.querySelectorAll(".nav-btn");

    pages.forEach(page => {
        page.classList.remove("active-page");
    });

    buttons.forEach(button => {
        button.classList.remove("active");
    });

    document.getElementById(pageId).classList.add("active-page");

    event.target.classList.add("active");
}


/* =========================
   DARK / LIGHT MODE
========================= */

function toggleTheme() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}


/* =========================
   HOMEWORK
========================= */

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {

    const input = document.getElementById("taskInput");
    const subject = document.getElementById("taskSubject");

    if (input.value.trim() === "") {
        alert("Please enter a homework task.");
        return;
    }

    const task = {
        text: input.value,
        subject: subject.value,
        completed: false
    };

    tasks.push(task);

    input.value = "";

    saveTasks();
    displayTasks();
}

function displayTasks() {

    const list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach((task, index) => {

        const div = document.createElement("div");

        div.className = "task";

        if (task.completed) {
            div.classList.add("completed");
        }

        div.innerHTML = `
            <div class="task-left">
                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onchange="completeTask(${index})"
                >

                <span>
                    ${task.text}
                    <small> (${task.subject})</small>
                </span>
            </div>

            <button
                class="delete-btn"
                onclick="deleteTask(${index})"
            >
                🗑️
            </button>
        `;

        list.appendChild(div);
    });

    updateProgress();
}

function completeTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();

    updateStreak();
}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();
}

function updateProgress() {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    let percentage = 0;

    if (total > 0) {
        percentage = Math.round(
            completed / total * 100
        );
    }

    document.getElementById(
        "progressNumber"
    ).textContent = percentage + "%";

    document.getElementById(
        "taskCount"
    ).textContent = completed;
}


/* =========================
   NOTES
========================= */

let notes = JSON.parse(localStorage.getItem("notes")) || [];

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote() {

    const title =
        document.getElementById("noteTitle").value;

    const text =
        document.getElementById("noteText").value;

    if (title.trim() === "" || text.trim() === "") {
        alert("Please write a title and note.");
        return;
    }

    notes.push({
        title: title,
        text: text
    });

    document.getElementById("noteTitle").value = "";
    document.getElementById("noteText").value = "";

    saveNotes();

    displayNotes();
}

function displayNotes() {

    const list =
        document.getElementById("notesList");

    list.innerHTML = "";

    notes.forEach((note, index) => {

        const div =
            document.createElement("div");

        div.className = "note";

        div.innerHTML = `
            <h3>${note.title}</h3>

            <p>${note.text}</p>

            <br>

            <button
                onclick="deleteNote(${index})"
            >
                🗑️ Delete
            </button>
        `;

        list.appendChild(div);
    });
}

function deleteNote(index) {

    notes.splice(index, 1);

    saveNotes();

    displayNotes();
}


/* =========================
   STUDY TIMER
========================= */

let time = 25 * 60;
let timer = null;

function updateTimerDisplay() {

    const minutes =
        Math.floor(time / 60);

    const seconds =
        time % 60;

    document.getElementById(
        "timerDisplay"
    ).textContent =
        `${minutes}:${seconds
            .toString()
            .padStart(2, "0")}`;
}

function startTimer() {

    if (timer !== null) {
        return;
    }

    document.getElementById(
        "timerStatus"
    ).textContent = "🔥 Focus time!";

    timer = setInterval(() => {

        time--;

        updateTimerDisplay();

        if (time <= 0) {

            clearInterval(timer);

            timer = null;

            alert("🎉 Study session complete!");

            time = 5 * 60;

            document.getElementById(
                "timerStatus"
            ).textContent =
                "☕ Break time!";
        }

    }, 1000);
}

function pauseTimer() {

    clearInterval(timer);

    timer = null;

    document.getElementById(
        "timerStatus"
    ).textContent = "Paused";
}

function resetTimer() {

    clearInterval(timer);

    timer = null;

    time = 25 * 60;

    updateTimerDisplay();

    document.getElementById(
        "timerStatus"
    ).textContent = "Ready to study?";
}


/* =========================
   PERCENTAGE CALCULATOR
========================= */

function calculatePercentage() {

    const obtained =
        Number(
            document.getElementById("obtained").value
        );

    const total =
        Number(
            document.getElementById("total").value
        );

    if (total <= 0) {

        alert("Enter a valid total.");

        return;
    }

    const percentage =
        (obtained / total) * 100;

    document.getElementById(
        "percentageResult"
    ).textContent =
        percentage.toFixed(2) + "%";
}


/* =========================
   EXAM COUNTDOWN
========================= */

document
    .getElementById("examDate")
    .addEventListener("change", updateCountdown);

function updateCountdown() {

    const date =
        document.getElementById("examDate").value;

    if (!date) {
        return;
    }

    const exam =
        new Date(date);

    const today =
        new Date();

    const difference =
        exam - today;

    const days =
        Math.ceil(
            difference /
            (1000 * 60 * 60 * 24)
        );

    const countdown =
        document.getElementById("countdown");

    if (days > 0) {

        countdown.textContent =
            days + " days left 🎯";

    } else if (days === 0) {

        countdown.textContent =
            "Exam is today! 😳";

    } else {

        countdown.textContent =
            "Exam date has passed.";
    }
}


/* =========================
   QUIZ
========================= */

const quizQuestions = [

    {
        question: "Which language is used to style webpages?",
        answers: [
            "HTML",
            "CSS",
            "Python",
            "Java"
        ],
        correct: "CSS"
    },

    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            "Earth",
            "Mars",
            "Venus",
            "Jupiter"
        ],
        correct: "Mars"
    },

    {
        question: "What is 12 × 5?",
        answers: [
            "50",
            "55",
            "60",
            "65"
        ],
        correct: "60"
    },

    {
        question: "Which gas do humans need to breathe?",
        answers: [
            "Carbon dioxide",
            "Oxygen",
            "Hydrogen",
            "Nitrogen"
        ],
        correct: "Oxygen"
    }

];

let currentQuestion = 0;
let score = 0;

function startQuiz() {

    currentQuestion = 0;
    score = 0;

    showQuestion();
}

function showQuestion() {

    const q =
        quizQuestions[currentQuestion];

    document.getElementById(
        "question"
    ).textContent = q.question;

    const answers =
        document.getElementById("answers");

    answers.innerHTML = "";

    q.answers.forEach(answer => {

        const button =
            document.createElement("button");

        button.className = "answer-btn";

        button.textContent = answer;

        button.onclick =
            () => checkAnswer(answer);

        answers.appendChild(button);
    });

    document.getElementById(
        "quizResult"
    ).textContent =
        `Question ${currentQuestion + 1}
        of ${quizQuestions.length}`;
}

function checkAnswer(answer) {

    if (
        answer ===
        quizQuestions[currentQuestion].correct
    ) {
        score++;
    }

    currentQuestion++;

    if (
        currentQuestion >=
        quizQuestions.length
    ) {

        document.getElementById(
            "question"
        ).textContent =
            "🎉 Quiz Finished!";

        document.getElementById(
            "answers"
        ).innerHTML = "";

        document.getElementById(
            "quizResult"
        ).textContent =
            `You scored ${score}/${quizQuestions.length}!`;

        return;
    }

    showQuestion();
}


/* =========================
   AI DEMO
========================= */

function askAI() {

    const question =
        document.getElementById("aiQuestion").value;

    const answer =
        document.getElementById("aiAnswer");

    if (question.trim() === "") {

        answer.textContent =
            "Please type a question first.";

        return;
    }

    answer.innerHTML = `
        🤖 <b>StudyBot:</b><br><br>
        This is currently a demo version of StudyHub.
        A real AI API can be connected here later to
        answer questions about Maths, Science, English
        and other subjects.
    `;
}


/* =========================
   TEACHER MODE
========================= */

function teacherMessage() {

    alert(
        "Teacher tools are ready for the next version! 🚀"
    );
}


/* =========================
   STUDY STREAK
========================= */

let streak =
    Number(localStorage.getItem("streak")) || 0;

function updateStreak() {

    const today =
        new Date().toDateString();

    const lastDay =
        localStorage.getItem("lastStudyDay");

    if (lastDay !== today) {

        streak++;

        localStorage.setItem(
            "streak",
            streak
        );

        localStorage.setItem(
            "lastStudyDay",
            today
        );
    }

    document.getElementById(
        "streak"
    ).textContent = streak;

    document.getElementById(
        "dashboardStreak"
    ).textContent = streak;
}


/* =========================
   LOAD SAVED DATA
========================= */

displayTasks();
displayNotes();
updateTimerDisplay();
updateStreak();