import React, { useState } from 'react';
import { actions } from '../App';

const Todo = ({ todo, dispatch }) => {
  const [editName, setEditName] = useState(todo.name);

  const handleSave = () => {
    dispatch({ type: actions.save_todo, payload: { id: todo.id, name: editName } });
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={() => dispatch({ type: actions.toggle_todo, payload: { id: todo.id } })}
      />
      {todo.isEditing ? (
        <>
          <input
            type="text"
            value={editName}
            onChange={e => setEditName(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span style={{ color: todo.complete ? '#AAA' : '#000' }}>
            {todo.name}
          </span>
          <button onClick={() => dispatch({ type: actions.edit_todo, payload: { id: todo.id } })}>
            Edit
          </button>
          <button
            onClick={() => dispatch({ type: actions.delete_todo, payload: { id: todo.id } })}
            disabled={!todo.complete}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default Todo;
