import { FaHeart } from "react-icons/fa";
import { songProps } from "../types/song.type";

export const SongExpandedCard = ({ name, artist, url, img }: songProps) => {
  return (
    <div className="d-flex justify-content-between mt-2">
      <div className="p-2  w-100 rounded-2">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div
              style={{
                width: "60px",
                height: "60px",
                background: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className="bg-primary rounded me-3"
            ></div>
            <div className="d-flex align-items-left flex-column ">
              <div>{name}</div>
              <div>{artist}</div>
            </div>
          </div>
          <FaHeart color={"#1DB954"} className="mt-1 me-4 fs-5" />
        </div>
      </div>
    </div>
  );
};
