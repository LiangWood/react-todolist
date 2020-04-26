import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {

  const [todos, setTodos] = useState([
    {
        contents: 'Pickup dry cleaning',
        isCompleted: true
    },
    {
        contents: 'Get haircut',
        isCompleted: false
    },
    {
        contents: 'Build a todo app in React',
        isCompleted: false
    }
  ])
  
  const handleKeyDown = (e, i) => {
    if(e.key === 'Enter') {
        createTodoAtIndex(e, i)
    }
    if(e.key === 'Backspace' && todos[i].contents === '') {
        e.preventDefault();
        return removeTodoAtIndex(i)
    }
  }

  const createTodoAtIndex = (e, i) => {
      const newTodos = [...todos]
      newTodos.splice(i+1, 0, {
          contents: '',
          isCompleted: false
      })
      setTodos(newTodos)
      setTimeout(() => {
          document.forms[0].elements[i+1].focus()
      }, 0)
  }

  const updateTodoAtIndex = (e, i) => {
      const newTodos = [...todos]
      newTodos[i].contents = e.target.value
      setTodos(newTodos)
  }

  const removeTodoAtIndex = (i) => {
    if(i === 0 && todos.length === 1) return
    setTodos( todos => todos.slice(0, i).concat(todos.slice(i + 1, todos.length)))
    setTimeout(() => {
        document.forms[0].elements[i-1].focus()
    }, 0)
  }

  const toggleTodoCompleteAtIndex = (index) => {
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos);
  }

  return (
    <div className="App">
      <div className="header">
        <img src={logo} className="logo" alt="logo" />
      </div>
      <form className="todo-list">
          <ul>
              {todos.map((todo, i) => (
                <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`}>
                    <div className={'checkbox'} onClick={ () => toggleTodoCompleteAtIndex(i) }>
                        {todo.isCompleted && (
                        <span>&#x2714;</span>
                        )}
                    </div>
                    <input 
                        type="text" 
                        value={todo.contents}
                        onKeyDown={ e => handleKeyDown(e,i) }
                        onChange={ e => updateTodoAtIndex(e,i) }
                    />
                </div>
              ))}
          </ul>
      </form>
    </div>
  );
}

export default App;
