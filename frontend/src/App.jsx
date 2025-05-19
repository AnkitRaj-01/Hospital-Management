import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import BookAppointment from "./pages/BookAppointment";
import ManageAppointments from "./pages/ManageAppointments";
import Notification from "./components/Notification";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Notification />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route
              path="/manage-appointments"
              element={<ManageAppointments />}
            />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
