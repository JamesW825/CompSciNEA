<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>My Web Page</title>
</head>
<body>
    <script>
        function callTfLAPI() {
            // Replace 'YOUR_API_KEY' with your actual TfL API key (if required)
            const primaryapiKey = 'c3dd5c006828420c9f7696a37292384e';
            const secondaryapiKey = '0358cd3e5f7b44c9a43aec6b16a73d0d';
            const apiUrl = 'https://api.tfl.gov.uk/your/endpoint';  // Replace with the actual endpoint

            // Use the primary key for the app_id parameter
            const urlWithPrimaryApiKey = `${apiUrl}?app_id=${primaryApiKey}`;

            // Use the secondary key for the app_key parameter
            const urlWithSecondaryApiKey = `${apiUrl}&app_key=${secondaryApiKey}`;
  
            // Make a GET request to the TfL API using the Fetch API
            fetch(urlWithPrimaryApiKey + urlWithSecondaryApiKey)
                .then(response => {
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
    </script>
</body>
</html>