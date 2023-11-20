import React, { useState } from "react";

const Groups = ({ data, handleClick }) => {
  return (
    <div className="mt-8">
      <div>
        <h3>Kollokvier</h3>
        <div className="w-full h-0.5 bg-black"></div>
      </div>
      <div className="flex justify-center flex-col space-y-4 mt-4">
        {data.map((item) => (
          <div
            className="flex items-center space-x-2 cursor-pointer"
            key={item.id}
          >
            <Member item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

const Member = ({ item }) => {
  const handleClick = () => {
    console.log("clicked", item.id);
  };

  const [onHover, setOnHover] = useState(true);

  return (
    <div
      className="bg-white w-full py-2 px-4 rounded-md shadow-md hover:shadow-none"
      onClick={() => {
        handleClick(item.id);
      }}
      onMouseEnter={(e) => {
        // e.target.children[1].classList.remove("hidden");
        setOnHover(false);
      }}
      onMouseLeave={(e) => {
        // e.target.children[1].classList.add("hidden");
        setOnHover(true);
      }}
    >
      <div className="flex justify-between">
        <div>{item.title}</div>
        <div className="flex items-center space-x-2">
          <div>4/6 </div>
          <div className="h-2 w-2 bg-green-400 rounded-full"></div>
        </div>
      </div>
      <div hidden={onHover}>
        {/* Group members */}
        <div>
          {item.members.map((member, index) => (
            <div key={index} className="text-xs">
              {member}
            </div>
          ))}
        </div>
        {/* Group Btns */}
        <div className="flex justify-between space-x-4 mt-2">
          <div className="w-32 bg-green-200 py-2 px-4 flex justify-center items-center shadow-sm hover:bg-green-300 rounded-md">
            Chat
          </div>
          <div className="w-32 bg-green-200 py-2 px-4 flex justify-center items-center shadow-sm hover:bg-green-300 rounded-md">
            Admin
          </div>
        </div>
      </div>
    </div>
  );
};

export default Groups;
