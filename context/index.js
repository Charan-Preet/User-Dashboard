import { data } from "autoprefixer";
import { createContext, useEffect, useState } from "react";

const DataContext = createContext();
const DataContextProvider = (props) => {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [bannedUser, setBannedUser] = useState(null);
  const [topUsers, setTopUsers] = useState(null);
  const [searchedUser, setSearchedUser] = useState();

  const openPopUp = () => setIsPopUpOpen(true);
  const closePopUp = () => setIsPopUpOpen(false);
  const bannedUserTimer = 60000; // for 1 min ban,can be changed to 300000 to keep the user banned for 5 min's

  const setIntialUserValue = () => {
    const data = JSON.parse(localStorage.getItem("bannedUser"));
    if (data?.length > 0) {
      let temp = [];
      data.forEach((ele) => {
        if (Date.now() - ele.time < bannedUserTimer) temp.push(ele);
      });
      setBannedUser(temp);
      localStorage.setItem("bannedUser", JSON.stringify(temp));
    }
  };

  const setIntialTopUsers = () =>
    setTopUsers(JSON.parse(localStorage.getItem("topUsers")));

  const removeBanFromUser = (id) => {
    const temp = [];
    const storedUsers = JSON.parse(localStorage.getItem("bannedUser"));
    if (storedUsers?.length > 0) {
      for (const user of storedUsers) {
        if (user.id !== id) temp.push(user);
      }
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

  const searchUserByNameOrEmail = async (val) => {
    setSearchedUser(null);
    const temp = await fetch("https://jsonplaceholder.typicode.com/users"); //can also be fetched before hand and we can use stored one
    //but to enhance the independence of search function this fetch is done
    const userData = await temp.json();
    const searchAble = val.split(" ");
    searchAble.forEach((ele) => {
      const splitName = ele.replace("\t", "");
      userData.forEach((data) => {
        data.name.split(" ").forEach((name) => {
          if (splitName.toLowerCase() === name.toLowerCase()) {
            setSearchedUser(data);
            return;
          }
        });
        //email search if name search fails
        if (splitName.toLowerCase() === data.email.toLowerCase()) {
          setSearchedUser(data);
        }
      });
    });
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
        searchedUser,
        searchUserByNameOrEmail,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};

export default DataContext;
export { DataContextProvider };
