from fastapi import APIRouter, HTTPException
from models.hospital_models import DocDetails, AppointmentDetails
from database.config import client
from database.rules import Rules
from bson import ObjectId
import os

router = APIRouter()

@router.post('/doctors')
async def add_doctors(doc_detail: DocDetails):
    doc_details = dict(doc_detail)
    if len(doc_details['available_slots_per_day']) < 0:
        raise HTTPException(status_code=400, detail='Available slots per day cannot be negative')
    else:
        doc_details['_id'] = ObjectId()
        doc_details['available_slots_per_day'] = doc_details['available_slots_per_day'].split(',')
        operation_id = Rules.add(client, 'hospital_appointment_booking_system', 'doctors', doc_details)
        return {'status_code': 200, 'message': 'Doctor added successfully', 'operation_id': str(operation_id), 'data': doc_detail}

@router.get('/doctors')
async def get_doctors():
    docs = Rules.get_all(client, 'hospital_appointment_booking_system', 'doctors', {})
    if not docs:
        raise HTTPException(status_code=404, detail='No doctors found')
    else:
        for doc in docs:
            doc['_id'] = str(doc['_id'])
        return {'status_code': 200, 'message': 'Doctors fetched successfully', 'data': docs}

@router.get('/doctors/{doctor_id}')
async def get_doctor(doctor_id: str):
    doc = Rules.get(client, 'hospital_appointment_booking_system', 'doctors', {'_id': ObjectId(doctor_id)})
    if not doc:
        raise HTTPException(status_code=404, detail='No doctor found')
    else:
        doc['_id'] = str(doc['_id'])
        return {'status_code': 200, 'message': 'Doctor fetched successfully', 'data': doc}

@router.post('/appointments/add/{doctor_id}')
async def add_appointment(doctor_id: str, appointment_detail: AppointmentDetails):
    appointment_details = dict(appointment_detail)
    doc = Rules.get(client, 'hospital_appointment_booking_system', 'doctors', {'_id': ObjectId(doctor_id)})
    if not doc:
        raise HTTPException(status_code=404, detail='No doctor found')
    else:
        if len(doc['available_slots_per_day']) <= 0:
            # raise HTTPException(status_code=200, detail='No slots available')
            return {'status_code': 200, 'message': 'No slots available'}
        
        else:
            if appointment_details['time_slot'] not in doc['available_slots_per_day']:
                # raise HTTPException(status_code=200, detail='No slots available')
                return {'status_code': 200, 'message': 'No slots available'}
            else:
                doc['available_slots_per_day'].remove(appointment_details['time_slot'])
                Rules.update(client, 'hospital_appointment_booking_system', 'doctors', {'_id': ObjectId(doctor_id)}, doc)
                appointment_details['_id'] = ObjectId()
                appointment_details['doctor_id'] = ObjectId(doctor_id)
                operation_id = Rules.add(client, 'hospital_appointment_booking_system', 'appointments', appointment_details)
                return {'status_code': 200, 'message': 'Appointment added successfully', 'operation_id': str(operation_id), 'data': appointment_detail}

@router.delete('/appointments/{appointment_id}')
async def delete_appointment(appointment_id: str):
    appointment = Rules.get(client, 'hospital_appointment_booking_system', 'appointments', {'_id': ObjectId(appointment_id)})
    if not appointment:
        raise HTTPException(status_code=404, detail='No appointment found')
    else:
        doc = Rules.get(client, 'hospital_appointment_booking_system', 'doctors', {'_id': ObjectId(appointment['doctor_id'])})
        doc['available_slots_per_day'].append(appointment['time_slot'])
        Rules.update(client, 'hospital_appointment_booking_system', 'doctors', {'_id': ObjectId(appointment['doctor_id'])}, doc)
        Rules.delete(client, 'hospital_appointment_booking_system', 'appointments', {'_id': ObjectId(appointment_id)})
        return {'status_code': 200, 'message': 'Appointment deleted successfully'}