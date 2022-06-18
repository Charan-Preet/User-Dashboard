import { createContext, useState } from "react";

const DataContext = createContext();
const DataContextProvider = (props) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [bannedUser, setBannedUser] = useState(null);
  const [topUsers, setTopUsers] = useState(null);

  const openPopUp = () => setIsPopUpOpen(true);
  const closePopUp = () => setIsPopUpOpen(false);

  const setIntialUserValue = () =>
    setBannedUser(JSON.parse(localStorage.getItem("bannedUser")));

  const setIntialTopUsers = () =>
    setTopUsers(JSON.parse(localStorage.getItem("topUsers")));

  const removeBanFromUser = (id) => {
    const temp = [];
    const storedUsers = JSON.parse(localStorage.getItem("bannedUser"));
    if (storedUsers?.length > 0) {
      for (const user of storedUsers) {
        if (user.id !== id) temp.push(user);
      }
      console.log("here", temp);
      localStorage.setItem("bannedUser", JSON.stringify(temp));
      setBannedUser(temp);
    }
  };

  const banUser = (id) => {
    let storedUsers = JSON.parse(localStorage.getItem("bannedUser"));
    if (storedUsers?.length > 0) {
      for (let user of storedUsers) {
        if (user.id === id) return;
      }
      storedUsers.push({ id, time: Date.now() });
      setBannedUser(storedUsers);
      localStorage.setItem("bannedUser", JSON.stringify(storedUsers));
    } else {
      const temp = [{ id, time: Date.now() }];
      localStorage.setItem("bannedUser", JSON.stringify(temp));
      setBannedUser(temp);
    }
  };

  const getNews = async (id) => {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  const addTopUser = async (id) => {
    let storedUsers = JSON.parse(localStorage.getItem("topUsers"));
    if (storedUsers?.length > 0) {
      for (let user of storedUsers) {
        if (user.id.toString() === id) return;
      }
      const data = await getUserById(id);
      storedUsers.push(data);
      localStorage.setItem("topUsers", JSON.stringify(storedUsers));
    } else {
      const data = await getUserById(id);
      localStorage.setItem("topUsers", JSON.stringify([data]));
    }
    Promise.resolve().then(() => window.location.reload());
  };

  const removeTopUser = (id) => {
    const temp = [];
    const storedUsers = JSON.parse(localStorage.getItem("topUsers"));
    if (storedUsers?.length > 0) {
      for (const user of storedUsers) {
        if (user.id.toString() !== id) temp.push(user);
      }
      localStorage.setItem("topUsers", JSON.stringify(temp));
      Promise.resolve().then(() => window.location.reload());
    }
  };

  const getUserById = async (id) => {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  return (
    <DataContext.Provider
      value={{
        openPopUp,
        closePopUp,
        isPopUpOpen,
        getNews,
        banUser,
        bannedUser,
        removeBanFromUser,
        setIntialUserValue,
        setIntialTopUsers,
        getUserById,
        topUsers,
        removeTopUser,
        addTopUser,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
export { DataContextProvider };
