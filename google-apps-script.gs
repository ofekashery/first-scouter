//                      Usage                      \\
//
//  1. In the toolbar, Run > setup
//
//  2. In the toolbar, Publish > Deploy as web app
//    - set security level and enable service (execute as 'me' and access 'anyone, even anonymously')
//
//  3. Copy the 'Current web app URL' to the environment files


var SHEET_NAME = "Sheet1";
var SCRIPT_PROP = PropertiesService.getScriptProperties();

function doOption(e) {
  return ContentService
    .createTextOutput(JSON.stringify({"result":"success"}))
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

function doPost(e) {
  try {
    var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
    var sheet = doc.getSheetByName(SHEET_NAME);
    var jsonString = e.postData.getDataAsString();
    var jsonData = JSON.parse(jsonString);

    var header = sheet.getRange(1, 1, 1, jsonData.header.length);
    header.setValues([jsonData.header]);
    header.setBackground("#f3f3f3");
    header.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    header.setFontWeight("bold");


    sheet.appendRow(jsonData.row);

    return ContentService
      .createTextOutput(JSON.stringify({"result":"success"}))
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  } catch(e) {
    return ContentService
      .createTextOutput(JSON.stringify({"result":"error", "error": e}))
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
}

function setup() {
  var doc = SpreadsheetApp.getActiveSpreadsheet();
  SCRIPT_PROP.setProperty("key", doc.getId());
}
