import { OCG } from '../../utils/bets';

const OCGItem = ({ OCG }: { OCG?: Record<string, OCG> }) => {
  if (!OCG) return null;

  const OCGgroups = Object.values(OCG);
  const OCGFirst = OCGgroups[0]?.MBS ?? null;

  return (
    <div key={OCGgroups[0]?.ID} className='bets-container__inside tac'>
      <div className='bets-container__inside-header'>
      </div>
      <div className='bets-container__inside-value'>
        {OCGFirst}
      </div>
    </div>
  );
};

export default OCGItem;
