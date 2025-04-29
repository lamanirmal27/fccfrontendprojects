import { useEffect, useState, useRef } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { RiResetLeftFill } from "react-icons/ri";
import { MdStop } from "react-icons/md";
import { VscDebugStart } from "react-icons/vsc";
import timeup from './audio/timeup.mp3'

function App() {
  const [breakLength, setBreakLength] = useState<number>(5);
  const [sessionLength, setSessionLength] = useState<number>(25);
  const [timeLeft, setTimeLeft] = useState<number>(sessionLength * 60);
  const [remainingBreak, setRemainingBreak] = useState<number>(breakLength * 60)
  const [isRuning, setIsRunning] = useState<boolean>(false)
  const [breakTime, setBreakTime] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement>(null);



  // Helper function to format time in mm:ss
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if(!isRuning){
      setTimeLeft(sessionLength * 60)
      setRemainingBreak(breakLength * 60)
    }
  
  }, [sessionLength, breakLength])

  useEffect(() => {
    if(isRuning){
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if(prev > 0){
          return prev - 1
        }else{
          if (audioRef.current) {
            audioRef.current.play();
          }
          setIsRunning(false)
          setBreakTime(true)
          setTimeLeft(sessionLength * 60)
          return 0
        }
      })
    }, 1000)
    return () => clearInterval(intervalId)
    }
    if(breakTime){
      const intervalId = setInterval(() => {
        setRemainingBreak((prev) => {
          if(prev > 0){
            return prev - 1
          }else{
            if (audioRef.current) {
              audioRef.current.play();
            }
            setIsRunning(true)
            setBreakTime(false)
            setRemainingBreak(breakLength * 60)
            return 0
          }
        })
      }, 1000)
      return () => clearInterval(intervalId)
    }
  }, [isRuning, breakTime])

  const handleStartStop = () => {
    setIsRunning((prev) => !prev)
  }

  const handleReset = () => {
    setIsRunning(false);
    setBreakTime(false)
    setBreakLength(5); 
    setSessionLength(25)
    setTimeLeft(sessionLength * 60)
    setRemainingBreak(breakLength * 60)
    if(audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }
  return (
    <div className="w-full h-screen bg-[#1e555c] flex justify-center items-center ">
      <div className="block text-white w-[500px] h-[442px] text-center ">
        <div className="text-5xl mb-8">25 + 5 Clock</div>
        <div className="flex justify-between">
          <div id="break-label" className="text-2xl w-[250px]">
            Break Length
            <div className="flex justify-center gap-6 my-3">
              <button disabled={isRuning || breakTime} onClick={() => {
                if(breakLength < 60){
                  setBreakLength(breakLength + 1)
                }
              }} id="break-increment" className="scale-120">
                <FaArrowUp />
              </button>
              <p id="break-length">{breakLength}</p>
              <button disabled={isRuning || breakTime} onClick={() => {
                if(breakLength > 1){
                  setBreakLength(breakLength - 1)
                }
              }} id="break-decrement" className="scale-120">
                <FaArrowDown />
              </button>
            </div>
          </div>
          <div id="session-label" className="text-2xl w-[250px]">
            Session Length
            <div className="flex justify-center gap-6 my-3">
              <button disabled={isRuning || breakTime} onClick={() => {
                if(sessionLength < 60) {
                  setSessionLength(sessionLength + 1)
                }
              }} id="session-increment" className="scale-120">
                <FaArrowUp />
              </button>
              <p id="session-length">{sessionLength}</p>
              <button disabled={isRuning || breakTime} onClick={() => {
                if(sessionLength > 1){
                  setSessionLength(sessionLength - 1)
                }
              }} id="session-decrement" className="scale-120">
                <FaArrowDown />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="w-[270px] h-[160px] border border-solid border-gray-500 rounded-3xl overflow-hidden flex flex-col justify-center items-center ">
            <div id="timer-label" className="text-4xl text-white">{!breakTime ? 'Session' : 'Break'}</div>
            <div id="time-left" className="text-6xl m-4 text-white">{!breakTime ? formatTime(timeLeft) : formatTime(remainingBreak)}</div>
          </div>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <button onClick={handleStartStop} id="start_stop" className="flex scale-200">
            {isRuning ? <MdStop /> : <VscDebugStart />}
          </button>
          <button onClick={handleReset} id="reset" className="scale-200">
            <RiResetLeftFill />
          </button>
        </div>
        <audio id="beep" ref={audioRef} src={timeup}></audio>
      </div>
    </div>
  );
}

export default App;