import { ComponentType, useState } from 'react';

type HOCProps = {
  isPlayerActive: boolean;
  onMouseOver: () => void;
  onMouseLeave: () => void;
  renderPlayer: () => JSX.Element;
}

function withVideoPlayer<T>(Component: ComponentType<T>): ComponentType<Omit<T, keyof HOCProps>> {

  type ComponentProps = Omit<T, keyof HOCProps>

  function WithVideoPlayer(props: ComponentProps): JSX.Element {

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
        {...props as T}
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
  }

  return WithVideoPlayer;
}

export default withVideoPlayer;
