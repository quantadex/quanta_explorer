import CONFIG from '@quanta/config';

export const trimAccountId = id => `${id.slice(0, CONFIG.SETTINGS.ACCOUNT_TRIM_LENGTH)}...`;
