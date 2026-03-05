# mnunes CLI

CLI pessoal para automatizar tarefas do dia a dia.

## Instalação

```bash
npm install -g .
```

## Comandos

### Hello

```bash
mnunes hello
```

### Claude Alibaba

Habilitar o Claude Alibaba (requer token no arquivo `.env`):

```bash
mnunes claude-alibaba --true
```

Desabilitar:

```bash
mnunes claude-alibaba --false
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com o token da Anthropic:

```env
ANTHROPIC_AUTH_TOKEN=sk-sp-...
```

## Desenvolvimento

```bash
npm run build    # Compila TypeScript
```