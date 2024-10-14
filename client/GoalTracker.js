import React, { useState, useEffect } from 'react';

function StudyGoals() {
  const [studyGoals, setStudyGoals] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [goalText, setGoalText] = useState('');

  useEffect(() => {
    console.log('Tracking ID:', process.env.REACT_APP_TRACKING_ID);
  }, []);

  const handleAddGoal = () => {
    if (!goalText.trim()) return;

    const newGoals = [...studyGoals, goalText];
    setStudyGoals(newGoals);
    setGoalText('');
  };

  const handleEditGoal = (index) => {
    setEditIndex(index);
    setGoalText(studyGoals[index]);
  };

  const handleSubmitEdit = () => {
    const updatedGoals = [...studyGoals];
    updatedGoals[editIndex] = goalText;
    setStudyGoals(updatedGoals);
    setEditIndex(-1);
    setGoalText('');
  };

  const handleDeleteGoal = (indexToRemove) => {
    setStudyGoals(studyGoals.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
      <h2>Study Goals</h2>
      <input
        type="text"
        value={goalText}
        onChange={(e) => setGoalText(e.target.value)}
        placeholder="Type your study goal here..."
      />
      {editIndex === -1 ? (
        <button onClick={handleAddGoal}>Add Goal</button>
      ) : (
        <button onClick={handleSubmitEdit}>Save Edit</button>
      )}
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