import { useSearchParams } from "react-router-dom";
import AppointmentForm from "../components/AppointmentForm";

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctorId");
  console.log(doctorId);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Book Appointment</h1>
      <AppointmentForm doctorId={doctorId} />
    </div>
  );
};

export default BookAppointment;
