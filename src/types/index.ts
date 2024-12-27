export interface Report {
  id: string;
  creator: string;
  din_status: boolean;
  done: boolean;
  draft: boolean;
  fetsami: string;
  gib: string;
  kibdet: string;
  melekia: string;
  receiver: string;
  reciver_notified: boolean;
  rub_amet: {
    afetsatsem: string;
    ekid: string;
    kinwn: string;
    remark: string;
    title: string;
  };
  tera_kutr: string;
  vice_presedant: boolean;
  yearlyStatus: {
    current_year: string;
    last_year: string;
  };
}

export interface User {
  email: string;
  head_office: string;
  id: string;
  name: string;
  role: string;
  title: string;
}

export interface Notification {
  id: string;
  body: any;
  status: boolean;
  type: string;
  user_id: string;
}