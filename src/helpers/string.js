import CONFIG from '@quanta/config';

export const trimAccountId = id => `${id.slice(0, CONFIG.TRIM_LENGTH)}...`;

export const abc = () => {};
