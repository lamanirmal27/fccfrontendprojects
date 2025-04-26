import { FaRegCopy, FaCheck } from "react-icons/fa6";
import FullScreenButton from "./FullScreenButton";
import { useRef, useState } from "react";
interface EditorProps {
    markdown: string;
    setMarkdown: (value: string) => void;
    fullScreen: "editor" | "preview" | "none";
    setFullScreen: (view: "editor" | "preview" | "none") => void
}
const Editor : React.FC<EditorProps> = ({markdown, setMarkdown, fullScreen, setFullScreen}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [copied, setCopied] = useState(false);
  if (fullScreen == "preview") return null;


  const handleCopy = () => {
    if (textareaRef.current) {
      navigator.clipboard.writeText(textareaRef.current.value)
        .then(() => {
          console.log('Copied to clipboard!');
          setCopied(true);
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
          setCopied(false)
        });
    }
  };
  return (

  <div className={`flex flex-col w-full ${fullScreen ==='editor' ? 'h-screen' : 'h-[200px]'} pt-7`}>
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold text-gray-800">Editor</h2>
      <div className="flex items-center space-x-4">
      <button 
        className="cursor-pointer text-gray-600 transition-colors" 
        onClick={handleCopy} 
      >
        {!copied ? <FaRegCopy /> : <FaCheck />}
      </button>
      <FullScreenButton 
        target="editor" 
        fullScreen={fullScreen} 
        setFullScreen={setFullScreen} 
      />
      </div>
    </div>
      <textarea
      ref={textareaRef}
      id="editor"
      value={markdown}
      onChange={(e) => setMarkdown(e.target.value)}
      className="w-full h-full p-2 border-2 bg-[rgb(197,215,216)] border-gray-600 rounded-lg overflow-y-auto"
      ></textarea>
  </div>
  )
}

export default Editor