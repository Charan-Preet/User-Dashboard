import { useEffect, useContext, useState } from "react";
import TopUser from "./Top-users";
import DataContext from "../../context";

export default function Users(data) {
  const [bannedUserCollection, setBannedUserCollection] = useState(null);
  const [topUsersCollection, setTopUsersCollection] = useState(null);

  const {
    banUser,
    removeBanFromUser,
    setIntialUserValue,
    bannedUser,
    removeTopUser,
    addTopUser,
    topUsers,
    setIntialTopUsers,
  } = useContext(DataContext);

  useEffect(() => {
    setIntialUserValue();
    setIntialTopUsers();

    document.querySelector(".app-table")?.addEventListener("click", (e) => {
      if (e.target.matches(".remove-button"))
        banUser(e.target.attributes.id.value);

      if (e.target.matches(".add-button"))
        removeBanFromUser(e.target.attributes.id.value);

      if (e.target.matches("input")) {
        const idValue = e.target.attributes.id.value;
        if (e.target.checked) addTopUser(idValue);
        else removeTopUser(idValue);
      }
    });
  }, []);

  useEffect(() => {
    const temp = [];
    const tempTopUsers = [];
    bannedUser?.forEach((ele) => temp.push(parseInt(ele.id)));
    topUsers?.forEach((ele) => tempTopUsers.push(ele.id));
    setBannedUserCollection(temp);
    setTopUsersCollection(tempTopUsers);
  }, [bannedUser, topUsers]);

  const listItems = data.data?.map((ele) => (
    <tbody
      className={bannedUserCollection?.includes(ele.id) && "strike"}
      key={ele.id}
    >
      <tr>
        <td>
          <input
            type="checkbox"
            id={ele.id}
            disabled={bannedUserCollection?.includes(ele.id)}
            checked={topUsersCollection?.includes(ele.id)}
          />
        </td>
        <td className="b mid-gray">{ele.name}</td>
        <td>{ele.email}</td>
        <td>
          <button
            id={ele.id}
            disabled={!bannedUserCollection?.includes(ele.id)}
            className={`f6 link dim ba bw1 ph3 pv2 mb2 dib dark-gray grow pointer bg-white grow br2 add-button ${
              !bannedUserCollection?.includes(ele.id) && "disable-element"
            }`}
          >
            Allow
          </button>
        </td>
        <td>
          <button
            disabled={bannedUserCollection?.includes(ele.id)}
            id={ele.id}
            className={`f6 br2 link ph3 pv2 mb2 dib white bg-hot-pink pointer grow shadow-1 remove-button ${
              bannedUserCollection?.includes(ele.id) && "disable-element"
            }`}
          >
            Remove
          </button>
        </td>
      </tr>
    </tbody>
  ));

  return (
    <>
      <h1 className="f4 lh-copy tc bg-light-gray">User Dashboard...</h1>
      <div className="flex flex-wrap justify-around">
        <div className="app-table">
          <h1 className="tc underline">Users</h1>
          <table>
            <thead>
              <tr>
                <th className="nowrap">Top User</th>
                <th>Name</th>
                <th>Email</th>
                <th>Remove Ban (admin only)</th>
                <th>User Action (admin only)</th>
              </tr>
            </thead>
            {listItems}
          </table>
        </div>
        <div className="app-table">
          <TopUser />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  return { props: { data } };
}
