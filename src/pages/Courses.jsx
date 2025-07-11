import React, { useState, useEffect } from 'react';
import { FiPlusCircle, FiEdit, FiTrash2, FiEye, FiSearch } from 'react-icons/fi';
import { getCourses, addCourse, updateCourse, deleteCourse } from '../utils/mockApi';
import Spinner from '../components/common/Spinner';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce'; 

const CourseCard = ({ course, onEdit, onDelete, onView }) => (
  <div className="bg-light-card dark:bg-dark-card rounded-lg shadow-card overflow-hidden transition-transform hover:scale-105">
    <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h3 className="font-bold text-lg mb-2 truncate">{course.title}</h3>
      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${course.status === 'Published' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}`}>
        {course.status}
      </span>
      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-light-subtext dark:text-dark-subtext">{course.students} students</p>
        <div className="flex space-x-2">
          <button onClick={() => onEdit(course)} className="text-blue-500 hover:text-blue-700"><FiEdit /></button>
          <button onClick={() => onView(course.id)} className="text-green-500 hover:text-green-700"><FiEye /></button>
          <button onClick={() => onDelete(course.id)} className="text-danger hover:text-red-700"><FiTrash2 /></button>
        </div>
      </div>
    </div>
  </div>
);

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // 500ms delay

  useEffect(() => {
    fetchCourses();
  }, []);
  
  const fetchCourses = async () => {
    setLoading(true);
    const data = await getCourses();
    setCourses(data);
    setLoading(false);
  };

  const handleOpenModal = (course = null) => {
    setCurrentCourse(course);
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentCourse(null);
  };

  const handleSaveCourse = async (formData) => {
    const toastId = toast.loading(currentCourse ? 'Updating course...' : 'Adding course...');
    try {
      if (currentCourse) {
        await updateCourse(currentCourse.id, formData);
        toast.success('Course updated successfully!', { id: toastId });
      } else {
        await addCourse(formData);
        toast.success('Course added successfully!', { id: toastId });
      }
      fetchCourses();
      handleCloseModal();
    } catch (error) {
      toast.error('Something went wrong.', { id: toastId });
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
        const toastId = toast.loading('Deleting course...');
        try {
            await deleteCourse(id);
            toast.success('Course deleted!', { id: toastId });
            fetchCourses();
        } catch (error) {
            toast.error('Failed to delete course.', { id: toastId });
        }
    }
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  if (loading) return <Spinner size="lg" className="h-full" />;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-3xl font-bold">My Courses</h2>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <FiSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-light-subtext"/>
            <input 
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-light-card dark:bg-dark-card border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={() => handleOpenModal()} className="flex items-center gap-2 flex-shrink-0">
            <FiPlusCircle /> New Course
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map(course => (
          <CourseCard 
            key={course.id} 
            course={course}
            onEdit={handleOpenModal}
            onDelete={handleDelete}
            onView={(id) => navigate(`/courses/${id}`)}
          />
        ))}
      </div>
      
      <CourseFormModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveCourse}
        course={currentCourse}
      />
    </div>
  );
};

const CourseFormModal = ({ isOpen, onClose, onSave, course }) => {
    const [title, setTitle] = useState('');
    const [status, setStatus] = useState('Draft');
    const [description, setDescription] = useState('');
    const [fee, setFee] = useState('');
    const [category, setCategory] = useState('');
    const [duration, setDuration] = useState('');
    const [level, setLevel] = useState('Beginner');
    const [thumbnail, setThumbnail] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState('');
    const fileInputRef = React.useRef(null);

    useEffect(() => {
        if (course) {
            setTitle(course.title || '');
            setStatus(course.status || 'Draft');
            setDescription(course.description || '');
            setFee(course.fee || '');
            setCategory(course.category || '');
            setDuration(course.duration || '');
            setLevel(course.level || 'Beginner');
            setThumbnail(null);
            setThumbnailPreview(course.image || '');
        } else {
            setTitle('');
            setStatus('Draft');
            setDescription('');
            setFee('');
            setCategory('');
            setDuration('');
            setLevel('Beginner');
            setThumbnail(null);
            setThumbnailPreview('');
        }
    }, [course]);

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!['image/jpeg', 'image/png', 'image/jpg', 'image/gif'].includes(file.type)) {
            toast.error('Please select a valid image file (PNG, JPG, GIF)');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error('Image must be less than 5MB');
            return;
        }
        setThumbnail(file);
        const reader = new FileReader();
        reader.onloadend = () => setThumbnailPreview(reader.result);
        reader.readAsDataURL(file);
    };

    const handleRemoveThumbnail = () => {
        setThumbnail(null);
        setThumbnailPreview('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            title,
            status,
            description,
            fee,
            category,
            duration,
            level,
        };
        if (thumbnailPreview) {
            formData.image = thumbnailPreview;
        }
        onSave(formData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={course ? "Edit Course" : "Add New Course"}>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
                {/* Thumbnail Upload */}
                <div>
                    <label className="block text-sm font-medium mb-1">Course Thumbnail</label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                        {thumbnailPreview ? (
                            <div className="relative mb-2 sm:mb-0">
                                <img src={thumbnailPreview} alt="Thumbnail Preview" className="w-20 h-20 object-cover rounded-lg border" />
                                <button type="button" onClick={handleRemoveThumbnail} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors">&times;</button>
                            </div>
                        ) : (
                            <div className="w-20 h-20 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border text-gray-400 mb-2 sm:mb-0">No Image</div>
                        )}
                        <div className="flex-1">
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleThumbnailChange} className="block w-full" />
                            <p className="text-xs text-light-subtext dark:text-dark-subtext mt-1">PNG, JPG, GIF up to 5MB.</p>
                        </div>
                    </div>
                </div>
                {/* Responsive Grid for Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    {/* Title */}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium mb-1">Course Title</label>
                        <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-2 rounded bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    {/* Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium mb-1">Category</label>
                        <input id="category" type="text" value={category} onChange={e => setCategory(e.target.value)} required className="w-full p-2 rounded bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    {/* Fee */}
                    <div>
                        <label htmlFor="fee" className="block text-sm font-medium mb-1">Course Fee (USD)</label>
                        <input id="fee" type="number" min="0" value={fee} onChange={e => setFee(e.target.value)} required className="w-full p-2 pl-3 rounded bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary appearance-none" />
                    </div>
                    {/* Duration */}
                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium mb-1">Duration (e.g. 10h 30m)</label>
                        <input id="duration" type="text" value={duration} onChange={e => setDuration(e.target.value)} required className="w-full p-2 rounded bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                    {/* Level */}
                    <div>
                        <label htmlFor="level" className="block text-sm font-medium mb-1">Level</label>
                        <select id="level" value={level} onChange={e => setLevel(e.target.value)} className="w-full p-2 rounded bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary">
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>
                        </select>
                    </div>
                    {/* Status */}
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
                        <select id="status" value={status} onChange={e => setStatus(e.target.value)} className="w-full p-2 rounded bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary">
                            <option>Draft</option>
                            <option>Published</option>
                            <option>Archived</option>
                        </select>
                    </div>
                </div>
                {/* Description (full width) */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={3} className="w-full p-2 rounded bg-light-bg dark:bg-dark-bg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" variant="primary">Save Course</Button>
                </div>
            </form>
        </Modal>
    );
};

export default Courses;