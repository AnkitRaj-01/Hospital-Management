// import { useState } from "react";
// import { addDoctor } from "../api/doctorApi";
// import { useAppContext } from "../contexts/AppContext";

// const AddDoctorForm = () => {
//   const { showNotification } = useAppContext();
//   const [formData, setFormData] = useState({
//     doctor_name: "",
//     specialty: "",
//     available_slots_per_day: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: name === "available_slots" ? parseInt(value) : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await addDoctor(formData);
//       showNotification("Doctor added successfully!");
//       setFormData({
//         doctor_name: "",
//         specialty: "",
//         available_slots_per_day: "",
//       });
//     } catch (error) {
//       console.error("Error:", error);
//       showNotification("Failed to add doctor", "error");
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
//       <h2 className="text-2xl font-bold mb-6">Add New Doctor</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="name"
//           >
//             Doctor Name
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="name"
//             name="name"
//             type="text"
//             value={formData.doctor_name}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="specialty"
//           >
//             Specialty
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="specialty"
//             name="specialty"
//             type="text"
//             value={formData.specialty}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="mb-6">
//           <label
//             className="block text-gray-700 text-sm font-bold mb-2"
//             htmlFor="available_slots"
//           >
//             Available Slots
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="available_slots"
//             name="available_slots"
//             type="number"
//             min="0"
//             value={formData.available_slots_per_day}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="flex items-center justify-between">
//           <button
//             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//             type="submit"
//           >
//             Add Doctor
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddDoctorForm;


import { useState } from "react";
import { addDoctor } from "../api/doctorApi";
import { useAppContext } from "../contexts/AppContext";

const AddDoctorForm = () => {
  const { showNotification } = useAppContext();
  const [formData, setFormData] = useState({
    doctor_name: "",
    specialty: "",
    available_slots_per_day: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "available_slots_per_day" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoctor(formData);
      showNotification("Doctor added successfully!");
      setFormData({
        doctor_name: "",
        specialty: "",
        available_slots_per_day: "",
      });
    } catch (error) {
      console.error("Error:", error);
      showNotification("Failed to add doctor", "error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <h2 className="text-2xl font-bold mb-6">Add New Doctor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="doctor_name"
          >
            Doctor Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="doctor_name"
            name="doctor_name"
            type="text"
            value={formData.doctor_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="specialty"
          >
            Specialty
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="specialty"
            name="specialty"
            type="text"
            value={formData.specialty}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="available_slots_per_day"
          >
            Available Slots Per Day
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="available_slots_per_day"
            name="available_slots_per_day"
            type="number"
            min="0"
            value={formData.available_slots_per_day}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDoctorForm;
