import React, { useState, useEffect } from 'react';
import { FiSearch, FiSend } from 'react-icons/fi';
import Card from '../components/common/Card';

const conversations = [
    { id: 1, name: 'John Doe', lastMessage: 'Hey, I have a question about lesson 5...', unread: 2, avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: 2, name: 'Jane Smith', lastMessage: 'Thank you! That helped a lot.', unread: 0, avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: 3, name: 'Alice Johnson', lastMessage: 'Can you check my assignment?', unread: 0, avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
];

const initialMessages = {
    1: [
        { id: 1, sender: 'John Doe', text: 'Hey, I have a question about lesson 5...', time: '10:30 AM', read: false },
        { id: 2, sender: 'You', text: 'Sure, what is it?', time: '10:31 AM', read: true },
    ],
    2: [
        { id: 1, sender: 'Jane Smith', text: 'Thank you! That helped a lot.', time: 'Yesterday', read: true }
    ],
    3: [
        { id: 1, sender: 'Alice Johnson', text: 'Can you check my assignment?', time: '2 hours ago', read: true }
    ]
};

const Messages = () => {
    const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [conversationList, setConversationList] = useState(conversations);
    const [searchTerm, setSearchTerm] = useState('');

    // Mark messages as read when conversation is selected
    useEffect(() => {
        if (selectedConversation && messages[selectedConversation.id]) {
            const updatedMessages = { ...messages };
            updatedMessages[selectedConversation.id] = updatedMessages[selectedConversation.id].map(msg => ({
                ...msg,
                read: true
            }));
            setMessages(updatedMessages);

            // Update conversation list to remove unread count
            setConversationList(prev => prev.map(conv => 
                conv.id === selectedConversation.id 
                    ? { ...conv, unread: 0 }
                    : conv
            ));
        }
    }, [selectedConversation]);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const messageId = Date.now();
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const newMsg = {
            id: messageId,
            sender: 'You',
            text: newMessage.trim(),
            time: currentTime,
            read: true
        };

        setMessages(prev => ({
            ...prev,
            [selectedConversation.id]: [...(prev[selectedConversation.id] || []), newMsg]
        }));

        // Update conversation list with new last message
        setConversationList(prev => prev.map(conv => 
            conv.id === selectedConversation.id 
                ? { ...conv, lastMessage: newMessage.trim() }
                : conv
        ));

        setNewMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const filteredConversations = conversationList.filter(conv =>
        conv.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-8rem)] gap-4 md:gap-0">
            {/* Conversation List */}
            <Card className="w-full md:w-1/3 md:min-w-[300px] flex flex-col !p-0">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-bold">Messages</h2>
                    <div className="relative mt-2">
                        <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-light-subtext" />
                        <input 
                            type="text" 
                            placeholder="Search conversations..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" 
                        />
                    </div>
                </div>
                <ul className="overflow-y-auto flex-1">
                    {filteredConversations.map(convo => (
                        <li 
                            key={convo.id} 
                            onClick={() => setSelectedConversation(convo)} 
                            className={`flex items-center p-4 cursor-pointer border-l-4 transition-colors ${
                                selectedConversation.id === convo.id 
                                    ? 'border-primary bg-primary/10' 
                                    : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-700/50'
                            }`}
                        >
                            <img src={convo.avatar} className="w-12 h-12 rounded-full mr-4" alt={convo.name} />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold truncate">{convo.name}</p>
                                    {convo.unread > 0 && (
                                        <span className="bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-2 flex-shrink-0">
                                            {convo.unread}
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-light-subtext dark:text-dark-subtext truncate">
                                    {convo.lastMessage}
                                </p>
                            </div>
                        </li>
                    ))}
                    {filteredConversations.length === 0 && (
                        <li className="p-4 text-center text-light-subtext dark:text-dark-subtext">
                            No conversations found
                        </li>
                    )}
                </ul>
            </Card>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col bg-light-card dark:bg-dark-card rounded-xl shadow-card mt-4 md:mt-0 md:ml-4">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                    <img src={selectedConversation.avatar} className="w-10 h-10 rounded-full mr-3" alt={selectedConversation.name} />
                    <div>
                        <h3 className="font-semibold text-lg">{selectedConversation.name}</h3>
                        <p className="text-sm text-light-subtext dark:text-dark-subtext">
                            {selectedConversation.unread > 0 ? `${selectedConversation.unread} unread messages` : 'Online'}
                        </p>
                    </div>
                </div>
                
                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                    {messages[selectedConversation.id]?.length > 0 ? (
                        messages[selectedConversation.id].map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3 rounded-lg max-w-md ${msg.sender === 'You' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}>
                                    <p className="break-words">{msg.text}</p>
                                    <div className={`flex items-center justify-between mt-1 ${msg.sender === 'You' ? 'text-blue-200' : 'text-light-subtext dark:text-dark-subtext'}`}>
                                        <p className="text-xs">{msg.time}</p>
                                        {msg.sender === 'You' && (
                                            <span className="text-xs ml-2">
                                                {msg.read ? '✓✓' : '✓'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-light-subtext dark:text-dark-subtext py-8">
                            No messages yet. Start the conversation!
                        </div>
                    )}
                </div>
                
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Type a message..." 
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            className="w-full p-3 pr-12 rounded-full bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" 
                        />
                        <button 
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                        >
                            <FiSend />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;