'use client';

import { useState } from 'react';

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
}

const questions: Question[] = [
    {
        id: 1,
        question: "¿Cuál es el concepto fundamental que se aborda en este capítulo?",
        options: [
            "Lorem ipsum dolor sit amet",
            "Consectetur adipiscing elit",
            "Sed do eiusmod tempor",
            "Ut labore et dolore magna"
        ],
        correctAnswer: 0
    },
    {
        id: 2,
        question: "¿Qué técnica es más efectiva para aplicar los conceptos aprendidos?",
        options: [
            "Memorizar todo el contenido",
            "Practicar con ejemplos reales",
            "Leer rápidamente el material",
            "Ignorar los ejercicios prácticos"
        ],
        correctAnswer: 1
    },
    {
        id: 3,
        question: "¿Cuál de las siguientes opciones representa mejor el objetivo del capítulo?",
        options: [
            "Completar el curso rápidamente",
            "Entender los fundamentos básicos",
            "Memorizar definiciones",
            "Evitar la práctica"
        ],
        correctAnswer: 1
    },
    {
        id: 4,
        question: "¿Qué debes hacer si no entiendes un concepto específico?",
        options: [
            "Saltar al siguiente tema",
            "Revisar el video y el texto nuevamente",
            "Ignorar completamente el tema",
            "Copiar las respuestas de otros"
        ],
        correctAnswer: 1
    }
];

export default function Capitulo1Preguntas() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerSelect = (answerIndex: number) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestion] = answerIndex;
        setSelectedAnswers(newAnswers);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleFinishQuiz = () => {
        let correctAnswers = 0;
        selectedAnswers.forEach((answer, index) => {
            if (answer === questions[index].correctAnswer) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);
        setShowResults(true);
    };

    const handleRestartQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswers(new Array(questions.length).fill(-1));
        setShowResults(false);
        setScore(0);
    };

    const currentQ = questions[currentQuestion];

    if (showResults) {
        return (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        Resultados del Cuestionario - Capítulo 1
                    </h1>

                    <div className="text-center">
                        <div className="text-6xl font-bold text-indigo-600 mb-4">
                            {score}/{questions.length}
                        </div>
                        <div className="text-xl text-gray-700 mb-6">
                            {score === questions.length ? "¡Perfecto! 🎉" :
                                score >= questions.length * 0.7 ? "¡Muy bien! 👍" :
                                    "Necesitas repasar más 📚"}
                        </div>

                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen de respuestas:</h3>
                            <div className="space-y-2">
                                {questions.map((question, index) => (
                                    <div key={question.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                        <span className="text-sm text-gray-700">Pregunta {index + 1}</span>
                                        <span className={`text-sm font-medium ${selectedAnswers[index] === question.correctAnswer
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                            }`}>
                                            {selectedAnswers[index] === question.correctAnswer ? '✓ Correcta' : '✗ Incorrecta'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleRestartQuiz}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-medium"
                        >
                            Repetir Cuestionario
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Cuestionario - Capítulo 1
                </h1>

                {/* Progreso */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">
                            Pregunta {currentQuestion + 1} de {questions.length}
                        </span>
                        <span className="text-sm text-gray-600">
                            {Math.round(((currentQuestion + 1) / questions.length) * 100)}% completado
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {/* Pregunta actual */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        {currentQ.question}
                    </h2>

                    <div className="space-y-3">
                        {currentQ.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswerSelect(index)}
                                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${selectedAnswers[currentQuestion] === index
                                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Navegación */}
                <div className="flex justify-between">
                    <button
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestion === 0}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Anterior
                    </button>

                    {currentQuestion === questions.length - 1 ? (
                        <button
                            onClick={handleFinishQuiz}
                            disabled={selectedAnswers[currentQuestion] === -1}
                            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Finalizar
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            disabled={selectedAnswers[currentQuestion] === -1}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Siguiente
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
} 