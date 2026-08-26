# MyGym Software - Frontend Web

Aplicação web para usuário de academia, onde é possível anotar seus treinos e exercícios,
registrar a execução dos treinos, acompanhar sua progressão de carga e potencializar sua evolução.

## Stack

* React
* Vite
* Tailwind CSS
* Material UI
* React Router
* React Hook Form + Zod
* Lucide React

## Funcionalidades

* Cadastro e login de usuários
* Cadastro de treino 
* Editar e excluir treinos
* Registrar a execução de treino
* Analisar em um gráfico progressão de carga
* Histórico de treinos

## Como Executar

### Pré-requisitos

- Node.js

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/CaioSouza07/mygym-web.git
cd navalrivals-web

# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm run dev
```

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE=http://localhost:8080
```

| Variável        | Descrição                                  | Padrão                  |
| --------------- | ------------------------------------------ | ----------------------- |
| `VITE_API_BASE` | URL base da API backend (REST) | `http://localhost:8080` |
