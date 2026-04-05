import { useAppSelector } from '../../../hooks/hooks';

export const BetCart = () => {
  const selectedBets = useAppSelector((state) => state.bets.selectedBets);
  const items = useAppSelector((state) => state.bets.items);

  const selections = Object.values(selectedBets).map((selected) => {
    const bet = items.find((match) => match.NID === selected.nid);
    const ocg = bet ? Object.values(bet.OCG).find((g) => g.ID === selected.ocgId) : undefined;
    return {
      nid: selected.nid,
      mbs: ocg?.MBS ?? '',
      matchName: `${bet?.C} ${bet?.N}`,
      odds: selected.odds,
    };
  });

  const totalOdds = selections
    .reduce((acc, s) => acc * parseFloat(s.odds), 1)
    .toFixed(2);

  if (selections.length === 0) return null;

  return (
    <div className='bet-cart'>
      <ul className='bet-cart__list'>
        {selections.map((s) => (
          <li key={s.nid} className='bet-cart__item'>
            <span>{s.mbs}</span>
            <span>Kod: {s.nid}</span>
            <span>Maç: {s.matchName}</span>
            <span><strong>Oran: {s.odds}</strong></span>
          </li>
        ))}
      </ul>
      <div className='bet-cart__total'>
        Toplam Tutar: <strong>{totalOdds} TL</strong>
      </div>
    </div>
  );
};
