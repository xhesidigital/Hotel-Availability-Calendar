// === Base URL Configuration ===
// Define the base API endpoint for fetching hotel quotes
const baseUrl = "https://api.travelcircus.net/hotels/15823/quotes?locale=de_DE&party=%7B%22adults%22:2,%22children%22:[]%7D&domain=de";

// === Utility Functions ===

/**
 * Displays the loading spinner during API calls.
 */
const showLoadingSpinner = () => {
  document.getElementById("loading").style.display = "block";
};

/**
 * Hides the loading spinner after API calls.
 */
const hideLoadingSpinner = () => {
  document.getElementById("loading").style.display = "none";
};

/**
 * Displays an error message in the UI.
 * @param {string} message - The error message to display.
 */
const displayErrorMessage = (message) => {
  const container = document.getElementById("quotes-container");
  container.innerHTML = `<p style="color: #ff4c4c; text-align: center;">${message}</p>`;
};

/**
 * Clears the content of the quotes container.
 */
const clearContainer = () => {
  document.getElementById("quotes-container").innerHTML = "";
};

// === UI Rendering Functions ===

/**
 * Renders hotel quotes on the page.
 * @param {Array} quotes - An array of hotel quote objects.
 */
const renderQuotes = (quotes) => {
  const container = document.getElementById("quotes-container");
  clearContainer(); // Clear previous content before rendering new data

  quotes.forEach((quote) => {
    // === Card Structure ===
    const card = document.createElement("div");
    card.className = "quote-card";

    // === Image Section ===
    const img = document.createElement("img");
    img.src = quote._embedded?.pictures[0]?.wide || "https://via.placeholder.com/300"; // Default image fallback
    img.alt = quote.name || "Room image";
    card.appendChild(img);

    // === Content Section ===
    const content = document.createElement("div");
    content.className = "quote-card-content";

    // Room Name
    const name = document.createElement("h3");
    name.textContent = quote.name || "Room Name";

    // Room Price
    const price = document.createElement("p");
    price.className = "price";
    price.textContent = quote.full_formatted_price || "N/A";

    // Room Size
    const roomSize = document.createElement("p");
    roomSize.textContent = `${quote.room_size_min} - ${quote.room_size_max} m²`;

    // Room Capacity
    const capacity = document.createElement("p");
    capacity.textContent = `For ${quote.base_capacity} person(s)`;

    // Amenities Section
    const amenities = document.createElement("div");
    amenities.className = "amenities";
    (quote._embedded?.amenities || []).forEach((amenity) => {
      const amenityTag = document.createElement("span");
      amenityTag.className = "amenity";
      amenityTag.textContent = amenity.name;
      amenities.appendChild(amenityTag);
    });

    // Select Room Button
    const selectRoomButton = document.createElement("a");
    selectRoomButton.className = "select-room-button";
    selectRoomButton.href = "#";
    selectRoomButton.textContent = "Select room";

    // Append Elements to Content
    content.appendChild(name);
    content.appendChild(price);
    content.appendChild(roomSize);
    content.appendChild(capacity);
    content.appendChild(amenities);
    content.appendChild(selectRoomButton);

    // Append Content to Card
    card.appendChild(content);

    // Append Card to Container
    container.appendChild(card);
  });
};

// === Data Fetching Functions ===

/**
 * Fetches hotel quotes from the API and renders them on the page.
 * @param {string} checkin - Check-in date in YYYY-MM-DD format.
 * @param {string} checkout - Check-out date in YYYY-MM-DD format.
 */
const fetchQuotes = async (checkin, checkout) => {
  const url = `${baseUrl}&checkin=${checkin}&checkout=${checkout}`;
  showLoadingSpinner();

  try {
    // Fetch data from the API
    const response = await fetch(url);

    // Handle non-OK responses
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.error?.message || "An error occurred while fetching data.");
    }

    // Parse response JSON
    const data = await response.json();
    const quotes = data._embedded?.hotel_quotes || [];

    // Check for empty results
    if (!quotes.length) {
      displayErrorMessage("No available hotel quotes found for the selected dates.");
    } else {
      renderQuotes(quotes); // Render quotes if data is available
    }
  } catch (error) {
    console.error("Error:", error);
    displayErrorMessage(error.message); // Display error message in UI
  } finally {
    hideLoadingSpinner(); // Always hide the spinner
  }
};


// === Event Listeners ===
const attachEventListeners = () => {
  const fetchQuotesButton = document.getElementById("fetch-quotes");
  if (fetchQuotesButton) {
    fetchQuotesButton.addEventListener("click", handleFetchQuotesClick);
  }
};

const handleFetchQuotesClick = () => {
  const checkin = document.getElementById("checkin").value;
  const checkout = document.getElementById("checkout").value;

  if (!checkin || !checkout) {
    alert("Please select both check-in and check-out dates.");
    return;
  }

  fetchQuotes(checkin, checkout);
};

document.addEventListener("DOMContentLoaded", attachEventListeners);

module.exports = {
  showLoadingSpinner,
  hideLoadingSpinner,
  displayErrorMessage,
  clearContainer,
  renderQuotes,
  fetchQuotes,
  attachEventListeners,
  handleFetchQuotesClick,
};
