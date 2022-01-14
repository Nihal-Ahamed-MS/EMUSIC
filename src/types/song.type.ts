export type songProps = {
  id: string;
  name: string;
  url: string;
  artist: string;
  img: string;
};

export type playlistProps = [
  {
    name: string;
    url: string;
    color?: string;
    artist: string;
    img: string;
  }
];

export type isPlayerInMobileView = {
  mobileView: boolean;
};

export type playerImageControl = {
  width: string;
  height: string;
  url: string;
};
