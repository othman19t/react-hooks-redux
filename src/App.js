// https://www.youtube.com/watch?v=8xoEpnmhxnk
import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createStore, combineReducers } from "redux"; // npm i redux
import { Provider, useSelector, useDispatch } from "react-redux"; // npm i react-redux
import { devToolsEnhancer } from "redux-devtools-extension"; // npm i --save-dev redux-devtools-extension
// creating count reducer
const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + 1,
      };

    case "decrement":
      return {
        ...state,
        count: state.count - 1,
      };

    default:
      return state;
  }
};
// creating name reducer
const nameReducer = (state = { name: "" }, action) => {
  switch (action.type) {
    case "updateName":
      return {
        ...state,
        name: action.payload.name,
      };
    default:
      return state;
  }
};
// combining all reducer
const rootReducer = combineReducers({
  countReducer,
  nameReducer,
});
// defining initial state
const initialState = {};
// creating the store passing root reducer and initial state
const store = createStore(
  rootReducer,
  initialState,
  devToolsEnhancer() // for edux-devtools-extension
);

// count component
const Counter = () => {
  const { count, name } = useSelector((state) => ({
    ...state.countReducer,
    ...state.nameReducer,
  }));
  const dispatch = useDispatch(); // need this to be able to dispatch and action

  const increment = () => {
    dispatch({
      type: "increment",
    });
    console.log("increment");
  };

  const decrement = () => {
    dispatch({
      type: "decrement",
    });
    console.log("decrement");
  };

  return (
    <div>
      <h2>counter {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <h2>name: {name}</h2>
    </div>
  );
};
// name component
const Name = () => {
  const dispatch = useDispatch(); // need this to be able to dispatch and action

  const updateName = (e) => {
    dispatch({ type: "updateName", payload: { name: e.target.value } });
  };

  return (
    <div>
      <input type="text" placeholder="Name" onChange={updateName} />
    </div>
  );
};
// app component
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Counter />
        <Name />
      </div>
    </Provider>
  );
}

export default App;
