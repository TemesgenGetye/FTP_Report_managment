import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import DraftReportList from "../components/reports/DraftReportList";
import ReportForm from "../components/reports/ReportForm";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import { deleteReport, getDraftReports } from "../api/reports";

export default function DraftReports() {
  const [showForm, setShowForm] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [draftReports, setDraftReports] = useState<Report[]>([]);
  const [isloading, setIsLoading] = React.useState(false);
  const [isBeingEdited, setIsBeingEdited] = useState(true);

  async function fetchReports() {
    setIsLoading(true);
    try {
      const reports = await getDraftReports();
      setDraftReports(reports?.data?.report);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  const handleEdit = (id: string) => {
    setSelectedReport(id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this draft?")) {
      return;
    }
    const reponse = await deleteReport(id);
    if (reponse.success) {
      fetchReports();
    } else {
      setIsLoading(false);
      alert("Failed to delete report");
    }
  };

  const handleSave = async (data: any) => {
    console.log(data);
  };

  const handleSubmit = async (data: any) => {
    console.log(data);
  };

  if (isloading) return <LoadingSpinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Draft Reports</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          {showForm ? "View Reports" : "New Report"}
        </button>
      </div>

      {showForm ? (
        <ReportForm
          onSubmit={handleSubmit}
          onSave={handleSave}
          initialData={
            selectedReport
              ? draftReports.find((report) => report.id === selectedReport)
              : undefined
          }
          setShowForm={setShowForm}
          isBeingEdited={isBeingEdited}
          fetchReports={fetchReports}
        />
      ) : (
        <DraftReportList
          reports={draftReports ?? []}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
