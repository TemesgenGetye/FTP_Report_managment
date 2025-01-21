import React from "react";
import DraftReportCard from "./DraftReportCard";
import type { Report } from "../../types";

interface DraftReportListProps {
  reports: Report[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function DraftReportList({
  reports,
  onEdit,
  onDelete,
}: DraftReportListProps) {
  if (reports?.length === 0) {
    return (
      <div className=" p-4 bg-white rounded-lg shadow">
        <p className="text-red-400">No draft reports found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {reports?.map((report) => (
        <DraftReportCard
          key={report.id}
          report={report}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
