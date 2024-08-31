function buildDropdowns() {
  let helperSheet = getAndResetHelperSheet();

  getAllSheets().forEach((sheet) => {
    if (sheet.getName() === constants.helperSheetName) {
      return;
    }

    buildCardsNameDropdown(helperSheet, sheet);
    buildSetAndEditionsDropdown(helperSheet, sheet);
  });
}

function buildCardsNameDropdown(helperSheet, sheet) {
  const jsonCardData = getCardsFromJson();
  const cardData = getCardData(jsonCardData);

  const cardDataRange = helperSheet.getRange(2, 1, cardData.length, 5);
  const cardsDropdownRange = sheet.getRange("A2:A");

  // Setting card names in helper sheet
  cardDataRange.setValues(
    cardData.map((card) => [
      card.name,
      card.isLegendary,
      card.is1hWeapon,
      card.is2hWeapon,
      card.isEquip,
    ])
  );

  const cardsRule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(cardDataRange, true)
    .setAllowInvalid(false)
    .build();

  cardsDropdownRange.setDataValidation(cardsRule);
}

function buildSetAndEditionsDropdown(helperSheet, sheet) {
  const jsonSetData = getSetsFromJson();
  const setData = getSetData(jsonSetData);
  const setDataRange = helperSheet.getRange(2, 6, setData.length, 1);
  const setDropdownRange = sheet.getRange("C2:C");

  // Setting set names in helper sheet
  setDataRange.setValues(setData.map((set) => [set]));

  const setsRule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(setDataRange, true)
    .setAllowInvalid(false)
    .build();

  setDropdownRange.setDataValidation(setsRule);
}
