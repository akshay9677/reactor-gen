---
inject: true
to: src/App.js
after: import "./App.css";
---

import { Provider } from "react-redux";
import store from "./store/root";
import Like from "./components/Like";

