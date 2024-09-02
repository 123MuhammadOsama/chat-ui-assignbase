/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import { FiSmile } from 'react-icons/fi';

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', sender: 'salesmember' },
    { id: 2, text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', sender: 'user' },
    { id: 3, text: '😂😂😂', sender: 'user' },
  ]);

  const [inputValue, setInputValue] = useState<string>('');

  const sendMessage = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: inputValue, sender: 'user' }]);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-screen mx-96">
      {/* Chat Header */}
      <div className="bg-white p-4 flex items-center shadow-md">
        <img
          src="https://cdn.esquimaltmfrc.com/wp-content/uploads/2015/09/flat-faces-icons-circle-man-9.png" 
          alt="profile"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="flex flex-col">
          <span className="text-sm text-black">@salesmembernickname</span>
          <span className="font-semibold text-black">Accounting and Finance</span>
        </div>
        <div className="mt-6 ml-6 text-sm text-red-500">Deadline: 30-Aug-2024</div>
      </div>

      {/* Container for Messages and Input */}
      <div className="flex flex-col flex-grow h-4/5 mb-6 border-gray-300 rounded-xl border-2">
        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div className="flex items-end max-w-xs">
                {/* Conditional rendering for the sales member image */}
                {message.sender === 'salesmember' && (
                  <img
                    src="https://cdn.esquimaltmfrc.com/wp-content/uploads/2015/09/flat-faces-icons-circle-man-9.png" 
                    alt="salesmember"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                )}
                
                <div
                  className={`p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'border-blue-500 border-2 text-black'
                      : 'border-orange-300 border-2 text-black'
                  }`}
                >
                  {message.text}
                </div>
                
                {message.sender === 'user' && (
                  <img
                    src="/imgU.png" 
                    alt="user"
                    className="w-8 h-8 rounded-full ml-2"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white shadow-md flex items-center">
          <div className="relative flex-1">


            <input
              type="text"
              placeholder="Type your message..."
              className="w-full border border-gray-300 rounded-lg p-2 pr-12"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />

            {/* Emoji Icon */}
            <button className="absolute right-14 top-1/2 transform -translate-y-1/2 text-blue-500 rounded-lg px-4 py-1">
              <FiSmile size={24} /> {/* Using an emoji smile icon */}
            </button>

             {/* Paperclip Icon */}
             <button className="absolute right-8 top-1/2 transform -translate-y-1/2 text-blue-500 rounded-lg px-4 py-1">
              <FaPaperclip /> {/* Paperclip icon */}
            </button>
            
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 rounded-lg px-4 py-1"
              onClick={sendMessage}
            >

              
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
