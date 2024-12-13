// === IMPORT REQUIRED FUNCTIONS FROM app.js ===
const { 
    showLoadingSpinner, 
    hideLoadingSpinner, 
    showModal, 
    closeModal, 
    initializeDOMReferences, 
    initializeEventListeners, 
    fetchCalendarAvailability,
    availabilities  
  } = require('../js/app');
  
  // === MOCK flatpickr ===
  jest.mock('flatpickr', () => {
    return jest.fn(() => ({
      // You can mock the flatpickr API here if necessary
      config: {},
    }));
  });
  
  // === LOADING SPINNER TESTS ===
  describe('Loading Spinner Functions', () => {
  
    beforeEach(() => {
      document.body.innerHTML = '<div id="loading" style="display: none;"></div>';
      initializeDOMReferences();
    });
  
    test('showLoadingSpinner should display the loading spinner', () => {
      showLoadingSpinner();
      expect(document.getElementById('loading').style.display).toBe('block');
    });
  
    test('hideLoadingSpinner should hide the loading spinner', () => {
      hideLoadingSpinner();
      expect(document.getElementById('loading').style.display).toBe('none');
    });
  });
  
  
  // === MODAL TESTS ===
  describe('Modal Functions', () => {
  
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="modal" style="display: none;">
          <h3 id="modal-date"></h3>
          <p id="modal-price"></p>
          <p id="modal-min-nights"></p>
          <p id="modal-cheapest"></p>
          <p id="modal-price-position"></p>
        </div>
      `;
      initializeDOMReferences();
  
      availabilities.length = 0;
      availabilities.push({
        date: '2024-12-25',
        price: '€100',
        min_nights: 2,
        cheapest: true,
        price_position: 1
      });
    });
  
    test('showModal should display the modal with correct availability details', () => {
      showModal('2024-12-25');
      const modal = document.getElementById('modal');
      expect(modal.style.display).toBe('block');
      expect(document.getElementById('modal-date').textContent).toBe('Date: 2024-12-25');
      expect(document.getElementById('modal-price').textContent).toBe('€100');
      expect(document.getElementById('modal-min-nights').textContent).toBe('2');
      expect(document.getElementById('modal-cheapest').textContent).toBe('Yes');
      expect(document.getElementById('modal-price-position').textContent).toBe('1');
    });
  
    test('closeModal should hide the modal', () => {
      const modal = document.getElementById('modal');
      modal.style.display = 'block';
      closeModal();
      expect(modal.style.display).toBe('none');
    });
  });
  
  
  // === FETCH FUNCTION TESTS ===
  global.fetch = jest.fn(() => 
    Promise.resolve({
      json: () => Promise.resolve({ 
        _embedded: { 
          hotel_availabilities: [{ date: '2024-12-20', price: '€90' }] 
        } 
      })
    })
  );
  
  describe('fetchCalendarAvailability', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="loading"></div><div id="calendar-container"></div>';
      initializeDOMReferences();
    });
  
    test('fetchCalendarAvailability should call fetch and load data', async () => {
      await fetchCalendarAvailability();
      expect(fetch).toHaveBeenCalled();
    });
  });
  
  
  // === EVENT LISTENERS TESTS ===
  describe('Event Listeners', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <button id="check-availability"></button>
        <div id="calendar-container"></div>
        <div id="loading"></div>
      `;
      initializeDOMReferences();
      initializeEventListeners();
    });
  
    test('checkAvailabilityButton should call fetchCalendarAvailability on click', () => {
      const button = document.getElementById('check-availability');
      button.click();
      expect(fetch).toHaveBeenCalled();
    });
  });
  