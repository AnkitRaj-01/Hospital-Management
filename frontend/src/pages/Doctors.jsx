import { useState } from "react";
import { Link } from "react-router-dom";
import DoctorList from "../components/DoctorList";
import AddDoctorForm from "../components/AddDoctorForm";

const Doctors = () => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Doctors Management</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          {showAddForm ? "Hide Form" : "Add New Doctor"}
        </button>
      </div>

      {showAddForm && <AddDoctorForm />}

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Available Doctors</h2>
        <DoctorList />
      </div>
    </div>
  );
};

export default Doctors;
