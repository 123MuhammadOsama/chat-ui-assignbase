/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';

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
    <div className="flex flex-col h-screen  mx-96">
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

      
      <div className='border-gray-300 rounded-xl border-2 h-2/3'>
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
        <button className="text-blue-600 mr-4 text-2xl">+</button>
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          className="bg-blue-600 text-white rounded-lg px-4 py-2"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
      </div>
    </div>
  );
};

export default ChatApp;
