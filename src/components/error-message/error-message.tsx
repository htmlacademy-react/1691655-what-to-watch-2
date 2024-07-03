import { useAppSelector } from '../../hooks';
import './error-message.css';

export function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state.error);

  if (!error) {
    return null;
  }

  console.log('error message..', error);

  return (
    <div className='error-message'>{error}</div>
  );
}
