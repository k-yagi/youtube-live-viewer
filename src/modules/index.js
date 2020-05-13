// 各moduleはexport defaultでreducerを渡すようにして、ここでcombineReducerでまとめる感じか？
import { combineReducers } from 'redux';
import contents from "./contents";

export default combineReducers({ contents });
