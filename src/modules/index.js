// 各moduleはexport defaultでreducerを渡すようにして、ここでcombineReducerでまとめる感じか？
import { combineReducers } from 'redux';
import contents from "./contents";
import videos from "./videos";

export default combineReducers({ contents, videos });
