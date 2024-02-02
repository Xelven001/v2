from flask import Blueprint, request, jsonify
import sqlite3

app2 = Blueprint('app2', __name__)



@app2.route('/get_data2')

def get_data2():
    connection = sqlite3.connect('spotify_data.db')
    cursor = connection.cursor()

    selected_genre = request.args.get('genre2')

    if selected_genre:
        query = f"SELECT year,\
                     SUM(explicit) as count   \
                    FROM song_metrics\
                    WHERE genre = ? \
                    AND genre IN ('Hip-Hop','Electronic','Rock','Pop')\
                    GROUP BY year\
                    ORDER BY sum(explicit) DESC"       
        cursor.execute(query, (selected_genre,))
    else:
        query = "SELECT year,\
                    SUM(explicit) as count    \
                    FROM song_metrics\
                    WHERE genre IN ('Hip-Hop','Electronic','Rock','Pop')\
                    GROUP BY year\
                    ORDER BY sum(explicit) DESC"        
        cursor.execute(query)



    data = cursor.fetchall()

    # Get column names from the cursor description
    columns = [column[0] for column in cursor.description]

    # Close the database connection
    connection.close()

    # Convert data to a list of dictionaries
    result = [dict(zip(columns, row)) for row in data]

    # Return data as JSON
    return jsonify(result)