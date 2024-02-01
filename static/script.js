document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('barGraph').getContext('2d');
    var myBarChart = initializeChart(ctx);

    // Event listener for dropdown changes
    document.getElementById('genre').addEventListener('change', function () {
        updateBarGraph(myBarChart, 'genre', 'category', 'barGraph');
    });

    document.getElementById('category').addEventListener('change', function () {
        updateBarGraph(myBarChart, 'genre', 'category', 'barGraph');
    });

    // Initial chart rendering
    updateBarGraph(myBarChart, 'genre', 'category', 'barGraph');
});

function initializeChart(ctx) {
    return new Chart(ctx, {
        type: 'bar',
        // Your chart configuration for the first chart
    });
}

function updateBarGraph(chart, genreId, categoryId, canvasId) {
    // Get selected genre and category
    var selectedGenre = document.getElementById(genreId).value;
    var selectedCategory = document.getElementById(categoryId).value;

    // Fetch filtered data based on selected genre
    axios.get(`/app1/get_data?genre=${selectedGenre}`)
        .then(function(response) {
            // Extract values for the selected category
            var values = response.data.map(item => item[selectedCategory]);
            var years = response.data.map(item => item.year);

            // Update chart data
            chart.data.labels = years;
            chart.data.datasets = [{
                label: selectedCategory,
                data: values,
                backgroundColor: '#217A8D',
                borderColor: 'black',
                borderWidth: 1
            }];

            // Update chart options if needed

            // Update the chart
            chart.update();
        })
        .catch(function(error) {
            console.error('Error fetching filtered data:', error);
        });
}
