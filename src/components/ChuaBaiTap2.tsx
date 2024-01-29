import { useEffect, useState } from "react";
import "./Main.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addPlayer,
  changePoint,
  getPlayer,
} from "../store/reducer/playerSlice";

const ChuaBaiTap2 = () => {
  const [newPlayer, setNewPlayer] = useState("");
  const [flag, setFlag] = useState(false);
  const dataPlayer: any = useSelector((state: any) => {
    return state.playerSlices.player;
  });
  console.log(dataPlayer);
  const maxPoint = useSelector((state: any) => {
    return state.playerSlices.maxPoint;
  });
  console.log(maxPoint);
  const dispatch = useDispatch();

  const handleAddPlayer = () => {
    dispatch(addPlayer(newPlayer));
  };

  const handleTang = (id: number) => {
    let newPoint = {
      id,
      check: "increase",
    };
    dispatch(changePoint(newPoint));
    setFlag(!flag)
  };

  const handleGiam = (id: number) => {
    let newPoint = {
      id,
      check: "hieungou",
    };
    dispatch(changePoint(newPoint));
    setFlag(!flag)
  };

  useEffect(() => {
    dispatch(getPlayer());
  }, [flag]);

  return (
    <>
      <div id="container">
        <div className="header">
          <div className="header__left">
            <p className="header__left__p">Players:</p>
            <p className="header__left__p">Total Points:</p>
          </div>
          <div className="header__mid">
            <h1>Bảng điểm</h1>
          </div>
          <div className="header__right"></div>
        </div>
        <div className="main">
          {dataPlayer.map((item: any, index: number) => {
            return (
              <div key={index}>
                <button onClick={() => handleGiam(item.id)}>Giam</button>
                <p style={{ color: maxPoint == item.point ? "red" : "" }}>
                  {item.point}
                </p>
                <button onClick={() => handleTang(item.id)}>Tang</button>
              </div>
            );
          })}
        </div>
        <div className="footer">
          <div className="footer__left">
            <input
              type="text"
              className="footer__left__input"
              placeholder="Enter name"
              onChange={(e) => setNewPlayer(e.target.value)}
              value={newPlayer}
            />
          </div>
          <div className="footer__right">
            <button className="btn text-red-500" onClick={handleAddPlayer}>
              ADD PLAYER
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChuaBaiTap2;
