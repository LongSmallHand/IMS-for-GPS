import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:tracking_app/data/menu.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class Sidebar extends StatefulWidget {
  const Sidebar({super.key});

  @override
  State<Sidebar> createState() => _SidebarState();
}

class _SidebarState extends State<Sidebar> {
  Menu selectedMenu = listMenu.first; 
  static int isActive = -1;
  
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  CollectionReference questions = FirebaseFirestore.instance.collection('questions');
  User? user = FirebaseAuth.instance.currentUser;
  @override 
  void dispose(){
    _nameController.dispose();
    _descriptionController.dispose();
    super.dispose();
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: 250,
        height: double.infinity,
        color: const Color(0xff12345a),
        child: SafeArea(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const ListTile(
                leading: CircleAvatar(
                  foregroundImage: NetworkImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgzsAPWyKS1sqz2wPcLVh5Tk093_kQcjHHpaBfKylMLA&s"),
                ),
                title: Text("Long", style: TextStyle(color: Colors.white)),
                subtitle: Text("long@gps.com", style: TextStyle(color: Colors.white)),
              ),
              Column(
                children: [
                  const Padding(
                    padding: EdgeInsets.only(left: 24),
                    child: Divider(
                      color: Colors.white24,
                      height: 1,
                    ),
                  ),
                  Stack( 
                    children:[
                    AnimatedPositioned(
                      duration: const Duration(milliseconds: 300),
                      height: 56,
                      width: isActive == 0 ? 250 : 0,
                      left: 0,
                      child: Container(
                        decoration: const BoxDecoration(
                          color: Color(0xFF6789FF),
                          borderRadius: BorderRadius.all(Radius.circular(10)),
                        ),
                      ),
                    ),
                    ListTile(
                      leading: const SizedBox(
                        height: 34,
                        width: 34,
                        child: Icon(FontAwesomeIcons.circleInfo, color: Colors.white)
                      ),
                      title: const Text("Support", style: TextStyle(color: Colors.white)),
                      onTap: (){
                        setState(() {
                          isActive = 0;
                          supportDialog(context);
                        });
                      },
                    ),
                  ]),
                ],
              ),
              Column(
                children: [
                  const Padding(
                    padding: EdgeInsets.only(left: 24),
                    child: Divider(
                      color: Colors.white24,
                      height: 1,
                    ),
                  ),
                  Stack( 
                    children:[
                    AnimatedPositioned(
                      duration: const Duration(milliseconds: 300),
                      height: 56,
                      width: isActive == 1 ? 250 : 0,
                      left: 0,
                      child: Container(
                        decoration: const BoxDecoration(
                          color: Color(0xFF6789FF),
                          borderRadius: BorderRadius.all(Radius.circular(10)),
                        ),
                      ),
                    ),
                    ListTile(
                      leading: const SizedBox(
                        height: 34,
                        width: 34,
                        child: Icon(FontAwesomeIcons.rightFromBracket, color: Colors.white)
                      ),
                      title: const Text("Log out", style: TextStyle(color: Colors.white)),
                      onTap: (){
                        setState(() {
                          isActive = 1;
                          FirebaseAuth.instance.signOut();
                        });
                      },
                    ),
                  ]),
                ],
              ),
            ],  
          )
        ),
      ),
    );
  }

  Future<Object?> supportDialog(BuildContext context) {
    return showGeneralDialog(
      context: context, 
      barrierLabel: "Support",
      barrierDismissible: true,
      transitionDuration: const Duration(milliseconds: 400),
      transitionBuilder: (_, animation, __, child){
        Tween<Offset> tween = Tween(begin: const Offset(0, -1), end: Offset.zero); 
        return SlideTransition(
          position: tween.animate(
            CurvedAnimation(parent: animation, curve: Curves.easeInOut),
          ),
          child: child,
        );
      },
      pageBuilder: (_, __, ___) => Center(
        child: Container(
          height: 640,
          margin: const EdgeInsets.symmetric(horizontal: 16),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
          decoration: const BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.all(Radius.circular(40)),
          ),
          child: Scaffold(
            resizeToAvoidBottomInset: false,
            backgroundColor: Colors.transparent,
            body: Column(
              children: [
                const Center(
                  child: Text(
                    "Contact us",
                    style: TextStyle(
                      fontSize: 34,
                      fontWeight: FontWeight.w600,
                      fontFamily: "Poppins",
                      color: Colors.black,
                    ),
                  ),
                ),
                Form(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const SizedBox(height: 20),
                      const Text(
                        "Your name",
                        style: TextStyle(
                          color: Colors.black54,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 8, bottom: 16),
                        child: TextFormField(
                          controller: _nameController,
                          decoration: InputDecoration(
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(15),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(15),
                              borderSide: const BorderSide(color: Colors.blue)
                            )
                          ),
                          validator: (value) {
                            if (value!.isEmpty) {
                              return "";
                            }
                            return null;
                          },
                          keyboardType: TextInputType.text,
                          textInputAction: TextInputAction.next,
                        ),
                      ),
                      const Text(
                        "Description",
                        style: TextStyle(
                          color: Colors.black54,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 8, bottom: 16),
                        child: TextFormField(
                          controller: _descriptionController,
                          minLines: 5,
                          maxLines: null,
                          decoration: InputDecoration(
                            border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(15),
                            ),
                            focusedBorder: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(15),
                              borderSide: const BorderSide(color: Colors.blue)
                            )
                          ),
                          validator: (value) {
                            if (value!.isEmpty) {
                              return "";
                            }
                            return null;
                          },
                          keyboardType: TextInputType.multiline,
                          textInputAction: TextInputAction.next,
                        ),
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 8, bottom: 24),
                        child: ElevatedButton(
                          onPressed: () {
                            addQuestion(
                              _nameController.text, 
                              _descriptionController.text
                            );
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color.fromARGB(255, 0, 0, 0),
                            minimumSize: const Size(double.infinity, 60),
                            shape: const RoundedRectangleBorder(
                              borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(10),
                                topRight: Radius.circular(25),
                                bottomRight: Radius.circular(25),
                                bottomLeft: Radius.circular(25),
                              ),
                            ),
                          ),
                          child: const Text("Send", style: TextStyle(color: Colors.white, fontSize: 20),),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<void> addQuestion(String name, String question){
    return questions.add(
      {
        'email': user?.email,
        'name': name,
        'question': question,
        'uid': user?.uid,
      }
    )
    .then((value){
      Navigator.pop(context, true);
      _descriptionController.clear();
      showDialog(
      context: context, 
      barrierDismissible: true,
      builder: (context){
        return const AlertDialog(
          title: Center(
            child: Text("Your response has been sent", style: TextStyle(fontSize: 16, color: Colors.green),)
          ),
        );
      });
    })
    // ignore: invalid_return_type_for_catch_error, avoid_print
    .catchError((e) => print(e));
  }
}