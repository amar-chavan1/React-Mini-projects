import React, { useState, useEffect } from 'react';
import './TodoApp.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [visibleTodoCount, setVisibleTodoCount] = useState(5);
  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [isDarkMode]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([{ id: Date.now(), text: newTodo.trim(), completed: false }, ...todos]);
      setNewTodo('');
      if (todos.length < 5) {
        setVisibleTodoCount(todos.length + 1);
      } else {
        setVisibleTodoCount(5);
      }
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const showMoreTodos = () => {
    setVisibleTodoCount(prevCount => prevCount + 5);
  };

  const showAllTodos = () => {
    setVisibleTodoCount(todos.length);
  };

  const todosToShow = todos.slice(0, visibleTodoCount);

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="todo-card">
        <div className="card-header">
          <h1 className="todo-title">Todo App</h1>
          <button
            onClick={toggleTheme}
            className="theme-toggle-button"
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            // Add aria-label for accessibility
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="toggle-switch-handle"></span>
          </button>
        </div>

        <div className="input-section">
          <input
            type="text"
            className="todo-input"
            placeholder="What needs to be done today?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                addTodo();
              }
            }}
          />
          <button
            onClick={addTodo}
            className="add-button"
          >
            Add Task
          </button>
        </div>

        {todos.length === 0 ? (
          <div className="no-tasks-message">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="no-tasks-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <p className="no-tasks-text">No tasks for now. Time to add some!</p>
          </div>
        ) : (
          <ul className="todo-list">
            {todosToShow.map((todo) => (
              <li
                key={todo.id}
                className="todo-item"
              >
                <span
                  className={`todo-text ${todo.completed ? 'completed' : ''}`}
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.text}
                </span>
                <div className="todo-actions visible-actions">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`action-button complete-button ${todo.completed ? 'completed' : ''}`}
                    title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {todo.completed ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="action-button delete-button"
                    title="Delete todo"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {todos.length > visibleTodoCount && (
            <div className="show-more-section">
              <button onClick={showMoreTodos} className="show-more-button">
                Show More ({todos.length - visibleTodoCount} remaining)
              </button>
              <button onClick={showAllTodos} className="show-more-button show-all-button">
                Show All
              </button>
            </div>
          )}
          {todos.length > 5 && visibleTodoCount >= todos.length && (
            <div className="show-more-section">
              <p className="all-tasks-shown-message">All tasks shown.</p>
            </div>
          )}
        </div>
      </div>
  );
};

export { App as TodoList };