import { OCG } from '../../../utils/bets';

const matchHandicapColumns = [
  { id: '1', label: 'H1' },
  { id: '2', label: '1' },
  { id: '3', label: 'X' },
  { id: '4', label: '2' },
  { id: '5', label: 'H2' },
];

export const HandicapBet = ({ group }: { group?: OCG }) => {

  const items = Object.values(group?.OC || {});

  return (
    <>
      {matchHandicapColumns.map((column) => {
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