export interface Student {
  id: string;
  name: string;
  mobile: string;
  totalFees: number;
  paidFees: number;
  dueFees: number;
  dateAdded: number;
}

export type Stats = {
  totalStudents: number;
  totalFees: number;
  totalDue: number;
  totalCollected: number;
};