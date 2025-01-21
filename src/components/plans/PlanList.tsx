import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import type { Plan } from "../../types/FormData";  // Ensure this type matches your API response

interface PlanListProps {
  plans: Plan[];
  onDelete: (id: string) => void;
}


const PlanList: React.FC<PlanListProps> = ({ plans, onDelete }) => {
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
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ሩብ አመት
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!plans.length && (
              <tr className="text-center mt-4 w-full text-red-400">
                <td className="px-6 py-4 whitespace-nowrap " colSpan={8}>
                  No plans yet
                </td>
              </tr>
            )}

            {plans.map((plan) => (
              <tr key={plan.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {plan.id || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {plan.fetsami || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {plan.gib || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {plan.kibdet || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {plan.melekia || "N/A"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {plan.rub_amet.title || "N/A"}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      onDelete(plan.id);
                    }}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FaTrashAlt className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanList;
