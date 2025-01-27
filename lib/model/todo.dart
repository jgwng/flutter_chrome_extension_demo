class ToDo {
  String title;
  bool isDone;
  String timestamp;
  int id;

  ToDo({
    required this.title,
    this.isDone = false,
    required this.timestamp,
    required this.id
  });

  // Factory constructor to create a Bookmark from JSON
  factory ToDo.fromJson(Map<String, dynamic> json) {
    return ToDo(
      timestamp: json['timestamp'] as String,
      isDone: json['isDone'] as bool,
      title: json['title'] as String,
      id: json['id']
    );
  }
}