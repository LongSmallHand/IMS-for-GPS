import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
class MenuButton extends StatelessWidget {
  const MenuButton({
    super.key, required this.press, required this.isMenuOpen,
  });

  final VoidCallback press;
  final bool isMenuOpen;
  

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: GestureDetector(
        onTap: press,
        child: Container(
          margin: isMenuOpen ? 
            const EdgeInsets.only(top: 100, left: 15) : const EdgeInsets.only(top: 20 ,left: 205),
          height: 30, width: 30,
          decoration: const BoxDecoration(
            color: Colors.transparent,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: Colors.black12,
                offset: Offset(0, 3),
                blurRadius: 8,
              ),
            ],
          ),
          child: Icon(
            isMenuOpen ? CupertinoIcons.line_horizontal_3 : CupertinoIcons.clear,
            color: isMenuOpen ? Colors.black : Colors.white,
          ),
        ),
      )
    );
  }
}