# Deployment Guide for Vercel

This teleprompter application is built with Next.js and optimized for Vercel deployment.

## Quick Deploy to Vercel

### Method 1: Using Vercel CLI (Recommended)

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from the project directory:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? **teleprompter** (or your preferred name)
   - In which directory is your code located? **./**
   - Want to override the settings? **N**

5. Your app will be deployed! You'll get a URL like: `https://teleprompter-xxxxx.vercel.app`

6. For production deployment:
```bash
vercel --prod
```

### Method 2: Using GitHub + Vercel Dashboard

1. Initialize a git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit: Teleprompter app"
```

2. Create a new repository on GitHub

3. Push your code:
```bash
git remote add origin https://github.com/yourusername/teleprompter.git
git branch -M main
git push -u origin main
```

4. Go to [vercel.com](https://vercel.com) and sign in

5. Click "Add New Project"

6. Import your GitHub repository

7. Vercel will automatically detect Next.js settings:
   - Framework Preset: **Next.js**
   - Root Directory: **/**
   - Build Command: **npm run build** (auto-detected)
   - Output Directory: **.next** (auto-detected)

8. Click "Deploy"

9. Your app will be live at a URL like: `https://teleprompter.vercel.app`

### Method 3: Direct Git Integration

1. Install Vercel CLI and login (see Method 1)

2. Link your project to a Git repository:
```bash
vercel link
```

3. Every time you push to your main branch, Vercel will automatically deploy

4. Preview deployments are created for every pull request

## Environment Variables

This application doesn't require any environment variables, but if you need to add any in the future:

1. In Vercel Dashboard: Project Settings → Environment Variables
2. Or using CLI:
```bash
vercel env add VARIABLE_NAME
```

## Custom Domain

To add a custom domain:

1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your domain and follow DNS configuration instructions

Or using CLI:
```bash
vercel domains add yourdomain.com
```

## Testing Locally Before Deploy

Always test the production build locally:

```bash
npm run build
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to verify everything works.

## Automatic Deployments

Once set up with GitHub:
- **Push to main branch** → Production deployment
- **Pull requests** → Preview deployments
- **Automatic HTTPS** and CDN distribution
- **Zero configuration** required

## Monitoring and Analytics

Vercel provides:
- Real-time logs
- Performance analytics
- Error tracking
- Web Vitals monitoring

Access these in your Vercel Dashboard under your project.

## Troubleshooting

If deployment fails:

1. Check build logs in Vercel Dashboard
2. Ensure all dependencies are in `package.json`
3. Test local build: `npm run build`
4. Check Node.js version compatibility (Vercel uses Node 18+ by default)

To specify Node.js version, add to `package.json`:
```json
{
  "engines": {
    "node": ">=18.0.0"
  }
}
```

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)
