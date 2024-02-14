// This file contains the JavaScript code that that applies to all pages of the website, in order to keep consistency. For example, the page switching function below:

// Function to switch between the different HTML pages.
function PageSwitchCase(section) {
    console.log('Page change button clicked'); // To check the page button switch handler is working.
    switch (section) { // The `switch` statement is used to determine which page to navigate to based on the value of the section parameter.
        case 'Home & Map': 
            // To navigate to the Home page: "HomePage.html"
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

// ====================================================================================================================================================================

// Function to call TfL API for the live status of the tube lines, and to log and display the response.
function LiveStatusAPI() {
    console.log('Live Status/Disruptions refresh initiated...'); // To check the button click handler is working.
    const primaryApiKey2 = 'c3dd5c006828420c9f7696a37292384e';
    const secondaryApiKey2 = '0358cd3e5f7b44c9a43aec6b16a73d0d';
    
    // Parameters for the Status and Disruptions API request:
    const modes = 'tube,elizabeth-line,dlr,overground'; // Modes of transport are limited for simplicity of the website.
    const apiUrl2 = `https://api.tfl.gov.uk/Line/Mode/${modes}/Disruption`; // The backticks (`) are used to create a template literal. This allows you to embed expressions or variables within a string.

    // Use the primary key for the app_id parameter: urlWithPrimaryApiKey2
    const urlWithPrimaryApiKey2 = `${apiUrl2}?app_id=${primaryApiKey2}`; // Constructing a URL for making an API request.

    // Use the secondary key for the app_key parameter: urlWithSecondaryApiKey
    const urlWithSecondaryApiKey2 = `${apiUrl2}&app_key=${secondaryApiKey2}`; // Constructing a URL for making an API request.

    // The two URL components, `urlWithPrimaryApiKey2` and `urlWithSecondaryApiKey2`, are combined using string concatenation before making the API request.
    // This ensures that both the `app_id` and `app_key` parameters are included in the API request, providing the necessary authentication for your application to access the TfL API.
    
    // Make a GET request to the TfL API using the Fetch API.
    fetch(urlWithPrimaryApiKey2 + urlWithSecondaryApiKey2)
        .then(response => {
            console.log('Live Status/Disruptions response received'); // To check the response is received.
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the API response data here:
            console.log('TfL API Live Status/Disruptions response:', data);
            /* Check if data is valid and contains the information you need.
            Putting it all together, the entire if statement evaluates to `true` only if all three conditions are met:
            1: `data` is not `null` or `undefined`. 2: `data` is an array. 3: The array has at least one element. */
            if (data && Array.isArray(data) && data.length > 0) { // To test else statement, change `data.length > 0` to `data.length < 0`.
                // Process the data:
                const disruptions = data.map(disruption => {
                    return {
                        closureText: disruption.closureText,
                        description: disruption.description,
                        affectedRoutes: disruption.affectedRoutes,
                        // Add more fields as required.
                    };
                });
                console.log('Processed Live Status/Disruptions:', disruptions);

                // Displaying the disruptions in the HTML files, either 'HomePage.html' or 'JourneyPlannerPage.html':
                const disruptionsContainer = document.getElementById('disruptions-container');
                disruptionsContainer.innerHTML = ''; // To clear any existing content in the container.
                // Create and append HTML elements to display each disruption:
                disruptions.forEach(disruption => {
                    const disruptionElement = document.createElement('div');
                    disruptionElement.innerHTML = `<!--The purpose of the id is to apply styles to the fields.-->
                        <p id="DisplayDisruptionElement"><strong>Status/Closure Text:</strong> ${disruption.closureText}</p>
                        <p id="DisplayDisruptionElement"><strong>Description:</strong> ${disruption.description}</p>
                        <p id="DisplayDisruptionElement"><strong>Affected Routes:</strong> ${disruption.affectedRoutes.join(', ')}</p>
                        <!--Add more fields as required.-->
                        <hr>
                    `;
                    disruptionsContainer.appendChild(disruptionElement);
                });
            } else {
                console.log('No disruptions found');
                // Display a message in the HTML files to indicate that no disruptions were found:
                const disruptionsContainer = document.getElementById('disruptions-container');
                disruptionsContainer.innerHTML = `<p id="DisplayDisruptionElement">No disruptions found on the Tube, Elizabeth line, DLR or Overground services.</p>
                    <p id="DisplayDisruptionElement">For more information, or just to be sure, visit the <a href="https://tfl.gov.uk/tube-dlr-overground/status/">TfL website</a>.</p>
                    <p id="DisplayDisruptionElement">Have a nice journey!</p>
                `;
            }
        })
        .catch(error => {
            // Handle errors during the API request:
            console.error('Error calling TfL API:', error.message);
        });
}
// Attach the function to the button click event:
// Removal of the parentheses after `callTfLAPI` makes it so the function will be called when the button is clicked, not immediately when setting up the event listener.
document.getElementById('LiveStatusButton').addEventListener('click', LiveStatusAPI);

// ====================================================================================================
