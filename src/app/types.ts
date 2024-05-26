// app/types.ts

export interface Report {
    id: number;
    reporter: {
      id_User: string;
      full_name: string;
      email: string;
    };
    reportedUser: {
      id_User: string;
      full_name: string;
      email: string;
    };
    reason: string;
    comment?: string;
    report_Status: string;
    createdAt: string;
    bus?: {
      id_Bus: number;
      bus_Number: number;
      bus_Name: string;
    };
  }
  