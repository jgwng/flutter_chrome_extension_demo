// ignore_for_file: avoid_web_libraries_in_flutter

import 'dart:js_interop';

import 'raw_interop.dart' as interop;

abstract class JsInterop {

  static Future<String> saveDataTODB() async {
    return (await interop.saveDataTODB().toDart).toDart;
  }

  static Future<String> getDataTODB() async {
    return (await interop.getDataTODB().toDart).toDart;
  }

  static Future<String> updateDataTODB(int? id, bool isDone) async {
    return (await interop.updateDataTODB(id,isDone).toDart).toDart;
  }
  static Future<String> deleteData(int? id) async {
    return (await interop.deleteData(id).toDart).toDart;
  }


}
