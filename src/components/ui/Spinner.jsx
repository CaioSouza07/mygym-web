import { SyncLoader } from "react-spinners";

function Spinner() {
  const override = {
    display: "block",
    margin: "0 auto",
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center backdrop-blur-xs bg-black/20 z-9999">
      <SyncLoader
        color="#FFCC00"
        loading={true}
        cssOverride={override}
        size={15}
        aria-label="Loading Spinner"
      />
    </div>
  );
}

export default Spinner;
