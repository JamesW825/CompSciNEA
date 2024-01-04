// A test function to call the TfL API and log the response to the console.
function APIcall2() {
    console.log('Button 2 clicked'); // To check the button click handler is working.
    // Replace 'YOUR_API_KEY' with your actual TfL API key (if required).
    const primaryApiKey2 = 'c3dd5c006828420c9f7696a37292384e';
    const secondaryApiKey2 = '0358cd3e5f7b44c9a43aec6b16a73d0d';
    
    const modes = 'tube,dlr,overground' // Replaced with test data.
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
            console.log('Disruptions response received'); // To check the response is received.
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Handle the API response data here:
            console.log('TfL API Disruptions Response:', data);
            
            // Check if data is valid and contains the information you need.
            // Putting it all together, the entire if statement evaluates to `true` only if all three conditions are met:
            // - `data` is not `null` or `undefined`.
            // - `data` is an array.
            // - The array has at least one element.
            if (data && Array.isArray(data) && data.length > 0) {
                // Process the data:
                const disruptions = data.map(disruption => {
                    return {
                        closureText: disruption.closureText,
                        description: disruption.description,
                        affectedRoutes: disruption.affectedRoutes,
                        // Add more fields as required.
                    };
                });
                console.log('Processed Disruptions:', disruptions);

                // Displaying the disruptions in the HTML file (index.html).
                const disruptionsContainer = document.getElementById('disruptions-container');
                // Clear any existing content in the container
                disruptionsContainer.innerHTML = '';
                // Create and append HTML elements to display each disruption
                disruptions.forEach(disruption => {
                    const disruptionElement = document.createElement('div');
                    disruptionElement.innerHTML = `
                        <p><strong>Status/Closure Text:</strong> ${disruption.closureText}</p>
                        <p><strong>Description:</strong> ${disruption.description}</p>
                        <p><strong>Affected Routes:</strong> ${disruption.affectedRoutes.join(', ')}</p>
                        <!-- Add more fields as required -->
                        <hr>
                    `;
                    disruptionsContainer.appendChild(disruptionElement);
                });
            } else {
                console.log('No disruptions found');
            }
        })
        .catch(error => {
            // Handle errors during the API request
            console.error('Error calling TfL API:', error.message);
        });
}
// Attach the function to the button click event
// Removal of the parentheses after `callTfLAPI` makes it so the function will be called when the button is clicked, not immediately when setting up the event listener.
document.getElementById('APIbutton2').addEventListener('click', APIcall2);

// ====================================================================================================
