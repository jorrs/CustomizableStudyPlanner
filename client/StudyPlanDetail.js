import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function StudyPlanDetails() {
  const [currentPlanId, setCurrentPlanId] = useState(null);
  const [studyPlanDetails, setStudyPlanDetails] = useState(null);

  useEffect(() => {
    if (currentPlanId) {
      retrieveStudyPlanDetails(currentPlanId);
    }
  }, [currentPlanId]);

  const retrieveStudyPlanDetails = async (planId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/study-plans/${planId}`);
      setStudyPlanDetails(response.data);
    } catch (error) {
      console.error("Error retrieving study plan details:", error);
      setStudyPlanDetails(null);
    }
  };

  const handleStudyPlanSelection = (planId) => {
    setCurrentPlanId(planId);
  };

  return (
    <div>
      <ul>
        <li onClick={() => handleStudyPlanSelection(1)}>Plan 1</li>
        <li onClick={() => handleStudyPlanSelection(2)}>Plan 2</li>
        <li onClick={() => handleStudyPlanSelection(3)}>Plan 3</li>
      </ul>

      {studyPlanDetails && (
        <div>
          <h2>{studyPlanDetails.title}</h2>
          <p>Description: {studyPlanDetails.description}</p>
        </div>
      )}
    </div>
  );
}

export default StudyPlanDetails;