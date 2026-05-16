const searchInput = document.querySelector("#site-search");
const resultCount = document.querySelector("#result-count");
const cards = Array.from(document.querySelectorAll(".site-card"));

function normalize(value) {
  return value.trim().toLowerCase();
}

function updateResults() {
  const query = normalize(searchInput.value);
  let visibleCount = 0;

  cards.forEach((card) => {
    const searchableText = normalize(`${card.textContent} ${card.dataset.keywords ?? ""}`);
    const isVisible = searchableText.includes(query);
    card.hidden = !isVisible;

    if (isVisible) {
      visibleCount += 1;
    }
  });

  resultCount.textContent = `المعروض: ${visibleCount} من ${cards.length}`;
}

searchInput.addEventListener("input", updateResults);
updateResults();
