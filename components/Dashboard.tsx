import React, { useState, useEffect, useMemo } from 'react';
import { Users, DollarSign, AlertCircle, Plus } from 'lucide-react';
import { Student, Stats } from '../types';
import { LOCAL_STORAGE_KEY } from '../constants';
import StatsCard from './StatsCard';
import StudentFormModal from './StudentFormModal';
import StudentList from './StudentList';

const Dashboard: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        setStudents(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse student data", e);
      }
    }
  }, []);

  // Save to local storage whenever students change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(students));
  }, [students]);

  // Calculate statistics
  const stats: Stats = useMemo(() => {
    return students.reduce(
      (acc, student) => ({
        totalStudents: acc.totalStudents + 1,
        totalFees: acc.totalFees + student.totalFees,
        totalDue: acc.totalDue + student.dueFees,
        totalCollected: acc.totalCollected + student.paidFees,
      }),
      { totalStudents: 0, totalFees: 0, totalDue: 0, totalCollected: 0 }
    );
  }, [students]);

  const handleAddStudent = (studentData: Omit<Student, 'id' | 'dateAdded'>) => {
    const newStudent: Student = {
      ...studentData,
      id: crypto.randomUUID(),
      dateAdded: Date.now(),
    };
    setStudents((prev) => [newStudent, ...prev]);
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Are you sure you want to remove this student?')) {
      setStudents((prev) => prev.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 pb-20">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500 mt-1">Overview of student fees status</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            <span className="font-semibold">Add Student</span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard
            title="Total Students"
            value={stats.totalStudents}
            icon={Users}
            colorClass="bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-500/30"
            subValue="Active Records"
          />
          <StatsCard
            title="Total Fees Expected"
            value={`$${stats.totalFees.toLocaleString()}`}
            icon={DollarSign}
            colorClass="bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/30"
            subValue={`Collected: $${stats.totalCollected.toLocaleString()}`}
          />
          <StatsCard
            title="Total Due Fees"
            value={`$${stats.totalDue.toLocaleString()}`}
            icon={AlertCircle}
            colorClass="bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/30"
            subValue="Pending Collection"
          />
        </div>

        {/* List Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-4 ml-1">Student Records</h2>
          <StudentList students={students} onDelete={handleDeleteStudent} />
        </div>
      </div>

      <StudentFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddStudent} 
      />
    </div>
  );
};

export default Dashboard;