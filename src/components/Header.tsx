import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

export default function Header({ isDark, setIsDark }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-12 max-w-2xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-white tracking-[0.5em]">
        TODO
      </h1>
      <button 
        onClick={() => setIsDark(!isDark)}
        className="text-white hover:text-gray-300 transition-colors"
      >
        {isDark ? <Sun size={28} /> : <Moon size={28} />}
      </button>
    </div>
  );
}