  const questions = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Mars", correct: false },
        { text: "Paris", correct: true },
        { text: "London", correct: false },
        { text: "Madrid", correct: false }
      ]
    },
    {
      question: "What is the capital of Spain?",
      answers: [
        { text: "Rome", correct: false },
        { text: "Paris", correct: false },
        { text: "Madrid", correct: true },
        { text: "Berlin", correct: false }
      ]
    },
    {
      question: "What is the capital of Germany?",
      answers: [
        { text: "Berlin", correct: true },
        { text: "Paris", correct: false },
        { text: "London", correct: false },
        { text: "Madrid", correct: false }
      ]
    },
    {
      question: "What is the capital of Italy?",
      answers: [
        { text: "Rome", correct: true },
        { text: "Paris", correct: false },
        { text: "London", correct: false },
        { text: "Madrid", correct: false }
      ]
    }
  ];

  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");

  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    nextButton.style.display = "none";
    showQuestion();
  }

  function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      button.dataset.correct = answer.correct;
      button.addEventListener("click", selectAnswer);
      answerButtons.appendChild(button);
    });
  }

  function resetState() {
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
    nextButton.style.display = "none";
  }

  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("incorrect");
      const correctBtn = [...answerButtons.children].find(btn => btn.dataset.correct === "true");
      correctBtn.classList.add("correct");
    }
    Array.from(answerButtons.children).forEach(button => {
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }

  function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }

  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }

  nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
      handleNextButton();
    } else {
      startQuiz();
    }
  });

  startQuiz();
