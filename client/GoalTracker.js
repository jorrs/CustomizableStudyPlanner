import React, { useState, useEffect } from 'react';

function StudyGoals() {
  const [studyGoals, setStudyGoals] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [goalText, setGoalText] = useState('');

  useEffect(() => {
    console.log('Tracking ID:', process.env.REACT_APP_TRACKING_ID);
  }, []);

  const handleGoalTextChange = (e) => setGoalText(e.target.value);

  const resetInputs = () => {
    setEditIndex(-1);
    setGoalText('');
  };

  const handleAddGoal = () => {
    if (!goalText.trim()) return;

    setStudyGoals([...studyGoals, goalText]);
    resetInputs();
  };

  const handleEditGoal = (index) => {
    setEditIndex(index);
    setGoalText(studyGoals[index]);
  };

  const handleSubmitEdit = () => {
    if (editIndex < 0 || editIndex >= studyGoals.length) return;

    const updatedGoals = [...studyGoals];
    updatedGoals[editIndex] = goalText;
    setStudyGoals(updatedGoals);
    resetInputs();
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