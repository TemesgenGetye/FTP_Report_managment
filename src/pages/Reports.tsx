import React, { useEffect } from "react";
import ReportList from "../components/reports/ReportList";
import ReportForm from "../components/reports/ReportForm";
import { deleteReport, getAllReports } from "../api/reports";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function Reports() {
  const [showForm, setShowForm] = React.useState(false);
  const [allReports, setAllReports] = React.useState(null);
  const [isloading, setIsLoading] = React.useState(false);

  async function fetchReports() {
    setIsLoading(true);
    try {
      const reports = await getAllReports();
      setAllReports(reports?.data?.report);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  if (isloading) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {showForm ? "View Reports" : "Create Report"}
        </button>
      </div>

      {showForm ? (
        <ReportForm setShowForm={setShowForm} fetchReports={fetchReports} />
      ) : (
        <ReportList
          reports={allReports || []}
          onDelete={(id: string) => {
            deleteReport(id);
            fetchReports();
          }}
        />
      )}
    </div>
  );
}
