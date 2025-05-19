// import { createContext, useState } from "react";

// export const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [notification, setNotification] = useState(null);
//   const [doctors, setDoctors] = useState([]);

//   const showNotification = (message, type = "success") => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 5000);
//   };

//   return (
//     <AppContext.Provider
//       value={{ notification, showNotification, doctors, setDoctors }}
//     >
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useAppContext = () => {
//     const context = useContext(AppContext);
//     if (context === undefined) {
//       throw new Error('useAppContext must be used within an AppProvider');
//     }
//     return context;
//   };

import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [doctors, setDoctors] = useState([]);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <AppContext.Provider
      value={{ notification, showNotification, doctors, setDoctors }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
