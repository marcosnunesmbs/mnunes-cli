import { ClaudeAlibabaConfig, CommandResult } from '../../domain';
import { SettingsRepository } from '../../infrastructure';

export class ClaudeAlibabaUseCase {
  private settingsRepository: SettingsRepository;

  constructor() {
    this.settingsRepository = new SettingsRepository();
  }

  execute(enabled: boolean, model: string = 'MiniMax-M2.5'): CommandResult {
    try {
      if (enabled) {
        const token = this.settingsRepository.getAuthToken();

        if (!token) {
          return {
            success: false,
            message: 'MN_ANTHROPIC_TOKEN não encontrado nas variáveis de ambiente',
          };
        }

        this.settingsRepository.saveSettings({
          env: {
            MN_ANTHROPIC_TOKEN: token,
            ANTHROPIC_BASE_URL: 'https://coding-intl.dashscope.aliyuncs.com/apps/anthropic',
            ANTHROPIC_MODEL: model,
          },
        });

        return {
          success: true,
          message: 'Claude Alibaba Habilitado',
        };
      } else {
        this.settingsRepository.saveSettings({});
        return {
          success: true,
          message: 'Claude Alibaba Desabilitado',
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      };
    }
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