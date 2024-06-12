import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:http/http.dart' as http;
import 'dart:convert' as convert;
class LocationService{
  final String key = 'API_KEY';
  Future<String> getPlaceId(String input) async {
    final String url = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=$input&inputtype=textquery&key=$key';
    var response = await http.get(Uri.parse(url));
    var json = convert.jsonDecode(response.body);
    var placeId = "";
    placeId = json['candidates'][0]['place_id'] as String;
    return placeId;
  }

  Future<Map<String, dynamic>> getPlace(String input) async {
    final placeId = await getPlaceId(input);
    final String url = 'https://maps.googleapis.com/maps/api/place/details/json?placeid=$placeId&key=$key';
    var response = await http.get(Uri.parse(url));
    var json = convert.jsonDecode(response.body);
    var result = json['result'] as Map<String, dynamic>;
    return result;
  }

  Future<Map<String, dynamic>> getDirection(String ori, String des) async {
    final String url = 'https://maps.googleapis.com/maps/api/directions/json?origin=$ori&destination=$des&key=$key';
    var response = await http.get(Uri.parse(url));
    // print("response: $response");
    var json = convert.jsonDecode(response.body);
    // print("json: $json");
    var result = {
      'bounds_ne': json['routes'][0]['bounds']['northeast'],
      'bounds_sw': json['routes'][0]['bounds']['southwest'],
      'start_location': json['routes'][0]['legs'][0]['start_location'],
      'end_location':   json['routes'][0]['legs'][0]['end_location'],
      'polyline' : json['routes'][0]['overview_polyline']['points'],
      'polyline_decoded': PolylinePoints().decodePolyline(json['routes'][0]['overview_polyline']['points']),
      'distance': json['routes'][0]['legs'][0]['distance'],
      'duration': json['routes'][0]['legs'][0]['duration'],
    };
    return result;
  }

  Future<void> getDistance(LatLng location, int flag) async {
    const String url = '';
    var input = convert.jsonEncode(<String, dynamic>{
      'doc_id': "1913991",
      'latitude': location.latitude,
      'longitude': location.longitude,
      'flag': flag,
    });
    print(input);
    var response = await http.post(
      Uri.parse(url), 
      headers: <String,String>{
        'Content-Type': 'application/json',
      },
      body: input,
    );
    var json = convert.jsonDecode(response.body);
    var result = json['distanceTrip'];
    var status = json['status'];
    var total = json['total_distance'];
    var lat = json['lat_prev'];
    var lng = json['lng_prev'];
    print('Distance API: $result, $status, $total, [$lat, $lng]');
    // return result;
  }

  Future<double> getSpeed(int speed0, int speed1, int speed2, int speed3,) async {
    const String url = '';
    var input = convert.jsonEncode(<String, List<int>>{
      'speed': [speed0, speed1, speed2, speed3],
    });
    // print(input);
    var response = await http.post(
      Uri.parse(url), 
      headers: <String,String>{
        'Content-Type': 'application/json',
      },
      body: input,
    );
    var json = convert.jsonDecode(response.body);
    var result = json['prediction'];
    if(result == null){
     return 0; 
    }
    print('Predict: $result');
    return result;
  }
}