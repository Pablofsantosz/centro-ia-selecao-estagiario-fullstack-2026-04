import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
from app.services.strategies import CypressStrategy
from datetime import datetime


load_dotenv()


client = Groq(
    api_key=os.getenv("GROQ_API_KEY"),
)

app = FastAPI(title="QA Assistant API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class UserStoryRequest(BaseModel):
    description: str

@app.post("/api/generate/gherkin")
async def generate_gherkin(request: UserStoryRequest):
    """
    Endpoint dedicado a gerar apenas os cenários BDD em formato Gherkin.
    """
    prompt = f"""
    És um Engenheiro de QA Sênior especialista em testes BDD.

    Com base na seguinte funcionalidade:
    \"\"\"{request.description}\"\"\"

    Regras obrigatórias:
    - Usa Gherkin em português (Dado, Quando, Então)
    - Cria EXATAMENTE 5 cenários
    - Inclui:
    • 2 cenários positivos
    • 2 cenários negativos (erros, validações)
    • 1 cenário de edge case
    - Usa linguagem clara e profissional
    - Evita redundância
    - NÃO inventes funcionalidades que não existem

    Formato obrigatório:

    Feature: <nome da funcionalidade>

    Scenario: <nome>
        Dado ...
        Quando ...
        Então ...

    Responde apenas com o Gherkin, sem explicações.
    """
    try:
        response = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.1-8b-instant",
            temperature=0.3
        )
        return {"data": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar Gherkin: {str(e)}")

@app.post("/api/generate/cypress")
async def generate_cypress(request: UserStoryRequest):
    """
    Endpoint dedicado a gerar apenas o código de automação Cypress.
    """
    strategy = CypressStrategy()
    prompt = f"""
    És um Engenheiro de QA Sênior. 
    {strategy.get_prompt_instructions()}
    
    Cria o código de automação Cypress para os testes de: {request.description}.
    Baseia-te em 5 cenários de teste.
    Responde apenas com o código, sem explicações ou blocos de Markdown.
    """
    try:
        response = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.1-8b-instant",
            temperature=0.3
        )
        return {"data": response.choices[0].message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao gerar Cypress: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)