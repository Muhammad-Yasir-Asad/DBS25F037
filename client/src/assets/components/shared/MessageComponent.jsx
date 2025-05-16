import React from 'react';
import { Send, Paperclip } from 'lucide-react';

const MessageComponent = ({
  messages,
  newMessage,
  selectedFile,
  onMessageChange,
  onFileChange,
  onSend
}) => {
  return (
    <div className="flex flex-col flex-grow h-full">
      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg text-sm max-w-[80%] ${
              msg.senderId === localStorage.getItem('userId')
                ? 'bg-green-100 self-end'
                : 'bg-gray-100 self-start'
            }`}
          >
            <p>{msg.text}</p>
            {msg.attachmentUrl && (
              <a
                href={msg.attachmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-1 block text-xs"
              >
                View Attachment
              </a>
            )}
          </div>
        ))}
      </div>

      <div className="p-2 border-t flex items-center gap-2">
        <label className="cursor-pointer">
          <Paperclip />
          <input type="file" hidden onChange={onFileChange} />
        </label>
        <input
          type="text"
          className="flex-grow border rounded px-3 py-2 text-sm"
          placeholder="Type your message..."
          value={newMessage}
          onChange={onMessageChange}
        />
        <button
          onClick={onSend}
          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default MessageComponent;
