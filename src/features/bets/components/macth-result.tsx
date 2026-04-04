import { OCG } from '../../../utils/bets';

const matchResultColumns = [
  { id: '0', label: '1' },
  { id: '1', label: 'X' },
  { id: '2', label: '2' },
];

export const MatchResult = ({ group }: { group?: OCG }) => {
  const items = Object.values(group?.OC || {});

  return (
    <>
      {matchResultColumns.map((column) => {
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