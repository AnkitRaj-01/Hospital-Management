import { useEffect, useState } from "react";
import { getDoctors } from "../api/doctorApi";
import { useAppContext } from "../contexts/AppContext";

const DoctorList = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { doctors, setDoctors } = useAppContext();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const data = await getDoctors();
        // Ensure data is an array before setting it
        if (Array.isArray(data)) {
          setDoctors(data);
        } else {
          console.error("Expected array but got:", data);
          setDoctors([]); // Set to empty array as fallback
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors");
        setDoctors([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if doctors array is empty or not loaded yet
    if (!doctors || doctors.length === 0) {
      fetchDoctors();
    } else {
      setLoading(false);
    }
  }, [setDoctors]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (!doctors || doctors.length === 0) {
    return (
      <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
        No doctors available
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <div key={doctor._id} className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">{doctor.doctor_name}</h3>
          <p className="text-gray-600 mb-2">Specialty: {doctor.specialty}</p>
          <p className="text-gray-600">
            Available Slots: {doctor.available_slots_per_day}
          </p>
          <a
            href={`/book-appointment?doctorId=${doctor._id}`}
            className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Book Appointment
          </a>
        </div>
      ))}
    </div>
  );
};

export default DoctorList;



