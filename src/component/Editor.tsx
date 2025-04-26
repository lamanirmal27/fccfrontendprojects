
import FullScreenButton from "./FullScreenButton";

interface EditorProps {
    markdown: string;
    setMarkdown: (value: string) => void;
    fullScreen: "editor" | "preview" | "none";
    setFullScreen: (view: "editor" | "preview" | "none") => void
}
const Editor : React.FC<EditorProps> = ({markdown, setMarkdown, fullScreen, setFullScreen}) => {

  if (fullScreen == "preview") return null;
  return (

  <div className={`flex flex-col w-full ${fullScreen ==='editor' ? 'h-screen' : 'h-[200px]'} pt-7`}>
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold">Editor</h2>
      <FullScreenButton target='editor' fullScreen={fullScreen} setFullScreen={setFullScreen}  />
    </div>
      <textarea
      id="editor"
      value={markdown}
      onChange={(e) => setMarkdown(e.target.value)}
      className="w-full h-full p-2 border-2 bg-[rgb(197,215,216)] border-gray-600 rounded-lg overflow-y-auto"
      ></textarea>
  </div>
  )
}

export default Editor