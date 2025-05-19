import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            Healthcare Appointments
          </Link>
          <div className="space-x-4">
            <Link to="/doctors" className="hover:underline">
              Doctors
            </Link>
            <Link to="/book-appointment" className="hover:underline">
              Book Appointment
            </Link>
            <Link to="/manage-appointments" className="hover:underline">
              Manage Appointments
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
