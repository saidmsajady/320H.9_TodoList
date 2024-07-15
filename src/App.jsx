import React, { useReducer, useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import todoData from './utilities/data';

export const actions = {
  add_todo: 'add-todo',
  toggle_todo: 'toggle-todo',
  delete_todo: 'delete-todo',
  edit_todo: 'edit-todo',
  save_todo: 'save-todo'
};

function reducer(todos, action) {
  switch (action.type) {
    case actions.add_todo:
      return [{ ...newTodo(action.payload.name) }, ...todos];
    case actions.toggle_todo:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case actions.delete_todo:
      return todos.filter(todo => todo.id !== action.payload.id);
    case actions.edit_todo:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, isEditing: true };
        }
        return todo;
      });
    case actions.save_todo:
      return todos.map(todo => {
        if (todo.id === action.payload.id) {
          return { ...todo, name: action.payload.name, isEditing: false };
        }
        return todo;
      });
    default:
      return todos;
  }
}

function newTodo(name) {
  return { id: Date.now() + Math.random(), name: name, complete: false, isEditing: false }; // Ensure unique ID by adding Math.random()
}

function App() {
  const [todos, dispatch] = useReducer(reducer, todoData.map(name => newTodo(name)));
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim()) {
      dispatch({ type: actions.add_todo, payload: { name: name } });
      setName('');
    }
  }

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} placeholder="Enter New Todo Here" onChange={e => setName(e.target.value)} />
        <button type="submit" >Add Todo</button>
      </form>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </>
  );
}

export default App;
