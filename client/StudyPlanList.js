import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudyPlans() {
  const [studyPlans, setStudyPlans] = useState([]);
  const [error, setError] = useState(null); // State to store any error that occurs

  useEffect(() => {
    const fetchStudyPlans = async () => {
      try {
        // Clear existing errors before fetching new data
        setError(null);
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/study-plans`);
        setStudyPlans(response.data);
      } catch (error) {
        // Adjusting error handling to store error message
        console.error('Failed to fetch study plans:', error);
        setError('Failed to fetch study plans. Please try again later.');
      }
    };

    fetchStudyPlans();
  }, []);

  return (
    <div>
      <h2>Study Plans</h2>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>} {/* Displaying error message if there is any error */}
      {studyPlans.length > 0 ? (
        <ul>
          {studyPlans.map(plan => (
            <li key={plan.id}>{plan.name}</li>
          ))}
        </ul>
      ) : !error && <p>No study plans found.</p> /* Only displaying this message if there is no error to avoid confusing the user */}
    </div>
  );
}

export default StudyPlans;