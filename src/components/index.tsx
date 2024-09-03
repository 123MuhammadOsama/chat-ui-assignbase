'use client';

import { useState } from 'react';
import { FaPaperclip, FaPaperPlane } from 'react-icons/fa';
import { FiSmile } from 'react-icons/fi';
import dynamic from 'next/dynamic';

// Import Emoji Picker dynamically since it's a client-side only library
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

type Message = {
  id: number;
  text: string | null;
  sender: string;
  file?: string | null;
};

const ChatApp = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', sender: 'salesmember' },
    { id: 2, text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', sender: 'user' },
    { id: 3, text: '😂😂😂', sender: 'user' },
  ]);

  const [inputValue, setInputValue] = useState<string>('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

  const handleEmojiClick = (emojiData: any) => {
    setInputValue((prevInput) => prevInput + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const sendMessage = () => {
    if (inputValue.trim() || attachedFile) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputValue || null,
        sender: 'user',
        file: attachedFile ? URL.createObjectURL(attachedFile) : null,
      };

      setMessages([...messages, newMessage]);
      setInputValue('');
      setAttachedFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachedFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col h-screen mx-auto max-w-full md:max-w-4xl px-4 sm:px-6 md:px-8">
      {/* Chat Header */}
      <div className="bg-white p-4 flex items-center shadow-md mb-2 md:mb-4">
        <img
          src="https://cdn.esquimaltmfrc.com/wp-content/uploads/2015/09/flat-faces-icons-circle-man-9.png"
          alt="profile"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div className="flex flex-col">
          <span className="text-sm text-black">@salesmembernickname</span>
          <span className="font-semibold text-black">Accounting and Finance</span>
        </div>
        <div className="ml-4 mt-5 text-sm text-red-500">Deadline: 30-Aug-2024</div>
      </div>

      {/* Message Container */}
      <div className="flex flex-col flex-grow h-full border-gray-300 rounded-xl border-2 overflow-hidden mb-6">
        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex w-full ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div className="flex items-end max-w-[80%]">
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
                      ? 'bg-blue-100 self-end border-blue-500 border-2'
                      : 'bg-orange-100 self-start border-orange-300 border-2'
                  } max-w-full break-words`}
                >
                  {message.text}
                  {message.file && (
                    <div className="mt-2">
                      <a
                        href={message.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 underline"
                      >
                        View Attached File
                      </a>
                    </div>
                  )}
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
        <div className="p-4 bg-white shadow-md flex flex-col items-center">
          {showEmojiPicker && (
            <div className="absolute bottom-20 md:bottom-24">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
          <div className="relative flex items-center w-full border border-gray-300 rounded-lg p-2 pr-4">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border-none focus:outline-none"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />

            {/* Hidden File Input */}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Emoji Icon */}
            <button
              className="text-blue-700 rounded-lg px-2"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <FiSmile size={24} />
            </button>

            {/* Paperclip Icon */}
            <button
              className="text-blue-700 rounded-lg px-2"
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              <FaPaperclip />
            </button>

            {/* PaperPlane Icon */}
            <button
              className="text-blue-700 rounded-lg px-2"
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
