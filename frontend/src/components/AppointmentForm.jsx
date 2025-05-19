import { useNavigate } from "react-router-dom";
import { getDoctorById } from "../api/doctorApi";
import { bookAppointment } from "../api/appointmentApi";
import { useAppContext } from "../contexts/AppContext";
import { useState, useEffect } from 'react';

const AppointmentForm = ({doctorId}) => {
  const navigate = useNavigate();
  const { showNotification } = useAppContext();
  const [doctor, setDoctor] = useState(null);
  const [formData, setFormData] = useState({
    patient_name: "",
    appointment_date: "",
    time_slot: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchDoctor = async () => {
      if (!doctorId) {
        setError("No doctor ID provided");
        setLoading(false);
        return;
      }

      try {
        const data = await getDoctorById(doctorId);
        console.log("Fetched doctor data:", data); // Debug log
        
        if (!data) {
          throw new Error("Doctor data not found");
        }

        if (!abortController.signal.aborted) {
          setDoctor(data);
          setError(null);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        if (!abortController.signal.aborted) {
          setError(error.message || "Failed to load doctor details");
          showNotification("Failed to load doctor details", "error");
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchDoctor();

    return () => abortController.abort();
  }, [doctorId, showNotification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!doctorId || !doctor) return;

    try {
      const response = await bookAppointment(doctorId, {
        ...formData,
        doctor_name: doctor.doctor_name || doctor.name
      });
      
    //   showNotification("Appointment booked successfully!");
    showNotification(response.message || "Appointment booked successfully!");
    navigate("/manage-appointments", { state: { appointmentData: { ...formData, doctor_name: doctor.doctor_name || doctor.name } } });     
    if(response.message != "No slots available") {
        navigate("/manage-appointments", { state: { appointmentData: response.data } });}
    } catch (error) {
      console.error("Booking error:", error);
      showNotification(error.response?.data?.message || "Failed to book appointment", "error");
    }
  };

  if (loading) return <div className="text-center p-8">Loading doctor information...</div>;
  if (error) return <div className="text-center p-8 text-red-500">{error}</div>;
  if (!doctor) return <div className="text-center p-8">Doctor information not available</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">
        Book Appointment with Dr. {doctor.doctor_name || doctor.name}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="patient_name">
            Patient Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="patient_name"
            name="patient_name"
            type="text"
            value={formData.patient_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="appointment_date">
            Appointment Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="appointment_date"
            name="appointment_date"
            type="date"
            min={new Date().toISOString().split('T')[0]}
            value={formData.appointment_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time_slot">
            Time Slot
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="time_slot"
            name="time_slot"
            value={formData.time_slot}
            onChange={handleChange}
            required
          >
            <option value="">Select a time slot</option>
            {["09:00-10:00", "10:00-11:00", "11:00-12:00", "14:00-15:00", "15:00-16:00"].map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            type="submit"
            disabled={!doctor}
          >
            {loading ? "Processing..." : "Book Appointment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;