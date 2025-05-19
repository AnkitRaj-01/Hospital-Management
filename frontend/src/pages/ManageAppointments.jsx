// import AppointmentCancel from "../components/AppointmentCancel";

// const ManageAppointments = () => {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-8">Manage Appointments</h1>
//       <AppointmentCancel />
//     </div>
//   );
// };

// export default ManageAppointments;
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

const ManageAppointments = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (location.state?.appointmentData) {
      setAppointments((prev) => {
        const isDuplicate = prev.some((appt) => appt._id === location.state.appointmentData._id);
        if (!isDuplicate) {
          return [...prev, location.state.appointmentData];
        }
        return prev;
      });

      // Clear the state after processing
      navigate("/manage-appointments", { replace: true });
    }
  }, [location.state, navigate]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Appointments</h1>
      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="p-4 border rounded shadow-md flex justify-between items-center"
            >
              <div>
                <p><strong>Patient Name:</strong> {appointment.patient_name}</p>
                <p><strong>Doctor Name:</strong> {appointment.doctor_name}</p>
                <p><strong>Time Slot:</strong> {appointment.time_slot}</p>
                <p><strong>Appointment Date:</strong> {appointment.appointment_date}</p>
              </div>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleCancel(appointment._id)}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No appointments available</p>
      )}
    </div>
  );
};

export default ManageAppointments;