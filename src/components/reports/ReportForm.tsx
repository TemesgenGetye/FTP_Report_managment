import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FormData } from "../../types/FormData";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { createReport, saveReport, submitReport } from "../../api/reports";

interface ReportFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  fetchReports: () => void;
  initialData: FormData;
  isBeingEdited: boolean;
}

const ReportForm: React.FC<ReportFormProps> = ({
  setShowForm,
  fetchReports,
  initialData,
  isBeingEdited,
}) => {
  const [isFormCreated, setIsFormCreated] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fetsami: "",
    gib: "",
    kibdet: "",
    melekia: "",
    receiver: "",
    rub_amet: {
      title: "",
      afetsatsem: "",
      ekid: "",
      kinwn: "",
      remark: "",
    },
    tera_kutr: "",
    yearlyStatus: {
      current_year: new Date().toISOString().split("T")[0],
      last_year: new Date().toISOString().split("T")[0],
    },
  });
  const [submitedOrDrafted, setSubmitedOrDrafted] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("rub_amet.")) {
      const field = name.split(".")[1] as keyof FormData["rub_amet"];
      setFormData((prev) => ({
        ...prev,
        rub_amet: {
          ...prev.rub_amet,
          [field]: value,
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else if (name.startsWith("yearlyStatus.")) {
      const field = name.split(".")[1] as keyof FormData["yearlyStatus"];
      setFormData((prev) => ({
        ...prev,
        yearlyStatus: {
          ...prev.yearlyStatus,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBeingEdited) {
      await submitReport(formData);
      alert("Report Edited successfully:");
      setShowForm(false);
      return;
    }
    const reponse = await submitReport(submitedOrDrafted);
    if (reponse.success) {
      alert("Report submitted successfully:");
      setShowForm(false);
      fetchReports();
    } else {
      alert("Failed to submit report:");
    }
  };

  async function handleSaveDraft(e: React.FormEvent) {
    e.preventDefault();
    if (isBeingEdited) {
      console.log("is Being Edited");
      console.log(formData);
      const response = await saveReport(formData);
      console.log(response);
      fetchReports();
      return;
    }
    const response = await saveReport(submitedOrDrafted);
    if (response.success) {
      alert("Report saved successfully:");
      setShowForm(false);
      fetchReports();
    } else {
      alert("Failed to save report:");
    }
  }
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const response = await createReport(formData);
    setIsFormCreated(true);
    setSubmitedOrDrafted({
      creator: response?.data?.report.creator,
      id: response?.data?.report.id,
      ...formData,
    });
    if (response.success) {
      alert("Report created successfully:");
    } else {
      alert("Failed to create report:");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Report Form
      </h2>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input
            label="Fetsami"
            name="fetsami"
            value={formData.fetsami || initialData?.fetsami}
            onChange={handleChange}
            placeholder="Fetsami"
          />

          <Input
            label="Gib"
            name="gib"
            value={formData.gib || initialData?.gib}
            onChange={handleChange}
            placeholder="Gib"
          />
        </div>

        <Input
          label="Kibdet"
          name="kibdet"
          value={formData.kibdet || initialData?.kibdet}
          onChange={handleChange}
          placeholder="Kibdet"
        />

        <Input
          label="Department"
          name="melekia"
          value={formData.melekia || initialData?.melekia}
          onChange={handleChange}
          placeholder="Department"
        />

        {/* <Input
            label="Receiver"
            name="receiver"
            value={formData.receiver}
            onChange={handleChange}
            placeholder="Receiver"
          /> */}

        <Input
          label="Tera Kutr"
          name="tera_kutr"
          value={formData.tera_kutr || initialData?.tera_kutr}
          onChange={handleChange}
          placeholder="Tera Kutr"
        />
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Rub Amet</h3>
        <div className="space-y-8">
          <Input
            label="Title"
            name="rub_amet.title"
            value={formData.rub_amet.title || initialData?.rub_amet?.title}
            onChange={handleChange}
            placeholder="Title"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Input
              label="Afetsatsem"
              name="rub_amet.afetsatsem"
              value={
                formData.rub_amet.afetsatsem ||
                initialData?.rub_amet?.afetsatsem
              }
              onChange={handleChange}
              placeholder="Afetsatsem"
            />

            <Input
              label="Ekid"
              name="rub_amet.ekid"
              value={formData.rub_amet.ekid || initialData?.rub_amet?.ekid}
              onChange={handleChange}
              placeholder="Ekid"
            />
          </div>

          <Input
            label="Kinwn"
            name="rub_amet.kinwn"
            value={formData.rub_amet.kinwn || initialData?.rub_amet?.kinwn}
            onChange={handleChange}
            placeholder="Kinwn"
          />

          <Input
            label="Remark"
            name="rub_amet.remark"
            value={formData.rub_amet.remark || initialData?.rub_amet?.remark}
            onChange={handleChange}
            placeholder="Remark"
          />
        </div>
      </div>
      {/* Yearly Status */}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700">Yearly Status</h3>

        {/* Current Year */}
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Current Year
          </label>
          <input
            type="date"
            name="yearlyStatus.current_year"
            value={
              formData.yearlyStatus.current_year ||
              initialData?.yearlyStatus?.current_year
            }
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        {/* Last Year */}
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700">
            Last Year
          </label>
          <input
            type="date"
            name="yearlyStatus.last_year"
            value={
              formData.yearlyStatus.last_year ||
              initialData?.yearlyStatus?.last_year
            }
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="mt-8 flex space-x-4">
        {!isFormCreated && !isBeingEdited ? (
          <Button
            type="button"
            onClick={handleCreate}
            className="flex-1 py-2 px-4 border border-green-500 rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Create
          </Button>
        ) : (
          <div className="flex item-center gap-2 justify-center">
            <p className="text-sm text-red-400">
              Do you want to save the form as a draft or Submit it?
            </p>
            <div className="flex gap-2 items-center justify-center">
              <Button
                type="submit"
                className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </Button>
              <Button
                type="button"
                onClick={handleSaveDraft}
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Draft
              </Button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default ReportForm;
