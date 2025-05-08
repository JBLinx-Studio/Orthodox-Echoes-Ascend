
# Orthodox Echoes Ascend

## Project info

**URL**: https://lovable.dev/projects/709449cf-4a82-4be5-bc8b-2f8dff1338e5

## Deployment Options

This project can be deployed to GitHub Pages using either:

1. **GitHub Actions (recommended)**: 
   - Automatically builds and deploys when you push to the main branch
   - Configuration is already set up in `.github/workflows/deploy.yml`

2. **Manual deployment**:
   - Run this command to deploy manually:
     ```sh
     node src/scripts/deploy-gh-pages.js
     ```

After deployment, your site will be available at: `https://[YOUR_USERNAME].github.io/Orthodox-Echoes-Ascend/`

### GitHub Pages Setup

After your first deployment:
1. Go to Settings > Pages in your GitHub repository
2. Select "Deploy from a branch" under Build and deployment
3. Select "gh-pages" branch and "/ (root)" folder
4. Click Save

Both deployment methods include proper SPA (Single Page Application) routing support, so all routes will work correctly even after page refresh.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/709449cf-4a82-4be5-bc8b-2f8dff1338e5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/709449cf-4a82-4be5-bc8b-2f8dff1338e5) and click on Share -> Publish.

Alternatively, run `node src/scripts/deploy-gh-pages.js` to deploy to GitHub Pages manually.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
