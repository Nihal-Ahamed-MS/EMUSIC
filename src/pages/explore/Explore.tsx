import React, { useState } from "react";
import { FaPlay, FaSearch } from "react-icons/fa";
import { searchQuery } from "./helper/exploreHelper";
import { useDispatch } from "react-redux";
import { setCurrentSong } from "../../redux/actions/song";
import Base from "../../layout/Base";
import { songProps } from "../../types/song.type";

const Explore = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState<songProps>();

  const dispatch = useDispatch();

  //To search a song
  const searchHandler = async (e: React.MouseEvent<SVGAElement>) => {
    e.preventDefault();
    if (searchText !== "") {
      searchQuery(searchText).then((res: any) => {
        if (Object.keys(res).length > 0) {
          setSearchResult(res);
        }
      });
    }
  };

  //Setting search result song to player.
  const setQueryResultToPlayer = () => {
    if (searchText !== null) {
      dispatch(setCurrentSong(searchResult));
    }
  };

  return (
    <Base>
      <div className="container">
        <div className="mt-5 d-flex align-items-start text-light flex-column">
          <div className="fs-1 fw-bold">EXPLORE</div>
          <div className="w-100 mt-2">
            <div id="searchContainer" className="bg-dark p-2 rounded">
              <div className="d-flex">
                <input
                  style={{
                    background: "none",
                    outline: "none",
                    border: "none",
                  }}
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  type="text"
                  placeholder="Search"
                  color="#fff"
                  className="text-left ps-2 text-white w-100"
                />
                <div
                  style={{ cursor: "pointer" }}
                  className="h-100 my-auto pe-2"
                >
                  <FaSearch onClick={searchHandler} color={"#fff"} />
                </div>
              </div>
            </div>
            <div className="w-100 mt-4">
              <div id="searchContainer" className="p-2 my-4 bg-warning rounded">
                Only few songs are added. To test search result use these name
                only. "Thean Kudika", "Muttu Muttu", "Believer", "Aluva Puzha",
                "Nee Paartha Vizhigal", "Aanandha Yazhai", "Ennamo Yeadho"
              </div>
              {searchResult ? (
                <div
                  id="searchContainer"
                  className="d-flex px-3 py-2 bg-dark justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        background: `url(${searchResult.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                      className="bg-primary rounded me-3"
                    ></div>
                    <div className="d-flex align-items-left flex-column ">
                      <div>{searchResult.name}</div>
                      <div>{searchResult.artist}</div>
                    </div>
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={setQueryResultToPlayer}
                  >
                    <FaPlay color={"#fff"} />
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Explore;
