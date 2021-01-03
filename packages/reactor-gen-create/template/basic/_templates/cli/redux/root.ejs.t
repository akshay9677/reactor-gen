---
to: src/store/root.js
---

import { createStore, applyMiddleware, combineReducers } from "redux";
import Redux from "redux-thunk";
import counterReducer from "./reducer/counter.reducer";

const rootReducer = combineReducers({
  counter: counterReducer
});

const store = createStore(rootReducer, applyMiddleware(Redux));

export default store;