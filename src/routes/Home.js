import Nweet from "components/Nweet";
import { v4 as uuidv4 } from "uuid";
import { dbService, storageService } from "fbase";
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  useEffect(() => {
    const q = query(
      collection(dbService, "nweets"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const nweetArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setNweets(nweetArr);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      const response = await uploadString(
        attachmentRef,
        attachment,
        "data_url"
      );
      attachmentUrl = await getDownloadURL(response.ref);
    }
    await addDoc(collection(dbService, "nweets"), {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setAttachment("");
    setNweet("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const fileInputRef = useRef();
  const onClearAttachment = () => {
    setAttachment("");
    fileInputRef.current.value = "";
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="nweetcontent">
          <input
            value={nweet}
            onChange={onChange}
            type="text"
            placeholder="What's on your mind"
            maxLength={120}
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={onFileChange}
          ref={fileInputRef}
        />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="120px" height="120px" />
            <button onClick={onClearAttachment}>clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
