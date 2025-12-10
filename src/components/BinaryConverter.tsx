import { useState, useEffect } from 'react';
import { ArrowUpDown, Copy, Check, Info } from 'lucide-react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isDark: boolean;
  copied: boolean;
  copyToClipboard: () => void;
}

const InputField = ({ label, value, onChange, placeholder, isDark, copied, copyToClipboard }: InputFieldProps) => (
  <div className="mb-6">
    <label className={`block text-sm font-semibold mb-3 transition-colors duration-300 ${
      isDark ? 'text-gray-300' : 'text-gray-700'
    }`}>
      {label}
    </label>
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-5 py-4 rounded-2xl text-lg font-mono transition-all duration-300 focus:outline-none focus:ring-2 ${
          isDark
            ? 'bg-slate-800 text-white border-2 border-slate-700 focus:ring-purple-500 focus:border-purple-500 placeholder-gray-500'
            : 'bg-white text-gray-900 border-2 border-gray-200 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400'
        }`}
      />
      {value && (
        <button
          onClick={copyToClipboard}
          className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-200 ${
            isDark
              ? 'bg-slate-700 hover:bg-slate-600 text-gray-300'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
        >
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
        </button>
      )}
    </div>
  </div>
);

const Header = ({ isDark, setIsDark, showInfo, setShowInfo }: any) => (
  <header className={`sticky top-0 z-50 transition-colors duration-300 border-b backdrop-blur-xl ${
    isDark
      ? 'bg-slate-900/80 border-slate-800'
      : 'bg-white/80 border-gray-200'
  }`}>
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <h1 className={`text-2xl font-bold transition-colors duration-300 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        Binary Converter
      </h1>
      <div className="flex gap-3">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className={`p-2 rounded-xl transition-all duration-200 ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-gray-300'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
        >
          <Info className="w-5 h-5" />
        </button>
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-1 rounded-xl transition-all px-3 text-2xl font-semibold duration-200 ${
            isDark
              ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
          }`}
        >
          {isDark ? "0" : "1" }
        </button>
      </div>
    </div>
  </header>
);

const Footer = ({ isDark }: any) => (
  <footer className={`py-6 transition-colors duration-300 border-t ${
    isDark
      ? 'bg-slate-900/50 border-slate-800 text-gray-400'
      : 'bg-white/50 border-gray-200 text-gray-600'
  }`}>
    <div className="max-w-7xl mx-auto px-6 text-center text-sm">
      <p>Made with React & TypeScript</p>
    </div>
  </footer>
);

const BinaryConverter = () => {
  const [decimal, setDecimal] = useState<string>('');
  const [binary, setBinary] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem('darkMode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });
  const [copiedDecimal, setCopiedDecimal] = useState<boolean>(false);
  const [copiedBinary, setCopiedBinary] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [swapped, setSwapped] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      window.localStorage.setItem('darkMode', JSON.stringify(isDark));
    }
  }, [isDark, mounted]);

  const handleTopFieldChange = (value: string) => {
    if (!swapped) {
      const filtered = value.replace(/[^0-9]/g, '');
      setDecimal(filtered);
      setError('');
      if (filtered === '') {
        setBinary('');
        return;
      }
      setBinary(parseInt(filtered).toString(2));
    } else {
      // Top field is binary, convert to decimal
      const filtered = value.replace(/[^01]/g, '');
      setBinary(filtered);
      setError('');
      if (filtered === '') {
        setDecimal('');
        return;
      }
      setDecimal(parseInt(filtered, 2).toString());
    }
  };

  const handleBottomFieldChange = (value: string) => {
    if (!swapped) {
      const filtered = value.replace(/[^01]/g, '');
      setBinary(filtered);
      setError('');
      if (filtered === '') {
        setDecimal('');
        return;
      }
      setDecimal(parseInt(filtered, 2).toString());
    } else {
      const filtered = value.replace(/[^0-9]/g, '');
      setDecimal(filtered);
      setError('');
      if (filtered === '') {
        setBinary('');
        return;
      }
      setBinary(parseInt(filtered).toString(2));
    }
  };

  const copyToClipboard = async (text: string, type: 'decimal' | 'binary') => {
    try {
      await navigator.clipboard.writeText(text);
      type === 'decimal' ? setCopiedDecimal(true) : setCopiedBinary(true);
      setTimeout(() => {
        type === 'decimal' ? setCopiedDecimal(false) : setCopiedBinary(false);
      }, 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
  };

  const swapValues = () => {
    setSwapped(prev => !prev);
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-700 ${
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
              isDark
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400'
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
              value={swapped ? binary : decimal}
              onChange={handleTopFieldChange}
              placeholder={swapped ? 'Enter binary... (1000011)' : 'Enter decimal... (67)'}
              isDark={isDark}
              copied={swapped ? copiedBinary : copiedDecimal}
              copyToClipboard={() => copyToClipboard(swapped ? binary : decimal, swapped ? 'binary' : 'decimal')}
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
              value={swapped ? decimal : binary}
              onChange={handleBottomFieldChange}
              placeholder={swapped ? 'Enter decimal... (67)' : 'Enter binary... (1000011)'}
              isDark={isDark}
              copied={swapped ? copiedDecimal : copiedBinary}
              copyToClipboard={() => copyToClipboard(swapped ? decimal : binary, swapped ? 'decimal' : 'binary')}
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
                  <span className="font-bold text-lg">{decimal}</span> (decimal) ={' '}
                  <span className="font-mono font-bold text-lg">{binary}</span> (binary)
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