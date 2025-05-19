### Python SDK (OpenAPI Generated)
# Directory Structure:
# sdk/
# ├── pyproject.toml
# ├── README.md
# ├── openapi.json
# └── hospital_sdk/
#     ├── __init__.py
#     ├── api_client.py
#     ├── models.py
#     └── apis/
#         ├── __init__.py
#         ├── default_api.py
#         └── exceptions.py

# =======================
# File: sdk/pyproject.toml
[tool.poetry]
name = "hospital_sdk"
version = "0.1.0"
description = "Python SDK for Hospital Management API"
authors = ["Your Name <you@example.com>"]

[tool.poetry.dependencies]
python = "^3.8"
httpx = "^0.24.0"

[tool.poetry.dev-dependencies]
pytest = "^7.0"

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"

# =======================
# File: sdk/README.md
"""
# Hospital SDK

This Python SDK allows easy integration with the Hospital Management API.

## Installation

```bash
pip install hospital_sdk
```

## Usage

```python
from hospital_sdk import ApiClient, DefaultApi

client = ApiClient(base_url="http://localhost:8000")
api = DefaultApi(client)

# Get doctors
doctors = api.get_doctors()

# Add a new doctor
new_doc = {
    "doctor_name": "Ankit Raj",
    "speciality": "Cardiology",
    "available_slots_per_day": "12"
}
added = api.add_doctors(new_doc)
```"""

# =======================
# File: sdk/openapi.json
# (Copy the provided OpenAPI JSON spec here)

# =======================
# File: sdk/hospital_sdk/api_client.py
import httpx

class ApiClient:
    def __init__(self, base_url: str, timeout: int = 5):
        self.base_url = base_url.rstrip('/')
        self.client = httpx.Client(base_url=self.base_url, timeout=timeout)

    def request(self, method: str, path: str, **kwargs):
        response = self.client.request(method, path, **kwargs)
        response.raise_for_status()
        if response.text:
            return response.json()
        return None

# =======================
# File: sdk/hospital_sdk/models.py
from pydantic import BaseModel
from typing import List, Optional

class DocDetails(BaseModel):
    doctor_name: str
    speciality: str
    available_slots_per_day: str

class AppointmentDetails(BaseModel):
    patient_name: str
    appointment_date: Optional[str] = None
    time_slot: str

# =======================
# File: sdk/hospital_sdk/apis/default_api.py
from typing import Any, Dict
from ..api_client import ApiClient
from ..models import DocDetails, AppointmentDetails

class DefaultApi:
    def __init__(self, client: ApiClient):
        self.client = client

    def get_doctors(self) -> Any:
        """Get list of doctors"""
        return self.client.request("GET", "/doctors")

    def add_doctors(self, doc: Dict) -> Any:
        """Add a new doctor"""
        return self.client.request("POST", "/doctors", json=DocDetails(**doc).dict())

    def get_doctor(self, doctor_id: str) -> Any:
        """Get a doctor by ID"""
        return self.client.request("GET", f"/doctors/{doctor_id}")

    def add_appointment(self, doctor_id: str, details: Dict) -> Any:
        """Schedule an appointment"""
        return self.client.request(
            "POST", f"/appointments/add/{doctor_id}", json=AppointmentDetails(**details).dict()
        )

    def delete_appointment(self, appointment_id: str) -> Any:
        """Delete an appointment"""
        return self.client.request("DELETE", f"/appointments/{appointment_id}")

# =======================
# File: sdk/hospital_sdk/apis/exceptions.py

class ApiException(Exception):
    """Custom exception for API errors"""
