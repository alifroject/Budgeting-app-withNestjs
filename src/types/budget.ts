export interface BudgetItem {
  id: number;
  name: string;
  category: string;
  limitAmount: number;
  startDate: string;
  endDate: string;
  createdAt?: string;
  isRecurring: boolean;
}