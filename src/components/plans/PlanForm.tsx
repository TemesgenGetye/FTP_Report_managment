import React, { useState, useEffect } from "react";
import { Plan } from "../../types/FormData";
import { Select } from "../Select"; // Assuming you have a Select component
import { getUserByRole } from "../../api/user"; // Assuming this function exists to fetch users based on role

interface PlanFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  fetchPlans: () => void;
}

const PlanForm: React.FC<PlanFormProps> = ({ setShowForm, fetchPlans }) => {
  const [formData, setFormData] = useState({
    creator: localStorage.getItem("name") || "",
    fetsami: "",
    gib: "",
    id: "",
    kibdet: "",
    melekia: "",
    receiver: "",
    rub_amet: {
      ekid: "",
      title: "",
    },
    tera_kutr: "",
    yearly_status: {
      last_year: "",
      current_year: "",
    },
  });

  const [options, setOptions] = useState<any[]>([]);
  const [toFetch, setToFetch] = useState<string>("none");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetching the options based on role
  useEffect(() => {
    if (localStorage.getItem("role") === "strategic_planner") {
      setToFetch("vice_president");
    } else if (localStorage.getItem("role") === "vice_president") {
      setToFetch("din");
    } else if (localStorage.getItem("role") === "din") {
      setToFetch("none");
    }
  }, []);

  useEffect(() => {
    async function fetchOptions() {
      try {
        setIsLoading(true);
        const response = await getUserByRole(toFetch); // Assuming this function fetches users based on role
        setOptions(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOptions();
  }, [toFetch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRubAmetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      rub_amet: {
        ...prevState.rub_amet,
        [name]: value,
      },
    }));
  };

  const handleYearlyStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      yearly_status: {
        ...prevState.yearly_status,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null); // Reset the error

    // Prepare the data for submission
    const planData: Plan = {
      creator: formData.creator,
      fetsami: formData.fetsami,
      gib: formData.gib,
      id: formData.id,
      kibdet: formData.kibdet,
      melekia: formData.melekia,
      receiver: formData.receiver,
      rub_amet: formData.rub_amet,
      tera_kutr: formData.tera_kutr,
      yearly_status: formData.yearly_status,
    };

    try {
      const response = await fetch("https://strategic-plan-dun.vercel.app/plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planData),
      });

      if (!response.ok) {
        throw new Error("Failed to create plan");
      }

      // Successfully created plan, fetch the updated plans
      fetchPlans();
      setShowForm(false); // Close the form
    } catch (error) {
      setError("An error occurred while submitting the plan. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <h1 className="text-2xl font-bold text-gray-900">Create New Plan</h1>
      {error && <div className="text-red-500 text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Creator */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Creator</label>
          <input
            type="text"
            name="creator"
            value={formData.creator}
            readOnly
            className="mt-1 p-3 w-full border rounded-md bg-gray-100 text-gray-500"
            disabled
          />
        </div>

        {/* Receiver */}
        <div>
          {isLoading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : (
            <Select
              label="Receiver"
              name="receiver"
              options={options?.map((opt) => ({
                id: opt?.id,
                label: opt?.name,
                value: opt?.id,
              }))}
              required
              value={formData.receiver}
              onChange={handleChange}
              className="mt-1 p-3 w-full border rounded-md bg-gray-50"
            />
          )}
        </div>

        {/* Fetsami */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Fetsami</label>
          <input
            type="text"
            name="fetsami"
            value={formData.fetsami}
            onChange={handleChange}
            className="mt-1 p-3 w-full border rounded-md bg-gray-50"
          />
        </div>

        {/* Gib */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Gib</label>
          <input
            type="text"
            name="gib"
            value={formData.gib}
            onChange={handleChange}
            className="mt-1 p-3 w-full border rounded-md bg-gray-50"
          />
        </div>

        {/* Kibdet */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Kibdet</label>
          <input
            type="text"
            name="kibdet"
            value={formData.kibdet}
            onChange={handleChange}
            className="mt-1 p-3 w-full border rounded-md bg-gray-50"
          />
        </div>

        {/* Melekia */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Melekia</label>
          <input
            type="text"
            name="melekia"
            value={formData.melekia}
            onChange={handleChange}
            className="mt-1 p-3 w-full border rounded-md bg-gray-50"
          />
        </div>

        {/* Rub Amet */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Rub Amet - Ekid</label>
          <input
            type="text"
            name="ekid"
            value={formData.rub_amet.ekid}
            onChange={handleRubAmetChange}
            className="mt-1 p-3 w-full border rounded-md bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Rub Amet - Title</label>
          <input
            type="text"
            name="title"
            value={formData.rub_amet.title}
            onChange={handleRubAmetChange}
            className="mt-1 p-3 w-full border rounded-md bg-gray-50"
          />
        </div>

        {/* Tera Kutr */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Tera Kutr</label>
          <input
            type="text"
            name="tera_kutr"
            value={formData.tera_kutr}
            onChange={handleChange}
            className="mt-1 p-3 w-full border rounded-md bg-gray-50"
          />
        </div>

        {/* Yearly Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Current Year Status</label>
          <input
            type="text"
            name="current_year"
            value={formData.yearly_status.current_year}
            onChange={handleYearlyStatusChange}
            className="mt-1 p-3 w-full border rounded-md bg-gray-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Last Year Status</label>
          <input
            type="text"
            name="last_year"
            value={formData.yearly_status.last_year}
            onChange={handleYearlyStatusChange}
            className="mt-1 p-3 w-full border rounded-md bg-gray-50"
          />
        </div>

        <div className="flex justify-between items-center space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlanForm;
