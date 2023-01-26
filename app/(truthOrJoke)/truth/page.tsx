import TruthOrJoke from '../../components/TruthOrJoke';
import moment from 'moment';

export default function Page() {
  const today = moment().set('date', 1).format().slice(0, 10);

  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <TruthOrJoke today={today} cond="truth" />
    </div>
  );
}
