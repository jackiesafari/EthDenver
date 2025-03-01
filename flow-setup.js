const fs = require('fs');
const crypto = require('crypto');
const { privateKeyToAccount } = require('viem/accounts');

console.log('🔑 FLOW EVM SETUP HELPER 🔑');
console.log('--------------------------');

// STEP 1: Generate a cryptographically secure private key
const privateKey = '0x' + crypto.randomBytes(32).toString('hex');
const privateKeyNoPrefix = privateKey.slice(2);

// STEP 2: Create a proper .env file
const envContent = `PRIVATE_KEY=${privateKeyNoPrefix}\n`;
fs.writeFileSync('.env', envContent);

// STEP 3: Test the key with viem
try {
  const account = privateKeyToAccount(privateKey);
  console.log('✅ PRIVATE KEY GENERATED SUCCESSFULLY!');
  console.log('Account Address:', account.address);
  
  console.log('\n📝 CREATED .ENV FILE WITH:');
  console.log(`PRIVATE_KEY=${privateKeyNoPrefix}`);
  
  console.log('\n⚠️ SECURITY WARNING:');
  console.log('- The .env file contains your private key');
  console.log('- Make sure it is in .gitignore');
  console.log('- NEVER share your private key');
  
  console.log('\n🔄 HOW TO USE WITH FLOW MAINNET:');
  console.log('1. In your viem/wagmi code:');
  console.log(`
import { privateKeyToAccount } from 'viem/accounts';
require('dotenv').config(); // or appropriate env loading for your framework

// Create account from your env private key
const account = privateKeyToAccount(\`0x\${process.env.PRIVATE_KEY}\`);

// Use this account in your Flow mainnet config for signing transactions
  `);
} catch (error) {
  console.error('❌ ERROR CREATING ACCOUNT:', error.message);
}