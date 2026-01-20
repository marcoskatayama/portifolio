# 💰 Finanças Pro - Dashboard Pessoal

Aplicação de gerenciamento financeiro de alto desempenho desenvolvida com **Next.js 16** e **TypeScript**. Este projeto foi criado para demonstrar práticas avançadas de desenvolvimento frontend, focando em performance, tipagem estrita e experiência do usuário (UX).



## 🛠️ Stack Técnica
- **Next.js 16 (App Router)**: Utilizando Turbopack para builds ultra-rápidos.
- **TypeScript**: Interfaces rigorosas para garantir segurança de dados.
- **Zustand**: Gerenciamento de estado global com middleware de persistência.
- **Recharts**: Visualização de dados dinâmica e responsiva.
- **Tailwind CSS**: Estilização moderna e otimizada.
- **Lucide React**: Iconografia consistente.

## 🚀 Desafios Técnicos Resolvidos
Durante o desenvolvimento, foquei em resolver problemas comuns de aplicações React modernas:
- **Hydration Mismatch**: Implementação de importação dinâmica (`next/dynamic`) para componentes que dependem de APIs do navegador (localStorage).
- **Layout Shift & Chart Rendering**: Otimização do ciclo de renderização do Recharts para evitar avisos de dimensionamento e garantir uma UI estável desde o primeiro frame.
- **Persistência de Estado**: Configuração de middleware para sincronização automática entre o estado da aplicação e o armazenamento local.

## 📦 Como rodar localmente
1. Clone o repositório: `git clone https://github.com/marcoskatayama/portifolio`
2. Instale as dependências: `npm install`
3. Inicie o ambiente de desenvolvimento: `npm run dev`
4. Acesse: `http://localhost:3000`

---
Desenvolvido por **Marcos Katayama** - [Linkedin](http://linkedin.com/in/marcoskatayama/)