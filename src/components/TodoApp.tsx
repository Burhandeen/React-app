import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Sun, Moon, X } from 'lucide-react';
import bgPattern from '@/assets/bg-pattern.jpg';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', text: 'Complete online JavaScript course', completed: true },
    { id: '2', text: 'Jog around the park 3x', completed: false },
    { id: '3', text: '10 minutes meditation', completed: false },
    { id: '4', text: 'Read for 1 hour', completed: false },
    { id: '5', text: 'Pick up groceries', completed: false },
    { id: '6', text: 'Complete Todo App on Frontend Mentor', completed: false },
  ]);
  
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [isDark, setIsDark] = useState(true);

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodos = todos.filter(todo => !todo.completed);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div 
      className="min-h-screen bg-gradient-bg relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgPattern})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-bg opacity-90" />
      
      <div className="relative z-10 container mx-auto px-6 py-16">
        {/* Header */}
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

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Add Todo Form */}
          <form onSubmit={addTodo} className="relative">
            <div className="relative">
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border-2 border-todo-border" />
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Create a new todo..."
                className="w-full pl-16 pr-6 py-6 bg-todo-item border-none text-todo-text placeholder:text-todo-text-muted text-lg rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
          </form>

          {/* Todo List */}
          <div className="bg-todo-item rounded-lg shadow-2xl overflow-hidden">
            {filteredTodos.map((todo, index) => (
              <div
                key={todo.id}
                className={`group flex items-center px-6 py-4 border-b border-todo-border last:border-b-0 hover:bg-todo-bg transition-colors ${
                  todo.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div 
                    className={`relative w-6 h-6 rounded-full border-2 cursor-pointer transition-all ${
                      todo.completed 
                        ? 'bg-gradient-primary border-transparent' 
                        : 'border-todo-border hover:border-primary'
                    }`}
                    onClick={() => toggleTodo(todo.id)}
                  >
                    {todo.completed && (
                      <svg className="w-3 h-3 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span 
                    className={`text-lg transition-all ${
                      todo.completed 
                        ? 'line-through text-todo-completed' 
                        : 'text-todo-text'
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 text-todo-text-muted hover:text-red-400 transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            ))}

            {/* Footer */}
            <div className="flex items-center justify-between px-6 py-4 text-todo-text-muted text-sm">
              <span>{activeTodos.length} items left</span>
              
              <div className="hidden md:flex items-center space-x-4">
                {(['all', 'active', 'completed'] as Filter[]).map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={`capitalize font-medium transition-colors ${
                      filter === filterType 
                        ? 'text-primary' 
                        : 'text-todo-text-muted hover:text-todo-text'
                    }`}
                  >
                    {filterType}
                  </button>
                ))}
              </div>

              <button
                onClick={clearCompleted}
                className="hover:text-todo-text transition-colors"
              >
                Clear Completed
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          <div className="md:hidden bg-todo-item rounded-lg p-4 flex items-center justify-center space-x-6">
            {(['all', 'active', 'completed'] as Filter[]).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`capitalize font-medium transition-colors ${
                  filter === filterType 
                    ? 'text-primary' 
                    : 'text-todo-text-muted hover:text-todo-text'
                }`}
              >
                {filterType}
              </button>
            ))}
          </div>

          {/* Drag and drop hint */}
          <p className="text-center text-todo-text-muted text-sm mt-12">
            Drag and drop to reorder list
          </p>
        </div>
      </div>
    </div>
  );
}