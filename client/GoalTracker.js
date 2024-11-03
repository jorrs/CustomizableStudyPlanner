import React, { useState, useEffect } from 'react';

function StudyGoals() {
  const [studyGoals, setStudyGoals] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [goalText, setGoalText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      console.log('Tracking ID:', process.env.REACT_APP_TRACKING_ID);
    } catch (error) {
      setError('Failed to load tracking ID.');
    }
  }, []);

  const handleGoalTextChange = (e) => {
    setGoalText(e.target.value);
    if (error) setError('');
  };

  const resetInputs = () => {
    setEditIndex(-1);
    setGoalText('');
    if (error) setError('');
  };

  const handleAddGoal = () => {
    if (!goalText.trim()) {
      setError('Goal cannot be empty.');
      return;
    }

    try {
      setStudyGoals([...studyGoals, goalText]);
      resetInputs();
    } catch (e) {
      setError('Failed to add goal. Please try again.');
    }
  };

  const handleEditGoal = (index) => {
    if (index < 0 || index >= studyGoals.length) {
      setError('Invalid goal selected for edit.');
      return;
    }

    try {
      setEditIndex(index);
      setGoalText(studyGoals[index]);
    } catch (e) {
      setError('Failed to select goal for editing.');
    }
  };

  const handleSubmitEdit = () => {
    if (editIndex < 0 || editIndex >= studyGoals.length) {
      setError('Invalid index for editing.');
      return;
    }
    if (!goalText.trim()) {
      setError('Goal text cannot be empty.');
      return;
    }

    try {
      const updatedGoals = [...studyGoals];
      updatedGoals[editIndex] = goalText;
      setStudyGoals(updatedGoals);
      resetInputs();
    } catch (e) {
      setError('Failed to update goal. Please try again.');
    }
  };

  const handleDeleteGoal = (indexToRemove) => {
    if (indexToRemove < 0 || indexToRemove >= studyGoals.length) {
      setError('Invalid index for deletion.');
      return;
    }

    try {
      setStudyGoals(studyGoals.filter((_, index) => index !== indexToRemove));
    } catch (e) {
      setError('Failed to delete goal. Please try again.');
    }
  };

  return (
    <div>
      <h2>Study Goals</h2>
      {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        value={goalText}
        onChange={handleGoalTextChange}
        placeholder="Type your study goal here..."
      />
      <button onClick={editIndex === -1 ? handleAddGoal : handleSubmitEdit}>
        {editIndex === -1 ? 'Add Goal' : 'Save Edit'}
      </button>
      <ul>
        {studyGoals.map((goal, index) => (
          <li key={index}>
            {goal}
            <button onClick={() => handleEditGoal(index)}>Edit</button>
            <button onClick={() => handleDeleteGoal(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StudyGoals;