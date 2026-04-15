from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


    
def test_generate_endpoint_exists():
    # Testamos apenas se a rota está protegida ou responde erro de validação (sem descrição)
    response = client.post("/api/generate", json={})
    assert response.status_code == 422 