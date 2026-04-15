from abc import ABC, abstractmethod

class TestGeneratorStrategy(ABC):
    @abstractmethod
    def get_prompt_instructions(self) -> str:
        pass

class CypressStrategy(TestGeneratorStrategy):
    def get_prompt_instructions(self) -> str:
        return "Gere código de automação usando Cypress (.cy.js). Use comandos modernos como cy.intercept e boas práticas de seletores."

class PlaywrightStrategy(TestGeneratorStrategy):
    def get_prompt_instructions(self) -> str:
        return "Gere código de automação usando Playwright com TypeScript. Use a estrutura de Page Objects se possível."