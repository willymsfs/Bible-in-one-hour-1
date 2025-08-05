# Biblical Figures Line Art Presentation

An interactive web presentation showcasing the Seven Covenants of the Bible through animated line art images.

## Features

- Interactive slide navigation with smooth animations
- Auto-play functionality
- Responsive design for desktop and mobile
- Clean line art illustrations of biblical figures
- Based on "How to Get Through the Bible in an Hour" by Dr. John S. Bergsma

## Biblical Figures Included

1. **Adam** - The Adamic Covenant (Creation)
2. **Noah** - The Noahic Covenant (After the Flood)
3. **Abraham** - The Abrahamic Covenant (Promise to Abraham)
4. **Moses** - The Mosaic Covenant (Law at Mount Sinai)
5. **David** - The Davidic Covenant (Royal Lineage)
6. **Prophets** - New Covenant Promised
7. **Jesus** - The Eucharistic Covenant (New and Eternal)

## How to Deploy to GitHub Pages

### Method 1: Using GitHub Actions (Recommended)

1. **Create a new repository on GitHub**
   - Go to GitHub and create a new repository
   - Name it something like `bible-presentation`
   - Make it public

2. **Upload your files**
   - Clone the repository locally or upload files directly
   - Copy all files from this project to your repository

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Under "Source", select "GitHub Actions"

4. **Create GitHub Actions workflow**
   - Create a `.github/workflows/deploy.yml` file with the following content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'
        
    - name: Install pnpm
      uses: pnpm/action-setup@v2
      with:
        version: 8
        
    - name: Install dependencies
      run: pnpm install
      
    - name: Build
      run: pnpm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

5. **Push your changes**
   - Commit and push all files to the main branch
   - GitHub Actions will automatically build and deploy your site

### Method 2: Manual Deployment

1. **Build the project locally**
   ```bash
   pnpm install
   pnpm run build
   ```

2. **Create a new repository on GitHub**
   - Make it public
   - Enable GitHub Pages in settings

3. **Upload the dist folder**
   - Upload the contents of the `dist` folder to your repository
   - Or use the `gh-pages` branch method

## Local Development

To run the presentation locally:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## Technologies Used

- React 18
- Vite
- Framer Motion (for animations)
- Tailwind CSS
- Lucide React (for icons)
- shadcn/ui components

## License

This presentation is based on educational content from Dr. John S. Bergsma's work "How to Get Through the Bible in an Hour". The line art images are derived from the original PDF presentation.

## Credits

- Original content: Dr. John S. Bergsma, Ph.D., Franciscan University of Steubenville
- Website: www.JohnBergsma.com, www.TheSacredPage.com
- Line art conversion and web presentation: Created using AI assistance

