import { useEffect, useState } from "react";
import { FaFileAlt, FaClock, FaCheckSquare, FaExclamationTriangle } from "react-icons/fa";
import LoadingSpinner from "../components/common/LoadingSpinner";
import {
  deleteReport,
  getAllReports,
  getDraftReports,
  getSubmittedReports,
} from "../api/reports";
import ReportList from "../components/reports/ReportList";

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

export default function Dashboard() {
  const [allReports, setAllReports] = useState([]);
  const [draftReportsCount, setDraftReportsCount] = useState(0);
  const [submittedReportsCount, setSubmittedReportsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchReports() {
    setIsLoading(true);
    try {
      const allReportsResponse = (await getAllReports());
      const draftReportsResponse = await getDraftReports();
      const submittedReportsResponse = await getSubmittedReports();

      
      if (allReportsResponse.success) {
        setAllReports(allReportsResponse.data?.report || []);
      }
      
      if (draftReportsResponse.success) {
        setDraftReportsCount(draftReportsResponse.data?.report?.length || 0);
      }
      
      if (submittedReportsResponse.success) {
        setSubmittedReportsCount(submittedReportsResponse.data?.report?.length || 0);
      }
      console.log("All Reports Response:", allReportsResponse);
      console.log("Draft Reports Response:", draftReportsResponse,draftReportsCount);
      console.log("Submitted Reports Response:", submittedReportsResponse, submittedReportsCount);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setIsLoading(false);
    }
  }
  
  useEffect(() => {
    fetchReports();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  const stats = [
    {
      icon: FaFileAlt,
      label: "Total Reports",
      value: allReports.length,
      color: "bg-blue-500",
    },
    {
      icon: FaClock,
      label: "Draft Reports",
      value: draftReportsCount,
      color: "bg-yellow-500",
    },
    {
      icon: FaCheckSquare,
      label: "Submitted",
      value: submittedReportsCount,
      color: "bg-green-500",
    },
    {
      icon: FaExclamationTriangle,
      label: "Pending Review",
      value: 0, // Placeholder, update with real data if needed
      color: "bg-red-500",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Reports List */}
      <ReportList
        reports={allReports.slice(0, 5)}
        onDelete={async (id: string) => {
          try {
            await deleteReport(id);
            fetchReports(); // Refresh after deletion
          } catch (error) {
            console.error("Error deleting report:", error);
          }
        }}
      />
    </div>
  );
}
