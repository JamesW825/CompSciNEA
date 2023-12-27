<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>My Web Page</title>
</head>
<body>
    <script>
    // Function to handle the TfL API request
    function callTfLAPI() {
        // TfL Unified API endpoint (replace with your actual endpoint)
        const apiUrl = 'https://api.tfl.gov.uk/path/to/endpoint';

        // Make a GET request to the TfL API using the Fetch API
        fetch(apiUrl)
            .then(response => {
                // Check if the request was successful (status code 200)
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
                // Parse the JSON response
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
document.getElementById('apiButton').addEventListener('click', callTfLAPI);

        function myFunction() {
            const button = document.getElementById('APIbutton');
            button.addEventListener('click', () => {
                // Make the API request using the fetch() function
                fetch('https://api.tfl.gov.uk/Line/central,circle,district/Status', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'app_key': 'c3dd5c006828420c9f7696a37292384e',
                        'app_id': '',
                        'Cache-Control': 'no-cache'
                    }
                })
                // Handle the response data here
                .then(response => response.json())
                .then(data => {
                
                console.log(data);
                // You can access and utilize the response data as needed
                // For example, you can update your webpage with the retrieved data
                // or perform any desired actions based on the API response

                // Example: Update a DOM element with the response data
                const resultElement = document.getElementById('result');
                resultElement.textContent = JSON.stringify(data);

                // Example: Access specific data from the response
                const status = data[0].lineStatuses[0].statusSeverityDescription;
                console.log('Status:', status);
                })
                .catch(error => {
                // Handle any errors that occur during the request
                console.error(error);
                });
            });
        } */
    </script>
</body>
</html>