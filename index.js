#!/usr/bin/env node
const { Command } = require('commander');
const program = new Command();

program
  .name('mnunes')
  .description('CLI mnunes')
  .version('1.0.0');

program
  .command('hello')
  .description('Say hello')
  .action(() => {
    console.log('hello sir');
  });

program
  .command('claude-alibaba')
  .description('Enable or disable Claude Alibaba')
  .option('--true', 'Enable Claude Alibaba')
  .option('--false', 'Disable Claude Alibaba')
  .action((options) => {
    if (options.true) {
      console.log('Claude Alibaba Habilitado');
    } else if (options.false) {
      console.log('Claude Alibaba Desabilitado');
    } else {
      console.log('Por favor, use --true ou --false');
    }
  });

program.parse();