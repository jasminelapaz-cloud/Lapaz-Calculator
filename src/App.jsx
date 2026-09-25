import React, { useState, useEffect } from 'react';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (val) => {
    setInput((prev) => prev + val);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleCalculate = () => {
    try {
      if (!input.trim()) return;
      if (input.includes('/0')) {
        setResult('Error: Div by 0');
        return;
      }
      const formattedInput = input.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
      const evalResult = Function(`'use strict'; return (${formattedInput})`)();
      setResult(String(evalResult));
    } catch (err) {
      setResult('Invalid Format');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key >= '0' && e.key <= '9') || e.key === '.') handleButtonClick(e.key);
      else if (e.key === '+') handleButtonClick('+');
      else if (e.key === '-') handleButtonClick('−');
      else if (e.key === '*') handleButtonClick('×');
      else if (e.key === '/') handleButtonClick('÷');
      else if (e.key === 'Enter' || e.key === '=') handleCalculate();
      else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') handleClear();
      else if (e.key === 'Backspace') setInput((prev) => prev.slice(0, -1));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  const buttons = [
    { label: 'C', action: handleClear, className: 'bg-rose-500 hover:bg-rose-600 text-white col-span-2 font-bold shadow-md' },
    { label: '÷', action: () => handleButtonClick('÷'), className: 'bg-purple-300 hover:bg-purple-400 text-purple-950 font-bold shadow-md' },
    { label: '×', action: () => handleButtonClick('×'), className: 'bg-purple-300 hover:bg-purple-400 text-purple-950 font-bold shadow-md' },
    { label: '7', action: () => handleButtonClick('7') },
    { label: '8', action: () => handleButtonClick('8') },
    { label: '9', action: () => handleButtonClick('9') },
    { label: '−', action: () => handleButtonClick('−'), className: 'bg-purple-300 hover:bg-purple-400 text-purple-950 font-bold shadow-md' },
    { label: '4', action: () => handleButtonClick('4') },
    { label: '5', action: () => handleButtonClick('5') },
    { label: '6', action: () => handleButtonClick('6') },
    { label: '+', action: () => handleButtonClick('+'), className: 'bg-purple-300 hover:bg-purple-400 text-purple-950 font-bold shadow-md' },
    { label: '1', action: () => handleButtonClick('1') },
    { label: '2', action: () => handleButtonClick('2') },
    { label: '3', action: () => handleButtonClick('3') },
    { label: '=', action: handleCalculate, className: 'bg-pink-500 hover:bg-pink-600 text-white font-bold row-span-2 shadow-md' },
    { label: '0', action: () => handleButtonClick('0'), className: 'col-span-2' },
    { label: '.', action: () => handleButtonClick('.') }
  ];

  return (
    <div className="min-h-screen bg-pink-950 text-pink-100 flex flex-col justify-between p-4 md:p-8 font-sans">
      <header className="text-center my-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-pink-200 drop-shadow-md">DCIT 26: Calculator App</h1>
        <p className="text-pink-300 text-sm mt-1">Laboratory 1 — React & Tailwind CSS</p>
      </header>

      <main className="flex flex-col md:flex-row gap-8 items-center md:items-start max-w-4xl w-full justify-center mx-auto">
        {/* Calculator Interface */}
        <section className="bg-pink-200/90 p-6 rounded-3xl shadow-2xl border border-pink-300/80 w-full max-w-sm backdrop-blur-md">
          <div className="bg-purple-950 p-4 rounded-2xl mb-6 text-right border border-purple-800/60 min-h-[90px] flex flex-col justify-between overflow-hidden shadow-inner">
            <div className="text-pink-300 text-sm font-mono break-all min-h-[20px]">
              {input || '0'}
            </div>
            <div className="text-3xl font-bold font-mono text-fuchsia-300 break-all">
              {result || (input ? '' : '0')}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3">
            {buttons.map((btn, index) => (
              <button
                key={index}
                onClick={btn.action}
                className={`p-4 text-xl rounded-2xl transition-all duration-150 active:scale-95 shadow-md ${
                  btn.className || 'bg-white hover:bg-purple-100 text-purple-950 font-semibold'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </section>

        {/* Instructions / User Guide */}
        <section className="bg-purple-100/90 p-6 rounded-3xl shadow-2xl border border-purple-200/80 max-w-sm w-full backdrop-blur-md">
          <h2 className="text-xl font-bold text-purple-950 mb-3 border-b border-purple-300 pb-2">User Guide & Instructions</h2>
          <div className="space-y-3 text-purple-950 text-sm">
            <p>Welcome to the React Calculator! Use the on-screen buttons or your physical keyboard.</p>
            <h3 className="font-semibold text-purple-900 mt-2">Supported Operations:</h3>
            <ul className="list-disc list-inside space-y-1 text-purple-900">
              <li><strong className="text-purple-950">Addition (+):</strong> Sum numbers.</li>
              <li><strong className="text-purple-950">Subtraction (−):</strong> Subtract numbers.</li>
              <li><strong className="text-purple-950">Multiplication (×):</strong> Multiply numbers.</li>
              <li><strong className="text-purple-950">Division (÷):</strong> Divide numbers.</li>
            </ul>
            <h3 className="font-semibold text-purple-900 mt-2">Interactive Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-purple-900">
              <li><strong className="text-purple-950">Clear (C):</strong> Resets display.</li>
              <li><strong className="text-purple-950">Equals (=):</strong> Computes result.</li>
              <li><strong className="text-purple-950">Error Handling:</strong> Warns when dividing by 0.</li>
              <li><strong className="text-purple-950">Keyboard Controls:</strong> Use physical keys to type and calculate.</li>
            </ul>
          </div>
        </section>
      </main>

      {/* Custom Bottom Footer */}
      <footer className="w-full flex justify-between items-center text-sm mt-8 px-4 md:px-8 border-t border-pink-900/60 pt-4">
        <span className="font-bold text-pink-300">BSIT 3-3</span>
        <span className="font-bold text-pink-300">Jasmine S. Lapaz</span>
      </footer>
    </div>
  );
}