import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import './App.css';

// Ensure the backend URL is correct
const socket = io('http://host.docker.internal:5001', {
  transports: ['websocket'],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

function App() {
  const [content, setContent] = useState('');

  useEffect(() => {
    console.log('Connecting to Socket.IO...');

    // Confirm connection
    socket.on('connect', () => {
      console.log(`Connected to server with ID: ${socket.id}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.warn('Disconnected from server');
    });

    // Log connection errors
    socket.on('connect_error', (err) => {
      console.error('Connection Error:', err.message);
    });

    // Listen for document updates
    socket.on('update-document', (data) => {
      console.log('Update received:', data);
      setContent(data);
    });

    return () => {
      socket.off('update-document');
      socket.disconnect();
    };
  }, []);

  const handleChange = (e) => {
    const text = e.target.value;
    setContent(text);
    console.log('Sending update:', text);
    socket.emit('document-edit', text);
  };

  return (
    <div className="App">
      <h1 className="text-4xl font-bold text-blue-500">Real-Time Collaborative Editor</h1>
      <textarea
        value={content}
        onChange={handleChange}
        placeholder="Start typing here..."
        rows="10"
        cols="50"
        className="border-2 border-gray-300 p-2 mt-4 w-full"
      />
    </div>
  );
}

export default App;
