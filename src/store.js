import { createStore } from "redux";
import rootReducer from "./modules/index";

let storeCreated = null

if (typeof window !== 'undefined') {
  // 開発時
  storeCreated = () => createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
} else {
  // 本番ビルド時
  storeCreated = () => createStore(rootReducer)
}

export default storeCreated

