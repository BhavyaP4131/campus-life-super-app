# Campus Life Super App

## Description and Purpose

Campus Life Super App is a multi-page web application that helps students stay connected to campus life in one place. It brings together three core features: browsing and RSVPing to campus events, finding dining halls and navigating campus, and viewing quick announcements — all from a single, responsive interface.

This project was built as a final project to demonstrate skills in semantic HTML, custom CSS with responsive design, JavaScript event handling and DOM manipulation, and integrating an external API to render live data.

## Live Demo

- **Deployed site:** https://bhavyap4131.github.io/campus-life-super-app/
- **GitHub repository:** https://github.com/BhavyaP4131/campus-life-super-app

## Technologies Used

- **HTML5** — semantic structure across 3 pages
- **CSS3** — custom Flexbox layouts and responsive media queries
- **Bootstrap 5.3** — grid system, navbar, buttons, and form components
- **JavaScript (ES6+)** — event-driven programming, DOM manipulation, `async/await` API calls
- **JSONPlaceholder API** — external API used to simulate live campus event data
- **Git and GitHub** — version control
- **GitHub Pages** — deployment

## Setup and Deployment Instructions

### Run it locally
1. Clone the repository:
   ```
   git clone https://github.com/BhavyaP4131/campus-life-super-app.git
   ```
2. Move into the project folder:
   ```
   cd campus-life-super-app
   ```
3. Open `index.html` directly in your browser, or use a tool like VS Code's Live Server extension for the best experience:
   - Install the "Live Server" extension in VS Code
   - Right-click `index.html` → "Open with Live Server"

No build step, package installation, or API key is required — everything runs directly in the browser.

### Deploy your own copy
1. Push the repository to your own GitHub account
2. Go to your repo's **Settings → Pages**
3. Under "Build and deployment," set **Source** to "Deploy from a branch," branch to `main`, folder to `/ (root)`
4. Save, and your site will be live at `https://YOUR-USERNAME.github.io/campus-life-super-app/` within a minute or two

## Features and How to Use Them

### Home (`index.html`)
- Welcome hero section and campus image
- Three feature cards linking to Events, Dining & Map, and Announcements
- A dynamically generated announcements list

### Events (`events.html`)
- Click **"Load Events"** to fetch live event data from an external API
- Type in the search box to filter events in real time by title
- Click **"RSVP"** on any event card to mark yourself as attending (button turns green and disables)

### Dining & Map (`map.html`)
- A list of campus dining locations
- Click, or use `Tab` + `Enter`/`Space` to keyboard-navigate, any location to see its details appear below
- Type in the search box to filter the location list live

## Accessibility Features

- Skip-to-content link for keyboard users
- Semantic HTML throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- All interactive elements have visible focus states
- Location list items are keyboard-operable (not just mouse-clickable)
- `aria-live` regions announce dynamic content changes (event loading, location selection) to screen readers
- Descriptive `alt` text on images
- Color contrast checked against WCAG AA guidelines

## Known Limitations / Future Improvements

- The Events page currently uses a placeholder API (JSONPlaceholder) since a real campus events API wasn't available. Swapping in a real events API only requires changing the `endpoint` URL and the `.map()` transformation in `fetchEvents()` inside `js/script.js`.
- The campus map on `map.html` is currently a static placeholder. A future version could integrate a real interactive map (e.g., Google Maps or Mapbox API) with real building coordinates.
- RSVP state is not currently saved between page reloads. A future version could use `localStorage` or a backend database to persist RSVPs.
- No user accounts or login system yet — a future version could add authentication so RSVPs and saved events are tied to a specific student.

## Project Structure

```
campus-life-super-app/
├── index.html
├── events.html
├── map.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
└── README.md
```
