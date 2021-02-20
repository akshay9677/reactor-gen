---
to: src/store/reducer/counter.reducer.js
---

import { COUNTER } from "../actions/counter.action";

const initialState = {
  count: 0,
};

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case COUNTER:
      return {
        ...state,
        count: state.count + 1,
      };
    default:
      return state;
  }
}

export default counterReducer;



