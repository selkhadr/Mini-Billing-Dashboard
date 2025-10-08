'use client'

export default function EditModal({ type, customers, formData, setFormData, error, onSubmit, onClose, isEditing }) {
  return (
    <div className="fixed inset-0 bg-[#6998AB]/20 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-colors">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-[#D9E9CF]">
        <h3 className="text-2xl font-bold text-[#1A374D] mb-6">
          {isEditing ? 'Edit' : 'Add'} {type === 'customer' ? 'Customer' : 'Invoice'}
        </h3>
        {error && (
          <div className="mb-6 rounded-lg border border-red-500 bg-red-50 text-red-700 px-4 py-3 whitespace-pre-line">
            {error}
          </div>
        )}
        <div>
          {type === 'customer' ? (
            <>
              <input
                type="text"
                placeholder="Name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white text-[#2B2B2B] border border-[#D9E9CF] mb-4 focus:outline-none focus:border-[#96A78D]"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white text-[#2B2B2B] border border-[#D9E9CF] mb-4 focus:outline-none focus:border-[#96A78D]"
              />
              <input
                type="text"
                placeholder="Phone"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white text-[#2B2B2B] border border-[#D9E9CF] mb-4 focus:outline-none focus:border-[#96A78D]"
              />
            </>
          ) : (
            <>
              <select
                value={formData.customer_id || ''}
                onChange={(e) => setFormData({ ...formData, customer_id: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white text-[#2B2B2B] border border-[#D9E9CF] mb-4 focus:outline-none focus:border-[#96A78D]"
              >
                <option value="">Select Customer</option>
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <input
                type="number"
                step="0.01"
                placeholder="Amount"
                value={formData.amount || ''}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white text-[#2B2B2B] border border-[#D9E9CF] mb-4 focus:outline-none focus:border-[#96A78D]"
              />
              <input
                type="date"
                value={formData.invoice_date || ''}
                onChange={(e) => setFormData({ ...formData, invoice_date: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white text-[#2B2B2B] border border-[#D9E9CF] mb-4 focus:outline-none focus:border-[#96A78D]"
              />
              <select
                value={formData.status || 'unpaid'}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white text-[#2B2B2B] border border-[#D9E9CF] mb-4 focus:outline-none focus:border-[#96A78D]"
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
              </select>
            </>
          )}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button onClick={onSubmit} className="flex-1 bg-[#96A78D] hover:brightness-95 text-white px-6 py-3 rounded-lg font-medium transition">
              {isEditing ? 'Update' : 'Create'}
            </button>
            <button onClick={onClose} className="flex-1 bg-white border border-[#D9E9CF] hover:bg-[#D9E9CF] text-[#2B2B2B] px-6 py-3 rounded-lg font-medium transition">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


