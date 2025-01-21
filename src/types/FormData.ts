export interface FormData {
  fetsami: string;
  gib: string;
  kibdet: string;
  melekia: string;
  receiver: string;
  rub_amet: {
    title: string;
    afetsatsem: string;
    ekid: string;
    kinwn: string;
    remark: string;
  };
  tera_kutr: string;
  yearlyStatus: {
    current_year: string;
    last_year: string;
  };
}

export interface Plan {
  id: string;
  creator: string;
  fetsami: string;
  gib: string;
  kibdet: string;
  melekia: string;
  receiver: string;
  rub_amet: {
    ekid: string;
    title: string;
  };
  tera_kutr: string;
  yearly_status: {
    last_year: string;
    current_year: string;
  };
}