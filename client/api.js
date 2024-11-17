import axios from 'axios';
const API_BASE_URL = process.env.API_BASE_URL;
const fetchStudyPlans = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/study-plans`);
    return response.data;
  } catch (error) {
    console.error('Error fetching study plans:', error);
    throw error;
  }
};
const fetchStudyPlanDetails = async (planId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/study-plans/${planId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for study plan ${planId}:`, error);
    throw error;
  }
};
const addStudyPlan = async (planDetails) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/study-plans`, planDetails);
    return response.data;
  } catch (error) {
    console.error('Error adding new study plan:', error);
    throw error;
  }
};
const updateStudyGoals = async (planId, goals) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/study-plans/${planId}/goals`, goals);
    return response.data;
  } catch (error) {
    console.error(`Error updating goals for study plan ${planId}:`, error);
    throw error;
  }
};
export { fetchStudyPlans, fetchStudyPlanDetails, addStudyPlan, updateStudyGoals };