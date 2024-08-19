import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudyPlans() {
  const [studyPlans, setStudyPlans] = useState([]);
  const [newPlanName, setNewPlanName] = useState(''); // State for new plan name input
  const [error, setError] = useState(null); // State to store any error that occurs

  useEffect(() => {
    fetchStudyPlans();
  }, []);

  const fetchStudyPlans = async () => {
    try {
      setError(null); // Clear existing errors before fetching new data
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/study-plans`);
      setStudyPlans(response.data);
    } catch (error) {
      console.error('Failed to fetch study plans:', error);
      setError('Failed to fetch study plans. Please try again later.');
    }
  };

  const handleAddPlan = async () => {
    if (!newPlanName) {
      setError('Please enter a name for the new study plan.');
      return;
    }

    try {
      setError(null); // Clear existing errors before attempting to add a new plan
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/study-plans`, { name: newPlanName });
      // Immediately fetch updated study plans after adding a new one
      fetchStudyPlans();
      setNewPlanName(''); // Reset input field after adding
    } catch (error) {
      console.error('Failed to add new study plan:', error);
      setError('Failed to add new study plan. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Study Plans</h2>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      <div>
        <input
          type="text"
          value={newPlanName}
          onChange={(e) => setNewPlanName(e.target.value)}
          placeholder="Enter new study plan name"
        />
        <button onClick={handleAddPlan}>Add Plan</button>
      </div>
      {studyPlans.length > 0 ? (
        <ul>
          {studyPlans.map(plan => (
            <li key={plan.id}>{plan.name}</li>
          ))}
        </ul>
      ) : !error && <p>No study plans found.</p>}
    </div>
  );
}

export default StudyPlans;