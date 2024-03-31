import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';

type AppScreenProps = {
  filmCardsNumber: number;
}

function App({ filmCardsNumber }: AppScreenProps): JSX.Element {
  return (
    <WelcomeScreen filmCardsNumber={filmCardsNumber} />
  );
}

export default App;
