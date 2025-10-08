'use client'

import { Edit, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils/formatDate';

export default function InvoicesTable({ invoices, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-[#6998AB]/30 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-[#406882]">
            <tr>
              <th className="px-6 py-4 text-white font-semibold">Customer</th>
              <th className="px-6 py-4 text-white font-semibold">Amount</th>
              <th className="px-6 py-4 text-white font-semibold">Date</th>
              <th className="px-6 py-4 text-white font-semibold">Status</th>
              <th className="px-6 py-4 text-white font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id} className="border-t border-[#E7F1F6] hover:bg-[#EAF3F7] transition">
                <td className="px-6 py-4 text-[#1A374D]">{inv.customer?.name}</td>
                <td className="px-6 py-4 text-[#406882]">${inv.amount}</td>
                <td className="px-6 py-4 text-[#406882]">{formatDate(inv.invoice_date)}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${inv.status === 'paid' ? 'bg-[#6998AB] text-white' : 'bg-[#E38E49] text-white'}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => onEdit(inv)} className="text-[#406882] hover:opacity-80 transition">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => onDelete(inv.id)} className="text-red-500 hover:opacity-80 transition">
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


