import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_chrome_extension_demo/js_interop/js_interop.dart';
import 'package:flutter_chrome_extension_demo/model/todo.dart';
import 'package:flutter_chrome_extension_demo/ui/widget/card_widget.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Future<List<ToDo>> _future; // Declare a future variable for List<Bookmark>
  List<ToDo> todoList = [];
  @override
  void initState() {
    super.initState();
    _future = _getDB();
  }

  // Function to fetch data from the database
  Future<List<ToDo>> _getDB() async {
    String jsonString = await JsInterop.getDataTODB();

    if (jsonString.isEmpty) {
      return [];
    }

    Map<String, dynamic> jsonData = jsonDecode(jsonString);

    if (jsonData['data'] == null || jsonData['data'].isEmpty) {
      return [];
    }

    List<ToDo> todos = (jsonData['data'] as List).map((json) => ToDo.fromJson(json)).toList();

    return todos;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("오늘의 할 일")),
      body: Center(
        child: FutureBuilder<List<ToDo>>(
          future: _future, // Use the future variable
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const CircularProgressIndicator(); // Show loading indicator
            } else if (snapshot.hasError) {
              return Text("Error: ${snapshot.error}"); // Show error message
            } else if (snapshot.hasData) {
              final todos = snapshot.data!;
              todoList = todos;
              if (todos.isEmpty) {
                return const Text("오늘 할일이 없습니다!");
              }
              return ListView.separated(
                itemCount: todos.length,
                separatorBuilder: (ctx,i){
                  return const SizedBox(
                    height: 20,
                  );
                },
                itemBuilder: (context, index) {
                  final todo = todos[index];
                  return ToDoWidget(
                      title: '오늘 할 일: ${todo.id}번째',
                      isDone: todo.isDone,
                      onDelete: () => _deleteData(todo),
                      onDone: () => _updateData(todo),
                    );
                },
              );
            } else {
              return const Text("No data available."); // Fallback
            }
          },
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _saveDB,
        tooltip: '할 일 추가',
        child: const Icon(Icons.add),
      ),
    );
  }

  Future<void> _saveDB() async {
    String selectedText = await JsInterop.saveDataTODB();
    if(selectedText == 'success'){
      setState(() {
        _future = _getDB();
      });
    }
  }

  Future<void> _deleteData(ToDo todo) async {
    String selectedText = await JsInterop.deleteData(todo.id);
    if(selectedText == 'success'){
      setState(() {
        _future = _getDB();
      });
    }
  }

  Future<void> _updateData(ToDo todo) async {
    String selectedText = await JsInterop.updateDataTODB(todo.id,!todo.isDone);
    if(selectedText == 'success'){
      setState(() {
        int index = todoList.indexWhere((element) => element.id == todo.id);
        todoList[index].isDone = !todo.isDone;
      });
    }
  }

}
