// src/services/course.js
import API from './api';

export const getAllCourses = async () => {
  const response = await API.get('/courses');
  return response.data;
};

export const getCourseDetails = async (courseId) => {
  const response = await API.get(`/courses/${courseId}`);
  return response.data;
};

// ... functions for adding/updating/deleting courses (if admin/instructor features)