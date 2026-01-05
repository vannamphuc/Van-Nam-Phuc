export interface Token {
  currency: string;
  price: number;
}

export interface TokenWithIcon extends Token {
  icon: string;
  symbol: string;
}

export interface PriceResponse {
  [key: string]: {
    price: number;
  };
}
