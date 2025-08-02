import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export async function setMasterPassword(password) {
  const hashed = await bcrypt.hash(password, SALT_ROUNDS);
  return hashed;
}

export async function checkMasterPassword(input, storedHash) {
  return await bcrypt.compare(input, storedHash);
}
