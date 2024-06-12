import 'package:flutter/material.dart';
import 'package:tracking_app/component/sign_in_dialog.dart';

class WelcomeScreen extends StatefulWidget {
  const WelcomeScreen({super.key});
  
  @override
  State<WelcomeScreen> createState() => _WelcomeScreenState();
}

class _WelcomeScreenState extends State<WelcomeScreen> {

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          AnimatedPositioned(
            height: MediaQuery.of(context).size.height,
            width: MediaQuery.of(context).size.width,
            duration: const Duration(milliseconds: 260),
            child: SafeArea(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 32),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Spacer(),
                    const SizedBox(
                      child: Column(
                        children: [
                          Center(
                            child: Text(
                              "LOCA",
                              style: TextStyle(
                                fontSize: 60,
                                fontWeight: FontWeight.w700,
                                fontFamily: "Poppins",
                                height: 1.2,
                              ),
                            ),
                          ),
                          SizedBox(height: 16),
                          Text(
                            "Truy xuất thông tin định vị tức thời",
                            style: TextStyle(
                              fontSize: 20,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const Spacer(),
                    Center(
                      child: TextButton(
                        style: ButtonStyle(
                          minimumSize: MaterialStateProperty.all<Size>(const Size(330, 70)),
                          backgroundColor: MaterialStateProperty.all(Colors.grey)
                        ) ,
                        child: const Text(
                          "Let's get started",
                          style: TextStyle(
                            fontSize: 30,
                            fontWeight: FontWeight.w600,
                            fontFamily: "Poppins",
                            color: Colors.white,
                          ),
                        ),
                        onPressed: (){
                          signInDialog(context, onValue:(_){});
                        },
                      ),
                    ),
                    const Padding(
                      padding: EdgeInsets.symmetric(vertical: 24),
                      child: Text("Nắm bắt thông tin của phương tiện ngay lập tức, bạn luôn luôn có thể truy xuất dữ liệu định vị, vận tốc, tình trạng xe theo thời gian thực."),
                    )
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}