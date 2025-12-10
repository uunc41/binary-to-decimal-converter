import React from 'react';
import { Copy, Check } from 'lucide-react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isDark: boolean;
  copied: boolean;
  copyToClipboard: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  isDark,
  copied,
  copyToClipboard,
}) => {
  return (
    <div className="mb-6">
      <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full border-2 rounded-2xl p-4 pr-12 focus:ring-2 outline-none font-mono tracking-wider text-lg transition-all duration-300 ${
            isDark
              ? 'bg-slate-950/50 border-slate-700 text-white focus:ring-purple-500 focus:border-purple-500 placeholder-gray-600'
              : 'bg-white border-gray-200 text-gray-900 focus:ring-blue-400 focus:border-blue-400 placeholder-gray-400'
          }`}
          placeholder={placeholder}
        />
        {value && (
          <button
            onClick={copyToClipboard}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all duration-200 ${
              isDark
                ? 'hover:bg-slate-800 text-gray-400 hover:text-white'
                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
            }`}
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;