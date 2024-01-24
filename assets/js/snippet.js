export function getChosenSnippet(htmlOfClickedCard, snippets) {
  if (htmlOfClickedCard.includes("rainy")) {
    return snippets.rainy;
  } else if (htmlOfClickedCard.includes("sunny")) {
    return snippets.sunny;
  } else if (htmlOfClickedCard.includes("cloudy")) {
    return snippets.cloudy;
  } else if (htmlOfClickedCard.includes("stormy")) {
    return snippets.stormy;
  } else if (htmlOfClickedCard.includes("snowy")) {
    return snippets.snowy;
  } else {
    return snippets.random[Math.floor(Math.random() * snippets.random.length)];
  }
}
