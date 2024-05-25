from flask import Flask, request, jsonify
from math import radians, sin, cos, sqrt, atan2
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

app = Flask(__name__)

# Radius of the Earth in kilometers
R = 6371.0

# Initialize previous GPS coordinate
# prev_lat = 10.791505 
# prev_lon = 106.625391
# total_distance = 0.0


cred = credentials.Certificate("loca-4d172-firebase-adminsdk-l76e7-ea574a8374.json")
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://loca-4d172-default-rtdb.asia-southeast1.firebasedatabase.app'
})
db = firestore.client()

def fetch_initial_coordinates():
    doc_ref = db.collection("devices").document("1913991")
    coordinates = doc_ref.get()
    print(coordinates)  # Default valu
    return coordinates.to_dict()['lat'], coordinates.to_dict()['lng'], coordinates.to_dict()['total_distance']


prev_lat, prev_lon, total_distance = fetch_initial_coordinates()
# total_distance = 0.0
print(prev_lat)
print(prev_lon)
print(total_distance)

def haversine(lat1, lon1, lat2, lon2):
    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c
    return distance

@app.route('/gps', methods=['POST'])
def calculate_trip_length():
    global prev_lat, prev_lon, total_distance

    data = request.json

    if 'latitude' in data and 'longitude' in data:
        lat = data['latitude']
        lon = data['longitude']

        if prev_lat is not None and prev_lon is not None:
            distance = haversine(prev_lat, prev_lon, lat, lon)
            total_distance += distance

        prev_lat = lat
        prev_lon = lon
        db.collection("devices").document("1913991").update({"lat": lat, "lng": lon, "total_distance": total_distance})


        return jsonify({'status': 'success', 'total_distance': total_distance,"lat_prev":prev_lat, "lng_prev":prev_lon})
    else:
        return jsonify({'status': 'error', 'message': 'Invalid GPS coordinates'}), 400


if __name__ == '__main__':
    app.run(debug=True)

