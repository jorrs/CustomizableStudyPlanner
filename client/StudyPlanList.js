import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudyPlans() {
  const [studyPlans, setStudyPlans] = useState([]);

  useEffect(() => {
    const fetchStudyPlans = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/study-plans`);
        setStudyPlans(response.data);
      } catch (error) {
        console.error('Failed to fetch study plans:', error);
      }
    };

    fetchStudyPlans();
  }, []);

  return (
    <div>
      <h2>Study Plans</h2>
      {studyPlans.length > 0 ? (
        <ul>
          {studyPlans.map(plan => (
            <li key={plan.id}>{plan.name}</li>
          ))}
        </ul>
      ) : (
        <p>No study plans found.</p>
      )}
    </div>
  );
}

export default StudyPlans;