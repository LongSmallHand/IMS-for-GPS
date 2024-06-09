import functions_framework
from flask import request, jsonify
from math import radians, sin, cos, sqrt, atan2
import firebase_admin
from firebase_admin import credentials, firestore

@functions_framework.http
def calculate_trip_length(request):


    R = 6371.0
    if not firebase_admin._apps:
        cred = credentials.Certificate("#####################")
        firebase_admin.initialize_app(cred, {
            'databaseURL': '#####################'
        })
    db = firestore.client()
    
    data = request.get_json(silent=True)
    request_args = request.args

    # Lấy document ID từ query parameters
    doc_id = data.get('doc_id')
    if not doc_id:
        return jsonify({'status': 'error', 'message': 'Missing document ID'}), 400

    if 'latitude' in data and 'longitude' in data:
        lat = data['latitude']
        lon = data['longitude']

        # Lấy tọa độ API ban đầu từ Firestore
        doc_ref = db.collection("devices").document(doc_id)
        coordinates = doc_ref.get()
        if coordinates.exists:
            prev_data = coordinates.to_dict()
            prev_lat = prev_data.get('API_lat', 0.0)
            prev_lon = prev_data.get('API_lng', 0.0)
            total_distance = prev_data.get('total_distance', 0.0)

        else:
            prev_lat = 0.0
            prev_lon = 0.0
            total_distance = 0.0

        # Tính toán khoảng cách sử dụng công thức Haversine
        R = 6371.0
        lat1 = radians(prev_lat)
        lon1 = radians(prev_lon)
        lat2 = radians(lat)
        lon2 = radians(lon)

        dlat = lat2 - lat1
        dlon = lon2 - lon1

        a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
        c = 2 * atan2(sqrt(a), sqrt(1 - a))

        distance = R * c
        distanceTrip = distance * 1000
        total_distance += distance

        # Check if flag is 1
        if data.get('flag', 0) == 1:
            distanceTrip = 0

        # Cập nhật Firestore với các giá trị mới
        db.collection("devices").document(doc_id).update({
            "API_lat": lat,
            "API_lng": lon,
            "total_distance": total_distance
        })

        return jsonify({
            'status': 'success',
            'total_distance': total_distance,
            'distanceTrip': distanceTrip,
            "lat_prev": prev_lat,
            "lng_prev": prev_lon
        })
    else:
        return jsonify({'status': 'error', 'message': 'Invalid GPS coordinates'}), 400

