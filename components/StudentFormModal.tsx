import React, { useState, useEffect } from 'react';
import { X, Save, Calculator } from 'lucide-react';
import { Student } from '../types';

interface StudentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (student: Omit<Student, 'id' | 'dateAdded'>) => void;
}

const StudentFormModal: React.FC<StudentFormModalProps> = ({ isOpen, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [totalFees, setTotalFees] = useState<string>('');
  const [paidFees, setPaidFees] = useState<string>('');
  const [dueFees, setDueFees] = useState(0);

  // Auto-calculate due fees whenever total or paid changes
  useEffect(() => {
    const total = parseFloat(totalFees) || 0;
    const paid = parseFloat(paidFees) || 0;
    setDueFees(Math.max(0, total - paid));
  }, [totalFees, paidFees]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile || !totalFees) return;

    onSave({
      name,
      mobile,
      totalFees: parseFloat(totalFees),
      paidFees: parseFloat(paidFees) || 0,
      dueFees,
    });

    // Reset form
    setName('');
    setMobile('');
    setTotalFees('');
    setPaidFees('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="glass-card w-full max-w-md rounded-2xl relative z-50 overflow-hidden animate-fade-in">
        <div className="bg-indigo-600 p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calculator size={20} />
            Add New Student
          </h2>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white/50"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
            <input
              type="tel"
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white/50"
              placeholder="e.g. 9876543210"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Fees</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  min="0"
                  required
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white/50"
                  placeholder="0.00"
                  value={totalFees}
                  onChange={(e) => setTotalFees(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Paid Fees</label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  min="0"
                  required
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all bg-white/50"
                  placeholder="0.00"
                  value={paidFees}
                  onChange={(e) => setPaidFees(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex justify-between items-center">
            <span className="text-red-700 font-medium">Due Amount:</span>
            <span className="text-xl font-bold text-red-600">${dueFees.toLocaleString()}</span>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-2"
          >
            <Save size={20} />
            Save Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentFormModal;