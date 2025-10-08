'use client'
import React, { useState, useEffect } from 'react';
import { Users, FileText, DollarSign, CheckCircle, XCircle, Plus } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import CustomersTable from '@/components/custom/CustomersTable';
import InvoicesTable from '@/components/custom/InvoicesTable';
import EditModal from '@/components/custom/EditModal';
import { fetchStats as apiFetchStats, fetchCustomers as apiFetchCustomers, fetchInvoices as apiFetchInvoices, upsertEntity, deleteEntity } from '@/server/api';

export default function BillingDashboard() {
  const [stats, setStats] = useState({});
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const [s, c, i] = await Promise.all([
      apiFetchStats(),
      apiFetchCustomers(),
      apiFetchInvoices(),
    ]);
    setStats(s);
    setCustomers(c);
    setInvoices(i);
  };

  const openModal = (type, item = null) => {
    setModalType(type);
    setShowModal(true);
    setFormError('');
    if (item) {
      setEditId(item.id);
      setFormData(item);
    } else {
      setEditId(null);
      setFormData(type === 'customer' ? { name: '', email: '', phone: '' } : { customer_id: '', amount: '', status: 'unpaid', invoice_date: '' });
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({});
    setEditId(null);
    setFormError('');
  };

  const handleSubmit = async () => {
    try {
      await upsertEntity(modalType, editId, formData);
      closeModal();
      init();
    } catch (err) {
      // Laravel validation structure: { message, errors: { field: [msg] } }
      if (err && err.errors) {
        const msgs = Object.values(err.errors).flat();
        setFormError(msgs.join('\n'));
      } else if (err && err.message) {
        setFormError(err.message);
      } else {
        setFormError('Request failed.');
      }
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Are you sure?')) return;
    try {
      await deleteEntity(type, id);
      init();
    } catch (_) {}
  };

  return (
    <div className="min-h-screen bg-[#B1D0E0]">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#1A374D] mb-2">Billing Dashboard</h1>
          <p className="text-[#406882]">Manage your customers and invoices</p>
        </div>

        <div className="flex flex-wrap gap-3 md:gap-4 mb-8">
          <button onClick={() => setActiveTab('dashboard')} className={`px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-medium transition border ${activeTab === 'dashboard' ? 'bg-[#406882] text-white border-[#406882]' : 'bg-white text-[#1A374D] border-[#6998AB] hover:bg-[#B1D0E0]'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('customers')} className={`px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-medium transition border ${activeTab === 'customers' ? 'bg-[#406882] text-white border-[#406882]' : 'bg-white text-[#1A374D] border-[#6998AB] hover:bg-[#B1D0E0]'}`}>Customers</button>
          <button onClick={() => setActiveTab('invoices')} className={`px-5 md:px-6 py-2.5 md:py-3 rounded-lg font-medium transition border ${activeTab === 'invoices' ? 'bg-[#406882] text-white border-[#406882]' : 'bg-white text-[#1A374D] border-[#6998AB] hover:bg-[#B1D0E0]'}`}>Invoices</button>
        </div>

        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <StatCard icon={<Users className="w-10 h-10 text-[#406882]" />} label="Total Customers" value={stats.total_customers || 0} />
            <StatCard icon={<FileText className="w-10 h-10 text-[#406882]" />} label="Total Invoices" value={stats.total_invoices || 0} />
            <StatCard icon={<DollarSign className="w-10 h-10 text-[#406882]" />} label="Total Revenue" value={`$${stats.total_revenue || 0}`} />
            <StatCard icon={<CheckCircle className="w-10 h-10 text-[#406882]" />} label="Paid Invoices" value={stats.paid_invoices || 0} />
            <StatCard icon={<XCircle className="w-10 h-10 text-[#406882]" />} label="Unpaid Invoices" value={stats.unpaid_invoices || 0} />
          </div>
        )}

        {activeTab === 'customers' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-[#1A374D]">Customers</h2>
              <button onClick={() => openModal('customer')} className="bg-[#406882] hover:brightness-95 text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2 transition w-full sm:w-auto">
                <Plus className="w-5 h-5" /> Add Customer
              </button>
            </div>

            <CustomersTable
              customers={customers}
              onEdit={(c) => openModal('customer', c)}
              onDelete={(id) => handleDelete('customer', id)}
            />
          </div>
        )}

        {activeTab === 'invoices' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-[#1A374D]">Invoices</h2>
              <button onClick={() => openModal('invoice')} className="bg-[#406882] hover:brightness-95 text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2 transition w-full sm:w-auto">
                <Plus className="w-5 h-5" /> Add Invoice
              </button>
            </div>

            <InvoicesTable
              invoices={invoices}
              onEdit={(inv) => openModal('invoice', inv)}
              onDelete={(id) => handleDelete('invoice', id)}
            />
          </div>
        )}

        {showModal && (
          <EditModal
            type={modalType}
            customers={customers}
            formData={formData}
            setFormData={setFormData}
            error={formError}
            onSubmit={handleSubmit}
            onClose={closeModal}
            isEditing={!!editId}
          />
        )}
      </div>
    </div>
  );
}