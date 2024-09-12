import React, { useState } from 'react';
import axios from 'axios';

function AddStudyPlan() {
  const [studyPlan, setStudyPlan] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudyPlan({ ...studyPlan, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/studyplans`, studyPlan);
      if (response.status === 201) {
        alert('Study Plan added successfully!');
        setStudyPlan({
          title: '',
          description: '',
          startDate: '',
          endDate: ''
        });
      }
    } catch (error) {
      console.error('Failed to add study plan:', error);
      alert('Failed to add study plan. Please try again!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Study Plan</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={studyPlan.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={studyPlan.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={studyPlan.startDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={studyPlan.endDate}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default AddStudyPlan;