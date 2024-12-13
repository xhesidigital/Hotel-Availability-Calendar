# Hotel Availability Calendar
A project designed to display hotel availability and pricing for the next six months, as part of a coding challenge.

## Project Goal
The goal of this project is to allow users to:

View hotel availability for the next six months.
Interact with a calendar to select stay dates and display relevant room availability and pricing details.
Display room details based on user-selected dates in a modal interface.


## Features
Interactive Calendar: Displays hotel availability for six months from today using the Travelcircus API.
Modal Popup: Shows price, minimum nights, and additional information for selected dates.
Room Availability: Allows users to view and select rooms for their chosen dates.

## Setup Instructions

1. Clone the Repository
To clone the repository to your local machine, run:
```
git clone https://github.com/xhesidigital/Hotel-Availability-Calendar
```

2. Install Dependencies
This project uses Node.js for dependency management. Follow these steps:
Ensure you have Node.js installed on your system.
Navigate to the project directory in your terminal.
Install the required dependencies by running:

```
npm install
```
If you're not running tests or don't require Node.js features, you can skip this step and proceed to running the project.

## How to Run
To view the project, simply open the index.html file in your browser. It will launch the application and allow you to:
Interact with the calendar.
Check hotel availability and pricing.
View room details in a modal popup.
No additional server setup is required!


## Running Unit Tests
This project includes Jest tests for its functionality. To run the tests:

Ensure Jest is installed in the project:
```
npm install --save-dev jest
```
Run tests for app.js:
```
npx jest tests/app.test.js
```

Run tests for quote.js:
```
npx jest tests/quote.test.js
```

Unit tests will verify core functionality like event listeners, API handling, and UI updates.

## API Endpoints Used
### Availability Data:
https://api.travelcircus.net/hotels/15823/checkins?E&party=%7B%22adults%22:2,%22children%22:%5B%5D%7D&domain=de&date_start={start_date}&date_end={end_date}

### Room Details:
https://api.travelcircus.net/hotels/15823/quotes?locale=de_DE&checkin={checkin_date}&checkout={checkout_date}&party=%7B%22adults%22:2,%22children%22:[]%7D&domain=de

## Technology Stack
- HTML5: Markup structure.
- CSS3: Basic styling.
- Vanilla JavaScript: Main functionality (no frameworks).
- Flatpickr: Used for calendar rendering.

