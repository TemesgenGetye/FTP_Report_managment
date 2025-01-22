export interface User {
  email: string;
  head_office: string;
  id: string;
  name: string;
  role: string;
  title: string;
}
// Individual (University Staff/Student)
// Immediate Supervisor
// Department Head (Dean)
// Vice Dean
// Director of Academic Affairs
// Vice President (University Leadership)
// Strategic Planner
// University President
// Ministerial Advisor
// Director General (Ministry Level)
// Minister of Education (or Relevant Government Minister)
// Cabinet Secretary
// Senior Policy Advisor (Prime Minister’s Office)
// Prime Minister
// Speaker of the House
// House of People's Representatives (Parliament)

export const HEAD_OFFICE_OPTIONS = [
  { id: "individual1", label: "Individual", value: "individual" },
  {
    id: "imm_sup1",
    label: "Immediate Supervisor",
    value: "immediate_supervisor",
  },
  { id: "dep_head1", label: "Department Head", value: "department_head" },
  { id: "vice_dean1", label: "Vice Dean", value: "vice_dean" },
  { id: "dir_acad1", label: "Director of Academic Affairs", value: "dir_acad" },
  { id: "din1", label: "DIN", value: "din" },
  { id: "vp1", label: "Vice President", value: "vice_president" },
  { id: "sp1", label: "Strategic Planner", value: "strategic_planner" },
  { id: "president1", label: "University President", value: "president" },
  { id: "minister1", label: "Ministerial Advisor", value: "minister" },
  { id: "dir_gen1", label: "Director General", value: "dir_gen" },
  { id: "minister2", label: "Minister of Education", value: "minister_edu" },
  { id: "cabinet1", label: "Cabinet Secretary", value: "cabinet_secretary" },
  { id: "senior1", label: "Senior Policy Advisor", value: "senior_policy" },
  { id: "prime1", label: "Prime Minister", value: "prime_minister" },
  { id: "speaker1", label: "Speaker of the House", value: "speaker" },
  { id: "house1", label: "House of People's Representatives", value: "house" },
];

export const ROLE_OPTIONS = [];
