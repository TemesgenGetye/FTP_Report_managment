import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ label, ...props }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        {...props}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <label htmlFor={props.id} className="ml-2 block text-sm text-gray-900">
        {label}
      </label>
    </div>
  );
};
