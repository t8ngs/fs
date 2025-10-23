# Guia do Agente: @t8ngs/fs

Este documento explica como utilizar o projeto @t8ngs/fs para manipulação e verificação de arquivos e diretórios em Node.js.

## Instalação

Execute:

```bash
npm install @t8ngs/fs
```

## Principais funções

- `assertDir(path: string)`: Verifica se o diretório existe.
- `assertFile(path: string)`: Verifica se o arquivo existe.

## Exemplos de uso

```typescript
import { assertDir, assertFile } from '@t8ngs/fs';

assertDir('./meu-diretorio');
assertFile('./meu-arquivo.txt');
```

## Testes

Os testes estão localizados na pasta `tests/`. Para rodar os testes:

```bash
npm test
```

## Inspiração

Este projeto foi inspirado no Japa, buscando simplicidade e clareza para automação de testes e manipulação de arquivos.

## Suporte

Para dúvidas ou sugestões, abra uma issue no repositório.
