import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoctorById } from "../api/doctorApi";

const DoctorDetail = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await getDoctorById(id);
        setDoctor(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) return <div>Loading doctor details...</div>;
  if (!doctor) return <div>Doctor not found</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-4">Doctor Details</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold">{doctor.doctor_name}</h3>
          <p className="text-gray-600">ID: {doctor._id}</p>
        </div>
        <div>
          <p className="text-gray-700">
            <span className="font-semibold">Specialty:</span> {doctor.specialty}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Available Slots:</span>{" "}
            {doctor.available_slots_per_day}
          </p>
        </div>
        <div>
          <a
            href={`/book-appointment?doctorId=${doctor._id}`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Book Appointment
          </a>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
