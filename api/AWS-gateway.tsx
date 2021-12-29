const ADMIN_HOST = 'https://dovga4trq5.execute-api.eu-west-1.amazonaws.com';
const PROFILE_HOST = 'https://b6eefr4a2b.execute-api.eu-west-1.amazonaws.com';

export const API = {
  LOGIN: `${ADMIN_HOST}/api/admin/login`,
  SETTINGS_FULL_INFO: `${ADMIN_HOST}/api/admin/settings`,
  SETTINGS_CHANGE: `${ADMIN_HOST}/api/admin/settings/subscriber`,
  CHANGE_SERVICES: `${ADMIN_HOST}/api/admin/settings/services`,
  ACCOUNT_RESET_PASSWORD: `${PROFILE_HOST}/api/dentist/profile/account/resetPassword`,
  STAT_CUR_MONTHS: `${ADMIN_HOST}/api/admin/dashboard`,
};
