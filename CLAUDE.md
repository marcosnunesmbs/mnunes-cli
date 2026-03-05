# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CLI pessoal `mnunes` construído com TypeScript e Commander.js. Segue arquitetura Clean Architecture com três camadas: domain, application e infrastructure.

## Commands

```bash
npm run build    # Compila TypeScript para dist/
mnunes hello     # Comando de teste
mnunes claude-alibaba -E          # Habilita Claude Alibaba (padrão: MiniMax-M2.5)
mnunes claude-alibaba -E -m qwen3-coder-plus  # Habilita com modelo específico
mnunes claude-alibaba -D          # Desabilita Claude Alibaba
```

Modelos disponíveis: `qwen3.5-plus`, `qwen3-max-2026-01-23`, `qwen3-coder-next`, `qwen3-coder-plus`, `glm-5`, `glm-4.7`, `kimi-k2.5`, `MiniMax-M2.5` (padrão)

## Architecture

```
src/
├── domain/           # Entidades e interfaces (sem dependências externas)
├── application/      # Use cases (lógica de negócio)
├── infrastructure/   # Repositórios (acesso a dados externos)
└── presentation/     # CLI e utilitários
```

## Key Details

- O arquivo `.env` na raiz é carregado automaticamente para ler `ANTHROPIC_AUTH_TOKEN`
- O comando `claude-alibaba -E` salva configuração em `~/.claude/settings.json` com:
  - `ANTHROPIC_AUTH_TOKEN` (do .env)
  - `ANTHROPIC_BASE_URL`: https://coding-intl.dashscope.aliyuncs.com/apps/anthropic
  - `ANTHROPIC_MODEL`: modelo selecionado (padrão: MiniMax-M2.5)
- O comando `claude-alibaba -D` limpa o settings.json (grava `{}`)