import { useAppSelector } from '../../hooks';
import './error-message.css';

export function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state.error);

  if (!error) {
    return null;
  }

  return (
    <div className='error-message'>{error}</div>
  );
}
