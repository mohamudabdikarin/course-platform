// src/utils/mockApi.js
import coursePlaceholder from '../assets/course-placeholder.png';

const mockData = {
  stats: {
    totalStudents: 1875,
    avgRating: 4.8,
    totalCourses: 12,
  },
  courses: [
    { id: 1, title: 'React: From Beginner to Advanced', status: 'Published', students: 450, rating: 4.9, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500', lessons: 15, videos: 10, attachments: 5 },
    { id: 2, title: 'The Complete Tailwind CSS Masterclass', status: 'Published', students: 620, rating: 4.9, image: 'https://images.unsplash.com/photo-1643225245627-2852b97a29cd?w=500', lessons: 25, videos: 20, attachments: 12 },
    { id: 3, title: 'Spring Boot for Modern Web Apps', status: 'Draft', students: 0, rating: null, image: coursePlaceholder, lessons: 2, videos: 1, attachments: 0 },
    { id: 4, title: 'PostgreSQL: A Deep Dive', status: 'Published', students: 350, rating: 4.7, image: 'https://images.unsplash.com/photo-1593376853549-a6f94142490b?w=500', lessons: 30, videos: 25, attachments: 15 },
    { id: 5, title: 'UI/UX Design with Figma', status: 'Archived', students: 455, rating: 4.8, image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500', lessons: 18, videos: 15, attachments: 10 },
  ],
  feedback: [
    { id: 1, student: 'Alice Johnson', rating: 5, comment: "This React course is fantastic! It covers everything from the basics to advanced hooks clearly. Highly recommended!", courseId: 1, responded: true },
    { id: 2, student: 'Bob Williams', rating: 4, comment: "Great content on Tailwind, though I wish there were more examples on complex animations.", courseId: 2, responded: false },
    { id: 3, student: 'Charlie Brown', rating: 5, comment: "Finally, a PostgreSQL course that makes sense. The real-world examples are super helpful.", courseId: 4, responded: true },
  ],
  students: [
    { id: 1, name: 'Eve Davis', courseId: 1, progress: 85, enrolledOn: '2023-10-15' },
    { id: 2, name: 'Frank Miller', courseId: 1, progress: 40, enrolledOn: '2023-10-20' },
    { id: 3, name: 'Grace Wilson', courseId: 2, progress: 100, enrolledOn: '2023-09-01' },
  ],
  activity: [
      { name: 'Day 1', enrollments: 4, activity: 24 }, { name: 'Day 2', enrollments: 3, activity: 22 },
      { name: 'Day 3', enrollments: 2, activity: 29 }, { name: 'Day 4', enrollments: 5, activity: 39 },
      { name: 'Day 5', enrollments: 8, activity: 48 }, { name: 'Day 6', enrollments: 3, activity: 38 },
      { name: 'Day 7', enrollments: 12, activity: 53 },
  ],
};

const simulateApiCall = (data, delay = 1000) => 
  new Promise(resolve => setTimeout(() => resolve(data), delay));

// --- API Functions ---

export const getDashboardStats = () => simulateApiCall(mockData.stats);
export const getCourses = () => simulateApiCall(mockData.courses);
export const getCourseById = (id) => simulateApiCall(mockData.courses.find(c => c.id === parseInt(id)));
export const getFeedback = () => simulateApiCall(mockData.feedback);
export const getStudentsByCourse = (courseId) => simulateApiCall(mockData.students.filter(s => s.courseId === parseInt(courseId)));
export const getActivityData = () => simulateApiCall(mockData.activity);

// Simulate Mutations (in a real app, these would be POST/PUT/DELETE requests)
export const addCourse = (courseData) => {
    const newCourse = { ...courseData, id: Date.now(), students: 0, rating: null, image: coursePlaceholder };
    mockData.courses.push(newCourse);
    return simulateApiCall(newCourse, 500);
}

export const updateCourse = (courseId, updatedData) => {
    const index = mockData.courses.findIndex(c => c.id === courseId);
    if (index !== -1) {
        mockData.courses[index] = { ...mockData.courses[index], ...updatedData };
        return simulateApiCall(mockData.courses[index], 500);
    }
    return Promise.reject(new Error("Course not found"));
}

export const deleteCourse = (courseId) => {
    mockData.courses = mockData.courses.filter(c => c.id !== courseId);
    return simulateApiCall({ success: true }, 500);
}