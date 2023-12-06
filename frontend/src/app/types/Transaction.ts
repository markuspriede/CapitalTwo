export interface ITransaction {
  date: string,
  name: string,
  amount: number,
  ID: number,
  subscription: Boolean,
  category: string,
  budget: string,
  id?: number,
  budgetId: number,
  subscriptionId: number
}