#!/usr/bin/env node
import { Command } from 'commander';
import { ClaudeAlibabaUseCase, HelloUseCase } from '../application';
import { DisplayUtil } from './utils';

const program = new Command();

program
  .name('mnunes')
  .description('CLI mnunes')
  .version('1.0.0');

program
  .command('hello')
  .description('Say hello')
  .action(() => {
    const useCase = new HelloUseCase();
    const result = useCase.execute();
    DisplayUtil.success(result.message);
  });

const MODELS = [
  'qwen3.5-plus',
  'qwen3-max-2026-01-23',
  'qwen3-coder-next',
  'qwen3-coder-plus',
  'glm-5',
  'glm-4.7',
  'kimi-k2.5',
  'MiniMax-M2.5',
];

program
  .command('claude-alibaba')
  .description('Enable or disable Claude Alibaba Settings')
  .option('-E, --enable', 'Enable Claude Alibaba with settings from environment variables')
  .option('-D, --disable', 'Disable Claude Alibaba')
  .option('-m, --model <model>', `Model to use (choices: ${MODELS.join(', ')})`, 'MiniMax-M2.5')
  .action((options) => {
    const useCase = new ClaudeAlibabaUseCase();

    if (options.enable) {
      const model = options.model;
      if (!MODELS.includes(model)) {
        DisplayUtil.error(`Modelo inválido: ${model}. Escolha um dos: ${MODELS.join(', ')}`);
        return;
      }
      const result = useCase.execute(true, model);
      if (result.success) {
        DisplayUtil.success(result.message);
      } else {
        DisplayUtil.error(result.message);
      }
    } else if (options.disable) {
      const result = useCase.execute(false);
      if (result.success) {
        DisplayUtil.success(result.message);
      } else {
        DisplayUtil.error(result.message);
      }
    } else {
      DisplayUtil.warning('Por favor, use --enable (-E) ou --disable (-D)');
    }
  });

program.parse();