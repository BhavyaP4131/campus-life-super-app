console.log("script.js connected!");

// ============================================================
// This script runs on all three pages. Each section only runs
// if its target element exists on the current page, so nothing
// breaks when a page doesn't have that element.
// ============================================================


// ============================================================
// HOME PAGE (index.html): Announcements
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
// campus event data for now. Swapping in a real events API
// later only requires changing the endpoint and the .map()
// step below - renderEvents() doesn't need to change.
// ============================================================
const loadEventsBtn = document.querySelector("#load-events-btn");
const eventContainer = document.querySelector("#event-container");
const eventSearchInput = document.querySelector("#event-search");
const eventStatus = document.querySelector("#event-status");

let allEvents = [];

async function fetchEvents() {
  eventStatus.textContent = "Loading events...";
  loadEventsBtn.disabled = true;

  // Catch the common "no internet" edge case before even calling fetch()
  if (!navigator.onLine) {
    eventStatus.textContent = "You appear to be offline. Please check your connection and try again.";
    loadEventsBtn.disabled = false;
    return;
  }

  try {
    const endpoint = "https://jsonplaceholder.typicode.com/posts?_limit=6";
    const response = await fetch(endpoint);

    // Handle a bad HTTP response (e.g. 404, 500) before trying to parse it
    if (!response.ok) {
      throw new Error("API request failed with status " + response.status);
    }

    const data = await response.json();

    // Guard against an empty or unexpected response shape
    if (!Array.isArray(data) || data.length === 0) {
      eventStatus.textContent = "No events were found right now. Please check back later.";
      loadEventsBtn.disabled = false;
      return;
    }

    allEvents = data.map(function (post) {
      return {
        title: "Campus Event: " + post.title,
        description: post.body
      };
    });

    eventStatus.textContent = "Showing " + allEvents.length + " events.";
    renderEvents(allEvents);
  } catch (error) {
    // Covers network failures, JSON parsing errors, and the thrown error above
    console.log("Error fetching events:", error);
    eventStatus.textContent = "Something went wrong loading events. Please try again.";
  } finally {
    loadEventsBtn.disabled = false;
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
      <article class="event-card">
        <h3>${event.title}</h3>
        <p>${event.description.substring(0, 80)}...</p>
        <button class="btn btn-outline-primary btn-sm rsvp-btn">RSVP</button>
      </article>
    `;

    eventContainer.appendChild(col);
  });
}

if (loadEventsBtn) {
  loadEventsBtn.addEventListener("click", fetchEvents);
}

if (eventSearchInput) {
  eventSearchInput.addEventListener("input", function () {
    const query = eventSearchInput.value.toLowerCase();
    const filtered = allEvents.filter(function (event) {
      return event.title.toLowerCase().includes(query);
    });
    renderEvents(filtered);
  });
}

// Event delegation: RSVP buttons are created dynamically, so we listen
// on the container instead of attaching a listener to each button.
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
// MAP PAGE (map.html)
// Fix from peer code review: location items are now keyboard
// accessible (Enter/Space triggers the same action as a click),
// and search filtering uses a CSS class instead of inline styles.
// ============================================================
const locationItems = document.querySelectorAll("#location-items .list-group-item");
const locationDetail = document.querySelector("#location-detail");

function selectLocation(item) {
  const name = item.getAttribute("data-location");
  locationDetail.textContent = "Selected: " + name + " — hours and menu coming soon.";
}

if (locationItems.length > 0) {
  locationItems.forEach(function (item) {
    // Mouse users
    item.addEventListener("click", function () {
      selectLocation(item);
    });

    // Keyboard users: Enter or Space activates the item, matching
    // native button behavior since these are role="button" elements
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectLocation(item);
      }
    });
  });
}

const locationSearchInput = document.querySelector("#location-search");

if (locationSearchInput) {
  locationSearchInput.addEventListener("input", function () {
    const query = locationSearchInput.value.toLowerCase();

    // Toggling a CSS class instead of setting inline styles directly -
    // cleaner, and keeps all visual rules living in style.css
    locationItems.forEach(function (item) {
      const name = item.getAttribute("data-location").toLowerCase();
      item.classList.toggle("hidden", !name.includes(query));
    });
  });
}
