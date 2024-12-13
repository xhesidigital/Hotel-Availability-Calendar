// Today's date and 6 months later
const today = new Date();
const dateStart = today.toISOString().split("T")[0];
const sixMonthsLater = new Date(today.setMonth(today.getMonth() + 6)).toISOString().split("T")[0];

// API endpoints
const calendarEndpoint = `https://api.travelcircus.net/hotels/15823/checkins?E&party=%7B%22adults%22:2,%22children%22:%5B%5D%7D&domain=de&date_start=${dateStart}&date_end=${sixMonthsLater}`;

// === DOM References ===
let checkAvailabilityButton, calendarContainer, loadingSpinner, modal, modalDate, modalPrice, modalMinNights, modalCheapest, modalPricePosition, modalCloseButton;

// === Initialize DOM References ===
const initializeDOMReferences = () => {
  checkAvailabilityButton = document.getElementById("check-availability");
  calendarContainer = document.getElementById("calendar-container");
  loadingSpinner = document.getElementById("loading");
  modal = document.getElementById("modal");
  modalDate = document.getElementById("modal-date");
  modalPrice = document.getElementById("modal-price");
  modalMinNights = document.getElementById("modal-min-nights");
  modalCheapest = document.getElementById("modal-cheapest");
  modalPricePosition = document.getElementById("modal-price-position");
  modalCloseButton = document.getElementById("modal-close");
};

// === Global Variables ===
let availabilities = []; // Store availability data

// === Utility Functions ===

const showLoadingSpinner = () => {
  loadingSpinner.style.display = "block";
};

const hideLoadingSpinner = () => {
  loadingSpinner.style.display = "none";
};

const showModal = (date) => {
  const availability = availabilities.find((a) => a.date === date);
  if (availability) {
    modalDate.textContent = `Date: ${availability.date}`;
    modalPrice.textContent = `${availability.price}`;
    modalMinNights.textContent = `${availability.min_nights}`;
    modalCheapest.textContent = `${availability.cheapest ? "Yes" : "No"}`;
    modalPricePosition.textContent = `${availability.price_position}`;
    modal.style.display = "block";
  }
};

const closeModal = () => {
  modal.style.display = "none";
};

const navigateToQuote = () => {
  window.location.href = "quote.html";
};

const fetchCalendarAvailability = () => {
  showLoadingSpinner();
  fetch(calendarEndpoint)
    .then((response) => response.json())
    .then((data) => {
      availabilities = data._embedded?.hotel_availabilities || [];
      initializeFlatpickr();
    })
    .catch((error) => {
      console.error("Error fetching availability data:", error);
    })
    .finally(() => hideLoadingSpinner());
};

const initializeFlatpickr = () => {
  flatpickr("#calendar-container", {
    minDate: "today",
    maxDate: sixMonthsLater,
    dateFormat: "Y-m-d",
    inline: true,
    onDayCreate: (dObj, dStr, fp, dayElement) => {
      const date = dayElement.dateObj.toISOString().split("T")[0];
      const availability = availabilities.find((a) => a.date === date);
      if (availability) {
        dayElement.classList.add("available");
        dayElement.addEventListener("click", () => showModal(date));
      } else {
        dayElement.classList.add("unavailable");
      }
    },
  });
};

const initializeEventListeners = () => {
  if (checkAvailabilityButton) {
    checkAvailabilityButton.addEventListener("click", () => {
      calendarContainer.style.display = "block";
      fetchCalendarAvailability();
    });
  }

  if (modalCloseButton) {
    modalCloseButton.addEventListener("click", closeModal);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initializeDOMReferences();
  initializeEventListeners();
  const currentDateElement = document.getElementById("current-date");
  if (currentDateElement) {
    currentDateElement.textContent = `Today's Date: ${new Date().toLocaleDateString()}`;
  }
});

module.exports = {
  showLoadingSpinner,
  hideLoadingSpinner,
  showModal,
  closeModal,
  initializeDOMReferences,
  initializeEventListeners,
  fetchCalendarAvailability,
  initializeFlatpickr,
  availabilities
};
