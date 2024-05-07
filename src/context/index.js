import React, {createContext, useState, useContext} from 'react';

const MyContext = createContext();

export const MyProvider = ({children}) => {
  const [laoding, setLaoding] = useState(true);

  return (
    <MyContext.Provider value={{laoding, setLaoding}}>
      {children}
    </MyContext.Provider>
  );
};

export const useLoading = () => useContext(MyContext);
