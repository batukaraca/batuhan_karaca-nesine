export interface Bets {
  C: string;
  N: string;
  TYPE: string;
  NID: string;
  D: string;
  T: string;
  DAY: string;
  S: string;
  LN: string;
  IMF: boolean;
  OCG: Record<string, OCG>;
  HEC: boolean;
}

export interface OCG {
  ID: string;
  N: string;
  MBS: string;
  SO: number;
  OC: Record<string, OC>;
}

export interface OC {
  ID: string;
  O: string;
  N: string;
  MBS: string;
  G: string;
  OD: number;
  IMF: boolean;
}

export interface SelectedBet {
  nid: string;
  ocgId: string;
  ocId: string;
  odds: string;
}