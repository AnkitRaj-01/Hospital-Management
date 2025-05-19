// filepath: /Users/ankit/Desktop/HospitalManagement/frontend/src/contexts/AppointmentContext.js
import React, { createContext, useContext, useState } from "react";

const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const removeAppointment = (appointmentId) => {
    setAppointments((prev) => prev.filter((appt) => appt._id !== appointmentId));
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, removeAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => useContext(AppointmentContext);