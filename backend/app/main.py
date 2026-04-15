import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
from app.services.strategies import CypressStrategy # Importe a estratégia

load_dotenv()

# Configuração da IA
api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)
model = genai.GenerativeModel('gemini-1.5-flash')

app = FastAPI(title="QA Assistant API")

class UserStoryRequest(BaseModel):
    description: str

@app.get("/health")
async def test_health_check_returns_200():
    return {"status": "ok"}

@app.post("/api/generate")
async def generate_test(request: UserStoryRequest):
    strategy = CypressStrategy()
    
    prompt = f"""
    Você é um QA Sênior. {strategy.get_prompt_instructions()}
    Crie 3 cenários BDD e o código de teste para: {request.description}
    """
    
    try:
        response = model.generate_content(prompt)
        return {"data": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))