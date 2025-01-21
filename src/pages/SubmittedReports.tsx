import React, { useEffect } from "react";
import ReportList from "../components/reports/ReportList";
import { deleteReport, getSubmittedReports } from "../api/reports";
import LoadingSpinner from "../components/common/LoadingSpinner";

export default function SubmittedReports() {
  const [submitedReports, setSubmitedReports] = React.useState(null);
  const [isloading, setIsLoading] = React.useState(false);
  console.log(submitedReports);

  async function fetchReports() {
    setIsLoading(true);
    try {
      const reports = await getSubmittedReports();
      setSubmitedReports(reports?.data?.report);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  if (isloading) return <LoadingSpinner />;

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this report?")) {
      return;
    }
    deleteReport(id);
    fetchReports();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Submitted Reports</h1>
      <ReportList reports={submitedReports || []} onDelete={handleDelete} />
    </div>
  );
}
