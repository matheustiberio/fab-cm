function getHelperSheet() {
  let helperSheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName(constants.helperSheetName);

  if (!helperSheet)
    return SpreadsheetApp.getActiveSpreadsheet().insertSheet(constants.helperSheetName);

  return helperSheet;
}

function getAndResetHelperSheet() {
  let helperSheet = getHelperSheet();

  helperSheet.clear();
  return helperSheet;
}

function getAllSheets() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  return spreadsheet.getSheets();
}
