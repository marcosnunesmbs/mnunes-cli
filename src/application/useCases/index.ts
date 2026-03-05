import { ClaudeAlibabaConfig, CommandResult } from '../../domain';

export class ClaudeAlibabaUseCase {
  execute(enabled: boolean): CommandResult {
    const message = enabled
      ? 'Claude Alibaba Habilitado'
      : 'Claude Alibaba Desabilitado';

    return {
      success: true,
      message,
    };
  }
}

export class HelloUseCase {
  execute(): CommandResult {
    return {
      success: true,
      message: 'Hello, Sir!',
    };
  }
}