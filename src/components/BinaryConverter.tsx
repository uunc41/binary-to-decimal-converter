import { useState, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';
import InputField from './InputField';
import Header from './Header';
import Footer from './Footer';

const BinaryConverter = () => {
  const [decimal, setDecimal] = useState<string>('');
  const [binary, setBinary] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [copiedDecimal, setCopiedDecimal] = useState<boolean>(false);
  const [copiedBinary, setCopiedBinary] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [swapped, setSwapped] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false); // NEW

  useEffect(() => {
    setMounted(true); // Ensure client-side render to avoid flash
  }, []);

  const handleBinaryChange = (value: string) => {
    const filtered = value.replace(/[^01]/g, '');
    setBinary(filtered);
    setError('');
    if (filtered === '') {
      setDecimal('');
      setSwapped(false);
      return;
    }
    setDecimal(parseInt(filtered, 2).toString());
  };

  const handleDecimalChange = (value: string) => {
    const filtered = value.replace(/[^0-9]/g, '');
    setDecimal(filtered);
    setError('');
    if (filtered === '') {
      setBinary('');
      setSwapped(false);
      return;
    }
    setBinary(parseInt(filtered).toString(2));
  };

  const copyToClipboard = async (text: string, type: 'decimal' | 'binary') => {
    try {
      await navigator.clipboard.writeText(text);
      type === 'decimal'
        ? setCopiedDecimal(true)
        : setCopiedBinary(true);
      setTimeout(() => {
        type === 'decimal'
          ? setCopiedDecimal(false)
          : setCopiedBinary(false);
      }, 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const swapValues = () => {
    setDecimal(binary);
    setBinary(decimal);
    setSwapped(prev => !prev);
  };

  if (!mounted) return null; // Prevent flash

  return (
    <div className={`min-h-[100dvh] flex flex-col transition-colors duration-700 ${
      isDark ? 'bg-slate-950' : 'bg-gradient-to-br from-blue-200 via-white to-blue-200'
    }`}>
      <Header
        isDark={isDark}
        setIsDark={setIsDark}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
      />

      {showInfo && (
        <div className={`relative z-10 transition-colors duration-300 border-b ${
          isDark
            ? 'bg-slate-800/90 backdrop-blur-xl border-slate-700'
            : 'bg-blue-50/90 backdrop-blur-xl border-blue-200'
        }`}>
          <div className="max-w-4xl mx-auto px-6 py-4">
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong>How it works:</strong> Binary is a number system that uses only the digits 0 and 1. 
              Each digit represents a power of 2, which is why computers use it internally. 
              To convert binary to decimal, each bit is multiplied by its corresponding power of 2 and the results are added together. 
              To convert decimal to binary, the number is rewritten in base-2, which JavaScript handles automatically using built-in functions. 
              This tool takes your input in either format, checks it for validity, and instantly converts it to the other number system.
            </p>
          </div>
        </div>
      )}

      <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <h2 className={`text-5xl md:text-6xl font-bold mb-4 transition-colors duration-700 ${
              isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400' 
                      : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600'
            }`}>
              Convert Instantly
            </h2>
            <p className={`text-lg mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Convert between binary and decimal quickly and easily
            </p>
          </div>

          <div className={`rounded-3xl p-8 md:p-10 shadow-2xl border transition-colors duration-700 ${
            isDark
              ? 'bg-slate-900/60 backdrop-blur-xl border-slate-800 shadow-black/50'
              : 'bg-white/60 backdrop-blur-xl border-white/50 shadow-gray-400/20'
          }`}>
            <InputField
              label={swapped ? 'Binary Number' : 'Decimal Number'}
              value={decimal}
              onChange={handleDecimalChange}
              placeholder={swapped ? 'Enter binary... (1000011)' : 'Enter decimal... (67)'}
              isDark={isDark}
              copied={copiedDecimal}
              copyToClipboard={() => copyToClipboard(decimal, 'decimal')}
            />

            <div className="flex justify-center my-6">
              <button
                onClick={swapValues}
                className={`rounded-2xl p-4 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                  isDark
                    ? 'bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50'
                    : 'bg-gray-800 shadow-lg shadow-blue-400/30 hover:shadow-blue-400/50'
                }`}
              >
                <ArrowUpDown className="w-6 h-6 text-white" />
              </button>
            </div>

            <InputField
              label={swapped ? 'Decimal Number' : 'Binary Number'}
              value={binary}
              onChange={handleBinaryChange}
              placeholder={swapped ? 'Enter decimal... (67)' : 'Enter binary... (1000011)'}
              isDark={isDark}
              copied={copiedBinary}
              copyToClipboard={() => copyToClipboard(binary, 'binary')}
            />

            {error && (
              <div className={`mt-5 rounded-2xl p-4 border transition-colors duration-300 ${
                isDark ? 'bg-red-950/30 border-red-900/50' : 'bg-red-50 border-red-200'
              }`}>
                <p className={`text-sm font-medium ${isDark ? 'text-red-400' : 'text-red-600'}`}>
                  {error}
                </p>
              </div>
            )}

            {binary && !error && decimal && (
              <div className={`mt-5 rounded-2xl p-5 border transition-colors duration-300 ${
                isDark
                  ? 'bg-gradient-to-r from-purple-950/30 to-indigo-950/30 border-purple-900/50'
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
              }`}>
                <p className={`text-sm font-medium mb-2 ${isDark ? 'text-purple-300' : 'text-blue-900'}`}>
                  Conversion Result
                </p>
                <p className={`text-base ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>
                  <span className="font-bold text-lg">{decimal}</span> (decimal) = <span className="font-mono font-bold text-lg">{binary}</span> (binary)
                </p>
                <p className={`text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                  {binary.length} bits • Value range: 0 to {Math.pow(2, binary.length) - 1}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer isDark={isDark} />
    </div>
  );
};

export default BinaryConverter;
