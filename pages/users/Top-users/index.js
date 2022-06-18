import { useContext, useEffect, useState } from "react";
import DataContext from "../../../context";

export default function TopUser() {
  const { setIntialTopUsers, topUsers, getUserById } = useContext(DataContext);
  const [topUserCollection, setTopUserCollections] = useState(null);
  console.log("here", topUserCollection);

  // const getUserData = () => {
  //   const temp = [];
  //   setIntialTopUsers();
  //   topUsers?.forEach((id) => {
  //     const data = getEachUserData(id);
  //     temp.push(data);
  //   });
  //   setTopUserCollections(temp);
  // };

  // useEffect(() => {
  //   // getUserData();
  //   setIntialTopUsers();
  // }, []);

  // console.log(topUsers);

  // const listItems = topUsers?.map((ele) => (
  //   <tbody key={ele.id}>
  //     <tr>
  //       <td className="b mid-gray">{ele.name}</td>
  //       <td>{ele.email}</td>
  //       <td>
  //         <button
  //           id={ele.id}
  //           className="f6 br2 link ph3 pv2 mb2 dib white bg-hot-pink pointer grow shadow-1 remove-button"
  //         >
  //           Remove
  //         </button>
  //       </td>
  //     </tr>
  //   </tbody>
  // ));
  return (
    <>
      <h1 className="tc underline">Top Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Remove Ban (admin only)</th>
          </tr>
        </thead>
        {/* {listItems} */}
      </table>
    </>
  );
}
