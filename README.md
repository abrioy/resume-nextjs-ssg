# Resume static site generator

This project uses next.js builds a static html of the resume, optimized to be easily printed from ny browser.

Pdf files are generated on deployment for the short and long form resumes.

See the [demo](https://abrioy.github.io/resume-nextjs-ssg/)

## Create your own

### build

Fork the github repository

Install [Volta](https://volta.sh/) and run `yarn install`

Start the development server with `yarn start`

### customize

Edit the files in `src/content`, it's mostly self-explanatory

For more in-depth customization the css is split by module, but most of the mdx styling is done in `src/styles/globals.css`

### deploy

For a production build, follow the steps in `.github/workflows/nextjs.yml`
