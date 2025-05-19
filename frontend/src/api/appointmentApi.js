import api from "./index";

export const bookAppointment = async (doctorId, appointmentData) => {
  try {
    const response = await api.post(
      `/appointments/add/${doctorId}`,
      appointmentData
    );
    return response.data;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
};

export const cancelAppointment = async (appointmentId) => {
  try {
    const response = await api.delete(`/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    throw error;
  }
};
