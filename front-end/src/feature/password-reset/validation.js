export function isResetToken(value) {
  return typeof value === 'string' && /^[A-Za-z0-9_-]{32,256}$/.test(value);
}

export function validatePassword(password, confirmation) {
  if (typeof password !== 'string' || password.length < 8 || password.length > 128) return 'short';
  if (password !== confirmation) return 'mismatch';
  return '';
}
