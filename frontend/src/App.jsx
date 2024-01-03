import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './component/CreateTodo'
import { Todos } from './component/Todos'

function App() {

  const [todos, setTodos] = useState([]);
  const [key, setKey] = useState(false);
  const [tap, setTap] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/todos");
      const data = await response.json();
      console.log(data);
      setTodos(data);
    };

    fetchData();

  }, [key]);

  const buttonOnClickHandler = () => {
    setTap(true);
  };
  

  return (
    <div className='App'>
        <CreateTodo todos={todos} setTodos={setTodos}>
        </CreateTodo>
      { todos ? (
        <Todos key={key} setKey={setKey} todos={todos}></Todos>
      ) : (
        <p>Loading..</p>
      ) }
    </div>
  )
}

export default App
