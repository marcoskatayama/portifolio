# 🚀 Katayama Store - Portfólio Tech

Este projeto é uma **Vitrine de Produtos** desenvolvida para demonstrar competências avançadas em desenvolvimento Frontend. A aplicação consome dados de uma API REST, implementa filtragem em tempo real, paginação e troca dinâmica de visualização (Grid/List).

## 🎯 Objetivo do Projeto

Demonstrar a aplicação de **Clean Architecture** e princípios de **UX/UI** em um ambiente React escalável, focando em performance e manutenibilidade de código.

## ✨ Funcionalidades Principais

- **Consumo de API REST:** Integração com Fake Store API.
- **Dual View Mode:** Alternância dinâmica entre visualização em Grade (Grid) e Lista (List) com preservação de estado.
- **Busca em Tempo Real:** Filtragem otimizada por nome de produto.
- **Filtro por Categorias:** Navegação baseada em chips dinâmicos extraídos da API.
- **Paginação Inteligente:** Divisão de resultados para melhor performance de renderização.
- **Mobile First:** Design totalmente responsivo adaptado para qualquer dispositivo.

## 🛠️ Decisões Técnicas & Arquitetura

1. **Separação de Responsabilidades (SoC)**

O projeto foi estruturado para separar a lógica de negócio da interface:

- **Services:** Camada pura de comunicação com a API (independente do framework).
- **Hooks:** Gerenciamento de estado e efeitos (Lógica React reutilizável).
- **Components:** UI declarativa e estilização utilitária.

2. **Performance com React Hooks**

- **useMemo:** Utilizado para operações de filtragem e extração de categorias, evitando re-processamentos desnecessários em cada re-render.
- **Batch Updates:** Gerenciamento de estados sincronizados para evitar renderizações em cascata (evitando o uso excessivo de useEffect).

3. **UI/UX Refinado com Tailwind CSS**

- **Glassmorphism:** Header com efeito de desfoque de fundo para um visual moderno.
- **Micro-interações:** Hover effects e transições suaves que fornecem feedback imediato ao usuário.
- **Empty States:** Tratamento visual para quando nenhum resultado é encontrado na busca.

## 📦 Como rodar o projeto

```sh
# Clone o repositório
git clone https://github.com/seu-usuario/api-consumer.git

# Entre na pasta
cd api-consumer

# Instale as dependências
npm install

# Rode o projeto em modo desenvolvimento
npm run dev
```

## 🛠️ Tecnologias Utilizadas

- **Vite** (Build Tool)
- **React** (UI Library)
- **TypeScript** (Static Typing)
- **Tailwind CSS** (Styling)
- **Lucide React** (Icons)
- **FakeStore API** (REST Data)

## 👤 Autor

**Marcos - Desenvolvedor Pleno**

Experiência em: Python (Flask/SQLAlchemy), React, PostgreSQL, TypeScript e DevOps.
