import axios from 'axios';

// Base URL of your Flask API
export const BASE_URL = 'https://justicemet-backend-2.onrender.com'; // Update with your actual Flask server URL

// Add a new case to the database
export const addCase = async (caseData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/cases`, caseData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add case');
  }
};

// Search for cases by title
export const searchCase = async (title) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/cases/search`, {
      params: { title },
      headers: { 'Content-Type': 'application/json' },
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to search cases');
  }
};
