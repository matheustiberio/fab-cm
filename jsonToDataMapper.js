function getCardData(jsonData) {
  const cardNames = Array.from(
    new Set(
      jsonData.map((card) => {
        return {
          name: getCardName(card),
          isLegendary: card.card_keywords.some(
            (keyword) => keyword === "Legendary"
          ),
          is1hWeapon:
            card.types.some((type) => type === "Weapon") &&
            card.types.some((type) => type === "1H"),
          is2hWeapon:
            card.types.some((type) => type === "Weapon") &&
            card.types.some((type) => type === "2H"),
          isEquip: card.types.some((type) => type === "Equipment"),
          isHero: card.types.some((type) => type === "Hero"),
          isToken: card.types.some((type) => type === "Token")
        };
      })
    )
  );
  return cardNames;
}

function getSetData(jsonData) {
  const sets = jsonData.flatMap((set) =>
    set.printings.map((printing) => {
      return getSetName(set, printing);
    })
  );

  return sets;
}

function getCardName(card) {
  return card.name + constants.pitchDictionary[card.pitch];
}

function getSetName(set, printing) {
  if (printing.edition === "N") return `${set.id}`;
  return `${set.id}-${printing.edition}`;
}
