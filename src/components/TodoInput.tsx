import { Input } from '@/components/ui/input';

interface TodoInputProps {
  newTodo: string;
  setNewTodo: (value: string) => void;
  addTodo: (e: React.FormEvent) => void;
}

export default function TodoInput({ newTodo, setNewTodo, addTodo }: TodoInputProps) {
  return (
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
  );
}