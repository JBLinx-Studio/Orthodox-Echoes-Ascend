
const { execSync } = require('child_process');
const path = require('path');

// Set up the repo name from your vite config
const REPO_NAME = 'mind-spark-collaborate-now';

try {
  // Build the project
  console.log('Building the project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Initialize gh-pages with the dist folder
  console.log('Deploying to gh-pages branch...');
  execSync(
    `npx gh-pages -d dist -m "Deploy to GitHub pages [skip ci]"`,
    { stdio: 'inherit' }
  );
  
  console.log(`\n✅ Successfully deployed to https://<YOUR_USERNAME>.github.io/${REPO_NAME}/`);
  console.log('\nRemember to configure GitHub Pages in your repository settings:');
  console.log('1. Go to Settings > Pages');
  console.log('2. Select "Deploy from a branch" under Build and deployment');
  console.log('3. Select "gh-pages" branch and "/ (root)" folder');
  console.log('4. Click Save');
} catch (error) {
  console.error('❌ Deployment failed:', error);
  process.exit(1);
}
