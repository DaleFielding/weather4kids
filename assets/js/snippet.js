/**
getChosenSnippet function:
1) the html of the clicked card and the snippets object are passed in as parameters
2) A series of if statements are executed to determine the weather type of the clicked card
3) If matched it will return the appropriate snippet
4) Else it will randomly select a snippet to be returned
**/
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
