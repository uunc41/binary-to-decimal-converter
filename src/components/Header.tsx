import { Info, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  showInfo: boolean;
  setShowInfo: (value: boolean) => void;
}

const Header = ({ isDark, setIsDark, showInfo, setShowInfo }: HeaderProps) => {
  const toggleTheme = () => setIsDark(!isDark);

  return (
    <nav className={`relative z-10 w-full shadow-lg py-4 px-6 flex justify-between items-center border-b transition-all duration-700 ${
      isDark
        ? 'bg-slate-900/70 backdrop-blur-xl border-slate-800'
        : 'bg-white/70 backdrop-blur-xl border-gray-200'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg transition-all duration-700 ${
          isDark
            ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30'
            : 'bg-gray-800 text-white shadow-lg shadow-blue-400/30'
        }`}>
          01
        </div>
        <h1 className={`text-2xl font-bold tracking-tight transition-colors duration-700 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Binary to Decimal Converter
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className={`p-2 rounded-lg transition-all duration-300 ${isDark ? 'hover:bg-slate-800 text-gray-400 hover:text-white' : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
        >
          <Info className="w-5 h-5" />
        </button>
        <button
          onClick={toggleTheme}
          className={`relative w-20 h-10 rounded-full transition-all duration-500 ease-in-out flex items-center shadow-lg ${
            isDark
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-purple-500/50'
              : 'bg-gradient-to-r from-blue-500 to-cyan-400 shadow-blue-400/50'
          }`}
        >
          <div className={`absolute w-8 h-8 rounded-full bg-white shadow-md transform transition-all duration-500 ease-in-out flex items-center justify-center ${
            isDark ? 'translate-x-10' : 'translate-x-1'
          }`}>
            <span className="font-bold text-sm text-gray-800">
              {isDark ? '0' : '1'}
            </span>
          </div>
          <div className={`absolute transition-all duration-500 ${isDark ? 'left-2 opacity-100' : 'left-2 opacity-0'}`}>
            <Moon className="w-4 h-4 text-white" />
          </div>
          <div className={`absolute transition-all duration-500 ${isDark ? 'right-2 opacity-0' : 'right-2 opacity-100'}`}>
            <Sun className="w-4 h-4 text-white" />
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Header;
