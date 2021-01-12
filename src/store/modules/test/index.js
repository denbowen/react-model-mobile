import produce from "immer";
import {initialState} from "./state";

export const reducer = produce((draft = initialState, action) => {
  const {value} = action;
  if (typeof value === 'object') {
    Reflect.ownKeys(value).forEach(field => {
      draft[field] = value[field];
    });
  }
  return draft;
});