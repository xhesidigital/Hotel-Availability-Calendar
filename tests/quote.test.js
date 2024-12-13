/**
 * @jest-environment jsdom
 */
const {
    showLoadingSpinner,
    hideLoadingSpinner,
    displayErrorMessage,
    clearContainer,
    renderQuotes,
    fetchQuotes,
    attachEventListeners,
    handleFetchQuotesClick,
  } = require("../js/quote");
  
  global.fetch = jest.fn();
  const flushPromises = () => new Promise((resolve) => setTimeout(resolve, 0));
  
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="fetch-quotes"></button>
      <input type="date" id="checkin">
      <input type="date" id="checkout">
      <div id="quotes-container"></div>
      <div id="loading"></div>
    `;
  
    jest.clearAllMocks();
    fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          _embedded: {
            hotel_quotes: [
              { name: "Room A", full_formatted_price: "€100", room_size_min: 20, room_size_max: 30, base_capacity: 2 },
            ],
          },
        }),
    });
  });
  
  describe("Utility Functions", () => {
    test("showLoadingSpinner should display the loading spinner", () => {
      showLoadingSpinner();
      expect(document.getElementById("loading").style.display).toBe("block");
    });
  
    test("hideLoadingSpinner should hide the loading spinner", () => {
      hideLoadingSpinner();
      expect(document.getElementById("loading").style.display).toBe("none");
    });
  
    test("clearContainer should clear the container", () => {
      document.getElementById("quotes-container").innerHTML = "<p>Some content</p>";
      clearContainer();
      expect(document.getElementById("quotes-container").innerHTML).toBe("");
    });
  });
  
  describe("fetchQuotes", () => {
    test("should fetch and render quotes", async () => {
      const spy = jest.spyOn(global, "fetch");
      await fetchQuotes("2024-01-01", "2024-01-02");
      expect(spy).toHaveBeenCalledWith(expect.stringContaining("checkin=2024-01-01&checkout=2024-01-02"));
    });
  });
  
  describe("Event Listeners", () => {
    beforeEach(() => {
      attachEventListeners();
    });
  
    test("clicking fetch button should call fetchQuotes", async () => {
      document.getElementById("checkin").value = "2024-01-01";
      document.getElementById("checkout").value = "2024-01-02";
      const button = document.getElementById("fetch-quotes");
      button.click();
      await flushPromises();
      expect(fetch).toHaveBeenCalled();
    });
  
    test("should show alert if checkin/checkout dates are missing", () => {
      document.getElementById("checkin").value = "";
      document.getElementById("checkout").value = "";
      const button = document.getElementById("fetch-quotes");
      window.alert = jest.fn();
      button.click();
      expect(window.alert).toHaveBeenCalledWith("Please select both check-in and check-out dates.");
    });
  });
  