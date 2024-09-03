import { render, screen } from '@testing-library/react';
import Logo from './logo';
import { withRouter } from '../utils/mock-components';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const logoString = 'W T W';
    const preparedComponent = withRouter(<Logo />);

    render(preparedComponent);

    expect(screen.getByRole('link', {name: logoString})).toBeInTheDocument();
  });
});
