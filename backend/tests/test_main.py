from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


    
def test_generate_endpoint_exists():
   
    response = client.post("/api/generate", json={})
    assert response.status_code == 422 