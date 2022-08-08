import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="flex w-100 h-[90vh] items-center justify-center ">
        <div className="w-28 h-28 border-l-4 border-gray-900 rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
