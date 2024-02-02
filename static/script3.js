document.addEventListener('DOMContentLoaded', function () {


    axios.get('/app3/get_data2')
        .then(function(response) {
    
            console.log(response.data);    
            var genres = [...new Set(response.data.map(item => item.genre))];
            // var categories = Object.keys(response.data[0]).filter(column => !['genre', 'year'].includes(column));
    
            var genreDropdown = document.getElementById('genre3');
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
    
    document.getElementById('genre3').addEventListener('change', updateLineChart);
    
    
    function updateLineChart() {
        var selectedGenre = document.getElementById('genre3').value;
    
        axios.get(`/app3/get_data3?genre3=${selectedGenre}`)
            .then(function(response) {
                var data = response.data;
    
                // Extract year and count data
                var years = data.map(item => item.year);
                var counts = data.map(item => item.count);
    
                // Destroy the existing chart if it exists
                if (window.myLineChart2) {
                    window.myLineChart2.destroy();
                }
    
                // Create a new line chart
                var ctx = document.getElementById('LineChart3').getContext('2d');
                window.myLineChart2 = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: years,
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
                                type: 'linear',
                                position: 'bottom',
                                title: {
                                    display: true,
                                    text: 'Year'
                                },
                                ticks: {
                                    precision: 0,
                                }
                            },
                            y: {
                                beginAtZero: true,
                                title: {
                                    display: true,
                                    text: 'Lenght of Songs(Seconds)'
                                }
                            }
                        }
                    }
                });
            })
            .catch(function(error) {
                console.error('Error fetching filtered data:', error);
            });
    }
    
    });