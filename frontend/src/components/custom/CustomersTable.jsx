'use client'

import { Edit, Trash2 } from 'lucide-react';

export default function CustomersTable({ customers, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-[#6998AB]/30 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#406882]">
            <tr>
              <th className="px-6 py-4 text-white font-semibold">Name</th>
              <th className="px-6 py-4 text-white font-semibold">Email</th>
              <th className="px-6 py-4 text-white font-semibold">Phone</th>
              <th className="px-6 py-4 text-white font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-t border-[#E7F1F6] hover:bg-[#EAF3F7] transition">
                <td className="px-6 py-4 text-[#1A374D]">{c.name}</td>
                <td className="px-6 py-4 text-[#406882]">{c.email}</td>
                <td className="px-6 py-4 text-[#406882]">{c.phone || '-'}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(c)} className="text-[#406882] hover:opacity-80 transition">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => onDelete(c.id)} className="text-red-500 hover:opacity-80 transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


