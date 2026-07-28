function formatMessage(level: string, message: string): string {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level}] ${message}`;
}

export function info(message: string): void {
  console.log(formatMessage('INFO', message));
}

export function error(message: string): void {
  console.error(formatMessage('ERROR', message));
}

export function warn(message: string): void {
  console.warn(formatMessage('WARN', message));
}

export function debug(message: string): void {
  console.debug(formatMessage('DEBUG', message));
}
