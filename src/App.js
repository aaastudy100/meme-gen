import React from 'react';
import Meme from './components/Meme';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Meme Generator</h1>
      <Meme />
    </div>
  );
}

export default App;