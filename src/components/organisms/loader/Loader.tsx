const Loader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-row gap-5">
        <div className="w-10 h-10 rounded-full bg-blue-700 animate-bounce"></div>
        <div className="w-10 h-10 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
        <div className="w-10 h-10 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
      </div>
    </div>
  );
};

export default Loader;
