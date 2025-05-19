from datetime import datetime
from pydantic import BaseModel

class DocDetails(BaseModel):
    doctor_name: str
    speciality: str
    available_slots_per_day: str

class AppointmentDetails(BaseModel):
    patient_name: str
    appointment_date: str = datetime.now()
    time_slot: str