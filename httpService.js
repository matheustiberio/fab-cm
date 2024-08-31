function getCardsFromJson() {
  return getFromJson(constants.cardsUrl);
}

function getSetsFromJson() {
  return getFromJson(constants.setsAndEditionsUrl);
}

function getFromJson(url) {
  const response = UrlFetchApp.fetch(url);

  return JSON.parse(response.getContentText());
}
