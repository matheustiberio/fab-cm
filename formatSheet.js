function applyConditionalFormating() {
  const activeSheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const helperSheet = getHelperSheet();
  const activeSheetValues = activeSheet.getDataRange().getValues();

  const helperSheetValues = helperSheet.getDataRange().getValues();

  const formatMap = {};

  // Iterates through active sheet and create a map for each card with its quantity added
  for (let i = 1; i < activeSheetValues.length; i++) {
    const cardName = activeSheetValues[i][0];
    const quantity = activeSheetValues[i][1];

    if (formatMap[cardName]) {
      formatMap[cardName].quantity += quantity;
      formatMap[cardName].rows.push(i + 1);
    } else {
      formatMap[cardName] = { quantity: quantity, rows: [i + 1] };
    }
  }

  function checkAttributes(cardName) {
    for (let i = 1; i < helperSheetValues.length; i++) {
      if (helperSheetValues[i][0] === cardName) {
        return {
          isLegendary: helperSheetValues[i][1],
          is1hWeapon: helperSheetValues[i][2],
          is2hWeapon: helperSheetValues[i][3],
          isEquip: helperSheetValues[i][4],
          isHero: helperSheetValues[i][5],
        };
      }
    }
    return {};
  }

  // Iterates through active sheet and apply the color for each case
  for (let i = 1; i < activeSheetValues.length; i++) {
    const name = activeSheetValues[i][0];
    let backgroundColor = null;
    const attributes = checkAttributes(name);

    if (formatMap[name]) {
      let actualCard = formatMap[name];
      if (
        (attributes.isLegendary && actualCard.quantity >= 1) ||
        (attributes.is1hWeapon && actualCard.quantity >= 2) ||
        (attributes.is2hWeapon && actualCard.quantity >= 1) ||
        (attributes.isEquip && actualCard.quantity >= 1) ||
        (attributes.isHero && actualCard.quantity >= 1) ||
        actualCard.quantity >= 3
      ) {
        backgroundColor = constants.playsetCompletedColor;
      } else if (actualCard.quantity === 0) {
        backgroundColor = constants.wantCardsColor;
      }
    }

    activeSheet
      .getRange(i + 1, 1, 1, activeSheetValues[0].length)
      .setBackground(backgroundColor);
  }
}
