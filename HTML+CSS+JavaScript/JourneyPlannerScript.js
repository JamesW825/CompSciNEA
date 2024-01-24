// This file contains the JavaScript code that that applies to the Journey Planner page of the website.

// Function for a Journey Planner search: 
function JourneyPlannerSearch() {
    console.log(''); // To check the button click handler is working.
    const JourneyPrimaryApiKey = 'c3dd5c006828420c9f7696a37292384e';
    const JourneySecondaryApiKey = '0358cd3e5f7b44c9a43aec6b16a73d0d';
    // Parameters for the Journey Planner API request: The backticks (`) are used to create a template literal. This allows you to embed expressions or variables within a string.
    // NEED: from and to parameters. - HTML field to input this?
    const JourneyAPIurl = `https://api.tfl.gov.uk/Journey/JourneyResults/{from}/to/{to}
    [?via][&nationalSearch][&date][&time][&timeIs][&journeyPreference][&mode][&accessibilityPreference][&fromName][&toName][&viaName][&maxTransferMinutes][&maxWalkingMinutes]
    [&walkingSpeed][&cyclePreference][&adjustment][&bikeProficiency][&alternativeCycle][&alternativeWalking][&applyHtmlMarkup][&useMultiModalCall][&walkingOptimization][&taxiOnlyTrip][&routeBetweenEntrances]`;
    /* Removed optional parameters from the original API endpoint URL:
        [&nationalSearch] - As my website is only focused on the tube.
        [&accessibilityPreference] - This would likely be a future development upon the website.
        [&maxTransferMinutes][&adjustment][&cyclePreference][&bikeProficiency][&alternativeCycle][&taxiOnlyTrip] - To maintain the simplicity of the website.
        [&alternativeWalking][&walkingOptimization][&applyHtmlMarkup][&useMultiModalCall][&routeBetweenEntrances] - Not required/needed for the website. */
    // Use the primary key for the app_id parameter: JourneyAPIurl
    const urlwithPrimaryJourneyApiKey = `${JourneyAPIurl}?app_id=${JourneyPrimaryApiKey}`; // Constructing a URL for making an API request.
    // Use the secondary key for the app_key parameter: JourneyAPIurl
    const urlWithSecondaryJourneyApiKey = `${JourneyAPIurl}&app_key=${JourneySecondaryApiKey}`; // Constructing a URL for making an API request.
    // The two URL components, `urlwithPrimaryJourneyApiKey` and `urlWithSecondaryJourneyApiKey`, are combined using string concatenation before making the API request.
    // This ensures that both the `app_id` and `app_key` parameters are included in the API request, providing the necessary authentication for your application to access the TfL API.
    
    // Make a GET request to the TfL API using the Fetch API.
    fetch(urlwithPrimaryJourneyApiKey + urlWithSecondaryJourneyApiKey)
        .then(response => {
            console.log('TfL API Journey/Route response received'); // To check the response is received.
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the API response data here:
            console.log('TfL API Journey/Route Response:', data);

            /* Check if data is valid and contains the information you need.
            Putting it all together, the entire if statement evaluates to `true` only if all three conditions are met:
            1: `data` is not `null` or `undefined`. 2: `data` is an array. 3: The array has at least one element. */
            if (data && Array.isArray(data) && data.length > 0) {
                // Process the data: The `map()` method is used to transform each element in the `data` array into a new object.
                const JourneyPlanRoute = data.map(Route => {
                    return {
                        // Need a field to output: Route.{Field}
                        // Add more fields as required.
                    };
                });
                console.log('Processed Journey/Route:', JourneyPlanRoute);

                // Displaying the calculated journey/route in the HTML file (JourneyPlannerPage.html).
                const JourneyContainer = document.getElementById('Journey-container');
                // Clear any existing content in the container: 
                JourneyContainer.innerHTML = '';
                // Create and append HTML elements to display each route:
                JourneyPlanRoute.forEach(Route => {
                    const JourneyElement = document.createElement('div');
                    JourneyElement.innerHTML = `
                        <p><strong></strong> ${Route.Field}</p>
                        <!-- Add more fields as required -->
                        <hr>
                    `;
                    JourneyContainer.appendChild(JourneyElement);
                });
            } else {console.log('No routes found');}
        })
        .catch(error => {
            // Handle errors during the API request:
            console.error('Error calling TfL API:', error.message);
        });
}
// Attach the function to the button click event:
// Removal of the parentheses after `JourneyPlannerSearch` makes it so the function will be called when the button is clicked, not immediately when setting up the event listener.
document.getElementById('SubmitJourneyFields').addEventListener('click', JourneyPlannerSearch);

// ====================================================================================================
