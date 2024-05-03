import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Not Found (404)</h1>
      <div className="container">
        <b className="not-found__status">404. Page not found</b>
        <br />
        <Link className="not-found__back-to-main" to="/">Back to main page</Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
