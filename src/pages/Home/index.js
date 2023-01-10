import Styles from "./Home.module.scss";
import clsx from "clsx";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { useRef, useState, createContext, useEffect, useContext } from "react";
import { currentID } from "../../App";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";

function Home(props) {
  const cx = classNames.bind(Styles);

  const [songs, setSongs] = useState([]);
  const [singers, setSingers] = useState([]);
  const [songList, setSongList] = useState([]);

  const test = [1, 2, 3, 4, 5, 6];
  const rd = Math.floor(Math.random() * (singers.length - 1)) + 1;
  const current = useContext(currentID);

  const refSlider = useRef();
  const refList = useRef([]);
  const refListContainer = useRef();
  const shuffleSongs = useRef();
  const refArtistContainer = useRef();
  const refListArtist = useRef([]);

  const randomBg = singers.filter((singer, index) => {
    return singer.id == rd;
  });

  useEffect(() => {
    refSlider.current = setInterval(() => {
      let itemList = document.querySelectorAll("#item");
      document.querySelector("#slider").appendChild(itemList[0]);
    }, 3000);

    return () => {
      clearInterval(refSlider.current);
    };
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/singers")
      .then((res) => res.json())
      .then((data) => {
        setSingers((prev) => [...prev, ...data]);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/songs")
      .then((res) => res.json())
      .then((data) => {
        setSongs((prev) => [...prev, ...data]);
        shuffleSongs.current = songs.sort((a, b) => 0.5 - Math.random());
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/songs")
      .then((res) => res.json())
      .then((data) => {
        let data2 = data.sort((a, b) => 0.5 - Math.random());
        setSongList((prev) => [...prev, ...data2]);
      });
  }, []);

  const handleClick = (id) => {
    props.sendData(id);
  };
  const handleRight = () => {
    const a = document.querySelectorAll("#hello");
    const b = document.querySelector("#goodbye");
    b.appendChild(a[0]);
  };
  const handleRightArtist = () => {
    const a = document.querySelectorAll("#artistitem");
    const b = document.querySelector("#artistlist");
    b.appendChild(a[0]);
  };
  

  return (
    <div className={clsx(cx("container"))}>
      <div className={clsx(cx("random-bar"))}>
        <div id="slider" className={clsx(cx("random-bar-header"))}>
          <div id="item" className={clsx(cx("random-bar-header-item"))}>
            <img src="https://vcdn1-giaitri.vnecdn.net/2020/03/06/TaylorSwift-1583461602-2814-1583461788.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=saCN0gu1ejADmfNdT4rh3A"></img>
          </div>
          <div id="item" className={clsx(cx("random-bar-header-item"))}>
            <img src="https://media.npr.org/assets/img/2021/07/26/montero-4b7ce0698887de0895d0abc675de6057fd0c5520.jpg"></img>
          </div>
          <div id="item" className={clsx(cx("random-bar-header-item"))}>
            <img src="https://cdnimg.vietnamplus.vn/uploaded/hotnnz/2022_09_26/blackpink.jpg"></img>
          </div>
          <div id="item" className={clsx(cx("random-bar-header-item"))}>
            <img src="https://yt3.ggpht.com/ytc/AMLnZu_rkOQP282cWp5MJLwUAHdVgJ9QqmO8Y4xmJk92vQ=s900-c-k-c0x00ffffff-no-rj"></img>
          </div>
          <div id="item" className={clsx(cx("random-bar-header-item"))}>
            <img src="https://avatar-ex-swe.nixcdn.com/singer/avatar/2020/09/01/0/6/f/2/1598941770952_600.jpg"></img>
          </div>
        </div>
        <div className={clsx(cx("list-random"))}>
          {test.map((item, index) => {
            return songs
              .filter((song, index1) => {
                return song.id == item;
              })
              .map((item2, index2) => {
                return (
                  <div
                    key={item2.id}
                    onClick={() => handleClick(item2.id)}
                    className={clsx(cx("item-random"), {
                      [Styles.playingsong]: item2.id === current ? true : false,
                    })}
                  >
                    <p>0{index + 1}</p>
                    <img src={item2.thumbnail}></img>
                    <div className={clsx(cx("item-random-info"))}>
                      <p>{item2.name}</p>
                      <p>{item2.singer}</p>
                    </div>
                  </div>
                );
              });
          })}
        </div>
      </div>
      <div
        style={
          randomBg.length == 0
            ? { backgroundImage: "none" }
            : {
                backgroundImage: `url(${randomBg[0].cover})`,
                backgroundRepeat: "repeat-y",
              }
        }
        className={clsx(cx("content"))}
      >
        <div className={clsx(cx("bg2"))}>
          {randomBg.length == 0 ? null : (
            <>
              <div className={clsx(cx("info-random-singer"))}>
                <p className={clsx(cx("name-info"))}>{randomBg[0].name}</p>
                <p className={clsx(cx("info"))}>INFO</p>
                <button className={clsx(cx("btn-allsong"))}>ALL SONGS</button>
              </div>
              <div className={clsx(cx("pupolar-songs"))}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 15px",
                  }}
                >
                  <h3>Popular Songs</h3>
                  <div>
                    <BsChevronLeft />
                    <BsChevronRight onClick={handleRight} />
                  </div>
                </div>
                <div
                  id="goodbye"
                  ref={refListContainer}
                  className={clsx(cx("pupolar-songs-list"))}
                >
                  {songList.map((item, index) => {
                    return (
                      <div
                        onClick={() => handleClick(item.id)}
                        key={index}
                        ref={(el) => (refList.current[index] = el)}
                        id="hello"
                        className={clsx(cx("pupolar-songs-item"))}
                      >
                        <img src={item.thumbnail}></img>
                        <p className={clsx(cx("name"))}>{item.name}</p>
                        <p className={clsx(cx("singer"))}>{item.singer}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={clsx(cx("pupolar-artists"))}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 15px",
                  }}
                >
                  <h3>Popular Artists</h3>
                  <div>
                    <BsChevronLeft />
                    <BsChevronRight onClick={handleRightArtist} />
                  </div>
                </div>
                <div
                  id="artistlist"
                  ref={refArtistContainer}
                  className={clsx(cx("pupolar-artists-list"))}
                >
                  {singers.map((item, index) => {
                    return (
                      <div
                        key={index}
                        ref={(el) => (refListArtist.current[index] = el)}
                        id="artistitem"
                        className={clsx(cx("pupolar-artists-item"))}
                      >
                        <img src={item.avatar}></img>
                        <p className={clsx(cx("name-artist"))}>{item.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Home;
