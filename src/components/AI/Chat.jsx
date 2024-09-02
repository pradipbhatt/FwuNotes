import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AiOutlineUser, AiOutlineRobot, AiOutlineMessage ,AiOutlineClose, AiOutlineSend} from "react-icons/ai";
import { motion } from "framer-motion";
import Typewriter from 'typewriter-effect';
import Navbar from "../Navbar";

function Chat() {
    const [userData, setUserData] = useState({});
    const [localStorageData, setLocalStorageData] = useState({});
    const [loading, setLoading] = useState(true);
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [generatingAnswer, setGeneratingAnswer] = useState(false);
    const [isChatVisible, setIsChatVisible] = useState(false);

    const chatContainerRef = useRef(null);

    useEffect(() => {
        const fetchData = () => {
            const user = JSON.parse(localStorage.getItem('Users')) || {};
            setUserData(user);

            const allData = {
                currentYear: localStorage.getItem('currentYear'),
                mock0_timer: localStorage.getItem('mock0_timer'),
                userEmail: localStorage.getItem('userEmail'),
                theme: localStorage.getItem('theme'),
                noticeDismissed: localStorage.getItem('noticeDismissed'),
                quizSelectedAnswer: localStorage.getItem('quizSelectedAnswer'),
                mock0_currentQuestion: localStorage.getItem('mock0_currentQuestion'),
                currentQuestionIndex: localStorage.getItem('currentQuestionIndex'),
                timer: localStorage.getItem('timer'),
                userName: localStorage.getItem('userName'),
                mock0_score: localStorage.getItem('mock0_score'),
                currentQuestion: localStorage.getItem('currentQuestion'),
                score: localStorage.getItem('score'),
                quizCurrentQuestion: localStorage.getItem('quizCurrentQuestion'),
                savedTime: localStorage.getItem('savedTime'),
                quizScore: localStorage.getItem('quizScore'),
            };

            setLocalStorageData(allData);
            setLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const generateAnswer = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;

        setGeneratingAnswer(true);
        const userMessage = { text: question, from: "user", image: userData.userImage, name: userData.fullname };
        setMessages((prevMessages) => [...prevMessages, userMessage]);

        try {
            const response = await axios.post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB-scXq-SGLrVJChjxbHQb191NZ87FIzek",
                {
                    contents: [{ parts: [{ text: question }] }],
                }
            );

            const aiMessage = {
                text: response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, no response received.",
                from: "ai",
            };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error("Failed to generate answer", error);
            const errorMessage = {
                text: "Sorry - Something went wrong. Please try again!",
                from: "ai",
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }

        setGeneratingAnswer(false);
        setQuestion("");
    };

    return (
        <>
            <Navbar />
            <div className="relative">
    {/* Button to toggle chat */}
    <button
        onClick={() => setIsChatVisible(!isChatVisible)}
        className="fixed bottom-14 right-2 bg-blue-500 text-white rounded-full p-2 shadow-lg flex items-center justify-center hover:bg-blue-600 transition-colors duration-300 dark:bg-blue-700 dark:hover:bg-blue-800 z-50"
        aria-label="Open chat"
    >
        <AiOutlineMessage className="text-2xl" />
        <h3>Ask AI</h3>
    </button>

    {/* Chat Container */}
    {isChatVisible && (
        <div className="fixed bottom-24 left-6 right-6 sm:left-auto sm:right-auto sm:mx-auto sm:w-full lg:w-1/3 bg-gray-100 border border-gray-300 rounded-lg shadow-lg dark:bg-gray-900 dark:border-gray-700 dark:text-white h-[calc(100vh-28vh)] sm:max-w-md z-50">
            <div className="relative flex flex-col h-[calc(100vh-26vh)]">
                {/* Close Button */}
                <button
                    onClick={() => setIsChatVisible(false)}
                    className="absolute top-3 right-3 p-2 bg-gray-200 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors duration-300 z-60"
                    aria-label="Close chat"
                >
                    <AiOutlineClose className="text-xl" />
                </button>

                {/* Chat Messages */}
                <div
                    className="flex-1 p-4 overflow-y-auto space-y-4"
                    ref={chatContainerRef}
                >
                    {/* Sample Messages */}
                    {messages.length === 0 && (
                        <div className="text-center text-gray-500 dark:text-gray-400">
                            No messages yet. Start the conversation!
                        </div>
                    )}
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            className={`flex ${message.from === 'user' ? 'justify-start' : 'justify-end'} mb-4`}
                            initial={{ opacity: 0, x: message.from === 'user' ? -50 : 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {message.from === 'user' && (
                                <div className="flex items-start space-x-3">
                                    <img
                                        src={message.image || 'https://via.placeholder.com/40'}
                                        alt={message.name || 'User'}
                                        className="w-12 h-12 rounded-full border border-gray-300 shadow-md dark:border-gray-700"
                                    />
                                    <div className="flex flex-col max-w-xs">
                                        <p className="font-semibold text-gray-800 text-base dark:text-gray-200">
                                            {message.name || 'User'}
                                        </p>
                                        <div className="p-3 rounded-lg shadow-lg bg-blue-200 text-blue-800 dark:bg-blue-600 dark:text-blue-100">
                                            <div className="text-sm whitespace-pre-wrap">
                                                {message.text || 'Sample question: What is the weather today?'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {message.from === 'ai' && (
                                <div className="flex items-center max-w-xs">
                                    <div className="p-3 rounded-lg shadow-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 flex items-center space-x-2">
                                        <AiOutlineRobot className="text-base text-gray-700 dark:text-gray-400" />
                                        <div className="text-sm whitespace-pre-wrap">
                                            <Typewriter
                                                onInit={(typewriter) => {
                                                    typewriter
                                                        .typeString(message.text || 'Sample answer: The weather is sunny with a high of 75°F.')
                                                        .start();
                                                }}
                                                options={{
                                                    autoStart: true,
                                                    loop: false,
                                                    delay: 10, // Adjust typing speed if needed
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Input Form */}
                <form
                    onSubmit={generateAnswer}
                    className="flex items-center p-4 bg-white border-t border-gray-300 shadow-md dark:bg-gray-800 dark:border-gray-700 rounded-b-lg"
                >
                    <input
                        type="text"
                        placeholder="Ask your question..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:focus:ring-blue-600 w-2/3"
                    />
                    <button
                        type="submit"
                        aria-label="Send message"
                        className={`relative flex items-center px-4 py-2 ml-2 rounded-r-lg shadow-md transition-transform duration-300
                        ${generatingAnswer ? 'cursor-wait bg-blue-400' : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'}
                        dark:bg-gradient-to-r dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800`}
                        disabled={generatingAnswer}
                    >
                        <span className="relative flex items-center justify-center">
                            <span className={`absolute inset-0 rounded-full bg-blue-300 blur-lg opacity-50 transition-all duration-300 ${generatingAnswer ? 'scale-110' : 'scale-100'} dark:bg-blue-700`} />
                            <AiOutlineSend className="text-white mr-2 text-lg relative z-10" />
                        </span>
                        <span className={`text-white font-medium ml-2 relative z-10 ${generatingAnswer ? 'animate-pulse' : ''}`}>
                            {generatingAnswer ? 'Sending...' : 'Send'}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    )}
</div>


        </>
    );
}

export default Chat;
