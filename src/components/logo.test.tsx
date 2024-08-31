import { render, screen } from '@testing-library/react';
import Logo from './logo';
import { withRouter } from '../utils/mock-components';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const logoLetters = ['W', 'T'];
    const preparedComponent = withRouter(<Logo />);

    render(preparedComponent);

    try {
      screen
        .getAllByText(logoLetters[0])
        .map((el) => expect(el).toBeInTheDocument());
    } catch {
      throw new Error('Letter not found');
    }
    expect(screen.getByText(logoLetters[1])).toBeInTheDocument();
  });
});
