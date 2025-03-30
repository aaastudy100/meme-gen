import React, { useState, useEffect } from 'react';

function Meme() {
  const [memes, setMemes] = useState([]);
  const [meme, setMeme] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => setMemes(data.data.memes));
  }, []);

  const generateMeme = () => {
    const randomIndex = Math.floor(Math.random() * memes.length);
    setMeme(memes[randomIndex]);
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Top text"
          className="w-full mb-2 p-2 border rounded"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="w-full mb-2 p-2 border rounded"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        />
        <button
          onClick={generateMeme}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Generate Meme
        </button>
      </div>

      {meme && (
        <div className="relative text-center">
          <img src={meme.url} alt={meme.name} className="w-full rounded" />
          <h2 className="absolute top-2 left-1/2 transform -translate-x-1/2 text-white font-bold text-xl drop-shadow-md">
            {topText}
          </h2>
          <h2 className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-bold text-xl drop-shadow-md">
            {bottomText}
          </h2>
        </div>
      )}
    </div>
  );
}

export default Meme;
