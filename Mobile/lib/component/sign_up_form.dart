import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:tracking_app/services/firebase_auth.dart';

class SignUpForm extends StatefulWidget {
  const SignUpForm({
    super.key,
  });
  @override
  State<SignUpForm> createState() => _SignUpFormState();
}

class _SignUpFormState extends State<SignUpForm> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _confirmPasswordController = TextEditingController();
  final FirebaseAuthService _auth = FirebaseAuthService();

  @override 
  void dispose(){
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 20),
              const Text("Email",style: TextStyle(color: Colors.black54)),
              Padding(
                padding: const EdgeInsets.only(top: 8, bottom: 16),
                child: TextFormField(
                  controller: _emailController,
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
                  keyboardType: TextInputType.emailAddress,
                  textInputAction: TextInputAction.next,
                ),
              ),
              const Text("Password", style: TextStyle(color: Colors.black54)),
              Padding(
                padding: const EdgeInsets.only(top: 8, bottom: 16),
                child: TextFormField(
                  controller: _passwordController,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(15),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(15),
                      borderSide: const BorderSide(color: Colors.blue)
                    )
                  ),
                  obscureText: true,
                  validator: (value) {
                    if (value!.isEmpty) {
                      return "";
                    }
                    return null;
                  },
                ),
              ),
              const Text("Confirm Password", style: TextStyle(color: Colors.black54)),
              Padding(
                padding: const EdgeInsets.only(top: 8, bottom: 16),
                child: TextFormField(
                  controller: _confirmPasswordController,
                  decoration: InputDecoration(
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(15),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(15),
                      borderSide: const BorderSide(color: Colors.blue)
                    )
                  ),
                  obscureText: true,
                  validator: (value) {
                    if (value!.isEmpty) {
                      return "";
                    }
                    return null;
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(top: 8, bottom: 24),
                child: ElevatedButton(
                  onPressed: () {
                    signUp();
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
                  child: const Text("Sign up", style: TextStyle(color: Colors.white, fontSize: 20),),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
  void signUp() async {
    String email = _emailController.text.trim();
    String password = _passwordController.text.trim();
    
    if(_passwordController.text.trim() == _confirmPasswordController.text.trim()){
      User? user = await _auth.signUpWithEmailAndPassword(email, password);
      if(user != null){
        signUpSuccess();
        // ignore: use_build_context_synchronously
        Navigator.pop(context, true);
      }
      else{
        invalidEmail();
      }
    }
    else{
      wrongConfirmPassword();
    }
  }

  void signUpSuccess(){
    showDialog(
      context: context, 
      barrierDismissible: false,
      builder: (context){
        return AlertDialog(
          title: const Text("Sign Up Successfully"),
          actions: <Widget>[
            TextButton(
              child: const Text("Let's start"),
              onPressed: () {
                Navigator.of(context).pop();
              }
            ),
          ],
        );
      }
    );
  }

  void invalidEmail(){
    showDialog(
      context: context, 
      barrierDismissible: true,
      builder: (context){
        return const AlertDialog(
          title: Column(
            children: [
              Text("Invalid email", style: TextStyle(fontSize: 16, color: Colors.red),),
              Text("Please try again", style: TextStyle(fontSize: 16, color: Colors.red),)
            ],
          )
        );
      }
    );
  }

  void wrongConfirmPassword(){
    showDialog(
      context: context,
      barrierDismissible: true,
      builder: (context){
        return const AlertDialog(
          title: Center(
            child: Row(
              children: [
                Icon(FontAwesomeIcons.triangleExclamation,color: Colors.red, size: 16,),
                SizedBox(width: 15),
                Text("Password must be the same", style: TextStyle(fontSize: 16, color: Colors.red),),
              ],
            ),
          )
        );
      }
    );
  }
}