import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from dotenv import load_dotenv
from app.services.strategies import CypressStrategy

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

@app.post("/api/generate")
async def generate_test(request: UserStoryRequest):
    strategy = CypressStrategy()
    
    prompt = f"""
    És um QA Sênior. {strategy.get_prompt_instructions()}
    Cria 3 cenários BDD e o código de teste para: {request.description}
    Responde apenas com os cenários e o código, formatado em Markdown.
    """
    
    try:
        
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.1-8b-instant", 
        )
        
        resultado = chat_completion.choices[0].message.content
        return {"data": resultado}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))