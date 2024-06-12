import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:tracking_app/component/sign_up_form.dart';
import 'sign_in_form.dart';

void signInDialog(BuildContext context, {required ValueChanged onValue}) {
  showGeneralDialog(
    context: context, 
    barrierLabel: "Sign In",
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
                  "Sign In",
                  style: TextStyle(
                    fontSize: 34,
                    fontWeight: FontWeight.w600,
                    fontFamily: "Poppins",
                    color: Colors.black,
                  ),
                ),
              ),
              const SignInForm(),
              const Row(
                children: [
                  Expanded(
                    child: Divider(),
                  ),
                  Padding(
                    padding: EdgeInsets.symmetric(horizontal: 16),
                    child: Text(
                      "OR",
                      style: TextStyle(
                        color: Colors.black26,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ),
                  Expanded(child: Divider()),
                ],
              ),
              const Padding(
                padding: EdgeInsets.symmetric(vertical: 24),
                child: Text(
                  "Sign up with Email or Google",
                  style: TextStyle(color: Colors.black54),
                ),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  IconButton(
                    onPressed: () {
                      Navigator.pop(context);
                      showGeneralDialog(
                        context: context, 
                        barrierLabel: "Sign Up",
                        barrierDismissible: true,
                        transitionDuration: const Duration(milliseconds: 400),
                        transitionBuilder: (_, animation, __, child){
                          Tween<Offset> tween = Tween(begin: const Offset(0, 1), end: Offset.zero); 
                          return SlideTransition(
                            position: tween.animate(
                              CurvedAnimation(parent: animation, curve: Curves.easeInOut),
                            ),
                            child: child,
                          );
                        },
                        pageBuilder: (context, animation, secondaryAnimation) => Center(
                          child: Container(
                            height: 640,
                            margin: const EdgeInsets.symmetric(horizontal: 16),
                            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
                            decoration: const BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.all(Radius.circular(40)),
                            ),
                            child: const Scaffold(
                              resizeToAvoidBottomInset: false,
                              backgroundColor: Colors.transparent,
                              body: Column(
                                children: [
                                  Center(
                                    child: Text(
                                      "Sign Up With Email",
                                      style: TextStyle(
                                        fontSize: 30,
                                        fontWeight: FontWeight.w600,
                                        fontFamily: "Poppins",
                                        color: Colors.black,
                                      ),
                                    ),
                                  ),
                                  SignUpForm(),
                                ],
                              ),
                            ),
                          ),
                        )
                      );
                    },
                    padding: EdgeInsets.zero,
                    icon: const Icon(FontAwesomeIcons.solidEnvelope, size: 50),
                  ),
                  IconButton(
                    onPressed: () {
                      showGeneralDialog(
                        context: context,
                        barrierLabel: "Sign Up",
                        barrierDismissible: true,
                        transitionDuration: const Duration(milliseconds: 400),
                        transitionBuilder: (_, animation, __, child){
                          Tween<Offset> tween = Tween(begin: const Offset(0, 1), end: Offset.zero);
                          return SlideTransition(
                            position: tween.animate(
                              CurvedAnimation(parent: animation, curve: Curves.easeInOut),
                            ),
                            child: child,
                          );
                        },
                        pageBuilder: (context, animation, secondaryAnimation) => Center(
                          child: Container(
                            height: 640,
                            margin: const EdgeInsets.symmetric(horizontal: 16),
                            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
                            decoration: const BoxDecoration(
                              color: Colors.white,
                              borderRadius: BorderRadius.all(Radius.circular(40)),
                            ),
                            child: const Scaffold(
                              resizeToAvoidBottomInset: false,
                              backgroundColor: Colors.transparent,
                              body: Column(
                                children: [
                                  Center(
                                    child: Text(
                                      "Sign Up With Google",
                                      style: TextStyle(
                                        fontSize: 30,
                                        fontWeight: FontWeight.w600,
                                        fontFamily: "Poppins",
                                        color: Colors.black,
                                      ),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ),
                        )
                      );
                    },
                    padding: EdgeInsets.zero,
                    icon: const Icon(FontAwesomeIcons.google, size: 50)
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    ),
  ).then(onValue);        
}