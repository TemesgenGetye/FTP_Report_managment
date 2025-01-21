import React, { useEffect, useState } from "react";
import PlanList from "../components/plans/PlanList";
import PlanForm from "../components/plans/PlanForm";
import { Plan } from "../types/FormData";  // Ensure this type matches the structure of the plan data
import LoadingSpinner from "../components/common/LoadingSpinner";

const Plans: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [allPlans, setAllPlans] = useState<Plan[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);  // For error handling
  const [isNameAvailable, setIsNameAvailable] = useState<boolean>(true);  // To check if "name" exists in localStorage

  // Function to fetch the plans from the API
  async function fetchPlans() {
    setIsLoading(true);
    setError(null); // Reset error message on new fetch

    // Check if "name" exists in localStorage
    const name = localStorage.getItem("id");
    if (!name) {
      setIsNameAvailable(false);
      setIsLoading(false);
      return; // If no name, stop the function and prevent further processing
    }

    try {
      const response = await fetch("https://strategic-plan-dun.vercel.app/plans");
      if (!response.ok) {
        throw new Error("Failed to fetch plans");
      }
      const plans: Plan[] = await response.json();
      console.log("plans",plans)

      // Filter the plans based on the receiver value from localStorage
      const filteredPlans = plans.filter((plan) => plan.receiver === name);
      setAllPlans(filteredPlans);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setError("An error occurred while fetching plans. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  // // Function to delete a plan from the API
  // const handleDelete = async (id: string) => {
  //   const confirmation = window.confirm("Are you sure you want to delete this plan?");
  //   if (!confirmation) return;

  //   try {
  //     const response = await fetch(`https://strategic-plan-dun.vercel.app/plans/${id}`, {
  //       method: "DELETE",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to delete the plan");
  //     }

  //     // Update the UI by removing the deleted plan
  //     setAllPlans((prevPlans) => prevPlans?.filter((plan) => plan.id !== id) || []);
  //   } catch (error) {
  //     console.error("Error deleting plan:", error);
  //     setError("An error occurred while deleting the plan. Please try again later.");
  //   }
  // };

  // Fetch plans when the component is mounted
  useEffect(() => {
    fetchPlans();
  }, []);

  // Handle the case where "name" is not available in localStorage
  if (!isNameAvailable) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Plans</h1>
        <p className="text-red-500">
          No name found in localStorage. Please log in to continue.
        </p>
      </div>
    );
  }

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-end items-center">
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          {showForm ? "View Plans" : "Create Plan"}
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-center">{error}</div>
      )}

      {showForm ? (
        <PlanForm setShowForm={setShowForm} fetchPlans={fetchPlans} />
      ) : (
        <>
          {allPlans && allPlans.length > 0 ? (
            <PlanList plans={allPlans}/>
          ) : (
            <div className="text-center text-gray-500">No plans available</div>
          )}
        </>
      )}
    </div>
  );
};

export default Plans;
