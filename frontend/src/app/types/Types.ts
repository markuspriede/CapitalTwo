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

export interface ICustomSubCard {
  subscription_name: string;
  price: number;
  description?: string;
  routine: string;
  icon_path: string;
  id: number;
  date?: string;
}

export interface IBudgetItem {
  id: number;
  category: string,
  assigned: string,
  spent: string,
  available: string,
}

export interface SubTotalCard {
  title: string;
  priceDisplay: number
  subtitle: string
}