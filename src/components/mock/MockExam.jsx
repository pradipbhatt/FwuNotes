import React, { useState, useEffect, useRef, useCallback } from "react";
import { API_BASE_URL } from "../../config";
import Navbar from "../Navbar";
import { FaCheck, FaRedo, FaTimes, FaFlagCheckered } from "react-icons/fa";
import { HiClock, HiLightBulb, HiChevronRight } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MathJax from "react-mathjax2";

const QUESTION_TIME = 120;

function pad(n) { return String(n).padStart(2, "0"); }
function fmtTime(s) { return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`; }
// Only treat as LaTeX if the text contains actual LaTeX commands (\frac, \sqrt…),
// superscripts (x^2), or math delimiters ($). Plain arithmetic like "8*5=40" must not match.
function isMath(q) { return /\\[a-zA-Z]|\^[0-9a-zA-Z{]|\$/.test(q); }

const ALPHA = ["A", "B", "C", "D"];

export default function MockExam({ yearID, year }) {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQ, setCurrentQ] = useState(() => parseInt(localStorage.getItem("currentQuestion")) || 0);
  const [score, setScore] = useState(() => parseInt(localStorage.getItem("score")) || 0);
  const [totalTime, setTotalTime] = useState(() => parseInt(localStorage.getItem("timer")) || 0);
  const [qTimer, setQTimer] = useState(QUESTION_TIME);
  const [selected, setSelected] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [done, setDone] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    userName: "", engineeringField: "Computer",
    review: "Any feedback or suggestions?", rating: "5",
  });

  // Fetch
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/quizzes/`);
        const data = await res.json();
        const filtered = data
          .filter(q => q.yearID === yearID)
          .map(q => ({
            ...q,
            answers: q.answers
              .map((a, i) => ({ ...a, _id: `a_${i}` }))
              .sort(() => Math.random() - 0.5),
          }));
        setQuizData(filtered);
        setTotalTime(prev => prev || filtered.length * QUESTION_TIME);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [yearID]);

  // Total timer
  useEffect(() => {
    if (done || loading) return;
    const id = setInterval(() => {
      setTotalTime(t => {
        const next = t - 1;
        localStorage.setItem("timer", next);
        if (next <= 0) { clearInterval(id); finish(); }
        return Math.max(0, next);
      });
    }, 1000);
    return () => clearInterval(id);
  }, [done, loading]);

  // Stable refs — always point to latest values so setTimeout/setInterval never capture stale closures
  const currentQRef = useRef(currentQ);
  const quizDataRef = useRef(quizData);
  const doneRef = useRef(done);
  const selectedRef = useRef(selected);
  currentQRef.current = currentQ;
  quizDataRef.current = quizData;
  doneRef.current = done;
  selectedRef.current = selected;

  const finish = useCallback(() => {
    setDone(true);
    setShowForm(true);
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("score");
    localStorage.removeItem("timer");
  }, []);

  const advance = useCallback(() => {
    setSelected(null);
    setCorrect(null);
    const next = currentQRef.current + 1;
    if (next < quizDataRef.current.length) setCurrentQ(next);
    else finish();
  }, [finish]);

  const advanceRef = useRef(advance);
  advanceRef.current = advance;

  // Question timer — resets on new question, stops when answer selected
  useEffect(() => {
    if (doneRef.current) return;
    setQTimer(QUESTION_TIME);
    const id = setInterval(() => {
      if (selectedRef.current !== null) return; // paused while answer showing
      setQTimer(t => {
        if (t <= 1) { clearInterval(id); advanceRef.current(); return QUESTION_TIME; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [currentQ, done]);

  useEffect(() => {
    localStorage.setItem("currentQuestion", currentQ);
    localStorage.setItem("score", score);
  }, [currentQ, score]);

  const handleAnswer = (answer) => {
    if (selected) return;
    setSelected(answer);
    const correctOpt = quizData[currentQ].answers.find(a => a.correct);
    setCorrect(correctOpt);
    if (answer.correct) setScore(s => s + 1);
    setSubmittedAnswers(prev => [...prev, {
      question: quizData[currentQ].question,
      userAnswer: answer.text,
      correctAnswer: correctOpt?.text,
      explanation: quizData[currentQ].explanation,
    }]);
    // No auto-advance — user must click "Next Question"
  };

  const restart = () => {
    setCurrentQ(0); setScore(0); setDone(false); setShowForm(false);
    setSelected(null); setCorrect(null);
    setTotalTime(quizData.length * QUESTION_TIME);
    setSubmittedAnswers([]); setFormSubmitted(false);
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("score");
    localStorage.removeItem("timer");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formSubmitted) { toast.info("Already submitted."); return; }
    try {
      await fetch(`${API_BASE_URL}/api/quiz-results/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, totalQuestions: quizData.length, solvedQuestions: score }),
      });
      toast.success("Result submitted!");
      setFormSubmitted(true);
      setShowForm(false);
    } catch {
      toast.error("Submission failed.");
    }
  };

  const q = quizData[currentQ] || { question: "", answers: [], explanation: "" };
  const pct = quizData.length ? Math.round((currentQ / quizData.length) * 100) : 0;
  const qTimerPct = Math.round((qTimer / QUESTION_TIME) * 100);
  const isUrgent = qTimer <= 30;

  if (loading) return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-500 dark:text-gray-400">Loading exam questions…</p>
      </div>
    </>
  );

  if (quizData.length === 0) return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 pt-20">
        <p className="text-lg text-gray-500 dark:text-gray-400">No questions found for {year}.</p>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-24">
        {/* Top exam bar */}
        <div className="sticky top-14 z-30 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full shrink-0">
                {year} Entrance
              </span>
              <div className="hidden sm:flex items-center gap-2 min-w-0">
                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden w-40">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">
                  {done ? quizData.length : currentQ}/{quizData.length}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              {!done && (
                <div className={`flex items-center gap-1.5 text-sm font-mono font-semibold ${isUrgent ? 'text-red-500 dark:text-red-400' : 'text-gray-700 dark:text-gray-200'}`}>
                  <HiClock className={`w-4 h-4 ${isUrgent ? 'animate-pulse' : ''}`} />
                  {fmtTime(qTimer)}
                </div>
              )}
              <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                <HiClock className="w-4 h-4" />
                <span className="font-mono">{fmtTime(totalTime)}</span>
              </div>
              {!done && (
                <button
                  onClick={finish}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-semibold transition-colors"
                >
                  <FaFlagCheckered className="w-3 h-3" /> Finish
                </button>
              )}
            </div>
          </div>
          {/* Q-level progress bar */}
          {!done && (
            <div className={`h-0.5 transition-all duration-1000 ${isUrgent ? 'bg-red-500' : 'bg-blue-400'}`}
              style={{ width: `${qTimerPct}%` }} />
          )}
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">

          {/* Quiz area */}
          {!done && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Question header */}
              <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Question {currentQ + 1} <span className="text-gray-300 dark:text-gray-600">/ {quizData.length}</span>
                </span>
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                  Score: {score}
                </span>
              </div>

              {/* Question body */}
              <div className="px-6 py-5">
                <div className="text-base md:text-lg font-medium text-gray-900 dark:text-gray-100 leading-relaxed mb-6">
                  {isMath(q.question) ? (
                    <MathJax.Context input="tex">
                      <MathJax.Node style={{ overflowWrap: "break-word" }}>
                        {`\\displaystyle ${q.question.replace(/ /g, "\\hspace{0.3em}")}`}
                      </MathJax.Node>
                    </MathJax.Context>
                  ) : (
                    <span className="whitespace-pre-wrap break-words">{q.question}</span>
                  )}
                </div>

                {/* Answer options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.answers.map((answer, idx) => {
                    let cls = "border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20";
                    if (selected) {
                      if (answer.correct)
                        cls = "border-2 border-green-500 bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300";
                      else if (answer === selected)
                        cls = "border-2 border-red-500 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300";
                      else
                        cls = "border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/30 text-gray-400 dark:text-gray-500 opacity-60";
                    }
                    return (
                      <button
                        key={answer._id}
                        onClick={() => handleAnswer(answer)}
                        disabled={!!selected}
                        className={`${cls} rounded-xl px-4 py-3 text-left flex items-start gap-3 transition-all duration-200 disabled:cursor-default`}
                      >
                        <span className={`shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mt-0.5 ${
                          selected && answer.correct ? 'bg-green-500 text-white'
                          : selected && answer === selected ? 'bg-red-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                        }`}>
                          {selected && answer.correct ? <FaCheck className="w-3 h-3" />
                           : selected && answer === selected ? <FaTimes className="w-3 h-3" />
                           : ALPHA[idx]}
                        </span>
                        <span className="text-sm leading-relaxed break-words">
                          {isMath(answer.text) ? (
                            <MathJax.Context input="tex">
                              <MathJax.Node style={{ display: "inline" }}>{answer.text}</MathJax.Node>
                            </MathJax.Context>
                          ) : answer.text}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Answer result + Explanation */}
                {selected && (
                  <div className="mt-5 space-y-3">
                    {/* Correct / Wrong banner */}
                    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm ${
                      selected.correct
                        ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700'
                        : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
                    }`}>
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        selected.correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                      }`}>
                        {selected.correct ? <FaCheck className="w-3.5 h-3.5" /> : <FaTimes className="w-3.5 h-3.5" />}
                      </span>
                      {selected.correct ? 'Correct!' : (
                        <span>Incorrect — Correct answer: <span className="font-bold">{correct?.text}</span></span>
                      )}
                    </div>

                    {/* Explanation */}
                    {q.explanation && (
                      <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700">
                        <div className="flex items-center gap-2 mb-2">
                          <HiLightBulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wide">Explanation</span>
                        </div>
                        <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed whitespace-pre-wrap break-words">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between gap-3">
                <button
                  onClick={restart}
                  className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <FaRedo className="w-3 h-3" /> Restart
                </button>

                {selected ? (
                  <button
                    onClick={() => advanceRef.current()}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    Next Question <HiChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => advanceRef.current()}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-sm transition-colors"
                  >
                    Skip <HiChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Score / Result */}
          {done && (
            <div className="space-y-6">
              {/* Summary card */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8 text-center">
                  <h2 className="text-2xl font-bold text-white mb-1">Exam Completed!</h2>
                  <p className="text-blue-200 text-sm">{year} Entrance Exam</p>
                </div>
                <div className="px-6 py-6">
                  <div className="flex items-center justify-center gap-8 mb-6">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{score}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Correct</p>
                    </div>
                    <div className="w-px h-12 bg-gray-200 dark:bg-gray-700" />
                    <div className="text-center">
                      <p className="text-4xl font-bold text-gray-400 dark:text-gray-500">{quizData.length - score}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Incorrect</p>
                    </div>
                    <div className="w-px h-12 bg-gray-200 dark:bg-gray-700" />
                    <div className="text-center">
                      <p className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                        {Math.round((score / quizData.length) * 100)}%
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Score</p>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000"
                      style={{ width: `${Math.round((score / quizData.length) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={restart}
                      className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
                    >
                      <FaRedo className="w-3.5 h-3.5" /> Try Again
                    </button>
                  </div>
                </div>
              </div>

              {/* Review */}
              {submittedAnswers.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-100">Answer Review</h3>
                  </div>
                  <div className="divide-y divide-gray-100 dark:divide-gray-700">
                    {submittedAnswers.map((a, i) => {
                      const isRight = a.userAnswer === a.correctAnswer;
                      return (
                        <div key={i} className="px-6 py-4">
                          <div className="flex items-start gap-3 mb-3">
                            <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${isRight ? 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400'}`}>
                              {isRight ? <FaCheck className="w-3 h-3" /> : <FaTimes className="w-3 h-3" />}
                            </span>
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-100 leading-relaxed whitespace-pre-wrap break-words">
                              Q{i + 1}. {a.question}
                            </p>
                          </div>
                          <div className="ml-9 space-y-1.5">
                            {!isRight && (
                              <p className="text-xs text-red-600 dark:text-red-400">
                                Your answer: <span className="font-medium">{a.userAnswer || "—"}</span>
                              </p>
                            )}
                            <p className="text-xs text-green-700 dark:text-green-400">
                              Correct: <span className="font-medium">{a.correctAnswer}</span>
                            </p>
                            {a.explanation && (
                              <p className="text-xs text-gray-500 dark:text-gray-400 italic">{a.explanation}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Submit result modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Save your result</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">Enter your details to record your score on the leaderboard.</p>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                  <input
                    type="text"
                    name="userName"
                    value={formData.userName}
                    onChange={e => setFormData(f => ({ ...f, userName: e.target.value }))}
                    required
                    placeholder="Your full name"
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Engineering Field</label>
                  <select
                    name="engineeringField"
                    value={formData.engineeringField}
                    onChange={e => setFormData(f => ({ ...f, engineeringField: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Computer">Computer</option>
                    <option value="Civil">Civil</option>
                    <option value="Architecture">Architecture</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Feedback (optional)</label>
                  <textarea
                    name="review"
                    value={formData.review}
                    onChange={e => setFormData(f => ({ ...f, review: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-colors"
                >
                  Submit Result
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
