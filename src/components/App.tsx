import { useState } from 'react';
import Header from './Header';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import bgPattern from '@/assets/bg-pattern.jpg';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

export default function App() {
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
        <Header isDark={isDark} setIsDark={setIsDark} />

        <div className="max-w-2xl mx-auto space-y-6">
          <TodoInput 
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            addTodo={addTodo}
          />

          <TodoList
            todos={todos}
            filteredTodos={filteredTodos}
            activeTodos={activeTodos}
            filter={filter}
            setFilter={setFilter}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            clearCompleted={clearCompleted}
          />
        </div>
      </div>
    </div>
  );
}