import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCurrentFilm } from '../../store/app-data/selectors';
import { toast } from 'react-toastify';
import { SyntheticEvent, useRef, useState } from 'react';
import Spinner from '../../components/spinner/spinner';
import { formatTime } from '../../utils/utils';
import { AppRoute } from '../../const';

function PlayerPage(): JSX.Element {
  const { id } = useParams();
  const currentFilm = useAppSelector(getCurrentFilm);

  if (currentFilm.id !== id) {
    toast.warn('данный фильм не загружен..');
  }

  const playerRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setPlayStatus] = useState(true);
  const [isLoading, setLoadingStatus] = useState(true);

  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(playerRef.current?.duration ?? 0);

  const onTimeUpdateHandler = (
    event: SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    setTimeLeft(event.currentTarget.duration - event.currentTarget.currentTime);
    setProgress(
      (event.currentTarget.currentTime / event.currentTarget.duration) * 100
    );
  };

  const playAndPauseFilm = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
        setPlayStatus(false);
      } else {
        playerRef.current.play();
        setPlayStatus(true);
      }
    }
  };

  return (
    <div className="player">
      {isLoading && <Spinner />}

      <video
        ref={playerRef}
        id="video_player"
        className="player__video"
        poster={currentFilm.posterImage}
        src={currentFilm.videoLink}
        onLoadedData={() => setLoadingStatus(false)}
        onTimeUpdate={(event) => onTimeUpdateHandler(event)}
        autoPlay
        loop
      />

      <Link to={id ? `/film/${id}` : AppRoute.Root}>
        <button type="button" className="player__exit">
          Exit
        </button>
      </Link>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              className="player__progress"
              value={progress}
              max="100"
            >
            </progress>
            <div className="player__toggler" style={{ left: `${progress}%` }}>
              Toggler
            </div>
          </div>
          <div className="player__time-value">{formatTime(timeLeft)}</div>
        </div>

        <div className="player__controls-row">
          <button
            type="button"
            className="player__play"
            onClick={playAndPauseFilm}
          >
            {isPlaying ? (
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#pause"></use>
              </svg>
            ) : (
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
            )}
            <span>Play</span>
          </button>
          <div className="player__name">{currentFilm.name}</div>

          <button type="button" className="player__full-screen">
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;
