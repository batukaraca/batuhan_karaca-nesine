import { Bets } from "../../utils/bets";

export const fetchBetsAPI = async (): Promise<Bets[]> => {
  const response = await fetch('https://nesine-case-study.onrender.com/bets');

  if (!response.ok) {
    throw new Error('Bets verisi alÄ±namadÄ±');
  }

  const data = await response.json();

  return data;
};
