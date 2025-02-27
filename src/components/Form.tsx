type Task = {
    title: string;
    id: string;
    is_completed: boolean;
  };

function Form({ todos, setTodos }: { todos: Task[]; setTodos: Function }) {
    const handleSubmit = (event:any) => {
        event.preventDefault();

        const value = event.target.todo.value;
        const newTodo = {
          title: value,
          id: self.crypto.randomUUID(),
          is_completed: false,
        };
    
        setTodos((prevTodos: Task[]) => [...prevTodos, newTodo]);
    
        const updatedTodoList = JSON.stringify([...todos, newTodo]);
        localStorage.setItem("todos", updatedTodoList);
    
        event.target.reset();
    };
    return (
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="todo">
          <input
            type="text"
            name="todo"
            id="todo"
            placeholder="Write your next task"
            className="placeholder_design"
          />
        </label>
        <button>
          <span >Submit</span>
        </button>
      </form>
    );
  }
  export default Form;