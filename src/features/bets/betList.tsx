import { useEffect, memo } from 'react';
import { fetchBets } from './betsSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import OCGItem from './ocgItem';
import { MatchResult } from './components/macth-result';
import './bets.scss';
import { TotalGoals } from './components/total-goals';
import { HandicapBet } from './components/handicap-bet';
import { DoubleChance } from './components/double-chance';
import { BothTeamsScore } from './components/both-teams-goal';
import { RestBets } from './components/rest-bets';
import { Bets } from '../../utils/bets';

const expectedGroupIds = ['1', '5', '3', '2', '4', '6'];

const BetRow = memo(({ bet }: { bet: Bets }) => {
  return (
    <li className='bets'>
      <div className='bets-container'>
        <div className='bets-container__inside'>
          <div className='bets-container__inside-header'>
            {bet.D} {bet.DAY} {bet.LN}
          </div>
          <div className='bets-container__inside-value'>
            <strong>{bet.C}</strong> {bet.T} {bet.N}
          </div>
        </div>

        <div className='bets-container__inside tac'>
          <div className='bets-container__inside-header'>
            Yorumlar
          </div>
          <div className='bets-container__inside-value'>
            Yorumlar
          </div>
        </div>

        <OCGItem OCG={bet.OCG} />

        {expectedGroupIds.map((groupId) => {
          const group = Object.values(bet.OCG).find((item) => item.ID === groupId);

          switch (groupId) {
            case '1':
              return <MatchResult key={groupId} group={group} nid={bet.NID} />;

            case '5':
              return <TotalGoals key={groupId} group={group} nid={bet.NID} />;

            case '3':
              return <HandicapBet key={groupId} group={group} nid={bet.NID} />;

            case '2':
              return <DoubleChance key={groupId} group={group} nid={bet.NID} />;

            case '4':
              return <BothTeamsScore key={groupId} group={group} nid={bet.NID} />;

            case '6':
              return <RestBets key={groupId} />;

            default:
              return null;
          }
        })}

      </div>
    </li>
  );
});

const BetsList = () => {
  const dispatch = useAppDispatch();
  const items   = useAppSelector((state) => state.bets.items);
  const loading = useAppSelector((state) => state.bets.loading);
  const error   = useAppSelector((state) => state.bets.error);

  useEffect(() => {
    dispatch(fetchBets());
  }, [dispatch]);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div>
      {items.length === 0 ? (
        <p>Veri yok</p>
      ) : (
        <ul style={{ padding: 0 }}>
          {items.map((bet) => (
            <BetRow key={bet.NID} bet={bet} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default BetsList;