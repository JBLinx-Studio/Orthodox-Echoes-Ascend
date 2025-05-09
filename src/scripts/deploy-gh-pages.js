
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Set up the repo name with the updated project name
const REPO_NAME = 'Orthodox-Echoes-Ascend';

// Create a 404.html file that redirects to index.html for SPA routing
const create404Page = () => {
  console.log('Creating 404.html for SPA routing...');
  const html404 = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Orthodox Echoes - Page Not Found</title>
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // MIT License
      // This script takes the current URL and converts the path and query
      // string into just a query string, and then redirects the browser
      // to the new URL with only a query string and hash fragment
      var pathSegmentsToKeep = 1;

      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.split('/').slice(1 + pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
    <h2>Redirecting...</h2>
  </body>
</html>`;

  const distDir = path.resolve(__dirname, '../../dist');
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  fs.writeFileSync(path.join(distDir, '404.html'), html404);
}

// Add SPA redirect script to index.html
const updateIndexHtmlForSPA = () => {
  console.log('Updating index.html for SPA routing...');
  const indexPath = path.resolve(__dirname, '../../dist/index.html');
  
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    
    // Check if the SPA script is already added
    if (!indexContent.includes('window.location.pathname.indexOf("?")')) {
      // Add the SPA redirect script right after the <head> tag
      const scriptToAdd = `
  <!-- Start Single Page Apps for GitHub Pages -->
  <script type="text/javascript">
    // This script checks to see if a redirect is present in the query string,
    // converts it back into the correct URL and adds it to the
    // browser's history using window.history.replaceState(...),
    // which won't cause the browser to attempt to load the new URL.
    (function(l) {
      if (l.search[1] === '/' ) {
        var decoded = l.search.slice(1).split('&').map(function(s) { 
          return s.replace(/~and~/g, '&')
        }).join('?');
        window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
        );
      }
    }(window.location))
  </script>
  <!-- End Single Page Apps for GitHub Pages -->
  <!-- Cache control -->
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />`;
      
      indexContent = indexContent.replace('<head>', '<head>' + scriptToAdd);
      fs.writeFileSync(indexPath, indexContent);
    }
  } else {
    console.warn('Warning: Could not find index.html in the dist folder.');
  }
}

// Function to clean the gh-pages branch if it exists
const cleanGhPagesBranch = () => {
  try {
    console.log('Checking if gh-pages branch exists...');
    const branchExists = execSync('git branch --list gh-pages').toString().trim() !== '';
    
    if (branchExists) {
      console.log('Cleaning gh-pages branch...');
      execSync('git checkout gh-pages && git rm -rf . && git clean -fxd', { stdio: 'inherit' });
      execSync('git checkout main', { stdio: 'inherit' });
    }
  } catch (error) {
    console.warn('Could not clean gh-pages branch:', error.message);
  }
}

try {
  // Clean the gh-pages branch if it exists
  cleanGhPagesBranch();
  
  // Build the project with cache busting
  console.log('\n🔨 Building the project...');
  // Add cache busting environment variable
  const cacheBuster = new Date().getTime();
  process.env.VITE_CACHE_BUSTER = cacheBuster;
  execSync('npm run build', { stdio: 'inherit', env: process.env });
  
  // Create 404.html and update index.html for SPA routing
  create404Page();
  updateIndexHtmlForSPA();
  
  // Create .nojekyll file to prevent Jekyll processing
  console.log('Creating .nojekyll file...');
  fs.writeFileSync(path.resolve(__dirname, '../../dist/.nojekyll'), '');
  
  // Initialize gh-pages with the dist folder
  console.log('\n📤 Deploying to gh-pages branch...');
  execSync(
    `npx gh-pages -d dist -m "Deploy to GitHub pages [skip ci]" --force`, // Added --force flag
    { stdio: 'inherit' }
  );
  
  console.log(`\n✅ Successfully deployed to GitHub Pages!`);
  console.log(`\nYour site will be available at: https://<YOUR_USERNAME>.github.io/${REPO_NAME}/`);
  console.log('\n📋 Next steps:');
  console.log('1. Go to Settings > Pages in your GitHub repository');
  console.log('2. Make sure "Deploy from a branch" is selected');
  console.log('3. Select "gh-pages" branch and "/ (root)" folder');
  console.log('4. Click Save');
  console.log('\n🔍 Note: It may take a few minutes for your site to be available with the new changes.');
  console.log('\n💡 Tip: If you still see old content, try clearing your browser cache or using incognito mode.');
} catch (error) {
  console.error('❌ Deployment failed:', error);
  process.exit(1);
}
