import React from "react";

const Nweet = ({ nweetObj }) => (
  <div>
    <h4>{nweetObj.text}</h4>
    <span>{new Date(nweetObj.createdAt).toLocaleString()}</span>
    {isOwner && (
      <>
        <button>Delete Nweet</button>
        <button>Edit Nweet</button>
      </>
    )}
  </div>
);

export default Nweet;
