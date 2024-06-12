import "package:firebase_auth/firebase_auth.dart";
import "package:flutter/material.dart";
import "package:tracking_app/ui/map_page.dart";
import "package:tracking_app/ui/welcome_screen.dart";

class MainPage extends StatelessWidget {
  const MainPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: StreamBuilder<User?>(
        stream: FirebaseAuth.instance.authStateChanges(), 
        builder: (context, snapshot){
          if(snapshot.hasData){
            return const MyMap();
            // return const Sidebar();
          }
          else {
            return const WelcomeScreen();
          }
        },
      ),
    );
  }
}