export function validateName(name) {
  if (!/^[A-Za-z0-9_]+$/.test(name)) {
    return false;
  }

  return true;
}
