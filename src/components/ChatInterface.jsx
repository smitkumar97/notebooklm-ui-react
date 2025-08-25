import { useEffect, useState } from 'react'
import { askQuestion, getChatHistory } from '../services/pdf.service';

const ChatInterface = ({ suggestedQuestions, docId, setPageNumber }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAiTyping, setIsAiTyping] = useState(false);

    useEffect(() => {
        setMessages([]);
        const fetchChatHistory = async () => {
            try {
                const history = await getChatHistory(docId);

                history?.data?.forEach((message => {
                    const userMessage = {
                        id: message?._id,
                        text: message?.question,
                        sender: 'user',
                        timestamp: new Date(message?.createdAt).toLocaleTimeString(),
                    };

                    const aiMessage = {
                        id: message?._id,
                        text: message?.answer || "I couldn't generate a response",
                        sender: 'ai',
                        page: message?.pages,
                        timestamp: new Date(message?.createdAt).toLocaleTimeString(),
                    };

                    setMessages(prev => [...prev, userMessage, aiMessage]);
                }))

            } catch (error) {
                setMessages([]);
                console.error(error);
            }
        };
        fetchChatHistory();
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const question = inputValue.trim();
        if (!question || isLoading) return;

        setInputValue('');
        await getAnswer(question);
    };

    async function getAnswer(question) {
        setIsLoading(true);

        const userMessage = {
            text: question,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString(),
        };
        setMessages(prev => [...prev, userMessage]);

        setIsAiTyping(true);

        try {
            const response = await askQuestion(docId, question);
            const aiMessage = {
                id: docId,
                text: response?.data?.message || "I couldn't generate a response",
                sender: 'ai',
                page: response?.data?.page,
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error(error);
            const errorMessage = {
                text: "Sorry, I encountered an error processing your question",
                sender: 'system',
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
            setIsAiTyping(false);
        }
    }

    return (
        <div className="w-1/2 flex flex-col">
            {/* <div className="p-2 text-center border-b border-gray-700 bg-gray-800">
                <h6 className="font-medium">Chat with Ai </h6>
            </div> */}

            {/* Messages Container */}
            <div className="flex-1 overflow-auto p-4 space-y-4 bg-gray-900">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col text-gray-500">
                        {/* Suggested Questions */}
                        {suggestedQuestions.length > 0 && (
                            <div className="w-full max-w-md space-y-2 mb-8">
                                <p className="text-sm text-gray-400 mb-2">Suggested questions:</p>
                                {suggestedQuestions.map((q) => (
                                    <div
                                        key={q._id + 1}
                                        className="flex justify-start cursor-pointer hover:bg-gray-800 p-1 rounded-xl"
                                        onClick={() => getAnswer(q.question)}
                                    >
                                        <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-gray-700 rounded-tl-none">
                                            <p>{q.question}</p>
                                            {/* {q.createdAt && (
                                                <p className="text-xs mt-1 opacity-70 text-right">
                                                    {new Date(q.createdAt).toLocaleString()}
                                                </p>
                                            )} */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Default empty state */}
                        <div className="h-full flex flex-col items-center justify-center mb-52 text-gray-500">
                            <div className="text-center">
                                <svg
                                    className="w-16 h-16 mx-auto mb-4 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1}
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    />
                                </svg>
                                <p>Ask questions about your document</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'user'
                                    ? 'bg-blue-600 rounded-tr-none'
                                    : 'bg-gray-700 rounded-tl-none'
                                    }`}
                            >
                                <p>{message.text}</p>
                                <p className="text-xs mt-1 opacity-70 text-right">
                                    {message.timestamp}
                                </p>
                                {message.sender === 'ai' &&

                                    message.page.map(page => (
                                        <button className='btn-primary m-1' onClick={() => setPageNumber(Number(page))}>Page: {page}</button>
                                    ))}
                            </div>
                        </div>
                    ))
                )}
            </div>


            {isAiTyping && (
                <div className="flex justify-start p-6">
                    <div className="max-w-xs lg:max-w-md py-2 rounded-lg bg-gray-700 rounded-tl-none">
                        <div className="flex space-x-2">
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-700 bg-gray-800">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask something about the document..."
                        className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isLoading}
                        className={`px-4 py-2 rounded-lg font-medium ${inputValue.trim() && !isLoading
                            ? 'bg-blue-600 hover:bg-blue-700'
                            : 'bg-gray-700 cursor-not-allowed'
                            }`}
                    >
                        {isLoading ? (
                            <div className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Answering...
                            </div>
                        ) : 'Send'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChatInterface;