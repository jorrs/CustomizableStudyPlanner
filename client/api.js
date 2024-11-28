import axios from 'axios';

const API_BASE_URL = process.env.API_BASE_URL;

const handleAxiosError = (error) => {
  if (error.response) {
    console.error('Data:', error.response.data);
    console.error('Status:', error.response.status);
    console.error('Headers:', error.response.headers);
    const message = `Server responded with status ${error.response.status}`;
    throw new Error(message);
  } else if (error.request) {
    console.error('No response received for request:', error.request);
    throw new Error('No response from the server');
  } else {
    console.error('Error setting up request:', error.message);
    throw new Error('Error setting up request');
  }
};

const fetchStudyPlans = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/study-plans`);
    return response.data;
  } catch (error) {
    console.error('Error fetching study plans:', error);
    handleAxiosError(error);
  }
};

const fetchStudyPlanDetails = async (planId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/study-plans/${planId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for study plan ${planId}:`, error);
    handleAxiosError(error);
  }
};

const addStudyPlan = async (planDetails) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/study-plans`, planDetails);
    return response.data;
  } catch (error) {
    console.error('Error adding new study plan:', error);
    handleAxiosError(error);
  }
};

const updateStudyGoals = async (planId, goals) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/study-plans/${planId}/goals`, goals);
    return response.data;
  } catch (error) {
    console.error(`Error updating goals for study plan ${planId}:`, error);
    handleAxiosError(error);
  }
};

export { fetchStudyPlans, fetchStudyPlanDetails, addStudyPlan, updateStudyGoals };