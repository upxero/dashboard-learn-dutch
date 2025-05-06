// src/services/strapiService.js
import axios from 'axios';

const API_URL = 'http://jouw-strapi-url.com'; // vervang dit door de werkelijke URL van je Strapi API

export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error('Er is een fout opgetreden bij het ophalen van de cursussen', error);
    return [];
  }
};
