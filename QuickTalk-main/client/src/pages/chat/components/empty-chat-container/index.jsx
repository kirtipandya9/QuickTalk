const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:flex flex-col justify-center items-center hidden duration-1000 transition-all">
      <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center">
        <h3 className="poppins-medium">
          <span className="text-black">Hi</span><span className="text-purple-500">! </span>
           <span className="text-black">Welcome to </span><span className="text-purple-500">Quick Talk.</span>
        </h3>
      </div>
    </div>
  );
};

export default EmptyChatContainer;