import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

function Meme() {
  const [memes, setMemes] = useState([]);
  const [meme, setMeme] = useState(null);
  const [topText, setTopText] = useState('Hello');
  const [bottomText, setBottomText] = useState('World');
  const [showToast, setShowToast] = useState(false);
  const memeRef = useRef();

  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
      .then(res => res.json())
      .then(data => setMemes(data.data.memes));
  }, []);

  const generateMeme = () => {
    const randomIndex = Math.floor(Math.random() * memes.length);
    setMeme(memes[randomIndex]);
  };

  const downloadMeme = async () => {
    const canvas = await html2canvas(memeRef.current);
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL();
    link.click();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const shareMeme = async () => {
    const canvas = await html2canvas(memeRef.current);
    canvas.toBlob((blob) => {
      const file = new File([blob], 'meme.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({
          files: [file],
          title: 'Check out this meme!',
          text: 'I made this meme, it\'s hilarious 😂',
        });
      } else {
        alert('Sharing not supported on this device/browser. Try downloading instead.');
      }
    });
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
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-2"
        >
          Generate Meme
        </button>
        <button
          onClick={downloadMeme}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-2"
        >
          Download Meme
        </button>
        <button
          onClick={shareMeme}
          className="w-full bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
        >
          Share Meme
        </button>
        {showToast && (
          <div className="mt-4 text-center bg-green-100 border border-green-300 text-green-800 py-2 px-4 rounded">
            🎉 Meme Saved!
          </div>
        )}
      </div>

      {meme && (
        <div ref={memeRef} className="relative text-center">
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
