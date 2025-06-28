// src/pages/CourseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, NavLink, Routes, Route, Outlet } from 'react-router-dom';
import { FiBook, FiUsers, FiStar, FiFileText, FiVideo, FiLink, FiUpload, FiDownload, FiTrash2 } from 'react-icons/fi';
import { getCourseById, getStudentsByCourse, getFeedback } from '../utils/mockApi';
import Spinner from '../components/common/Spinner';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const CourseDetail = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getCourseById(courseId).then(data => {
            setCourse(data);
            setLoading(false);
        });
    }, [courseId]);

    const tabItems = [
        { name: 'Resources', path: '', icon: FiBook },
        { name: 'Students', path: 'students', icon: FiUsers },
        { name: 'Feedback', path: 'feedback', icon: FiStar },
    ];

    if (loading) return <Spinner size="lg" className="h-full" />;
    if (!course) return <div>Course not found.</div>;

    const baseLinkClasses = "flex items-center gap-2 px-4 py-2 font-medium rounded-md transition-colors";
    const inactiveLinkClasses = "text-light-subtext hover:bg-gray-200 dark:text-dark-subtext dark:hover:bg-gray-700";
    const activeLinkClasses = "bg-primary text-white";

    return (
        <div className="space-y-6">
            <Card>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <img src={course.image} alt={course.title} className="w-full md:w-48 h-auto rounded-lg object-cover" />
                  <div>
                      <h2 className="text-3xl font-bold">{course.title}</h2>
                      <p className="text-light-subtext dark:text-dark-subtext mt-1">{course.students} students • {course.lessons} lessons • {course.videos} videos</p>
                  </div>
              </div>
            </Card>

            <nav className="flex space-x-2 border-b border-gray-300 dark:border-gray-600 pb-2">
                {tabItems.map(tab => (
                    <NavLink
                        key={tab.name}
                        to={`/courses/${courseId}/${tab.path}`}
                        end={tab.path === ''}
                        className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                    >
                        <tab.icon />
                        <span>{tab.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="mt-6">
                <Routes>
                    <Route index element={<ResourcesTab />} />
                    <Route path="students" element={<StudentsTab courseId={courseId} />} />
                    <Route path="feedback" element={<FeedbackTab courseId={courseId} />} />
                </Routes>
            </div>
        </div>
    );
};

// --- TABS ---

const ResourcesTab = () => (
    <Card>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Course Resources</h3>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-white rounded-md hover:bg-primary-dark text-sm">
                <FiUpload/> Upload
            </button>
        </div>
        <ul className="space-y-3">
            <ResourceItem icon={FiFileText} name="Chapter 1 Notes.pdf" type="PDF" size="1.2 MB" />
            <ResourceItem icon={FiVideo} name="Introduction Video.mp4" type="Video" size="25.4 MB" />
            <ResourceItem icon={FiLink} name="React Docs" type="External Link" />
        </ul>
    </Card>
);

const ResourceItem = ({ icon: Icon, name, type, size }) => (
    <li className="flex items-center justify-between p-3 rounded-lg bg-light-bg dark:bg-dark-bg">
        <div className="flex items-center gap-3">
            <Icon className="text-primary" size={20}/>
            <div>
                <p className="font-medium">{name}</p>
                <p className="text-xs text-light-subtext dark:text-dark-subtext">{type}{size && ` • ${size}`}</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <button className="text-light-subtext hover:text-primary"><FiDownload/></button>
            <button className="text-light-subtext hover:text-danger"><FiTrash2/></button>
        </div>
    </li>
);

const StudentsTab = ({ courseId }) => {
    const [students, setStudents] = useState([]);
    useEffect(() => { getStudentsByCourse(courseId).then(setStudents) }, [courseId]);
    return (
        <Card>
            <h3 className="text-xl font-semibold mb-4">Enrolled Students</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b dark:border-gray-700">
                            <th className="p-3">Name</th><th className="p-3">Enrolled On</th><th className="p-3">Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(s => <StudentRow key={s.id} student={s} />)}
                    </tbody>
                </table>
            </div>
        </Card>
    )
};

const StudentRow = ({ student }) => (
    <tr className="border-b dark:border-gray-700 hover:bg-light-bg dark:hover:bg-dark-bg/50">
        <td className="p-3 font-medium">{student.name}</td>
        <td className="p-3 text-light-subtext dark:text-dark-subtext">{student.enrolledOn}</td>
        <td className="p-3">
            <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div className="bg-primary h-2.5 rounded-full" style={{width: `${student.progress}%`}}></div>
                </div>
                <span className="font-semibold text-sm">{student.progress}%</span>
            </div>
        </td>
    </tr>
);

const FeedbackTab = ({ courseId }) => {
    const [feedback, setFeedback] = useState([]);
    useEffect(() => { getFeedback().then(data => setFeedback(data.filter(f => f.courseId === parseInt(courseId)))) }, [courseId]);
    return (
      <div className="space-y-4">
        {feedback.map(f => (
            <Card key={f.id}>
                <div className="flex justify-between">
                    <p className="font-semibold">{f.student}</p>
                    <div className="flex text-yellow-500">
                        {[...Array(f.rating)].map((_, i) => <FiStar key={i} fill="currentColor" />)}
                    </div>
                </div>
                <p className="italic my-2">"{f.comment}"</p>
                {f.responded ? (
                    <p className="text-sm text-success p-2 bg-success/10 rounded-md">✓ You responded to this</p>
                ) : (
                    <Button variant="secondary" className="text-sm">Reply</Button>
                )}
            </Card>
        ))}
        {feedback.length === 0 && <Card><p>No feedback for this course yet.</p></Card>}
      </div>
    )
};

export default CourseDetail;