export default function StatCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl p-6 shadow-xl bg-white border border-[#6998AB]/30">
      <div className="flex items-center justify-between mb-4">
        {icon}
        <span className="text-3xl font-bold text-[#1A374D]">{value}</span>
      </div>
      <p className="text-[#6998AB] text-lg">{label}</p>
    </div>
  );
}


