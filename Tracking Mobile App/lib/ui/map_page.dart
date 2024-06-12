import 'dart:async';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:geocoding/geocoding.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:geolocator/geolocator.dart';
import 'package:searchfield/searchfield.dart';
import 'package:tracking_app/component/menubutton.dart';
import 'package:tracking_app/component/sidebar.dart';
import 'package:tracking_app/services/location_service.dart';
import 'package:intl/intl.dart';


class MyMap extends StatefulWidget {
  const MyMap({super.key});
  @override
  State<MyMap> createState() => _MyMapState();
}

class _MyMapState extends State<MyMap> {

  final Completer<GoogleMapController> _controller = Completer<GoogleMapController>();

  // final TextEditingController _oriController = TextEditingController();
  // final TextEditingController _desController = TextEditingController();
  final TextEditingController _searchController = TextEditingController();
  
  Timer? _timer;
  Timer? _timer2;
  Timer? _post;

  static int _drivingTime = 0;
  static int _drivingDistance = 0;
  static int _drivingSpeed = 0;
  static int _currentSpeed = 0;
  // static int _counter = 0;
  static int _polylineIdCounter = 1;
  static int id = 1;
  static int _distance = 0;
  static int _duration = 0;
  static double distance = 0;

  static bool _drivingMode = false;
  static bool firstCall = false;
  static bool isMenuClick = true;

  static List<int> speeds = [0, 0, 0, 1];
  static DocumentReference  devices = FirebaseFirestore.instance.collection('devices').doc('1913991');
  static CollectionReference trip = devices.collection('trip');
  static CollectionReference data = devices.collection('phone');

  late LatLng lastLocation;
  late LatLng nextLocation;

  final Map<String, dynamic> _suggestion = {
    'Kho A': '85 Thoại Ngọc Hầu, Hoà Thạnh, Tân Phú, Thành phố Hồ Chí Minh',
    'Kho B': '540 Lý Thường Kiệt, Phường 7, Tân Bình, Thành phố Hồ Chí Minh',
    'Kho C': '19 Hoa Bằng, Tân Phú, Thành phố Hồ Chí Minh',
    'Kho D': '268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh'
  };

  final Set<Marker> _markers = <Marker>{};

  final Set<Polyline> _polylines = <Polyline>{};

  
  static const CameraPosition _initialPostion = CameraPosition(
    target: LatLng(10.762622, 106.660172),
    zoom: 15,
  );
  
  static LatLng _current = const LatLng(0, 0);
  static LatLng _des = const LatLng(0, 0);

  @override
  void initState(){
    _deleteAllDocumentsInCollection();
    getLocation();
    _post = Timer.periodic(const Duration(seconds: 3), (timer) {
      getUserLocation().then((value){
        DateTime time = DateTime.now();
        String formattedDate = DateFormat('yyyyMMddHHmmss.SSS').format(time);
        String timeStamp = formattedDate;
        devices.update({
          't_v': timeStamp,
          'lat': value.latitude,
          'lng': value.longitude,
          'speed': value.speed,
        });
        data.doc('$id').set(
        {
          'time': timeStamp,
          'lat': value.latitude,
          'lng': value.longitude,
          'speed': value.speed,
        });
        id++;
        _currentSpeed = value.speed.ceil();
        speeds.removeAt(0);
        speeds.add(_currentSpeed);
        if(_drivingSpeed == 0){
          _drivingSpeed = _currentSpeed;
        }
      });
    });
    super.initState();
  }

  void _startTimer() {
    trip.add({
      'distance': _drivingDistance,
      'time' : _drivingTime,
    });
    _timer = Timer.periodic(const Duration(seconds: 3), (timer) {
      getUserLocation().then((value) async {
        _updateDistance(LatLng(value.latitude, value.longitude));
        _setMarker(LatLng(value.latitude, value.longitude));
        CameraPosition cameraPosition = CameraPosition(
          target: LatLng(value.latitude, value.longitude),
          zoom: 16,
        );
        final GoogleMapController controller = await _controller.future;
        await controller.animateCamera(CameraUpdate.newCameraPosition(cameraPosition));
      });
    });
    _timer2 = Timer.periodic(const Duration(seconds: 10), (timer) {
      _speedPredict().then((value) => _drivingSpeed = value);
    });
  } 

  void _stopTimer() {
    _timer?.cancel();
    _polylines.clear();
  }

  @override
  void dispose() {
    _timer?.cancel();
    _post?.cancel();
    _polylines.clear();
    super.dispose();
  }

  void _setMarker(LatLng value) async {
    String myAddress  = 'address';
    List<Placemark> result  = await placemarkFromCoordinates(value.latitude, value.longitude);
    if (result.isNotEmpty){
      myAddress = '${result[0].street}, ${result[0].subAdministrativeArea}, ${result[0].administrativeArea}';
    }
    setState(() {
      _markers.add(
        Marker(
          markerId: const MarkerId('newMarker'),
          position: value,
          icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueCyan),
          infoWindow: InfoWindow(title: myAddress),
        )
      );
    });
    // Fluttertoast.showToast(msg: '📍$myAddress', webShowClose: false);
  }
  
  void _setPolyline(List<PointLatLng> points){
    _polylines.clear();
    final String polylineIdVal = 'polyline_$_polylineIdCounter';
    _polylineIdCounter++;
    _polylines.add(Polyline(
      polylineId: PolylineId(polylineIdVal),
      points: points.map(
        (point) => LatLng(point.latitude, point.longitude),
      ).toList(),
      width: 2,
      color: Colors.blue,
    ));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        // title: const Center(child: Text('LOCA')),
        toolbarHeight: 1,
      ),
      body: Stack(
        children: [
          Positioned(
            width: isMenuClick ? 0 : 250,
            height: MediaQuery.of(context).size.height,
            child: const Sidebar(),
          ),
          Transform.translate(
            offset: Offset(isMenuClick ? 0 : 250, 0),
            child: Transform.scale(
              scale: isMenuClick ? 1: 0.95,
              child: ClipRRect(
                child: mapUI(),
              ),
            ),
          ),
          MenuButton(
            press: (){
              setState(() {
                isMenuClick = !isMenuClick; 
              });
            },
            isMenuOpen: isMenuClick == true,
          )
        ]
      ),
      floatingActionButton: Padding(
        padding: const EdgeInsets.only(right: 50),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            FloatingActionButton.extended(
              onPressed: (){
                setState(() {
                  _drivingMode = !_drivingMode;
                  if(_drivingMode == true){
                    firstCall = true;
                    if(_distance != 0 && _duration != 0){
                      _drivingDistance = _distance;
                      _drivingTime = _duration;
                    }
                    else {
                      _drivingDistance = 1000;
                      _drivingTime = 100;
                    }
                    _startTimer();
                  }
                  else {
                    _stopTimer();
                  }
                });
              },
              backgroundColor: Colors.white,
              label: const Icon(Icons.drive_eta, color: Colors.black54),
              heroTag: null,
            ),
            const SizedBox(width: 10),
            FloatingActionButton.extended(
              onPressed: (){
                FirebaseAuth.instance.signOut();
              },
              backgroundColor: Colors.white,
              label: const Icon(FontAwesomeIcons.rightFromBracket, color: Colors.black54),
              heroTag: null,
            ),
            const SizedBox(width: 10),
            FloatingActionButton.extended(
              onPressed: getLocation,
              backgroundColor: Colors.white,
              label: const Icon(Icons.gps_fixed, color: Colors.black54),
              heroTag: null,
            ),
          ],
        ),
      ),
    );
  }

  Column mapUI() {
    return Column(
        children: [
          Container(
            decoration: BoxDecoration(
              border: Border.all(color: Colors.black),
            ),
            child: searchBar()),
          Expanded(
            child: Stack(
              children: [
                GoogleMap(
                  initialCameraPosition: _initialPostion,
                  mapType: MapType.normal,
                  markers: _markers,
                  polylines: _polylines,
                  onTap: (value){
                    setState(() {
                      _setMarker(value);
                      _updateDistance(value);
                    });
                  },
                  onMapCreated: (GoogleMapController controller){
                    _controller.complete(controller);
                  },
                ),
                SizedBox(
                  height: 70,
                  child: Center(
                    child: Container(
                      height: 70,
                      width: _drivingMode ? 220 : 0,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(15),
                      ),
                      child: Card(
                        color: Colors.amberAccent[100],
                        margin: const EdgeInsets.all(10),
                        elevation: 8,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(15)),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            const Icon(FontAwesomeIcons.road),
                            Text(_drivingDistance.toString(), style: const TextStyle(fontSize: 16, color: Colors.black),),
                            const SizedBox(width: 20),
                            const Icon(FontAwesomeIcons.hourglassStart),
                            Text(_drivingTime.toString(), style: const TextStyle(fontSize: 16, color: Colors.black),),
                          ],
                        ),
                      ),
                    ),
                  ),
                )
              ]
            ),
          ),
        ],
        );
  }

  Row searchBar() {
    return Row(
          children: [
            Expanded(
              // child: Column (
              //   children: [
              //     TextFormField(
              //       controller: _oriController,
              //       decoration: const InputDecoration(
              //         filled: true,
              //         fillColor: Colors.white,
              //         hintText: "Start Point",
              //         contentPadding: EdgeInsets.all(10.0),
              //         border: InputBorder.none,
              //       ),
              //       // onChanged: (value){
              //       //   print(value);
              //       // },
              //     ),
              //     TextFormField(
              //       controller: _desController,
              //       decoration: const InputDecoration(
              //         filled: true,
              //         fillColor: Colors.white,
              //         hintText: "Destination Point",
              //         contentPadding: EdgeInsets.all(10.0),
              //         border: InputBorder.none,
              //       ),
              //       // onChanged: (value){
              //       //   print(value);
              //       // },
              //     ),
              //   ],
              // child: TextFormField(
              //   controller: _desController,
              //   decoration: const InputDecoration(
              //     filled: true,
              //     fillColor: Colors.white,
              //     hintText: "Tìm kiếm trên Loca",
              //     contentPadding: EdgeInsets.all(10.0),
              //     border: InputBorder.none,
              //   ),
              // )
              
              child: SearchField(
                hint: "Tìm kiếm trên Loca",
                controller: _searchController,
                searchInputDecoration: const InputDecoration(
                  filled: true,
                  fillColor: Colors.white,
                  contentPadding: EdgeInsets.all(10.0),
                  border: InputBorder.none,
                ),
                itemHeight: 40,

                maxSuggestionsInViewPort: 5,
                suggestionsDecoration: SuggestionDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                ),
                suggestions: [
                  'Kho A',
                  'Kho B',
                  'Kho C',
                  'Kho D'
                ].map(
                  (e) => SearchFieldListItem(_suggestion[e], child: Text(e))
                ).toList(),
              ),
            
            ),
            IconButton(
              onPressed: () async {
                var destination = await LocationService().getPlace(_searchController.text);
                _gotoDestination(LatLng(
                  destination['geometry']['location']['lat'],
                  destination['geometry']['location']['lng']
                ));
              }, 
              icon: const Icon(Icons.search),
              style: ButtonStyle(
                shape: MaterialStateProperty.all(RoundedRectangleBorder(
                  side: const BorderSide(
                    color: Colors.blue,
                    width: 2,
                    style: BorderStyle.solid,
                  ),
                  borderRadius: BorderRadius.circular(20)
                )),
              ),
            ),
            IconButton(
              onPressed: () async {
                var direction = await LocationService().getDirection(
                  _current.latitude.toString() + ",".toString() + _current.longitude.toString(),
                  _searchController.text
                );
                _gotoPlace(
                  direction['start_location']['lat'], 
                  direction['start_location']['lng'],
                  direction['bounds_ne'],
                  direction['bounds_sw'],
                );
                _des = LatLng(direction['end_location']['lat'], direction['end_location']['lng']);
                _markers.add(Marker(
                    markerId: const MarkerId('destination'),
                    position: _des,
                    icon: BitmapDescriptor.defaultMarkerWithHue(BitmapDescriptor.hueGreen),
                  ));
                _setPolyline(direction['polyline_decoded']);
                setState(() {
                  _distance = direction['distance']['value'];
                  _duration = direction['duration']['value'];
                });
              }, 
              icon: const Icon(Icons.route),
              style: ButtonStyle(
                shape: MaterialStateProperty.all(RoundedRectangleBorder(
                  side: const BorderSide(
                    color: Colors.blue,
                    width: 2,
                    style: BorderStyle.solid,
                  ),
                  borderRadius: BorderRadius.circular(20)
                )),
              ),
            ),
          ]
        );
  }

  Future<Position> getUserLocation() async {
    await Geolocator.requestPermission().then((value){}).onError((error, stackTrace){
      // print(error);
    });
    return await Geolocator.getCurrentPosition();
  }

  Future<void> getLocation() async {
    getUserLocation().then((value) async {
      LatLng currentPosition = LatLng(value.latitude, value.longitude);
      _current = LatLng(value.latitude, value.longitude);
      _setMarker(currentPosition);
      CameraPosition cameraPosition = CameraPosition(
        target: currentPosition,
        zoom: 18,
      );
      
      final GoogleMapController controller = await _controller.future;
      await controller.animateCamera(CameraUpdate.newCameraPosition(cameraPosition));
    });  
  }
  
  Future<void> _gotoDestination(LatLng location) async {
    final GoogleMapController controller = await _controller.future;
    controller.animateCamera(CameraUpdate.newCameraPosition(
      CameraPosition(
        target: location,
        zoom: 15,
      )
    ));
    _setMarker(location);
  }

  Future<void> _gotoPlace(
    double lat, double lng,
    Map<String, dynamic> boundsNe,
    Map<String, dynamic> boundsSw,
    ) async {
    final GoogleMapController controller = await _controller.future;
    controller.animateCamera(CameraUpdate.newCameraPosition(
      CameraPosition(
        target: LatLng(lat, lng),
        zoom: 15,
      )
    ));

    controller.animateCamera(CameraUpdate.newLatLngBounds(
      LatLngBounds(
        southwest: LatLng(boundsSw['lat'], boundsSw['lng']), 
        northeast: LatLng(boundsNe['lat'], boundsNe['lng'])
      ),
      25
      ),
    );
    _setMarker(LatLng(lat, lng));
  }

  Future<void> _updateDistance(LatLng value) async { 
    // print('Distance API call');
    if(firstCall == true){
      // LocationService().getDistance(value, 1);
      setState(() {
        lastLocation = value;
        firstCall = false;
      });
    }
    nextLocation = value;
    print('$lastLocation, $nextLocation');
    distance = Geolocator.distanceBetween(lastLocation.latitude, lastLocation.longitude, nextLocation.latitude, nextLocation.longitude);
    // await LocationService().getDistance(value, 0);
    // print('Distance: $distance');
    setState((){
      lastLocation = nextLocation;
      _drivingDistance = _drivingDistance - distance.ceil() - 1;
      // _drivingTime = _drivingTime - (distance ~/_drivingSpeed);
      _drivingTime = _drivingDistance ~/ _drivingSpeed;
    });

    Fluttertoast.showToast(msg: 'Distance: $distance, $_drivingDistance', webShowClose: false);

    if(_drivingMode == true && _drivingDistance <= 0){
      _drivingMode = false;
      _drivingDistance = 0;
      _drivingTime = 0;
      // ignore: use_build_context_synchronously
      showDialog(
      context: context, 
      barrierDismissible: true,
      builder: (context){
        return const AlertDialog(
          title: Column(
            children: [
              Text("You have completed the trip", style: TextStyle(fontSize: 20, color: Colors.green),),
            ],
          ),
        );
      }
    );
    } 
  }

  Future<int> _speedPredict() async {
    // print('Speed API call');
    double s = await LocationService().getSpeed(speeds[0], speeds[1], speeds[2], speeds[3]).catchError((error){
      print('$error');
      return 1.0;
    });
    _drivingSpeed = s.ceil();
    // Fluttertoast.showToast(msg: '🚗: $_currentSpeed m/s, 🔍: $_drivingSpeed m/s', webShowClose: false);
    return _drivingSpeed;
  }

  Future<void> _deleteAllDocumentsInCollection() async {
    QuerySnapshot querySnapshot = await data.get();
    for (QueryDocumentSnapshot doc in querySnapshot.docs) {
      await doc.reference.delete();
    }
  }
}