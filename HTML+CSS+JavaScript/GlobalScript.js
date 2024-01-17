// This file contains the JavaScript code that that applies to all pages of the website, in order to keep consistency. For example, the page switching function below:

// Function to switch between the different HTML pages.
function PageSwitchCase(section) {
    console.log('Page change button clicked'); // To check the page button switch handler is working.
    switch (section) { // The `switch` statement is used to determine which page to navigate to based on the value of the section parameter.
        case 'Home & Map': 
            // To navigate to the Home page: "index.html"
            window.location.href = 'HomePage.html';
            break;
        case 'Journey Planner':
            // To navigate to the Journey Planner page: "JourneyPlannerPage.html"
            window.location.href = 'JourneyPlannerPage.html';
            break; 
        // case 'Line Status':
        //     To navigate to the Line Status page: "LineStatusPage.html" (not yet created)
        //     window.location.href = '';
        //     break;
        // Add more cases for other sections/pages as needed.
        default:
            // Handle cases where the section doesn't match any known pages:
            console.error(`Unknown section: ${section}, reverting to Home page`);
            window.location.href = 'HomePage.html';
            break;
    }
}
document.getElementById('PageButton').addEventListener('click', PageSwitchCase);
