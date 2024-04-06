import WelcomePage from '../../pages/welcome-page/welcome-screen';

type AppScreenProps = {
  filmCardsNumber: number;
}

function App({ filmCardsNumber }: AppScreenProps): JSX.Element {
  return (
    <WelcomePage filmCardsNumber={filmCardsNumber} />
  );
}

export default App;
