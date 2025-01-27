import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class ToDoWidget extends StatelessWidget {
  final String title;
  final bool isDone;
  final VoidCallback onDelete;
  final VoidCallback onDone;

  const ToDoWidget({
    Key? key,
    required this.title,
    required this.isDone,
    required this.onDelete,
    required this.onDone
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(maxWidth: 320),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: const Color(0xFFD1D9E0), width: 2),
      ),
      padding: const EdgeInsets.all(16),
      child:  Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Message Text
          Row(
            children: [
              Expanded(
                child: Container(
                  alignment: Alignment.center,
                  child: Text(
                    title,
                    style:  TextStyle(
                      color: Colors.grey,
                      fontSize: 16,
                        decoration: (isDone) ? TextDecoration.lineThrough : TextDecoration.none
                    ),
                  ),
                ),
              ),
              CupertinoSwitch(
                  value: isDone,
                  onChanged: (value){
                    onDone();
                  }),
              IconButton(
                onPressed: onDelete,
                icon: const Icon(Icons.close),
                color: Colors.grey,
                tooltip: "할 일 제거",
              )
            ],
          ),
        ],
      ),
    );
  }
}
