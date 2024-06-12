import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

class UserCard extends StatelessWidget {
  const UserCard({
    super.key, required this.name, required this.profession,
  });

  final String name, profession;

  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: const CircleAvatar(
        backgroundColor: Colors.amber,
        child: Icon(
          CupertinoIcons.person,
          color: Colors.white,
        ),
      ),
      title: Text(
        name,
        style: const TextStyle(color: Colors.white),
      ),
      subtitle: Text(
        profession, 
        style: const TextStyle(color: Colors.white),  
      ),
    );
  }
}