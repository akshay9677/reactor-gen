---
to: src/components/Like.js
---

import React from "react";

import { useSelector, useDispatch } from "react-redux";
import * as likeActions from "../store/actions/counter.action";

function Like() {
  const likes = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  const handleLikeClick = () => {
    dispatch(likeActions.addLike());
  };
  return (
    <button style={{ fontSize: "20px" }} onClick={handleLikeClick}>
          {likes}{" "}
          
          Likes
      <i
        style={{ padding: "0px 2px 0px 5px", marginBottom: "1px",color:'#7754BC' }}
        className="fas fa-thumbs-up"
          ></i>
    </button>
  );
}

export default Like;
