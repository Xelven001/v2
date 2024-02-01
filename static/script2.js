document.addEventListener('DOMContentLoaded', function () {


axios.get('/app2/get_data2')
    .then(function(response) {

        console.log(response.data);    
        var genres = [...new Set(response.data.map(item => item.genre))];
        var categories = Object.keys(response.data[0]).filter(column => !['genre', 'year'].includes(column));

        var genreDropdown = document.getElementById('genre2');
        genres.forEach(function(genre) {
            var option = document.createElement('option');
            option.value = genre;
            option.text = genre;
            genreDropdown.appendChild(option);
        });

        var categoryDropdown = document.getElementById('category2');
        categories.forEach(function(category) {
            var option = document.createElement('option');
            option.value = category;
            option.text = category;
            categoryDropdown.appendChild(option);
        });

        updateBarGraph();
    })
    .catch(function(error) {
        console.error('Error fetching data:', error);
    });

document.getElementById('genre2').addEventListener('change', updateBarGraph);
document.getElementById('category2').addEventListener('change', updateBarGraph);


function updateBarGraph() {
    var selectedGenre = document.getElementById('genre2').value;
    var selectedCategory = document.getElementById('category2').value;

    axios.get(`/app2/get_data2?genre=${selectedGenre}`)
        .then(function(response) {
            var values = response.data.map(item => item[selectedCategory]);
            var years = response.data.map(item => item.year);

            if (window.myBarChart2) {
                window.myBarChart2.destroy();
            }

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
                                precision: 0, 
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