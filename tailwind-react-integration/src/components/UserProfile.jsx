import React from "react";

function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 p-4 sm:p-4 md:p-8 max-w-xs md:max-w-sm mx-auto my-10 sm:my-20 rounded-lg shadow-lg">
      <img
        src="https://images.pexels.com/photos/1615776/pexels-photo-1615776.jpeg?auto=compress&cs=tinysrgb&w=400/150"
        alt="User"
        className="rounded-full sm:w-24 sm:h-24 md:w-36 md:h-36 mx-auto"
      />
      <h1 className="text-lg sm:text-xl md:text-xl text-blue-800 my-4 text-center">
        John Doe
      </h1>
      <p className="text-sm sm:text-sm md:text-base  text-gray-600 text-center">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
      <p className="text-sm sm:text-base text-gray-600 text-center mt-2">
        <span className="font-bold text-blue-600">UI/UX Designer</span>, focused on delivering seamless digital experiences.
      </p>
    </div>
  );
}

export default UserProfile;
