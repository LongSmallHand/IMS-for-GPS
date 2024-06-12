import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:tracking_app/services/firebase_auth.dart';

class SignInForm extends StatefulWidget {
  const SignInForm({Key? key}) : super(key:key);
  @override
  State<SignInForm> createState() => _SignInFormState();
}

class _SignInFormState extends State<SignInForm> {
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
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
              const Text(
                "Email",
                style: TextStyle(
                  color: Colors.black54,
                ),
              ),
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
              const Text(
                "Password",
                style: TextStyle(
                  color: Colors.black54,
                ),
              ),
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
              Padding(
                padding: const EdgeInsets.only(top: 8, bottom: 24),
                child: ElevatedButton(
                  onPressed: () {
                    signIn();
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
                  child: const Text("Sign in", style: TextStyle(color: Colors.white, fontSize: 20),),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  void signIn() async {
    String email = _emailController.text.trim();
    String password = _passwordController.text.trim();
    User? user = await _auth.signInWithEmailAndPassword(email, password);

    if(user != null){
      // ignore: use_build_context_synchronously
      Navigator.pop(context, true);
      signInSuccess(user.email!);
    }
    else{
      invalidEmailOrPassword();
    }
  }

  void signInSuccess(String useremail){
    showDialog(
      context: context, 
      barrierDismissible: true,
      builder: (context){
        return AlertDialog(
          title: Column(
            children: [
              const Text("Sign In Successfully", style: TextStyle(fontSize: 16, color: Colors.black),),
              Text("Welcome back $useremail", style: const TextStyle(fontSize: 16, color: Colors.green),),
            ],
          ),
        );
      }
    );
  }

  void invalidEmailOrPassword(){
    showDialog(
      context: context, 
      barrierDismissible: true,
      builder: (context){
        return const AlertDialog(
          title: Column(
            children: [
              Text("Invalid email or password", style: TextStyle(fontSize: 16, color: Colors.red),),
              Text("Please try again", style: TextStyle(fontSize: 16, color: Colors.red),)
            ],
          )
        );
      }
    );
  }
}