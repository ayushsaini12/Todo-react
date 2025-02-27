import { useState, useEffect } from 'react'
import 'src/App.css'
import Form from '@components/Form'
import TodoList from '@components/List'

function App() {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  return (
    <>
      <div className="container">
      <h1>Todo List</h1>
      <Form todos={todos} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </>
  )
}

export default App
