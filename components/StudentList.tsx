import React from 'react';
import { Trash2, Phone, AlertCircle, CheckCircle } from 'lucide-react';
import { Student } from '../types';

interface StudentListProps {
  students: Student[];
  onDelete: (id: string) => void;
}

const StudentList: React.FC<StudentListProps> = ({ students, onDelete }) => {
  if (students.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center mt-8">
        <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
          <AlertCircle size={48} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700">No students found</h3>
        <p className="text-gray-500 mt-2">Start by adding a new student to the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl overflow-hidden mt-8 shadow-xl border-0">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-indigo-50/50 border-b border-gray-200">
              <th className="px-6 py-4 text-xs font-semibold text-indigo-800 uppercase tracking-wider">Name / Mobile</th>
              <th className="px-6 py-4 text-xs font-semibold text-indigo-800 uppercase tracking-wider text-right">Total Fees</th>
              <th className="px-6 py-4 text-xs font-semibold text-indigo-800 uppercase tracking-wider text-right">Paid</th>
              <th className="px-6 py-4 text-xs font-semibold text-indigo-800 uppercase tracking-wider text-right">Due</th>
              <th className="px-6 py-4 text-xs font-semibold text-indigo-800 uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-indigo-50/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">{student.name}</span>
                    <span className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                      <Phone size={12} /> {student.mobile}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-medium text-gray-700">
                  ${student.totalFees.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right text-green-600 font-medium">
                  ${student.paidFees.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-bold ${
                    student.dueFees > 0 
                      ? 'bg-red-100 text-red-600' 
                      : 'bg-green-100 text-green-600'
                  }`}>
                    {student.dueFees > 0 ? (
                      <>${student.dueFees.toLocaleString()}</>
                    ) : (
                      <><CheckCircle size={14} /> Paid</>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => onDelete(student.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Remove Student"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;