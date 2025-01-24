// import React, { useEffect, useState } from "react";

// function UserPanel() {
//   return (
//     <>
//       <div className="w-[1528px] bg-white h-[50px] sticky top-0 left-0 flex items-center">
//         <ul className="flex items-center text-sm ml-6">
//           <li className="mr-2">
//             <img
//               src="src/image/menu.png"
//               alt="Menu"
//               style={{ width: "35px", cursor: "pointer" }}
//             />
//           </li>
//         </ul>
//         <ul className="flex items-center text-sm ml-4">
//           <li className="mr-2">
//             <a
//               href="#"
//               className="text-gray-700 hover:text-gray-900 font-medium"
//             >
//               Dashboard
//             </a>
//           </li>
//           <li className="text-gray-600 mr-2 font-medium">/</li>
//           <li className="text-gray-600 mr-2 font-medium">Analytics</li>
//         </ul>
//         <ul className="flex items-center text-sm ml-auto">
//           <li className="mr-4">
//             <img
//               src="src/image/logo-3.png"
//               alt="Logo"
//               style={{ width: "150px", cursor: "pointer" }}
//             />
//           </li>
//           <li>
//             <img
//               src="src/image/bell.png"
//               className="mr-6"
//               alt="Bell Icon"
//               style={{ width: "30px", cursor: "pointer" }}
//             />
//           </li>
//         </ul>
//       </div>
//       <div className="w-[1528px] flex mt-6 mx-auto ">
//         <div className="bg-blue-800 w-[18%] h-[150px] rounded-lg shadow-lg mr-5 ml-10">
//           <h1 className="font-bold text-5xl ml-6 mt-5 text-white">10</h1>

//           <h1 className="text-2xl ml-4 mt-5  text-gray-100 hover:text-gray-200 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
//             Active users
//           </h1>
//         </div>

//         <div className="bg-green-800 w-[18%] h-[150px] rounded-lg shadow-lg mx-5">
//           <h1 className="font-bold text-5xl ml-6 mt-5 text-white">324</h1>

//           <h1 className="text-2xl ml-4 mt-5  text-gray-100 hover:text-gray-200 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
//             Total users
//           </h1>
//         </div>

//         <div className="bg-blue-800 w-[18%] h-[150px] rounded-lg shadow-lg ml-4 mr-4">
//           <h1 className="font-bold text-5xl ml-6 mt-5 text-white">1256</h1>

//           <h1 className="text-2xl ml-4 mt-5  text-gray-100 hover:text-gray-200 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
//             Total post
//           </h1>
//         </div>

//         <div className="bg-green-800 w-[15%] h-[150px] rounded-lg shadow-lg ml-4 mr-4">
//           <h1 className="font-bold text-5xl ml-6 mt-5 text-white">41</h1>

//           <h1 className="text-2xl ml-4 mt-5  text-gray-100 hover:text-gray-200 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
//             New user
//           </h1>
//         </div>

//         <div className="bg-blue-800 w-[16.5%] h-[150px] rounded-lg shadow-lg ml-4 mr-4">
//           <h1 className="font-bold text-5xl ml-6 mt-5 text-white">2</h1>

//           <h1 className="text-2xl ml-4 mt-5  text-gray-100 hover:text-gray-200 before:contents-[''] before:w-1 before:h-1 before:rounded-full before:bg-gray-300 before:mr-3">
//             Reported post
//           </h1>
//         </div>
//       </div>

//       <div className="w-[1528px] h-[450px]  mt-10 flex overflow-hidden">
//         <div className="w-[47%] h-full bg-white ml-10 mr-10 rounded-lg shadow-lg overflow-y-scroll no-scrollbar">
//           <div className="w-[100%]  h-[30px] mt-4">
//             <h1 className="font-medium ml-6">Users Details</h1>
//           </div>
//           <div className="w-48  h-[43px] mt-4 bg-gray-50 ml-6 rounded-md flex">
//             <div className="w-24 font-medium hover:bg-blue-500 hover:text-white transition duration-200 cursor-pointer">
//               <h1 className="font-medium text-center mt-2">Active</h1>
//             </div>
//             <div className="w-24 font-medium hover:bg-blue-500 hover:text-white transition duration-200 cursor-pointer">
//               <h1 className="font-medium text-center mt-2">Blocked</h1>
//             </div>
//           </div>
//   <div className="w-[656px]  h-[43px] mt-4 bg-gray-50 ml-6 rounded-md flex">
//     <div className="w-[110px] font-medium ">
//       <h1 className="font-medium text-center mt-2 text-gray-400">
//         USERNAME
//       </h1>
//     </div>
//     <div className="w-[266px]">
//       <h1 className="font-medium text-center mt-2  text-gray-400 ">
//         EMAIL
//       </h1>
//     </div>
//     <div className="w-[80px] ">
//       <h1 className="font-medium text-center mt-2 text-gray-400">
//         POST
//       </h1>
//     </div>
//     <div className="w-[100px]">
//       <h1 className="font-medium text-center mt-2 text-gray-400">
//         FOLLOWERS
//       </h1>
//     </div>
//     <div className="w-[100px] ">
//       <h1 className="font-medium text-center mt-2 text-gray-400">
//         FOLLOWING
//       </h1>
//     </div>
//   </div>
//           <div className="w-[656px]  h-[40px] mt-1  ml-6 rounded-md flex">
//             <div className="w-[110px]">
//               <h1 className="text-center font-semibold mt-2 text-gray-500">
//                 aaary.1
//               </h1>
//             </div>
//             <div className="w-[266px]">
//               {" "}
//               <h1 className="text-center font-semibold mt-2 text-gray-500">
//                 aryanbabariya24@gmail.com
//               </h1>
//             </div>
//             <div className="w-[80px]">
//               {" "}
//               <h1 className="text-center font-semibold mt-2 text-gray-500">
//                 24
//               </h1>
//             </div>
//             <div className="w-[100px]">
//               {" "}
//               <h1 className="text-center font-semibold mt-2 text-gray-500">
//                 170
//               </h1>
//             </div>
//             <div className="w-[100px]">
//               {" "}
//               <h1 className="text-center font-semibold mt-2 text-gray-500">
//                 320
//               </h1>
//             </div>
//           </div>
//         </div>

//         <div className="w-[47%] h-full bg-white mr-10 rounded-lg shadow-lg">
//           <div className="w-full h-[30px] mt-4">
//             <h1 className="font-medium ml-6">Manage users</h1>
//           </div>

//           <div className="w-[655px] bg-gray-50 rounded-md mx-auto h-[40px] mt-3 flex items-center">
//             <div>
//               <img src="src/image/glaasss.png" className="w-[30px] ml-3" />
//             </div>
//             <div>
//               <input
//                 type="text"
//                 className="w-[580px] bg-gray-50 ml-2 text-gray-500"
//                 placeholder="Search.."
//               />
//             </div>
//           </div>
//           <div className="w-[656px]  h-[43px] mt-4 bg-gray-50 ml-6 rounded-md flex">
//             <div className="w-[328px] font-medium ">
//               <h1 className="font-medium text-center mt-2 text-gray-400">
//                 USERNAME
//               </h1>
//             </div>
//             <div className="w-[328px] font-medium ">
//               <h1 className="font-medium text-center mt-2 text-gray-400">
//                 Actions
//               </h1>
//             </div>
//           </div>
//           <div className="w-[656px]  h-[40px] mt-4  ml-6 rounded-md flex">
//             <div className="w-[328px]">
//               <h1 className="text-center font-semibold mt-2 text-gray-500">
//                 aaary.1
//               </h1>
//             </div>
//             <div className="w-[328px]">
//               <button className="bg-red-600 font-medium text-white w-[200px] h-[35px] rounded-md ml-[65px]">
//                 Delete account
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// export default UserPanel;
import React, { useEffect, useState } from "react";

function UserPanel() {
  // Mock data
  const [userStats, setUserStats] = useState({
    activeUsers: 10,
    totalUsers: 324,
    totalPosts: 1256,
    newUsers: 41,
    reportedPosts: 2,
  });

  const [users, setUsers] = useState([
    {
      username: "aaary.1",
      email: "aryanbabariya24@gmail.com",
      posts: 24,
      followers: 170,
      following: 320,
    },
    // Add more user objects as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Example: Fetch data here using an API (mocked for now)
    // fetch('/api/userStats').then(response => response.json()).then(data => setUserStats(data));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-[1528px] bg-white h-[50px] sticky top-0 left-0 flex items-center">
        <ul className="flex items-center text-sm ml-6">
          <li className="mr-2">
            <img
              src="src/image/menu.png"
              alt="Menu"
              style={{ width: "35px", cursor: "pointer" }}
            />
          </li>
        </ul>
        <ul className="flex items-center text-sm ml-4">
          <li className="mr-2">
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 font-medium"
            >
              Dashboard
            </a>
          </li>
          <li className="text-gray-600 mr-2 font-medium">/</li>
          <li className="text-gray-600 mr-2 font-medium">Analytics</li>
        </ul>
        <ul className="flex items-center text-sm ml-auto">
          <li className="mr-4">
            <img
              src="src/image/logo-3.png"
              alt="Logo"
              style={{ width: "150px", cursor: "pointer" }}
            />
          </li>
          <li>
            <img
              src="src/image/bell.png"
              className="mr-6"
              alt="Bell Icon"
              style={{ width: "30px", cursor: "pointer" }}
            />
          </li>
        </ul>
      </div>

      <div className="w-[1528px] flex mt-6 mx-auto">
        <div className="bg-blue-800 w-[18%] h-[150px] rounded-lg shadow-lg mr-5 ml-10">
          <h1 className="font-bold text-5xl ml-6 mt-5 text-white">
            {userStats.activeUsers}
          </h1>
          <h1 className="text-2xl ml-4 mt-5 text-gray-100 hover:text-gray-200">
            Active users
          </h1>
        </div>

        <div className="bg-green-800 w-[18%] h-[150px] rounded-lg shadow-lg mx-5">
          <h1 className="font-bold text-5xl ml-6 mt-5 text-white">
            {userStats.totalUsers}
          </h1>
          <h1 className="text-2xl ml-4 mt-5 text-gray-100 hover:text-gray-200">
            Total users
          </h1>
        </div>

        <div className="bg-blue-800 w-[18%] h-[150px] rounded-lg shadow-lg ml-4 mr-4">
          <h1 className="font-bold text-5xl ml-6 mt-5 text-white">
            {userStats.totalPosts}
          </h1>
          <h1 className="text-2xl ml-4 mt-5 text-gray-100 hover:text-gray-200">
            Total posts
          </h1>
        </div>

        <div className="bg-green-800 w-[15%] h-[150px] rounded-lg shadow-lg ml-4 mr-4">
          <h1 className="font-bold text-5xl ml-6 mt-5 text-white">
            {userStats.newUsers}
          </h1>
          <h1 className="text-2xl ml-4 mt-5 text-gray-100 hover:text-gray-200">
            New user
          </h1>
        </div>

        <div className="bg-blue-800 w-[16.5%] h-[150px] rounded-lg shadow-lg ml-4 mr-4">
          <h1 className="font-bold text-5xl ml-6 mt-5 text-white">
            {userStats.reportedPosts}
          </h1>
          <h1 className="text-2xl ml-4 mt-5 text-gray-100 hover:text-gray-200">
            Reported post
          </h1>
        </div>
      </div>

      <div className="w-[1528px] h-[450px] mt-10 flex overflow-hidden">
        <div className="w-[47%] h-full bg-white ml-10 mr-10 rounded-lg shadow-lg overflow-y-scroll no-scrollbar">
          <div className="w-[100%] h-[30px] mt-4">
            <h1 className="font-medium ml-6">Users Details</h1>
          </div>

          <div className="w-48 h-[43px] mt-4 bg-gray-50 ml-6 rounded-md flex">
            <div className="w-24 font-medium hover:bg-blue-500 hover:text-white transition duration-200 cursor-pointer">
              <h1 className="font-medium text-center mt-2">Active</h1>
            </div>
            <div className="w-24 font-medium hover:bg-blue-500 hover:text-white transition duration-200 cursor-pointer">
              <h1 className="font-medium text-center mt-2">Blocked</h1>
            </div>
          </div>
          <div className="w-[656px]  h-[43px] mt-4 bg-gray-50 ml-6 rounded-md flex">
            <div className="w-[110px] font-medium ">
              <h1 className="font-medium text-center mt-2 text-gray-400">
                USERNAME
              </h1>
            </div>
            <div className="w-[266px]">
              <h1 className="font-medium text-center mt-2  text-gray-400 ">
                EMAIL
              </h1>
            </div>
            <div className="w-[80px] ">
              <h1 className="font-medium text-center mt-2 text-gray-400">
                POST
              </h1>
            </div>
            <div className="w-[100px]">
              <h1 className="font-medium text-center mt-2 text-gray-400">
                FOLLOWERS
              </h1>
            </div>
            <div className="w-[100px] ">
              <h1 className="font-medium text-center mt-2 text-gray-400">
                FOLLOWING
              </h1>
            </div>
          </div>
          {filteredUsers.map((user, index) => (
            <div
              className="w-[656px] h-[40px] mt-1 ml-6 rounded-md flex"
              key={index}
            >
              <div className="w-[110px]">
                <h1 className="text-center font-semibold mt-2 text-gray-500">
                  {user.username}
                </h1>
              </div>
              <div className="w-[266px]">
                <h1 className="text-center font-semibold mt-2 text-gray-500">
                  {user.email}
                </h1>
              </div>
              <div className="w-[80px]">
                <h1 className="text-center font-semibold mt-2 text-gray-500">
                  {user.posts}
                </h1>
              </div>
              <div className="w-[100px]">
                <h1 className="text-center font-semibold mt-2 text-gray-500">
                  {user.followers}
                </h1>
              </div>
              <div className="w-[100px]">
                <h1 className="text-center font-semibold mt-2 text-gray-500">
                  {user.following}
                </h1>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[47%] h-full bg-white mr-10 rounded-lg shadow-lg">
          <div className="w-full h-[30px] mt-4">
            <h1 className="font-medium ml-6">Manage users</h1>
          </div>

          <div className="w-[655px] bg-gray-50 rounded-md mx-auto h-[40px] mt-3 flex items-center">
            <div>
              <img src="src/image/glaasss.png" className="w-[30px] ml-3" />
            </div>
            <div>
              <input
                type="text"
                className="w-[580px] bg-gray-50 ml-2 text-gray-500"
                placeholder="Search.."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>

          <div className="w-[656px] h-[43px] mt-4 bg-gray-50 ml-6 rounded-md flex">
            <div className="w-[328px] font-medium ">
              <h1 className="font-medium text-center mt-2 text-gray-400">
                USERNAME
              </h1>
            </div>
            <div className="w-[328px] font-medium ">
              <h1 className="font-medium text-center mt-2 text-gray-400">
                Actions
              </h1>
            </div>
          </div>

          {filteredUsers.map((user, index) => (
            <div
              className="w-[656px] h-[40px] mt-4 ml-6 rounded-md flex"
              key={index}
            >
              <div className="w-[328px]">
                <h1 className="text-center font-semibold mt-2 text-gray-500">
                  {user.username}
                </h1>
              </div>
              <div className="w-[328px]">
                <button className="bg-red-600 font-medium text-white w-[200px] h-[35px] rounded-md ml-[65px]">
                  Delete account
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserPanel;
