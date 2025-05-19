import { useState } from "react";
import { cancelAppointment } from "../api/appointmentApi";
import { useAppContext } from "../contexts/AppContext";

const AppointmentCancel = () => {
  const [appointmentId, setAppointmentId] = useState("");
  const { showNotification } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await cancelAppointment(appointmentId);
      showNotification("Appointment cancelled successfully!");
      setAppointmentId("");
    } catch (error) {
      console.error("Error:", error);
      showNotification("Failed to cancel appointment", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">Cancel Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="appointmentId"
          >
            Appointment ID
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="appointmentId"
            type="text"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Cancel Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentCancel;
