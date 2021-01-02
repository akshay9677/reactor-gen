---
to: src/store/actions/counter.action.js
---

export const COUNTER = "COUNTER";

export function addLike() {
  return async (dispatch) => {
    dispatch({type: COUNTER });
  };
}


