import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = function (component: JSX.Element) {
  return (
    <HelmetProvider>
      <BrowserRouter>{component}</BrowserRouter>
    </HelmetProvider>
  );
};
