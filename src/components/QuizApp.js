import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { expandedQuestions } from "./questions";

export default function QuizApp() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes

  useEffect(() => {
    setQuestions(expandedQuestions.sort(() => 0.5 - Math.random()).slice(0, 20));
  }, []);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowResults(true);
    }
  }, [timeLeft]);

  const fetchRandomImage = (query) => `https://source.unsplash.com/400x300/?${query}`;

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentIndex].correct) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 800);
  };

  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 to-purple-700 text-white p-6">
        <h1 className="text-3xl font-bold">Quiz Completed!</h1>
        <p className="text-lg">Your Score: {score}/{questions.length}</p>
        <p>{score >= 15 ? "🎉 Congratulations! You passed!" : "😞 You did not pass. Try again!"}</p>
        <button className="mt-4 px-6 py-2 bg-white text-pink-500 font-bold rounded-full shadow-lg" onClick={() => window.location.reload()}>Restart Quiz</button>
        <footer className="mt-6 text-sm">Made with ❤️ for Avani for her to study for her exam and not find reasons to not study</footer>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-500 to-purple-700 text-white p-6">
      <h1 className="text-xl font-semibold mb-4">⏳ Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</h1>
      <h2 className="text-md font-semibold mb-2">Question {currentIndex + 1} of {questions.length}</h2>
      <motion.div key={currentIndex} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }}>
        <div className="p-6 w-96 bg-white text-black rounded-lg shadow-lg">
          <img
            src={fetchRandomImage(questions[currentIndex]?.category || "Canada")}
            alt="Question Image"
            className="mb-4 rounded-lg w-full"
          />
          <h2 className="text-lg font-bold mb-4">{questions[currentIndex]?.question}</h2>
          {questions[currentIndex]?.options.map((option, index) => (
            <button
              key={index}
              className={`w-full mb-2 p-2 rounded-lg shadow-md transition duration-200 ${selectedAnswer === option ? "bg-gray-300" : "bg-pink-500 text-white hover:bg-pink-600"}`}
              onClick={() => handleAnswer(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </motion.div>
      <button className="mt-4 px-6 py-2 bg-white text-pink-500 font-bold rounded-full shadow-lg" onClick={() => setShowResults(true)}>Exit Quiz</button>
      <footer className="mt-6 text-sm">Made with ❤️ for Avani for her to study for her exam and not find reasons to not study</footer>
    </div>
  );
}
