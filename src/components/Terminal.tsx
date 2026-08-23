import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';

export function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<{ type: 'input' | 'output', text: string }[]>([
    { type: 'output', text: 'Welcome to Abhijit Pandey\'s terminal. Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    let output = '';
    switch(trimmed) {
      case 'help':
        output = 'Available commands: help, whoami, skills, projects, contact, ai, clear';
        break;
      case 'whoami':
        output = 'Abhijit Pandey - B.Tech CSE (AI/ML) Student and Developer.';
        break;
      case 'skills':
        output = 'Python, TypeScript, React, Tailwind CSS, Machine Learning, TensorFlow...';
        break;
      case 'projects':
        output = 'Check the Selected Work section above for detailed case studies.';
        break;
      case 'contact':
        output = 'Reach me via LinkedIn or GitHub (@abhiiml).';
        break;
      case 'ai':
        output = 'AI/ML is my primary focus. Currently learning Deep Learning and LLM architectures.';
        break;
      case 'clear':
        setHistory([]);
        return;
      case '':
        return;
      default:
        output = `Command not found: ${trimmed}. Type "help" for available commands.`;
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', text: cmd },
      { type: 'output', text: output }
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        id="terminal"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-foreground text-background rounded-full shadow-lg hover:scale-105 transition-transform z-50 flex items-center justify-center group"
        aria-expanded={isOpen}
        aria-label="Open terminal"
      >
        <TerminalIcon size={24} className="group-hover:rotate-12 transition-transform" />
      </button>

      {/* Terminal Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 md:w-96 h-96 bg-foreground text-[#E5E5E5] font-mono text-sm shadow-2xl rounded-sm z-50 flex flex-col border border-border/20 overflow-hidden">
          <div className="bg-[#2A2A2A] px-4 py-2 flex justify-between items-center text-xs">
            <span>user@abhiiml:~</span>
            <button onClick={() => setIsOpen(false)} className="hover:text-accent">&times;</button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto" onClick={() => inputRef.current?.focus()}>
            {history.map((line, i) => (
              <div key={i} className="mb-2">
                {line.type === 'input' ? (
                  <div className="flex text-accent">
                    <span className="mr-2">$</span>
                    <span>{line.text}</span>
                  </div>
                ) : (
                  <div className="text-gray-400 whitespace-pre-wrap">{line.text}</div>
                )}
              </div>
            ))}
            
            <div className="flex text-accent mt-2">
              <span className="mr-2">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent outline-none flex-1 text-[#E5E5E5]"
                spellCheck={false}
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </div>
      )}
    </>
  );
}
