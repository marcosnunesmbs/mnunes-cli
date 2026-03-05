import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const SETTINGS_FILE = '.claude/settings.json';
const ENV_FILE = '.env';

export interface ClaudeSettings {
  env?: {
    ANTHROPIC_AUTH_TOKEN?: string;
    ANTHROPIC_BASE_URL?: string;
    ANTHROPIC_MODEL?: string;
  };
  [key: string]: unknown;
}

function loadEnvFile(): void {
  const envPath = path.join(process.cwd(), ENV_FILE);

  if (!fs.existsSync(envPath)) {
    return;
  }

  const content = fs.readFileSync(envPath, 'utf-8');
  const lines = content.split('\n');

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const equalsIndex = trimmed.indexOf('=');
    if (equalsIndex === -1) {
      continue;
    }

    const key = trimmed.substring(0, equalsIndex).trim();
    let value = trimmed.substring(equalsIndex + 1).trim();

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

export class SettingsRepository {
  private getSettingsPath(): string {
    return path.join(os.homedir(), SETTINGS_FILE);
  }

  getSettings(): ClaudeSettings {
    const settingsPath = this.getSettingsPath();

    if (!fs.existsSync(settingsPath)) {
      return {};
    }

    try {
      const content = fs.readFileSync(settingsPath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return {};
    }
  }

  saveSettings(settings: ClaudeSettings): void {
    const settingsPath = this.getSettingsPath();
    const settingsDir = path.dirname(settingsPath);

    if (!fs.existsSync(settingsDir)) {
      fs.mkdirSync(settingsDir, { recursive: true });
    }

    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
  }

  getAuthToken(): string | undefined {
    return process.env.ANTHROPIC_AUTH_TOKEN;
  }
}