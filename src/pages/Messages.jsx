import React, { useState } from 'react';
import { FiSearch, FiSend } from 'react-icons/fi';
import Card from '../components/common/Card';
const conversations = [
    { id: 1, name: 'John Doe', lastMessage: 'Hey, I have a question about lesson 5...', unread: 2, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Jane Smith', lastMessage: 'Thank you! That helped a lot.', unread: 0, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, name: 'Alice Johnson', lastMessage: 'Can you check my assignment?', unread: 0, avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
];
const messages = {
    1: [
        { sender: 'John Doe', text: 'Hey, I have a question about lesson 5...', time: '10:30 AM' },
        { sender: 'You', text: 'Sure, what is it?', time: '10:31 AM' },
    ],
    2: [
        { sender: 'Jane Smith', text: 'Thank you! That helped a lot.', time: 'Yesterday' }
    ]
};
const Messages = () => {
    const [selectedConversation, setSelectedConversation] = useState(conversations[0])
    return (
        <div className="flex h-[calc(100vh-8rem)]">
            {/* Conversation List */}
            <Card className="w-1/3 min-w-[300px] flex flex-col !p-0">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold">Messages</h2>
                    <div className="relative mt-2">
                        <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-light-subtext" />
                        <input type="text" placeholder="Search" className="w-full pl-10 pr-4 py-2 rounded-lg bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600" />
                    </div>
                </div>
                <ul className="overflow-y-auto">
                    {conversations.map(convo => (
                        <li key={convo.id} onClick={() => setSelectedConversation(convo)} className={`flex items-center p-4 cursor-pointer border-l-4 ${selectedConversation.id === convo.id ? 'border-primary bg-primary/10' : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-700/50'}`}>
                            <img src={convo.avatar} className="w-12 h-12 rounded-full mr-4" />
                            <div className="flex-1">
                                <p className="font-semibold">{convo.name}</p>
                                <p className="text-sm text-light-subtext dark:text-dark-subtext truncate">{convo.lastMessage}</p>
                            </div>
                            {convo.unread > 0 && <span className="bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">{convo.unread}</span>}
                        </li>
                    ))}
                </ul>
            </Card>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-light-card dark:bg-dark-card ml-4 rounded-xl shadow-card">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                    <img src={selectedConversation.avatar} className="w-10 h-10 rounded-full mr-3" />
                    <h3 className="font-semibold text-lg">{selectedConversation.name}</h3>
                </div>
                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                    {messages[selectedConversation.id]?.map((msg, i) => (
                        <div key={i} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`p-3 rounded-lg max-w-md ${msg.sender === 'You' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                <p>{msg.text}</p>
                                <p className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-blue-200' : 'text-light-subtext dark:text-dark-subtext'}`}>{msg.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <input type="text" placeholder="Type a message..." className="w-full p-3 pr-12 rounded-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-full">
                            <FiSend />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;