import React from 'react';
import { FileText, Clock, CheckSquare, AlertTriangle } from 'lucide-react';

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

const ReportList = ({ reports }: any) => (
  <div className="bg-white rounded-lg shadow">
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>
      <div className="space-y-4">
        {reports.map((report: any) => (
          <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">{report.title}</h3>
              <p className="text-sm text-gray-600">{report.creator}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${
              report.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
              report.status === 'Submitted' ? 'bg-green-100 text-green-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {report.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const stats = [
    { icon: FileText, label: 'Total Reports', value: '156', color: 'bg-blue-500' },
    { icon: Clock, label: 'Draft Reports', value: '23', color: 'bg-yellow-500' },
    { icon: CheckSquare, label: 'Submitted', value: '89', color: 'bg-green-500' },
    { icon: AlertTriangle, label: 'Pending Review', value: '12', color: 'bg-red-500' },
  ];

  const recentReports = [
    { id: 1, title: 'Q1 Performance Report', creator: 'Sarah Johnson', status: 'Submitted' },
    { id: 2, title: 'Department Budget Review', creator: 'Mike Chen', status: 'Draft' },
    { id: 3, title: 'Strategic Planning Update', creator: 'Emily Davis', status: 'In Review' },
    { id: 4, title: 'Annual Compliance Report', creator: 'Alex Thompson', status: 'Submitted' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
      <ReportList reports={recentReports} />
    </div>
  );
}