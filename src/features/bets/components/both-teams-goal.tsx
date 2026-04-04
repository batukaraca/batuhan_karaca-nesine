import { OCG } from '../../../utils/bets';

const matchBothTeamsScoreColumns = [
  { id: '1', label: 'Var' },
  { id: '2', label: 'Yok' },
];

export const BothTeamsScore = ({ group }: { group?: OCG }) => {

  const items = Object.values(group?.OC || {});

  return (
    <>
      {matchBothTeamsScoreColumns.map((column) => {
        const item = items.find((entry) => entry.ID === column.id);

        return (
          <div key={`${group?.ID}-${column.id}`} className='bets-container__inside tac'>
            <div className='bets-container__inside-header'>
              {item?.N ?? column.label}
            </div>
            <div className='bets-container__inside-value'>
              {item?.O ?? ''}
            </div>
          </div>
        );
      })}
    </>
  );
};