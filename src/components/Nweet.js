import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);

  const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
  const urlRef = ref(storageService, nweetObj.attachmentUrl);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this nweet?");
    if (ok) {
      await deleteDoc(NweetTextRef);
      if (urlRef !== null) {
        await deleteObject(urlRef);
      }
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(NweetTextRef, {
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };
  return (
    <>
      <div className="nweet">
        {editing ? (
          <>
            <form onSubmit={onSubmit} className="container nweetEdit">
              <input
                type="text"
                placeholder="Edit your nweet"
                value={newNweet}
                required
                autoFocus
                onChange={onChange}
                className="formInput"
              />
              <input type="submit" value="Update Nweet" className="formBtn" />
            </form>
            <button onClick={toggleEditing} className="formBtn cancelBtn">
              Cancel
            </button>
          </>
        ) : (
          <>
            <h4>{nweetObj.text}</h4>
            {nweetObj.attachmentUrl && (
              <img
                src={
                  nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />
                }
                width="160px"
                height="160px"
              />
            )}
            <h5>{new Date(nweetObj.createdAt).toLocaleString()}</h5>
            {isOwner && (
              <>
                <div className="nweet__actions">
                  <span onClick={onDeleteClick}>
                    <FontAwesomeIcon icon={faTrash} />
                  </span>
                  <span onClick={toggleEditing}>
                    <FontAwesomeIcon icon={faPencilAlt} />
                  </span>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Nweet;
