import { authService, dbService } from "fbase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj }) => {
  const getMyNweets = async () => {
    const q = query(
      collection(dbService, "nweets"),
      where("creatorId", "==", userObj.uid)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  };

  const navigate = useNavigate();
  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  return <button onClick={onLogOutClick}>Logout</button>;
};

export default Profile;
