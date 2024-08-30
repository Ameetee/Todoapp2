import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';
import { getTasksFromStorage, saveTasksToStorage } from './Utils';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const loadedTasks = getTasksFromStorage();
    setTasks(loadedTasks);
  }, []);

  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), isDone: false }]);
    setEditingTask(null);
  };

  const editTask = (task) => {
    setTasks(tasks.map(t => t.id === task.id ? task : t));
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isDone: !task.isDone } : task));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List Application</h1>
      </header>
      <main>
        {editingTask ? (
          <TaskForm task={editingTask} onSave={editTask} onCancel={() => setEditingTask(null)} />
        ) : (
          <TaskForm onSave={addTask} />
        )}
        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={deleteTask}
          onToggle={toggleTask}
        />
      </main>
    </div>
  );
};

export default App;
