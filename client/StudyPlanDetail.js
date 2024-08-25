import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

function StudyPlanDetails() {
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [planDetails, setPlanDetails] = useState(null);

  useEffect(() => {
    if (selectedPlanId) {
      fetchPlanDetails(selectedPlanId);
    }
  }, [selectedPlanId]);

  const fetchPlanDetails = async (planId) => {
    try {
      const response = await axios.get(`${API_URL}/study-plans/${planId}`);
      setPlanDetails(response.data);
    } catch (error) {
      console.error("Error fetching plan details:", error);
      setPlanDetails(null);
    }
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlanId(planId);
  };

  return (
    <div>
      <ul>
        <li onClick={() => handlePlanSelect(1)}>Plan 1</li>
        <li onClick={() => handlePlanSelect(2)}>Plan 2</li>
        <li onClick={() => handlePlanSelect(3)}>Plan 3</li>
      </ul>

      {planDetails && (
        <div>
          <h2>{planDetails.title}</h2>
          <p>Description: {planDetails.description}</p>
        </div>
      )}
    </div>
  );
}

export default StudyPlanDetails;