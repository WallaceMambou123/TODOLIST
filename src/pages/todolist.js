import React, { useState } from 'react';

function TodoList() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  // We'll track the ID of the task that's exiting, not the index, for better reliability
  const [exitingTaskId, setExitingTaskId] = useState(null); 

  const handleAdd = () => {
    if (task.trim() === '') return;
    const newTask = {
      text: task,
      completed: false,
      id: Date.now(), // Add a unique ID for easier tracking
    };
    setTasks([...tasks, newTask]);
    setTask('');
  };

  const handleToggle = (id) => {
    // Check if the task is already being marked as completed to avoid re-triggering the transition
    const taskToToggle = tasks.find(t => t.id === id);
    if (taskToToggle && taskToToggle.completed) {
      // If task is already completed, just toggle it back without animation
      setTasks(tasks.map(t => t.id === id ? { ...t, completed: false } : t));
      return;
    }

    setExitingTaskId(id); // Set the ID of the task to be animated

    setTimeout(() => {
      // Update the task status after the animation delay
      setTasks(tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ));
      setExitingTaskId(null); // Reset the exiting ID
    }, 300); // Adjust delay to match CSS transition duration
  };

  const handleDelete = (id) => {
    // Optional: Add a similar exit animation for deletion if desired
    setTasks(tasks.filter(t => t.id !== id));
  };

  const incompleteTasks = tasks.filter(t => !t.completed);

  return (
    <div className='corp' style={{ padding: '2rem' }}>
      <h1 className='titre'>To Do App</h1>
      <br />

      <div className='ligne1'>
        <input
          type='text'
          placeholder='Entrez une tâche'
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className='emplacement'
        />
        <div className='bouttt'>
          <button className='button_add' onClick={handleAdd}>Ajouter</button>
          <button className='historique' onClick={() => setShowHistory(!showHistory)}>
            {showHistory ? 'Historique' : 'Historique'}
          </button>
        </div>
      </div>
      <div className='forTable' style={{ marginTop: '2rem' }}>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>No.</th>
              <th>Tâche</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incompleteTasks.map((t, index) => (
              <tr
                key={t.id}
                // Apply 'task-row-exit' if it's the task we're animating AND it's about to be completed
                // We check if t.id matches exitingTaskId to apply the animation
                className={t.id === exitingTaskId ? 'task-row-exit task-row-exit-active' : ''}
              >
                <td>{index + 1}</td> {/* Use index directly from map for display order */}
                <td>{t.text}</td>
                <td>{'À faire'}</td> {/* Always "À faire" for incomplete tasks */}
                <td>
                  <button className='comp' onClick={() => handleToggle(t.id)}>
                    Completer
                  </button>
                  <button className='sup' onClick={() => handleDelete(t.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showHistory && (
        <div className='history' style={{ marginTop: '2rem' }}>
          <h2>Historique des tâches complétées</h2>
          {tasks.filter(task => task.completed).length === 0 ? (
            <p>Aucune tâche complétée pour le moment.</p>
          ) : (
            <ul>
              {tasks
                .filter(task => task.completed)
                .map((task) => (
                  <li key={task.id}>{task.text}</li> // Use task.id as key for history items
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default TodoList;