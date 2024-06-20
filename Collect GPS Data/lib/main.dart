import 'dart:async';
import 'dart:developer';

import 'package:flutter/material.dart';
import 'package:get/get_navigation/get_navigation.dart';

import 'package:location/location.dart' as l;
import 'package:permission_handler/permission_handler.dart';

import 'package:csv/csv.dart';
import 'dart:io';
import 'package:external_path/external_path.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const GetMaterialApp(
      themeMode: ThemeMode.system,
      debugShowCheckedModeBanner: false,
      home: HomeScreen(),
    );
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool gpsEnabled = false;
  bool permissionGranted = false;
  l.Location location = l.Location();
  late StreamSubscription subscription;
  bool trackingEnabled = false;
  List<l.LocationData> locations = [];
  List<dynamic> associateList = [];
  void _csvGenerate() async {
    // ignore: unused_local_variable
    Map<Permission, PermissionStatus> statuses = await [
      Permission.storage,
    ].request();
    
    List<List<dynamic>> rows = [];

    List<dynamic> row = [];
    row.add("Time");
    row.add("Latitude");
    row.add("Longitude");
    row.add("Altitude");
    row.add("Speed");
    rows.add(row);

    for (int i = 0; i < associateList.length; i++) {
      List<dynamic> row = [];
      row.add(associateList[i]["time"]);
      row.add(associateList[i]["lat"]);
      row.add(associateList[i]["lng"]);
      row.add(associateList[i]["alt"]);
      row.add(associateList[i]["spd"]);
      rows.add(row);
    }

    print(rows);

    String csv = const ListToCsvConverter().convert(rows);
    String dir = await ExternalPath.getExternalStoragePublicDirectory(
      ExternalPath.DIRECTORY_DOWNLOADS);
    // ignore: unnecessary_string_interpolations
    String file = "$dir";
    // ignore: prefer_interpolation_to_compose_strings
    File f = File(file + "/Location.csv");
    print(f);
    f.writeAsString(csv);
  }
  
  @override
  void initState() {
    super.initState();
    checkStatus();
  }

  @override
  void dispose() {
    stopTracking();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Collect Location Data'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 12),
        child: Column(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            buildListTile(
              "GPS",
              gpsEnabled
                  ? const Text("On", style: TextStyle(fontSize: 12))
                  : ElevatedButton(
                      onPressed: () {
                        requestEnableGps();
                      },
                      child: const Text("Off")),
            ),
            buildListTile(
              "Permission",
              permissionGranted
                  ? const Text("Allow", style: TextStyle(fontSize: 12))
                  : ElevatedButton(
                      onPressed: () {
                        requestLocationPermission();
                      },
                      child: const Text("Request")),
            ),
            buildListTile(
              "Location",
              trackingEnabled
                  ? ElevatedButton(
                      onPressed: () {
                        stopTracking();
                      },
                      child: const Text("Stop"))
                  : ElevatedButton(
                      onPressed: gpsEnabled && permissionGranted
                          ? () {
                              startTracking();
                            }
                          : null,
                      child: const Text("Start")),
            ),
            Expanded(
                child: ListView.builder(
              itemCount: locations.length,
              itemBuilder: (context, index) {
                return ListTile(
                  title: Text(
                    "Lat: ${locations[index].latitude} Long: ${locations[index].longitude}"),
                );
              },
            )),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _csvGenerate,
        tooltip: 'Generate file .csv',
        child: Icon(Icons.add),
        ),
    );
  }

  ListTile buildListTile(
    String title,
    Widget? trailing,
  ) {
    return ListTile(
      dense: true,
      title: Text(title),
      trailing: trailing,
    );
  }

  void requestEnableGps() async {
    if (gpsEnabled) {
      log("GPS is Enabled");
    } else {
      bool isGpsActive = await location.requestService();
      if (!isGpsActive) {
        setState(() {
          gpsEnabled = false;
        });
        log("User did not turn on GPS");
      } else {
        log("Gave permission to the user and opened it");
        setState(() {
          gpsEnabled = true;
        });
      }
    }
  }

  void requestLocationPermission() async {
    PermissionStatus permissionStatus =
        await Permission.locationWhenInUse.request();
    if (permissionStatus == PermissionStatus.granted) {
      setState(() {
        permissionGranted = true;
      });
    } else {
      setState(() {
        permissionGranted = false;
      });
    }
  }

  Future<bool> isPermissionGranted() async {
    return await Permission.locationWhenInUse.isGranted;
  }

  Future<bool> isGpsEnabled() async {
    return await Permission.location.serviceStatus.isEnabled;
  }

  checkStatus() async {
    bool ispermissionGranted = await isPermissionGranted();
    bool isgpsEnabled = await isGpsEnabled();
    setState(() {
      permissionGranted = ispermissionGranted;
      gpsEnabled = isgpsEnabled;
    });
  }

  addLocation(l.LocationData data) {
    setState(() {
      locations.insert(0, data);
      associateList.add({"time":  DateTime.fromMillisecondsSinceEpoch(data.time!.toInt()), "lat": data.latitude, "lng": data.longitude, "alt": data.altitude, "spd": data.speed});
    });
  }

  clearLocation() {
    setState(() {
      locations.clear();
    });
  }

  void startTracking() async {
    if (!(await isGpsEnabled())) {
      return;
    }
    if (!(await isPermissionGranted())) {
      return;
    }
    subscription = location.onLocationChanged.listen((event) {
      addLocation(event);
    });
    setState(() {
      trackingEnabled = true;
    });
  }

  void stopTracking() {
    subscription.cancel();
    setState(() {
      trackingEnabled = false;
    });
    clearLocation();
  }
}