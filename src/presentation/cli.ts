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

program
  .command('claude-alibaba')
  .description('Enable or disable Claude Alibaba')
  .option('--true', 'Enable Claude Alibaba')
  .option('--false', 'Disable Claude Alibaba')
  .action((options) => {
    const useCase = new ClaudeAlibabaUseCase();

    if (options.true) {
      const result = useCase.execute(true);
      DisplayUtil.success(result.message);
    } else if (options.false) {
      const result = useCase.execute(false);
      DisplayUtil.error(result.message);
    } else {
      DisplayUtil.warning('Por favor, use --true ou --false');
    }
  });

program.parse();