// import api from "./index";

// export const getDoctors = async () => {
//   try {
//     const response = await api.get("/doctors/");
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching doctors:", error);
//     throw error;
//   }
// };

// export const getDoctorById = async (id) => {
//   try {
//     const response = await api.get(`/doctors/${id}`);
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching doctor:", error);
//     throw error;
//   }
// };

// export const addDoctor = async (doctorData) => {
//   try {
//     const response = await api.post("/doctors/", doctorData);
//     return response.data;
//   } catch (error) {
//     console.error("Error adding doctor:", error);
//     throw error;
//   }
// };


import api from "./index";

export const getDoctors = async () => {
  try {
    const response = await api.get("/doctors/");
    // Ensure we always return an array
    return Array.isArray(response.data?.data) ? response.data.data : [];
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return []; // Return empty array instead of throwing
  }
};

export const getDoctorById = async (id) => {
  try {
    const response = await api.get(`/doctors/${id}`);
    console.log("API Response:", response.data); // Debug log
    // Ensure we return null if no data or handle specific response structure
    return response.data?.data || response.data || null;
  } catch (error) {
    console.error("Error fetching doctor:", error);
    return null; // Return null instead of throwing
  }
};

export const addDoctor = async (doctorData) => {
  try {
    const response = await api.post("/doctors/", doctorData);
    return response.data?.data || response.data;
  } catch (error) {
    console.error("Error adding doctor:", error);
    throw error; // Keep throwing for form submission errors
  }
};

// export const addDoctor = async (doctorData) => {
//   try {
//     const response = await api.post("/doctors/", doctorData);
//     return response.data;
//   } catch (error) {
//     console.error("Error adding doctor:", error);
//     throw error;
//   }
// };