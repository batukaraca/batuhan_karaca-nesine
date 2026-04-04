import { useEffect } from 'react';
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

const expectedGroupIds = ['1', '5', '3', '2', '4', '6'];

const BetsList = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((state) => state.bets);

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
            <li key={bet.NID} className='bets'>
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
                      return <MatchResult key={groupId} group={group} />;

                    case '5':
                      return <TotalGoals key={groupId} group={group} />;

                    case '3':
                      return <HandicapBet key={groupId} group={group} />;

                    case '2':
                      return <DoubleChance key={groupId} group={group} />;

                    case '4':
                      return <BothTeamsScore key={groupId} group={group} />;

                    case '6':
                      return <RestBets/>;

                    default:
                      return null;
                  }
                })}

              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BetsList;