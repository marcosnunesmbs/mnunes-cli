# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CLI pessoal `mnunes` construído com TypeScript e Commander.js. Segue arquitetura Clean Architecture com três camadas: domain, application e infrastructure.

## Commands

```bash
npm run build    # Compila TypeScript para dist/
node dist/index.js claude-alibaba --true   # Habilita Claude Alibaba
node dist/index.js claude-alibaba --false  # Desabilita Claude Alibaba
node dist/index.js hello                   # Teste simple
```

## Architecture

```
src/
├── domain/           # Entidades e interfaces (sem dependências externas)
│   └── entities/     # ClaudeAlibaba.ts
├── application/      # Use cases (lógica de negócio)
│   └── useCases/     # ClaudeAlibabaUseCase, HelloUseCase
├── infrastructure/   # Repositórios (acesso a dados externos)
│   └── repositories/ # SettingsRepository (lê/salva ~/.claude/settings.json)
└── presentation/     # CLI e utilitários
    ├── cli.ts        # Ponto de entrada com Commander.js
    └── utils/        # DisplayUtil (cores no terminal)
```

## Key Details

- O arquivo `.env` na raiz é carregado automaticamente para ler `ANTHROPIC_AUTH_TOKEN`
- O comando `claude-alibaba --true` salva configuração em `~/.claude/settings.json` com:
  - `ANTHROPIC_AUTH_TOKEN` (do .env)
  - `ANTHROPIC_BASE_URL`: https://coding-intl.dashscope.aliyuncs.com/apps/anthropic
  - `ANTHROPIC_MODEL`: MiniMax-M2.5
- O comando `claude-alibaba --false` limpa o settings.json (grava `{}`)