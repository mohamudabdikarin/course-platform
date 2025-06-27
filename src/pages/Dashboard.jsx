// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { FiUsers, FiStar, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';
import Card from '../components/common/Card';
import Spinner from '../components/common/Spinner';
import { getDashboardStats, getFeedback, getActivityData } from '../utils/mockApi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '../context/ThemeContext';

const StatCard = ({ icon, title, value, color }) => {
  const Icon = icon;
  return (
    <Card>
      <div className="flex items-center">
        <div className={`p-3 rounded-full mr-4`} style={{ backgroundColor: `${color}20` }}>
          <Icon size={24} style={{ color }} />
        </div>
        <div>
          <p className="text-sm text-light-subtext dark:text-dark-subtext">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </div>
    </Card>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [feedback, setFeedback] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, feedbackData, activityData] = await Promise.all([
          getDashboardStats(),
          getFeedback(),
          getActivityData(),
        ]);
        setStats(statsData);
        setFeedback(feedbackData.slice(0, 3)); // Show latest 3
        setActivity(activityData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full"><Spinner size="lg" /></div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Welcome back, Instructor!</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard icon={FiUsers} title="Total Students" value={stats.totalStudents} color="#4F46E5" />
        <StatCard icon={FiStar} title="Average Rating" value={`${stats.avgRating} / 5.0`} color="#F59E0B" />
        <StatCard icon={FiMessageSquare} title="Recent Feedback" value={feedback.length} color="#EC4899" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Activity Chart */}
        <Card className="lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Student Activity (Last 7 Days)</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={activity}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}/>
                <XAxis dataKey="name" stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
                <YAxis stroke={theme === 'dark' ? '#9CA3AF' : '#6B7280'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
                    borderColor: theme === 'dark' ? '#374151' : '#E5E7EB'
                  }}
                />
                <Legend />
                <Bar dataKey="activity" fill="#4F46E5" name="Engagement" />
                <Bar dataKey="enrollments" fill="#EC4899" name="New Enrollments" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Feedback */}
        <Card>
          <h3 className="text-xl font-semibold mb-4">Recent Feedback</h3>
          <ul className="space-y-4">
            {feedback.map(item => (
              <li key={item.id} className="border-l-4 border-primary pl-4">
                <p className="font-semibold">{item.student}</p>
                <div className="flex items-center text-yellow-500 my-1">
                  {[...Array(item.rating)].map((_, i) => <FiStar key={i} fill="currentColor" />)}
                  {[...Array(5 - item.rating)].map((_, i) => <FiStar key={i} />)}
                </div>
                <p className="text-sm text-light-subtext dark:text-dark-subtext italic">"{item.comment.substring(0, 50)}..."</p>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;