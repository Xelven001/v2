document.addEventListener('DOMContentLoaded', function () {


axios.get('/app2/get_data2')
    .then(function(response) {

        console.log(response.data);    
        // Extract genres and categories for dropdowns
        var genres = [...new Set(response.data.map(item => item.genre))];
        var categories = Object.keys(response.data[0]).filter(column => !['genre', 'year'].includes(column));

        // Populate genre dropdown
        var genreDropdown = document.getElementById('genre2');
        genres.forEach(function(genre) {
            var option = document.createElement('option');
            option.value = genre;
            option.text = genre;
            genreDropdown.appendChild(option);
        });

        // Populate category dropdown
        var categoryDropdown = document.getElementById('category2');
        categories.forEach(function(category) {
            var option = document.createElement('option');
            option.value = category;
            option.text = category;
            categoryDropdown.appendChild(option);
        });

        // Initial chart rendering
        updateBarGraph();
    })
    .catch(function(error) {
        console.error('Error fetching data:', error);
    });

// Event listener for dropdown changes
document.getElementById('genre2').addEventListener('change', updateBarGraph);
document.getElementById('category2').addEventListener('change', updateBarGraph);

// Function to update bar graph
// Function to update bar graph
function updateBarGraph() {
    // Get selected genre and category
    var selectedGenre = document.getElementById('genre2').value;
    var selectedCategory = document.getElementById('category2').value;

    // Fetch filtered data based on selected genre
    axios.get(`/app2/get_data2?genre=${selectedGenre}`)
        .then(function(response) {
            // Extract values for the selected category
            var values = response.data.map(item => item[selectedCategory]);
            var years = response.data.map(item => item.year);

            // Clear previous chart instance
            if (window.myBarChart2) {
                window.myBarChart2.destroy();
            }

            // Create a bar chart
            var ctx = document.getElementById('barGraph2').getContext('2d');
            window.myBarChart2 = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: years,
                    datasets: [{
                        label: selectedCategory,
                        data: values,
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
                                precision: 0, // Display integers for the year
                            }
                        },
                        
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: selectedCategory
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