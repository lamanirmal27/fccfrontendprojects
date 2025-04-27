interface controllerProps {
  sample: string;
}
const Controller: React.FC<controllerProps> = ({ sample }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <p id="display" className="text-2xl text-center">
        {sample}{" "}
      </p>
    </div>
  );
};

export default Controller;
