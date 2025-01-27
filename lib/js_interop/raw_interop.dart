@JS()
library flutter_medellin_extension;

import 'dart:js_interop';

@JS()
external JSPromise<JSString> saveDataTODB();

@JS()
external JSPromise<JSString> getDataTODB();

@JS()
external JSPromise<JSString> updateDataTODB(int? id, bool isDone);

@JS()
external JSPromise<JSString> deleteData(int? id);
