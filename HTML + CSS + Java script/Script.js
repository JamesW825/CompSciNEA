<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>My Web Page</title>
</head>
<body>
    <script>
        function myFunction() {
            const button = document.getElementById('myButton');
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
        }
    </script>
</body>
</html>