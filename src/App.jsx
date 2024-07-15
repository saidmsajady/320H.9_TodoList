import React, { useReducer, useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import todoData from './utilities/data';

export const actions = {
  add_todo: 'add-todo',
  toggle_todo: 'toggle-todo',
  delete_todo: 'delete-todo'
};

function reducer(todos, action) {
  switch (action.type) {
    case actions.add_todo:
      return [...todos, newTodo(action.payload.name)];
    case actions.toggle_todo:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case actions.delete_todo:
      return todos.filter(todo => todo.id !== action.payload.id);
    default:
      return todos;
  }
}

function newTodo(name) {
  return { id: Date.now(), name: name, complete: false };
}

function App() {
  const [todos, dispatch] = useReducer(reducer, todoData);
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: actions.add_todo, payload: { name: name } });
    setName('');
  }

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </form>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </>
  );
}

export default App;
