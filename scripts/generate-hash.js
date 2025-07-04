const bcrypt = require('bcryptjs');

async function generateHashes() {
  const passwords = ['password', 'password123', 'admin123', 'student123'];
  
  for (const password of passwords) {
    const hash = await bcrypt.hash(password, 12);
    console.log(`Password: ${password}`);
    console.log(`Hash: ${hash}`);
    console.log('---');
  }
}

// Also test the existing hash
async function testExistingHash() {
  const existingHash = '$2b$12$jpiUECITFWQLHSaHBByve.sHBovM2W5TVzQAXxFBldSAJRkI4cuBO';
  const possiblePasswords = ['password', 'password123', 'admin123', 'student123', '123456', 'admin', 'student'];
  
  console.log('Testing existing hash against possible passwords:');
  
  for (const password of possiblePasswords) {
    const isMatch = await bcrypt.compare(password, existingHash);
    console.log(`${password}: ${isMatch ? 'MATCH' : 'no match'}`);
  }
}

generateHashes().then(() => testExistingHash());