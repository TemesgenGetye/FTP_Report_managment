import React from "react";
import { Trash2 } from "lucide-react";
import type { Report } from "../../types";

interface ReportListProps {
  reports: Report[];
  onDelete: (id: string) => void;
}

interface displayOverallStatusProps {
  ekid: number;
  kiniwn: number;
}

const DisplayOverallStatus = ({ ekid, kiniwn }: displayOverallStatusProps) => {
  const result = (kiniwn / ekid) * 100;

  return (
    <div
      className={`${
        result >= 75
          ? "bg-green-300"
          : result >= 50
          ? "bg-yellow-200 "
          : "bg-red-500"
      }  px-5 py-2 rounded-xl text-black `}
    >
      {" "}
      {result.toFixed()}
    </div>
  );
};

export default function ReportList({ reports, onDelete }: ReportListProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y border divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ተራ ቁቁጥር
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ዋና ዋና ተግባራት
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ፈፃሚ
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ግብ
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ክብደት
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                መለኪያ
              </th>
              <th
                colSpan={4}
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ሩብ አመት
              </th>
              <th
                colSpan={2}
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                አመታዊ እቅድ
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
            <tr>
              <th
                scope="col"
                colSpan={6}
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              ></th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                አፈጻጸም
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                እቅድ
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ክንውን
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Remark
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                የዘንድሮ አመት እቅድ
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ያለፈው አመት መነሻ 
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!reports.length && (
              <tr className="text-center mt-4 w-full text-red-400">
                <td className="px-6 py-4 whitespace-nowrap ">
                  No reports yet
                </td>
              </tr>
            )}

            {reports.map((report) => (
              <tr key={report.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {report.tera_kutr || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {report.rub_amet.title || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.fetsami || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.gib || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.kibdet || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.melekia || "N/A"}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.rub_amet.afetsatsem || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.rub_amet.ekid || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.rub_amet.kinwn || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.rub_amet.remark || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.yearlyStatus.current_year || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {report.yearlyStatus.last_year || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <DisplayOverallStatus
                    ekid={parseFloat(report.rub_amet.ekid)}
                    kiniwn={parseFloat(report.rub_amet.kinwn)}
                  />
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      if (
                        !window.confirm(
                          "Are you sure you want to delete this report?"
                        )
                      ) {
                        return;
                      }
                      onDelete(report.id);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
