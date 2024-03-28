// This file contains the JavaScript code that that applies to the Journey Planner page of the website.

// Function for a Journey Planner search:
function JourneyPlannerSearch() {
    console.log('Journey Planner submit/refresh button clicked.'); // To check the button click handler is working.
    const JourneyPrimaryApiKey = 'c3dd5c006828420c9f7696a37292384e';
    const JourneySecondaryApiKey = '0358cd3e5f7b44c9a43aec6b16a73d0d';
    // Parameters for the Journey Planner API request: The backticks (`) are used to create a template literal. This allows you to embed expressions or variables within a string.
    const from = encodeURIComponent(document.getElementById('StartLocation').value); // Required field.
    const to = encodeURIComponent(document.getElementById('EndLocation').value); // Required field. No via option for the simplicity of the website, ie: only A->B.
    const date = encodeURIComponent(document.getElementById('Date').value); // Unrequired field.
    const time = encodeURIComponent(document.getElementById('Time').value); // Unrequired field.
    const mode = 'tube,dlr,overground'; // Modes of transport are limited for simplicity of the website, so it is predefined/preset.
    const journeyPreference = encodeURIComponent(document.getElementById('journeyPreference').value); // Unrequired field for request/URL but it's useful - treating it as required due to the dropdown menu. 
    // Checking all parameters are retrieved and logged correctly:
    console.log('Start location:', from);
    console.log('End location:', to);
    console.log('Date:', date);
    console.log('Time:', time); // 'mode' not included as this is predefined/preset.
    console.log('Chosen journey preference:', journeyPreference); // To check the chosen journey preference is being retrieved and logged.

    const JourneyAPIurl = `https://api.tfl.gov.uk/Journey/JourneyResults/${from}/to/${to}${date}${time}${journeyPreference}${mode}`; 
    // EDITED URL: const JourneyAPIurl = `https://api.tfl.gov.uk/Journey/JourneyResults/${encodeURIComponent(from)}/to/${encodeURIComponent(to)}${encodeURIComponent(date)}${encodeURIComponent(time)}${encodeURIComponent(journeyPreference)}${encodeURIComponent(mode)}`;
        /* Add to documentation: Old parameters/variables:
        const from = document.getElementById('StartLocation').value; // Required field.
        const to = document.getElementById('EndLocation').value; // Required field. No via option for the simplicity of the website, ie: only A->B.
        const date = document.getElementById('Date').value; // Unrequired field.
        const time = document.getElementById('Time').value; // Unrequired field.
        const mode = 'tube,dlr,overground'; // Modes of transport are limited for simplicity of the website, so it is predefined/preset.
        const journeyPreference = document.getElementById('journeyPreference').value; // Unrequired field for request/URL but it's useful - treating it as required due to the dropdown menu.
    */
    /* Removed optional parameters from the original API endpoint URL:
        [&via][&timeIs][&fromName][&toName][&viaName]- Not necessary but could be useful/added in the future.
        [&nationalSearch] - As my website is only focused on the tube.
        [&accessibilityPreference] - This would likely be a future development upon the website.
        [&maxWalkingMinutes][&walkingSpeed][&maxTransferMinutes][&adjustment][&cyclePreference][&bikeProficiency][&alternativeCycle][&taxiOnlyTrip] - To maintain the simplicity of the website.
        [&alternativeWalking][&walkingOptimization][&applyHtmlMarkup][&useMultiModalCall][&routeBetweenEntrances] - Not required/needed for the website.
    */
    // Use the primary key for the app_id parameter: JourneyAPIurl
    const urlwithPrimaryJourneyApiKey = `${JourneyAPIurl}?app_id=${JourneyPrimaryApiKey}`; // Constructing a URL for making an API request.
    // Use the secondary key for the app_key parameter: JourneyAPIurl
    const urlWithSecondaryJourneyApiKey = `${JourneyAPIurl}&app_key=${JourneySecondaryApiKey}`; // Constructing a URL for making an API request.
    // The two URL components, `urlwithPrimaryJourneyApiKey` and `urlWithSecondaryJourneyApiKey`, are combined using string concatenation before making the API request.
    // This ensures that both the `app_id` and `app_key` parameters are included in the API request, providing the necessary authentication for your application to access the TfL API.
    
    // Make a GET request to the TfL API using the Fetch API.
    fetch(urlwithPrimaryJourneyApiKey + urlWithSecondaryJourneyApiKey, {redirect:'follow'})
        .then(response => {
            console.log('TfL API Journey/Route response received'); // To check the response is received.
            if (response.status === 300) {
                // Handle multiple choices here
                return response.json();
            } else if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            // if (!response.ok) {
            //     throw new Error(`API request failed with status ${response.status}`);
            // }
            // return response.json();
        })
        .then(data => {
            // Handle the API response data here:
            console.log('TfL API Journey/Route Response:', data);

            /* Check if data is valid and contains the information you need.
            Putting it all together, the entire if statement evaluates to `true` only if all three conditions are met:
            1: `data` is not `null` or `undefined`. 2: `data` is an array. 3: The array has at least one element. */
            // if (data && Array.isArray(data.disambiguationOptions) && data.disambiguationOptions.length > 0) {
            if (typeof data === 'object' && Array.isArray(data.disambiguationOptions) && data.disambiguationOptions.length > 0) {
                // Process the data: The `map()` method is used to transform each element in the `data` array into a new object.
                console.log('Processing Journey/Route...');
                const JourneyPlanRoute = data.map(Route => {
                    return {
                        commonName: Route.commonName,
                        lat: Route.lat,
                        lon: Route.lon,
                        // naptanId: Route.naptanId, // These mean nothing to the user. Data can be retrieved as it might be useful for other requests if needed.
                        // placeType: Route.placeType,
                        // StopType: Route.StopType,
                        from: Route.from,
                        to: Route.to,
                        // Add more fields as required.
                    };
                });
                console.log('Processed Journey/Route:', JourneyPlanRoute);

                // Displaying the calculated journey/route in the HTML file (JourneyPlannerPage.html):
                const JourneyContainer = document.getElementById('JourneyContainer');
                JourneyContainer.innerHTML = ''; // To clear any existing content in the container.
                // Create and append HTML elements to display each route:
                JourneyPlanRoute.forEach(Route => {
                    const JourneyElement = document.createElement('div');
                    JourneyElement.innerHTML = ` <!--The purpose of the id is to apply styles to the fields.-->
                        <p id="DisplayJourneyElement"><strong></strong> ${Route.commonName}</p>
                        <p id="DisplayJourneyElement"><strong>Latitude:</strong> ${Route.lat}</p>
                        <p id="DisplayJourneyElement"><strong>Longitude:</strong> ${Route.lon}</p>
                        <!--<p><strong>Naptan ID:</strong> ${Route.naptanId}</p> These mean nothing to the user. Data can be retrieved as it might be useful for other requests if needed.
                        <p><strong>Place Type:</strong> ${Route.placeType}</p>
                        <p><strong>Stop Type:</strong> ${Route.StopType}</p>-->
                        <p id="DisplayJourneyElement"><strong>From:</strong> ${Route.from}</p>
                        <p id="DisplayJourneyElement"><strong>To:</strong> ${Route.to}</p>
                        <!--Add more fields as required.-->
                        <hr>
                    `;
                    JourneyContainer.appendChild(JourneyElement);
                });
            } else {console.log('No routes found');}
        })
        // .catch(error => {
        //     // Handle errors during the API request:
        //     console.error('Error calling TfL API:', error.message);
        // });
        .catch(error => {
            console.error('Error calling TfL API:', error);
            return response.text(); // Log the response text for further investigation.
        })
        .then(responseText => console.error('API response text:', responseText));
}
// Attach the function to the button click event:
// Removal of the parentheses after `JourneyPlannerSearch` makes it so the function will be called when the button is clicked, not immediately when setting up the event listener.
document.getElementById('SubmitJourneyFields').addEventListener('click', JourneyPlannerSearch);

// ====================================================================================================
