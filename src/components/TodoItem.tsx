import { X } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
}

export default function TodoItem({ todo, toggleTodo, deleteTodo }: TodoItemProps) {
  return (
    <div
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
  );
}