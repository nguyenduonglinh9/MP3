import Styles from "./LayoutMain.module.scss";
import clsx from "clsx";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useRef, useState, createContext, useEffect } from "react";
import {
  BsSkipStartFill,
  BsSkipEndFill,
  BsFillPlayCircleFill,
  BsPauseCircleFill,
  BsFillVolumeUpFill,
  BsShuffle,
  BsArrowRepeat,
  BsArrowClockwise,
} from "react-icons/bs";

function LayoutMain({ children, currentSong, controlCurrentSong }) {
  const cx = classNames.bind(Styles);
  //useRef
  const ElementAudio = useRef();
  const music1 = useRef();
  const refAudio = useRef();
  const refRange = useRef();
  let newCurrentIndex = useRef();
  //userState
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCircle, setIsCircle] = useState(false);
  const [currentTimeAudio, setCurrentTimeAudio] = useState(0);
  const [loop, setLoop] = useState(false);
  const [random, setRandom] = useState(false);

  //useEffect
  useEffect(() => {
    fetch("http://localhost:3001/songs")
      .then((res) => res.json())
      .then((data) => {
        setSongs((prev) => [...prev, ...data]);
      });
  }, []);

  useEffect(() => {
    if (ElementAudio.current != null) {
      ElementAudio.current.play();
      setIsPlaying(true);
      setIsCircle(true);
      music1.current.style.opacity = "1";
    } else {
      console.log("");
    }
  }, [currentSong]);

  const handlePlay = () => {
    if (isPlaying == false) {
      ElementAudio.current.play();
      setIsPlaying(true);
      setIsCircle(true);
      music1.current.style.opacity = "1";
    } else {
      ElementAudio.current.pause();
      setIsPlaying(false);
      setIsCircle(false);
      music1.current.style.opacity = "0";
    }
  };

  const handleNextSong = () => {
    if (random == false) {
      controlCurrentSong(currentSong + 1);
      setIsPlaying(true);
      setIsCircle(true);
      music1.current.style.opacity = "1";
    }
    else {
      do {
        newCurrentIndex.current = parseInt(Math.random() * songs.length);
        console.log(newCurrentIndex.current);
      } while (newCurrentIndex.current == currentSong);
      controlCurrentSong(newCurrentIndex.current);
      setIsPlaying(true);
      setIsCircle(true);
      music1.current.style.opacity = "1";
    }
  };

  const handleCurrentTime = (e) => {
    refRange.current.value = (e.target.currentTime / e.target.duration) * 100;
    if (loop == false) {
      if (refRange.current.value == 100) {
        if (random == false) {
          controlCurrentSong(currentSong + 1);
        }
        else {
          do {
            newCurrentIndex.current = parseInt(Math.random() * songs.length);
            console.log(newCurrentIndex.current);
          } while (newCurrentIndex.current == currentSong);
          controlCurrentSong(newCurrentIndex.current);
        }
      }
    }
  };

  const handleLoopSong = () => {
    if (loop == false) {
      ElementAudio.current.loop = true;
      setLoop(true);
    } else {
      ElementAudio.current.loop = false;
      setLoop(false);
    }
  };

  const handleRandomSong = () => {
    if (random == false) {
       setRandom(true);
    }
    else {
      setRandom(false)
    }
  };
  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("content"))}>{children}</div>
      <div className={clsx(cx("control-bar"))}>
        {songs
          .filter((song, index) => {
            return song.id === currentSong;
          })
          .map((item, index) => {
            return (
              <div className={clsx(cx("info-song"))}>
                <div ref={music1} className={clsx(cx("music-animation"))}>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <img
                  className={clsx({
                    [Styles.activecircle]: isCircle,
                  })}
                  src={item.thumbnail}
                ></img>
                <div>
                  <p>{item.name}</p>
                  <p>{item.singer}</p>
                </div>
              </div>
            );
          })}
        <div className={clsx(cx("control-bar-control"))}>
          <BsSkipStartFill
            style={{
              color: "white",
              width: "30px",
              height: "30px",
              margin: "0px 10px",
            }}
          />

          <div style={{ position: "relative", width: "30px", height: "30px" }}>
            <BsFillPlayCircleFill
              className={clsx({
                [Styles.iconplay]: isPlaying,
              })}
              style={{
                color: "white",
                width: "30px",
                height: "30px",
                position: "absolute",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
              }}
              onClick={handlePlay}
            />
            <BsPauseCircleFill
              className={clsx({
                [Styles.iconplay]: !isPlaying,
              })}
              style={{
                color: "white",
                width: "30px",
                height: "30px",
                position: "absolute",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
              }}
              onClick={handlePlay}
            />
          </div>
          <BsSkipEndFill
            style={{
              color: "white",
              width: "30px",
              height: "30px",
              margin: "0px 10px",
            }}
            onClick={handleNextSong}
          />
          <input
            type="range"
            value="0"
            step="1"
            min="0"
            max="100"
            ref={refRange}
            className={clsx(cx("slider"))}
          />
          {songs
            .filter((item, index) => {
              return item.id == currentSong;
            })
            .map((item2, index2) => {
              return (
                <audio
                  onTimeUpdate={(e) => handleCurrentTime(e)}
                  src={item2.path}
                  ref={ElementAudio}
                ></audio>
              );
            })}
        </div>
        <div className={clsx(cx("control-bar-control2"))}>
          <BsArrowClockwise
            style={{
              color: "white",
              width: "20px",
              height: "20px",
              margin: "0px 10px",
              transition: "all 1.5s cubic-bezier(0.075, 0.82, 0.165, 1)",
            }}
            onClick={handleLoopSong}
            className={clsx({
              [Styles.loop]: loop,
            })}
          />
          <BsShuffle
            style={{
              color: "white",
              width: "20px",
              height: "20px",
              margin: "0px 10px",
            }}
            onClick={handleRandomSong}
            className={clsx({
              [Styles.random]: random,
            })}
          />
          <BsFillVolumeUpFill
            style={{
              color: "white",
              width: "20px",
              height: "20px",
              margin: "0px 10px",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LayoutMain;
