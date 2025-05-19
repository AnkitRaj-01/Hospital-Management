from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_get_doctors_initially_empty():
    response = client.get("/doctors")
    assert response.status_code == 200
    # Expect empty list or dict, adjust based on implementation
    assert response.json() == []


def test_add_and_get_doctor():
    payload = {
        "doctor_name": "Dr. Test",
        "speciality": "Testing",
        "available_slots_per_day": "5"
    }
    # Add
    post_resp = client.post("/doctors", json=payload)
    assert post_resp.status_code == 200
    created = post_resp.json()
    assert created.get("doctor_name") == payload["doctor_name"]

    # Retrieve
    doc_id = created.get("id") or created.get("doctor_id")
    get_resp = client.get(f"/doctors/{doc_id}")
    assert get_resp.status_code == 200
    assert get_resp.json()["speciality"] == payload["speciality"]


def test_add_and_delete_appointment():
    # First add a doctor
    doc_payload = {"doctor_name": "Dr. Appt", "speciality": "Demo", "available_slots_per_day": "3"}
    doc = client.post("/doctors", json=doc_payload).json()
    doc_id = doc.get("id") or doc.get("doctor_id")

    # Schedule appointment
    appt_payload = {"patient_name": "Alice", "time_slot": "09:00-10:00"}
    appt_resp = client.post(f"/appointments/add/{doc_id}", json=appt_payload)
    assert appt_resp.status_code == 200
    appt = appt_resp.json()
    appt_id = appt.get("id") or appt.get("appointment_id")

    # Delete
    del_resp = client.delete(f"/appointments/{appt_id}")
    assert del_resp.status_code == 200
    assert del_resp.json().get("status") == "deleted"