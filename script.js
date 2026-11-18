// Quiz data structured by semesters and modules
const quizData = {
    "S1": {
        "Module 1 : Introduction à la foresterie": [
            {
                question: "Quelle est la principale fonction d'une forêt ?",
                options: [
                    "Produire uniquement du bois",
                    "Protéger la biodiversité et réguler le climat",
                    "Servir uniquement de lieu de loisir",
                    "Être une source d'énergie fossile"
                ],
                answer: 1
            },
            {
                question: "Combien de semestres comporte une licence de foresterie (2 ans) ?",
                options: [
                    "2 semestres",
                    "4 semestres",
                    "6 semestres",
                    "8 semestres"
                ],
                answer: 1
            }
        ],
        "Module 2 : Biologie végétale": [
            {
                question: "Quel module traite de la classification des plantes ?",
                options: [
                    "Module d'écologie",
                    "Module de biologie végétale",
                    "Module de classification des plantes",
                    "Module de géologie"
                ],
                answer: 2
            }
            // Ajoutez d'autres questions pour ce module ici
        ]
    },
    "S2": {
        "Module 1 : Aménagement des parcours steppiques & sahariens": [
            // Ajoutez ici les questions du PDF, exemple :
            {
                question: "Quelle est la principale problématique des écosystèmes steppiques en Algérie ?",
                options: [
                    "La surexploitation et la dégradation avancée des terres",
                    "La forte biodiversité non exploitée",
                    "La surreprésentation des zones humides",
                    "La surpopulation urbaine"
                ],
                answer: 0
            }
            // ... autres questions de ce module
        ]
        // Vous pouvez ajouter d'autres modules pour S2 ici
    }
    // Ajoutez d'autres semestres ici
};

let selectedSemester = null;
let selectedModule = null;
let currentQuestion = 0;
let score = 0;

function showSemesterChoices() {
    const container = document.getElementById('quiz-container');
    let html = `<h2>Choisissez le semestre</h2><ul>`;
    for (const sem in quizData) {
        html += `<li><button onclick="selectSemester('${sem}')">${sem}</button></li>`;
    }
    html += `</ul>`;
    container.innerHTML = html;
}

function selectSemester(semester) {
    selectedSemester = semester;
    showModuleChoices();
}

function showModuleChoices() {
    const container = document.getElementById('quiz-container');
    let html = `<h2>Choisissez le module</h2><ul>`;
    for (const mod in quizData[selectedSemester]) {
        html += `<li><button onclick="selectModule('${mod}')">${mod}</button></li>`;
    }
    html += `</ul><button onclick="showSemesterChoices()">← Retour aux semestres</button>`;
    container.innerHTML = html;
}

function selectModule(module) {
    selectedModule = module;
    currentQuestion = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const questions = quizData[selectedSemester][selectedModule];
    const container = document.getElementById('quiz-container');
    if (currentQuestion >= questions.length) {
        container.innerHTML = `<h3>Votre score : ${score} / ${questions.length}</h3>
            <button onclick="showModuleChoices()">Choisir un autre module</button>`;
        return;
    }
    const q = questions[currentQuestion];
    let html = `<div class="quiz-card"><h3>${q.question}</h3><ul>`;
    q.options.forEach((opt, i) => {
        html += `<li><button onclick="selectOption(${i})">${opt}</button></li>`;
    });
    html += `</ul></div>`;
    container.innerHTML = html;
}

function selectOption(selected) {
    const questions = quizData[selectedSemester][selectedModule];
    if (selected === questions[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    showQuestion();
}

document.addEventListener("DOMContentLoaded", showSemesterChoices);