export interface ICard {
    id: number;
    label: string;
    labelColor: string;
    value: number;
}

export interface ICountryData {
    country: string;
    cases: number;
    confirmed: number;
    deaths: number;
    recovered: number;
    updated_at: string;
  }
