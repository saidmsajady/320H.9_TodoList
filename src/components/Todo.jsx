import React from 'react';
import { actions } from '../App';

const Todo = ({ todo, dispatch }) => {
  return (
    <div>
      <span style={{ color: todo.complete ? '#AAA' : '#000' }}>
        {todo.name}
      </span>
      <button onClick={() => dispatch({ type: actions.toggle_todo, payload: { id: todo.id } })}>
        Toggle
      </button>
      <button onClick={() => dispatch({ type: actions.delete_todo, payload: { id: todo.id } })}>
        Delete
      </button>
    </div>
  );
};

export default Todo;