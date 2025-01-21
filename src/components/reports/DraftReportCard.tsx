import React from 'react';
import { Clock, Edit2, Trash2 } from 'lucide-react';
import type { Report } from '../../types';

interface DraftReportCardProps {
  report: Report;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function DraftReportCard({ report, onEdit, onDelete }: DraftReportCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-gray-900">{report.rub_amet.title}</h3>
            <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
              Draft
            </span>
          </div>
          <p className="text-sm text-gray-600 mt-1">{report.melekia}</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>{new Date(report.tera_kutr).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(report.id)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(report.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}