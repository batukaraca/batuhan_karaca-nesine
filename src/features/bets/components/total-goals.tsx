import { OCG } from '../../../utils/bets';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { toggleBetSelection, selectBetByNid } from '../betsSlice';

const matchTotalGoalsColumns = [
  { id: '25', label: 'Alt' },
  { id: '26', label: 'Üst' },
];

export const TotalGoals = ({ group, nid }: { group?: OCG; nid: string }) => {
  const dispatch = useAppDispatch();
  const selectedBet = useAppSelector(selectBetByNid(nid));
  const items = Object.values(group?.OC || {});

  return (
    <>
      {matchTotalGoalsColumns.map((column) => {
        const item = items.find((entry) => entry.ID === column.id);
        const isEmpty = !item?.O;
        const isSelected = selectedBet?.ocgId === group?.ID && selectedBet?.ocId === column.id;

        return (
          <div key={`${group?.ID}-${column.id}`} className='bets-container__inside tac'>
            <div className='bets-container__inside-header'>
              {item?.N ?? column.label}
            </div>
            <div
              className={[
                'bets-container__inside-value',
                isEmpty ? 'bets-container__inside-value--empty' : '',
                isSelected ? 'bets-container__inside-value--selected' : '',
              ].filter(Boolean).join(' ')}
              onClick={isEmpty ? undefined : () => dispatch(toggleBetSelection({
                nid, ocgId: group?.ID ?? '', ocId: column.id, odds: item?.O ?? ''
              }))}
            >
              {item?.O ?? ''}
            </div>
          </div>
        );
      })}
    </>
  );
};
