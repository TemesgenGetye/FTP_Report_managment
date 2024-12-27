import React from 'react';
import { FileText, Clock, CheckSquare, AlertTriangle } from 'lucide-react';
import type { Report } from '../types';

const StatCard = ({ icon: Icon, label, value, color }: any) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const RecentReports = ({ reports }: { reports: Report[] }) => (
  <div className="bg-white rounded-lg shadow">
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">{report.rub_amet.title}</h3>
              <p className="text-sm text-gray-600">{report.creator}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              report.draft ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
            }`}>
              {report.draft ? 'Draft' : 'Submitted'}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [reports, setReports] = React.useState<Report[]>([]);
  const [stats, setStats] = React.useState({
    total: 0,
    drafts: 0,
    submitted: 0,
    pending: 0
  });

  const statCards = [
    { icon: FileText, label: 'Total Reports', value: stats.total, color: 'bg-blue-500' },
    { icon: Clock, label: 'Draft Reports', value: stats.drafts, color: 'bg-yellow-500' },
    { icon: CheckSquare, label: 'Submitted', value: stats.submitted, color: 'bg-green-500' },
    { icon: AlertTriangle, label: 'Pending Review', value: stats.pending, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <RecentReports reports={reports} />
    </div>
  );
}