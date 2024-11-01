const fs = require('fs');
const path = require('path');
const readline = require('readline');
const crypto = require('crypto-js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function prompt(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function install() {
  console.log('\n=== Serenity Lab Integration API Installation ===\n');

  // Create necessary directories
  const dirs = ['logs', 'config', 'data'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
      console.log(`Created ${dir} directory`);
    }
  });

  // Configure environment variables
  const port = await prompt('Enter port number (default: 3000): ');
  const serenityApiKey = await prompt('Enter Serenity API key (press Enter to configure later): ');
  const logLevel = await prompt('Enter log level (error/info/debug) (default: info): ');

  // Create .env file
  const envContent = `PORT=${port || 3000}
SERENITY_API_URL=https://provider.serenity.health/api/v1
SERENITY_API_KEY=${serenityApiKey || 'your_api_key_here'}
LOG_LEVEL=${logLevel || 'info'}`;

  fs.writeFileSync('.env', envContent);
  console.log('\nEnvironment configuration created');

  // Create initial equipment configuration
  const defaultConfig = {
    connections: {},
    security: {
      encryptionKey: crypto.lib.WordArray.random(32).toString(),
      tokenExpiration: '24h'
    }
  };

  fs.writeFileSync(
    'config/settings.json',
    JSON.stringify(defaultConfig, null, 2)
  );
  console.log('Initial configuration created');

  // Install dependencies
  console.log('\nInstalling dependencies...');
  const { execSync } = require('child_process');
  execSync('npm install', { stdio: 'inherit' });

  console.log('\n=== Installation Complete ===');
  console.log('\nNext steps:');
  console.log('1. Review and modify .env file if needed');
  console.log('2. Configure equipment connections via the API');
  console.log('3. Start the server: npm run dev');
  console.log('\nFor more information, refer to README.md');

  rl.close();
}

// Run installation
install().catch(error => {
  console.error('Installation failed:', error);
  process.exit(1);
});