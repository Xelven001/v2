document.addEventListener('DOMContentLoaded', function () {


axios.get('/app2/get_data2')
    .then(function(response) {

        console.log(response.data);    
        var genres = [...new Set(response.data.map(item => item.genre))];
        // var categories = Object.keys(response.data[0]).filter(column => !['genre', 'year'].includes(column));

        var genreDropdown = document.getElementById('genre2');
        genres.forEach(function(genre) {
            var option = document.createElement('option');
            option.value = genre;
            option.text = genre;
            genreDropdown.appendChild(option);
        });


        updateLineChart();
    })
    .catch(function(error) {
        console.error('Error fetching data:', error);
    });

document.getElementById('genre2').addEventListener('change', updateLineChart);

function updateLineChart() {
    var selectedGenre = document.getElementById('genre2').value;

    axios.get(`/app2/get_data2?genre2=${selectedGenre}`)  // Update the query parameter name
        .then(function(response) {
            var data = response.data;

            // Extract year and count data
            var years = data.map(item => item.year);
            var counts = data.map(item => item.count);

            // Destroy the existing chart if it exists
            if (window.myLineChart) {
                window.myLineChart.destroy();
            }

            // Create a new line chart
            var ctx = document.getElementById('LineChart2').getContext('2d');
            window.myLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: years.map(String), // Convert years to strings for time scale
                    datasets: [{
                        label: 'Count of Songs',
                        data: counts,
                        backgroundColor: '#217A8D',
                        borderColor: 'black',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        x: {
                            type: 'time', // Use time scale
                            time: {
                                unit: 'year' // Set the time unit to 'year'
                            },
                            title: {
                                display: true,
                                text: 'Year'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Count of Songs'
                            }
                            // You can remove the `beginAtZero` property if needed
                        }
                    }
                }
            });
            




// function updateLineChart() {
//     var selectedGenre = document.getElementById('genre2').value;

//     axios.get(`/app2/get_data2?genre=${selectedGenre}`)
//         .then(function(response) {
//             var data = response.data;

//             // Extract year and count data
//             var years = data.map(item => item.year);
//             var counts = data.map(item => item.count);

//             // Destroy the existing chart if it exists
//             if (window.myLineChart) {
//                 window.myLineChart.destroy();
//             }

//             // Create a new line chart
//             var ctx = document.getElementById('LineChart2').getContext('2d');
//             window.myLineChart = new Chart(ctx, {
//                 type: 'line',
//                 data: {
//                     labels: years,
//                     datasets: [{
//                         label: 'Count of Songs',
//                         data: counts,
//                         backgroundColor: '#217A8D',
//                         borderColor: 'black',
//                         borderWidth: 1
//                     }]
//                 },
//                 options: {
//                     scales: {
//                         x: {
//                             type: 'linear',
//                             position: 'bottom',
//                             title: {
//                                 display: true,
//                                 text: 'Year'
//                             },
//                             ticks: {
//                                 precision: 0,
//                             }
//                         },
//                         y: {
//                             beginAtZero: true,
//                             title: {
//                                 display: true,
//                                 text: 'Count of Songs'
//                             }
//                         }
//                     }
//                 }
//             });
//         })
//         .catch(function(error) {
//             console.error('Error fetching filtered data:', error);
//         });
// }

// });