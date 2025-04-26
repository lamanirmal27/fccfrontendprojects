import { marked } from "marked";
import  DOMPurify  from "dompurify";
import FullScreenButton from "./FullScreenButton";

interface PreviewProps {
    markdown: string;
    fullScreen: "editor" | "preview" | "none";
    setFullScreen: (view: "editor" | "preview" | "none") => void
}
const Preview: React.FC<PreviewProps> = ({ markdown, fullScreen, setFullScreen }) => {
const html = DOMPurify.sanitize(marked.parse(markdown) as string, )

if(fullScreen == "editor") return null;
  return (
    <div className="flex flex-col w-full h-screen p-4 ">
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-center">Preview</h1>
      <FullScreenButton target="preview" fullScreen={fullScreen} setFullScreen={setFullScreen} />
      </div>
      <div id="preview" className="prose prose-lg w-full max-w-none overflow-y-auto max-h-full p-4  bg-[rgb(197,215,216)] rounded-lg shadow-md"
        dangerouslySetInnerHTML={{ __html: html }}>

      </div>
    </div>
  )
}

export default Preview