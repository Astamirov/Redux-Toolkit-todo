import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, removeTodo } from "./features/todosReduser";
import { AppDispatch, RootState } from "./app/store";
import './index.css';


function App() {
  const todos = useSelector((state: RootState) => state.todos)
  const [text, setText] = useState<string>('')

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setText(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!todos.some((todo: Todo) => todo.text === text) && text !== '') {
      dispatch(addTodo({id: Date.now(), text}));
      setText('')
    }
  } 

  const handleRemove = (id: number) => {
    dispatch(removeTodo(id));
  }


  type Todo = {
    id: number;
    text: string;
  };

  return (
    <div className="app">
      <div className="todos-form">
        <h1 className="todo-title">Todo</h1>
        <form className="todo-form" onSubmit={handleSubmit}>
          <input className="todo-input" type='text' value={text} onChange={handleChange}/>
          <button className="add-button" type='submit'>add</button>
        </form>
        <ul className="todo-list">{todos.map((todo: Todo, index: number) => {
          return <li className="todo-item" key={todo.id}>
            <span className="todo-number">{index + 1}</span>
            <span className="todo-text">{todo.text}</span>
            <button className="remove-button" onClick={() => {handleRemove(todo.id)}}>x</button></li>
        })}
      </ul>
      </div>

  </div>
  );
}

export default App
