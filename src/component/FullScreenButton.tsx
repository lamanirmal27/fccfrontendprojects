import { RxExitFullScreen } from "react-icons/rx";
import { RxEnterFullScreen } from "react-icons/rx";

interface fullScreenProps{
    target: "editor" | "preview";
    fullScreen: "editor" | "preview" | "none";
    setFullScreen: (view: "editor" | "preview" | "none") => void
}

const FullScreenButton : React.FC<fullScreenProps> = ({target, fullScreen, setFullScreen}) => {
    const handleResize = () => {
        if (fullScreen === target) {
            setFullScreen("none"); // If already fullscreen, go back to normal
          } else {
            setFullScreen(target); // Otherwise, make this fullscreen
          }
    }
  return (
    <button onClick={handleResize} className="h-5 w-5">
        {fullScreen === target ?  <RxExitFullScreen></RxExitFullScreen> : <RxEnterFullScreen></RxEnterFullScreen> }
    </button>
  )
}

export default FullScreenButton