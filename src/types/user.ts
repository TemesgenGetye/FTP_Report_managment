export interface User {
  email: string;
  head_office: string;
  id: string;
  name: string;
  role: string;
  title: string;
}

export const HEAD_OFFICE_OPTIONS = [
  { id: "sp1", label: "Strategic Planner", value: "strategic_planner" },
  { id: "vp1", label: "Vice President", value: "vice_president" },
  { id: "din1", label: "DIN", value: "din" },
];
