# Hope Has No Borders

[![Netlify Status](https://api.netlify.com/api/v1/badges/9836833c-3963-4d4c-8d2f-f295244521d7/deploy-status)](https://app.netlify.com/projects/hopehasnoborders/deploys)

A grassroots response to the humanitarian crisis in Denver, bridging the gap from crisis to stability through housing, legal aid, and dignity.

This is a static website built with HTML, CSS (Tailwind via CDN for prototyping/quick edits, can be built if needed), and vanilla JavaScript.

## Folder Structure

```
hope-has-no-borders/
  index.html            # Home page
  README.md
  robots.txt
  sitemap.xml
  /pages/               # All other pages (About, Programs, etc.)
  /assets/
    /css/               # Main styles (main.css)
    /js/                # Main logic (main.js)
    /img/               # Images and icons
```

## How to Run Locally

1.  Clone this repository.
2.  Open the folder in your favorite code editor (VS Code recommended).
3.  Use "Live Server" extension (or `python -m http.server`, or `npx serve`) to view `index.html`.
    *   **Note**: Simply opening the file in the browser (`file://...`) might work, but relative links and fonts are best served over a local server.

## How to Deploy (Netlify)

This project is configured for deployment on Netlify.

1.  Push the code to your GitHub repository.
2.  Connect the repository to Netlify.
3.  Netlify will automatically detect the `netlify.toml` and use the following settings:
    *   **Build command**: `npm run build` (runs `npx @11ty/eleventy`)
    *   **Publish directory**: `_site`
4.  The site will be live at your Netlify subdomain (e.g., `hopehasnoborders.netlify.app`).

## Updating Content

*   **Text Changes**: Open the relevant HTML file in `/` (for Home) or `/pages/`. Edit the text directly within the tags.
*   **Images**: Add new images to `/assets/img/` and update the `src` paths in the HTML.
*   **Styles**: Edit `/assets/css/main.css`. Note that Tailwind classes are used directly in the HTML. 

## License

[Add License Here]
