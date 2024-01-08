// A test function to call the TfL API and log the response to the console.
function callTfLAPI() {
    console.log('Button clicked'); // To check the button click handler is working.
    // Replace 'YOUR_API_KEY' with your actual TfL API key (if required).
    const primaryApiKey = 'c3dd5c006828420c9f7696a37292384e';
    const secondaryApiKey = '0358cd3e5f7b44c9a43aec6b16a73d0d';
    
    const lineIds = 'central,circle,district';  // Replaced with test data.
    const apiUrl = `https://api.tfl.gov.uk/Line/${lineIds}/Status/`; // The backticks (`) are used to create a template literal. This allows you to embed expressions or variables within a string.
    
    // Use the primary key for the app_id parameter: urlWithPrimaryApiKey
    const urlWithPrimaryApiKey = `${apiUrl}?app_id=${primaryApiKey}`; // Constructing a URL for making an API request.

    // Use the secondary key for the app_key parameter: urlWithSecondaryApiKey
    const urlWithSecondaryApiKey = `${apiUrl}&app_key=${secondaryApiKey}`; // Constructing a URL for making an API request.

    // The two URL components, `urlWithPrimaryApiKey` and `urlWithSecondaryApiKey`, are combined using string concatenation before making the API request.
    // This ensures that both the `app_id` and `app_key` parameters are included in the API request, providing the necessary authentication for your application to access the TfL API.
    
    // Make a GET request to the TfL API using the Fetch API.
    fetch(urlWithPrimaryApiKey + urlWithSecondaryApiKey)
        .then(response => {
            console.log('Response received'); // To check the response is received.
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('TfL API Status Response:', data);
        })
        .catch(error => {
            // Handle errors during the API request
            console.error('Error calling TfL API:', error.message);
        });
}
// Attach the function to the button click event:
document.getElementById('APIbutton').addEventListener('click', callTfLAPI);

// ====================================================================================================
/*            // Handle the API response data here:
            console.log('TfL API Line Status Response:', data);
            
            // Check if data is valid and contains the information you need.
            // Putting it all together, the entire if statement evaluates to `true` only if all three conditions are met:
            // - `data` is not `null` or `undefined`.
            // - `data` is an array.
            // - The array has at least one element.
            if (data && Array.isArray(data) && data.length > 0) {
                // Process the data:
                const statusdisruptions = data.map(status => {
                    return {
                        closureText: disruption.closureText,
                        description: disruption.description,
                        affectedRoutes: disruption.affectedRoutes,
                        // Add more fields as required. Change 'disruption' to 'status' if needed. !!!
                    };
                });
                console.log('Processed line statuses:', status);

                // Displaying the line status in the HTML file (index.html).
                const statusContainer = document.getElementById('status-container');
                // Clear any existing content in the container
                statusContainer.innerHTML = '';
                // Create and append HTML elements to display each status.
                status.forEach(status => {
                    const statusElement = document.createElement('div');
                    statusElement.innerHTML = `
                        <p><strong>Status/Closure Text:</strong> ${status.closureText}</p>
                        <p><strong>Description:</strong> ${status.description}</p>
                        <p><strong>Affected Routes:</strong> ${status.affectedRoutes.join(', ')}</p>
                        <!-- Add more fields as required -->
                        <hr>
                    `;
                    statusContainer.appendChild(statusElement);
                });
            } else {
                console.log('No statuses/disruptions found');
            }
        })