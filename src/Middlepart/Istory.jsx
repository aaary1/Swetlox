import React from "react";

function Istory({ storyImg, profileImg, isUserStory, onAddStory, userName }) {
  console.log(userName);
  return (
    <div className="relative w-[110px] h-[193px]  rounded-xl overflow-hidden bg-gray-200 hover:cursor-pointer ">
      <img
        src={profileImg}
        className="absolute w-[100%] h-[100%] object-cover blur-sm"
      ></img>
      {isUserStory ? (
        <>
          <div className="w-full h-full flex items-center relative justify-center">
            <div className="w-12 h-12 bg-[#1c1c1c] rounded-full relative text-center flex items-center justify-center text-white text-3xl font-bold">
              +
            </div>
          </div>
          <p className="text-nowrap overflow-hidden font-bold">
            {userName?.toUpperCase()}
          </p>
        </>
      ) : (
        <>
          <img
            src={storyImg}
            alt="Story"
            className="w-full h-full object-cover blur-sm z-0"
          />
          <div className="absolute w-[100%] flex flex-col justify-center items-center bottom-2     ">
            <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden">
              <img
                src={profileImg}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-nowrap text-white overflow-hidden font-bold">
            {userName?.toUpperCase()}
          </h1>
        </>
      )}
    </div>
  );
}

export default Istory;
