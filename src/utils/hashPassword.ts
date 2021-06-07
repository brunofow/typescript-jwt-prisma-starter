import bcrypt from 'bcrypt';

async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  return hash;
}

async function comparePassword(password: string, hash: string) {
  const match = await bcrypt.compare(password, hash);

  return match;
}

export { hashPassword, comparePassword };