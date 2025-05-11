export enum TabValue {
  Services = 0,
  Rentals = 1,
  Sales = 2,

}

export type Tab = { label: string; value: TabValue; paymentType: string};
