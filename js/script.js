console.log("script.js connected!");

// ============================================================
// This script runs on all three pages. Each section below only
// runs if its target element actually exists on the current page,
// so nothing breaks when a page doesn't have that element.
// ============================================================


// ============================================================
// HOME PAGE (index.html): Announcements
// Populates a short list of announcements using DOM manipulation.
// This section doesn't use an API yet - it's a placeholder that
// could later be swapped for a fetch() call to a real API.
// ============================================================
const announcementList = document.querySelector("#announcement-list");

if (announcementList) {
  const announcements = [
    "Fall semester registration opens next Monday.",
    "The library will have extended hours during finals week.",
    "New dining hall menu items launch this Friday."
  ];

  announcements.forEach(function (text) {
    const item = document.createElement("div");
    item.classList.add("list-group-item");
    item.textContent = text;
    announcementList.appendChild(item);
  });
}


// ============================================================
// EVENTS PAGE (events.html): Fetch and render campus events
// Uses a public placeholder API (JSONPlaceholder) to simulate
// campus event data for this MVP stage. Each "post" from the
// API stands in for an event's title and description.
// ============================================================
const loadEventsBtn = document.querySelector("#load-events-btn");
const eventContainer = document.querySelector("#event-container");
const eventSearchInput = document.querySelector("#event-search");
const eventStatus = document.querySelector("#event-status");

// Stores the fetched events so the search box can filter them
// without needing to call the API again on every keystroke.
let allEvents = [];

async function fetchEvents() {
  eventStatus.textContent = "Loading events...";

  try {
    // Placeholder API endpoint - stands in for a real campus events API
    const endpoint = "https://jsonplaceholder.typicode.com/posts?_limit=6";
    const response = await fetch(endpoint);

    // Handle a bad response (e.g. API down, wrong URL) before trying to parse it
    if (!response.ok) {
      throw new Error("API request failed with status " + response.status);
    }

    const data = await response.json();

    // Map the raw API data into a simpler shape our render function expects
    allEvents = data.map(function (post) {
      return {
        title: "Campus Event: " + post.title,
        description: post.body
      };
    });

    renderEvents(allEvents);
  } catch (error) {
    console.log("Error fetching events:", error);
    eventStatus.textContent = "Something went wrong loading events. Please try again.";
  }
}

function renderEvents(events) {
  eventContainer.innerHTML = "";

  if (events.length === 0) {
    eventContainer.innerHTML = "<p class='text-muted'>No events match your search.</p>";
    return;
  }

  events.forEach(function (event) {
    const col = document.createElement("div");
    col.classList.add("col-md-4");

    col.innerHTML = `
      <div class="event-card">
        <h3>${event.title}</h3>
        <p>${event.description.substring(0, 80)}...</p>
        <button class="btn btn-outline-primary btn-sm rsvp-btn">RSVP</button>
      </div>
    `;

    eventContainer.appendChild(col);
  });
}

if (loadEventsBtn) {
  loadEventsBtn.addEventListener("click", fetchEvents);
}

// Search box filters the already-loaded events as the user types
if (eventSearchInput) {
  eventSearchInput.addEventListener("input", function () {
    const query = eventSearchInput.value.toLowerCase();
    const filtered = allEvents.filter(function (event) {
      return event.title.toLowerCase().includes(query);
    });
    renderEvents(filtered);
  });
}

// Event delegation: since RSVP buttons are created dynamically,
// we listen on the container instead of each individual button.
if (eventContainer) {
  eventContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("rsvp-btn")) {
      e.target.textContent = "RSVP'd!";
      e.target.disabled = true;
      e.target.classList.remove("btn-outline-primary");
      e.target.classList.add("btn-success");
    }
  });
}


// ============================================================
// MAP PAGE (map.html): Clicking a location shows its details
// ============================================================
const locationItems = document.querySelectorAll("#location-items .list-group-item");
const locationDetail = document.querySelector("#location-detail");

if (locationItems.length > 0) {
  locationItems.forEach(function (item) {
    item.addEventListener("click", function () {
      const name = item.getAttribute("data-location");
      locationDetail.textContent = "Selected: " + name + " — hours and menu coming soon.";
    });
  });
}

// Location search filters the list items shown on the page
const locationSearchInput = document.querySelector("#location-search");

if (locationSearchInput) {
  locationSearchInput.addEventListener("input", function () {
    const query = locationSearchInput.value.toLowerCase();

    locationItems.forEach(function (item) {
      const name = item.getAttribute("data-location").toLowerCase();
      item.style.display = name.includes(query) ? "block" : "none";
    });
  });
}
