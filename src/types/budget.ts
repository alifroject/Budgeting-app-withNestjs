export interface BudgetItem {
  id: number;
  title: string;
  category: string;
  limitAmount: number;
  startDate: string;
  endDate: string;
  createdAt?: string;
}