import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5001'); // Ensure the port matches

function Editor() {
  const [content, setContent] = useState('');

  useEffect(() => {
    // Listening for updates from other clients
    socket.on('update-document', (data) => {
      setContent(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    const text = e.target.value;
    setContent(text);
    socket.emit('document-edit', text); // Send data to backend
  };

  return (
    <textarea
      value={content}
      onChange={handleChange}
      placeholder="Start typing here..."
      rows="10"
      cols="50"
    />
  );
}

export default Editor;
