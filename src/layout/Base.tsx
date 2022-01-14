import { Header } from "./Header";

const Base = ({ children }: any) => {
  return (
    <div className="container-fluid">
      <Header></Header>
      <div>{children}</div>
    </div>
  );
};

export default Base;
