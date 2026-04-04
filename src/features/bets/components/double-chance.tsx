import { OCG } from '../../../utils/bets';

const matchDoubleChanceColumns = [
  { id: '3', label: '1-X' },
  { id: '4', label: '1-2' },
  { id: '5', label: 'X-2' },
];

export const DoubleChance = ({ group }: { group?: OCG }) => {
  const items = Object.values(group?.OC || {});

  return (
    <>
      {matchDoubleChanceColumns.map((column) => {
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