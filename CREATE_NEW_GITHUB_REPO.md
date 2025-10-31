# Create New GitHub Repository

## Step 1: Create Repository on GitHub

1. Go to: https://github.com/new
2. **Repository name:** Choose a name (e.g., `mind-wellness-app`, `find-inner-peace`, `wellness-platform`)
3. **Description:** (optional) "Wellness & Meditation Platform - Find Your Inner Peace"
4. **Visibility:**
   - ☑️ Public (recommended for Vercel auto-deploy)
   - ☐ Private (if you want it private)
5. **DO NOT** check:
   - ❌ Add a README file
   - ❌ Add .gitignore
   - ❌ Choose a license
6. Click **"Create repository"**

---

## Step 2: Connect Your Local Repository

After creating the repo, GitHub will show you commands. Use these:

**Option A: If you want to REPLACE the current remote:**

```bash
# Remove old remote
git remote remove origin

# Add new remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to new repository
git push -u origin main
```

**Option B: If you want to KEEP both remotes:**

```bash
# Add new remote as 'new-origin'
git remote add new-origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to new repository
git push -u new-origin main
```

---

## Step 3: Quick Command (Replace YOUR_USERNAME and REPO_NAME)

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

---

## Step 4: Update Vercel Connection

After pushing to the new repo:

1. Go to: https://vercel.com/dashboard
2. Select your project: **mind-main**
3. Go to **Settings** → **Git**
4. Click **"Disconnect"** next to the current repository
5. Click **"Connect Git Repository"**
6. Select your new repository
7. Click **"Import"**

Vercel will automatically:
- ✅ Detect Next.js
- ✅ Use existing build settings
- ✅ Deploy from the new repo

---

## What Will Be Preserved:

✅ All your code
✅ All your commits
✅ All your branches
✅ Your deployment settings (after reconnecting in Vercel)

---

## Current Remote:

```
Current: https://github.com/ghada1234/mind-main1.git
```

If you need help updating the remote, let me know the new repository URL!


