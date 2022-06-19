import { useContext, useEffect } from "react";
import DataContext from "../../../context";

export default function TopUser() {
  const { topUsers, removeTopUser } = useContext(DataContext);

  useEffect(() => {
    document
      .querySelector(".top-user-table")
      ?.addEventListener("click", (e) => {
        if (e.target.matches(".remove-button"))
          removeTopUser(e.target.attributes.id.value);
      });
  }, []);

  const listItems = topUsers?.map((ele) => (
    <tbody key={ele.id}>
      <tr>
        <td className="b mid-gray">{ele.name}</td>
        <td>{ele.email}</td>
        <td className="flex justify-center">
          <button
            id={ele.id}
            className="f6 br2 link ph3 pv2 mb2 dib white bg-hot-pink pointer grow shadow-1 remove-button"
          >
            Remove
          </button>
        </td>
      </tr>
    </tbody>
  ));

  return (
    <>
      <h1 className="tc underline">Top Users</h1>
      <table className="top-user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Remove Top User (admin only)</th>
          </tr>
        </thead>
        {listItems}
      </table>
    </>
  );
}
