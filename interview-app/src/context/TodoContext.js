import React, {
  createContext, useState,
} from 'react';
import {ALL} from "../constants/general";

const TodoAppContext = createContext({
  selectedStatus: ALL,
});

const TodoAppDispatchContext = createContext({
  saveTodoAppDetails: (todoAppDetails) => {}, // eslint-disable-line
  removeTodoAppDetails: () => {}, // eslint-disable-line
});

export default function TodoAppProvider({ children }) {
  const [todoAppDetails, setTodoAppDetails] = useState({
    selectedStatus: ALL
});

  const saveTodoAppDetails = (newTodoAppDetails) => {
    setTodoAppDetails(newTodoAppDetails);
  };

  const removeTodoAppDetails = () => {
    setTodoAppDetails({
      selectedStatus: ALL
    });
  };

  return (
    <TodoAppContext.Provider value={todoAppDetails}>
      <TodoAppDispatchContext.Provider
        value={{
          saveTodoAppDetails,
          removeTodoAppDetails,
        }}
      >
        {children}
      </TodoAppDispatchContext.Provider>
    </TodoAppContext.Provider>
  );
};

export {
  TodoAppProvider,
  TodoAppContext,
  TodoAppDispatchContext,
};
