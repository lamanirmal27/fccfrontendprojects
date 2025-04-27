import { useState } from "react";
import Pad from "./components/Pad";
import Controller from "./components/Controller";

function App() {
  const [sample, setSample] = useState<string>("");
  return (
    <div
      id="drum-machine"
      className="h-[350px] w-[660px] bg-[#b3b3b3] text-white flex flex-row border-5 border-orange-400 border-solid"
    >
      <div className="w-[55%] h-full">
        <Pad setSample={setSample} />
      </div>
      <div className="w-[45%] h-full">
        <Controller sample={sample} />
      </div>
    </div>
  );
}

export default App;
