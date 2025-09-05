import TodoItem from './TodoItem';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

type Filter = 'all' | 'active' | 'completed';

interface TodoListProps {
  todos: Todo[];
  filteredTodos: Todo[];
  activeTodos: Todo[];
  filter: Filter;
  setFilter: (filter: Filter) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
}

export default function TodoList({ 
  filteredTodos, 
  activeTodos, 
  filter, 
  setFilter, 
  toggleTodo, 
  deleteTodo, 
  clearCompleted 
}: TodoListProps) {
  return (
    <>
      {/* Todo List */}
      <div className="bg-todo-item rounded-lg shadow-2xl overflow-hidden">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
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
    </>
  );
}