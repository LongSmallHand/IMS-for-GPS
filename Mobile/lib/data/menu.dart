import 'package:flutter/cupertino.dart';

class Menu{
  final String title;
  final IconData icon;
  Menu({required this.title, required this.icon});
}

List<Menu> listMenu = [
  Menu(title: "Setting", icon: CupertinoIcons.settings),
  Menu(title: "Log Out", icon: CupertinoIcons.power),
];

class House extends Menu{
  final double lat;
  final double lng;
  House({required super.title, required super.icon, required this.lat, required this.lng});
}
List<House> listWareHouse = [
  House(lat: 10.783626032002998, lng: 106.63689683646476, title: "Kho A", icon: CupertinoIcons.house_alt),
  House(lat: 10.78124412428404, lng:106.6413922186945, title: "Kho B", icon: CupertinoIcons.house_alt),
];