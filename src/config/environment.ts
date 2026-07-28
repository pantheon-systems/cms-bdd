import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();

export const ENV = {
  HEADLESS: process.env.HEADLESS === 'true',
  SLOW_MO: parseInt(process.env.SLOW_MO || '0'),
  WORKERS: parseInt(process.env.WORKERS || '4'),
  RETRIES: parseInt(process.env.RETRIES || '2'),

  DRUPAL_URL: process.env.DRUPAL_URL || '',
  DRUPAL_USER: process.env.DRUPAL_USER || '',
  DRUPAL_PASSWORD: process.env.DRUPAL_PASSWORD || '',

  WP_URL: process.env.WP_URL || '',
  WP_USER: process.env.WP_USER || '',
  WP_PASSWORD: process.env.WP_PASSWORD || '',
} as const;
