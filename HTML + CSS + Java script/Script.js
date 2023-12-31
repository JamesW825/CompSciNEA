// A test function to call the TfL API and log the response to the console.
function callTfLAPI() {
    console.log('Button clicked'); // To check the button click handler is working.
    // Replace 'YOUR_API_KEY' with your actual TfL API key (if required).
    const primaryApiKey = 'c3dd5c006828420c9f7696a37292384e';
    const secondaryApiKey = '0358cd3e5f7b44c9a43aec6b16a73d0d';
    
    const lineIds = 'central,circle,district';  // Replaced with test data
    const includeDetail = true; 
    const apiUrl = `https://api.tfl.gov.uk/Line/${lineIds}/Status${includeDetail ? '?detail=true' : ''}`; // The backticks (`) are used to create a template literal. This allows you to embed expressions or variables within a string.

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
            // Handle the API response data here
            console.log('TfL API Response:', data);
        })
        .catch(error => {
            // Handle errors during the API request
            console.error('Error calling TfL API:', error.message);
        });
}
// Attach the function to the button click event
document.getElementById('APIbutton').addEventListener('click', callTfLAPI);