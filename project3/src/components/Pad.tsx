import { useEffect } from "react";
import Heater1 from "../audios/Heater1.mp3";
import Heater2 from "../audios/Heater2.mp3";
import Heater3 from "../audios/Heater3.mp3";
import Heater4 from "../audios/Heater4.mp3";
import Clap from "../audios/Clap.mp3";
import ClosedHH from "../audios/ClosedHH.mp3";
import Kick from "../audios/Kick.mp3";
import KicknHat from "../audios/KicknHat.mp3";
import OpenHH from "../audios/OpenHH.mp3";

interface padProps {
  setSample: (sample: string) => void;
}

const Pad: React.FC<padProps> = ({ setSample }) => {
  const keyToIdMap: { [key: string]: string } = {
    Q: "Heater-1",
    W: "Heater-2",
    E: "Heater-3",
    A: "Heater-4",
    S: "Clap",
    D: "Open-HH",
    Z: "Kick-n'-Hat",
    X: "Kick",
    C: "Closed-HH",
  };

  const handleClick = (text: string) => {
    setSample(keyToIdMap[text]);

    const audioElement = document.getElementById(text) as HTMLAudioElement;
    if (audioElement) {
      if (!audioElement.paused) {
        audioElement.pause();
        audioElement.currentTime = 0;
      }
      audioElement.play().catch((error) => {
        console.log("Audio playback error: ", error);
      });
    }
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key.toUpperCase();
    const validKeys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
    if (validKeys.includes(key)) {
      handleClick(key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1 h-full w-full py-2 pl-5 text-2xl font-bold text-black">
      <div
        id="Heater-1"
        className="drum-pad flex justify-center items-center bg-[#8d8d8d] rounded-md"
        onClick={() => {
          handleClick("Q");
        }}
      >
        Q<audio id="Q" className="clip" src={Heater1}></audio>
      </div>
      <div
        id="Heater-2"
        className="drum-pad flex justify-center items-center bg-[#8d8d8d] rounded-md"
        onClick={() => handleClick("W")}
      >
        W<audio id="W" className="clip" src={Heater2}></audio>
      </div>
      <div
        id="Heater-3"
        className="drum-pad flex justify-center items-center bg-[#8d8d8d] rounded-md"
        onClick={() => handleClick("E")}
      >
        E<audio id="E" className="clip" src={Heater3}></audio>
      </div>
      <div
        id="Heater-4"
        className="drum-pad flex justify-center items-center bg-[#8d8d8d] rounded-md"
        onClick={() => handleClick("A")}
      >
        A<audio id="A" className="clip" src={Heater4}></audio>
      </div>
      <div
        id="Clap"
        className="drum-pad flex justify-center items-center bg-[#8d8d8d] rounded-md"
        onClick={() => handleClick("S")}
      >
        S<audio id="S" className="clip" src={Clap}></audio>
      </div>
      <div
        id="Open-HH"
        className="drum-pad flex justify-center items-center bg-[#8d8d8d] rounded-md"
        onClick={() => handleClick("D")}
      >
        D<audio id="D" className="clip" src={OpenHH}></audio>
      </div>
      <div
        id="Kick-n'-Hat"
        className="drum-pad flex justify-center items-center bg-[#8d8d8d] rounded-md"
        onClick={() => handleClick("Z")}
      >
        Z<audio id="Z" className="clip" src={KicknHat}></audio>
      </div>
      <div
        id="Kick"
        className="drum-pad flex justify-center items-center bg-[#8d8d8d] rounded-md"
        onClick={() => handleClick("X")}
      >
        X<audio id="X" className="clip" src={Kick}></audio>
      </div>
      <div
        id="Closed-HH"
        className="drum-pad flex justify-center items-center bg-[#8d8d8d] rounded-md"
        onClick={() => handleClick("C")}
      >
        C<audio id="C" className="clip" src={ClosedHH}></audio>
      </div>
    </div>
  );
};

export default Pad;
