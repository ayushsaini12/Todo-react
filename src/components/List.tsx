import {useState, useRef, useEffect} from "react";

type Task = {
    title: string;
    id: string;
    is_completed: boolean;
};

type FilterStatus = "all" | "active" | "completed";

function TODOList({ todos, setTodos }: { todos: Task[]; setTodos: Function }) {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");
  
  const filteredTodos = todos.filter(todo => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active") return !todo.is_completed;
    if (filterStatus === "completed") return todo.is_completed;
    return true;
  });

  const handleFilterChange = (status: FilterStatus) => {
    setFilterStatus(status);
  };

  return (
    <div>
      <div className="filter_buttons">
        <button 
          onClick={() => handleFilterChange("all")}
          className={filterStatus === "all" ? "active" : ""}
        >
          All
        </button>
        <button 
          onClick={() => handleFilterChange("active")}
          className={filterStatus === "active" ? "active" : ""}
        >
          Active
        </button>
        <button 
          onClick={() => handleFilterChange("completed")}
          className={filterStatus === "completed" ? "active" : ""}
        >
          Completed
        </button>
      </div>

      <ol className="todo_list">
        {filteredTodos && filteredTodos.length > 0 ? (
          filteredTodos.map((item, index) => (
            <Item key={index} item={item} todos={todos} setTodos={setTodos} />
          ))
        ) : (
          <p>Empty List</p>
        )}
      </ol>
    </div>
  );
}

function Item({ item, todos, setTodos }: { item: Task; todos: Task[]; setTodos: Function }) {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const completeTodo = () => {
    setTodos((prevTodos:Task[]) =>
      prevTodos.map((todo) =>
        todo.id === item.id
          ? { ...todo, is_completed: !todo.is_completed }
          : todo
      )
    );

    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();

      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      );
    }
  }, [editing]);

  const handleInputChange = (e:any) => {
    setTodos((prevTodos:Task[]) =>
      prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, title: e.target.value } : todo
      )
    );
  };

  const handleInpuSubmit = (event:any) => {
    event.preventDefault();
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);

    setEditing(false);
  };

  const handleInputBlur = () => {
    const updatedTodos = JSON.stringify(todos);
    localStorage.setItem("todos", updatedTodos);

    setEditing(false);
  };

  const handleDelete = () => {
    setTodos((prevTodos:Task[]) => prevTodos.filter((todo) => todo.id !== item.id));

    const updatedTodos = JSON.stringify(
      todos.filter((todo) => todo.id !== item.id)
    );
    localStorage.setItem("todos", updatedTodos);
  };

  return (
    <li id={item?.id} className="items_flex">
      {editing ? (
        <form onSubmit={handleInpuSubmit}>
          <label htmlFor="edit-todo">
            <input
              ref={inputRef}
              type="text"
              name="edit-todo"
              id="edit-todo"
              defaultValue={item?.title}
              onBlur={handleInputBlur}
              onChange={handleInputChange}
            />
          </label>
        </form>
      ) : (
        <>
          <button onClick={completeTodo}>
            <p
              style={
                item.is_completed ? { textDecoration: "line-through" } : {}
              }
            >
              {item?.title}
            </p>
          </button>
          <div className="buttons_flex">
            <button onClick={handleEdit}>
              <span>Edit</span>
            </button>
            <button onClick={handleDelete}>
              <span>Delete</span>
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TODOList;