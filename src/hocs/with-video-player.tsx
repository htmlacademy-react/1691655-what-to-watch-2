import { FunctionComponent, useState } from 'react';
import { FilmCardProps } from '../types/film';

type HOCProps = {
  isPlayerActive: boolean;
  onMouseOver: () => void;
  onMouseLeave: () => void;
  renderPlayer: () => JSX.Element;
}

function withVideoPlayer(Component: FunctionComponent<FilmCardProps>) {
  return function WrappedComponent(props: Omit<FilmCardProps, keyof HOCProps>) {
    const [playerVisible, setPlayerVisible] = useState(false);
    let timeout: ReturnType<typeof setTimeout>;

    const handleMouseOver = () => {
      timeout = setTimeout(
        () => {
          setPlayerVisible(true);
        },
        1000);
    };
    const handleMouseLeave = () => {
      clearTimeout(timeout);
      setPlayerVisible(false);
    };

    return (
      <Component
        {...props}
        isPlayerActive = {playerVisible}
        onMouseOver = {handleMouseOver}
        onMouseLeave = {handleMouseLeave}
        renderPlayer = {(src: string) => (
          <video
            style={{ width: '100%' }}
            autoPlay
            muted
          >
            <source src={src} type="video/mp4"/>
          </video>
        )}
      />
    );
  };
}

export default withVideoPlayer;
