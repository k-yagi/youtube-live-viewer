// 各moduleはexport defaultでreducerを渡すようにして、ここでcombineReducerでまとめる感じか？
import { combineReducers } from 'redux';
import content from "./content";

export default combineReducers({ content });
