const API_KEY = "b468a116b46341d19554fed9a25372a9";
const URL = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("World")); // This will fetch news on page load

async function fetchNews(query) {
  const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles); // This will bind data to the UI
}

function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemplate = document.getElementById("news-template-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const newsCard = newsCardTemplate.content.cloneNode(true); // This will clone the template card and store it in a variable called 'newsCard' which is of type HTMLDivElement.
    fillDataInCard(newsCard, article); // This will fill the data in the cloned card
    cardsContainer.appendChild(newsCard); // This will append the cloned card to the cardsContainer
  });
}

function fillDataInCard(newsCard, article)  {
    const newsImg = newsCard.querySelector(".card-img");
    const cardTitle = newsCard.querySelector(".card-title");
    const newsSrc = newsCard.querySelector(".news-src");
    const cardDesc = newsCard.querySelector(".news-desc");

    newsImg.src = article.urlToImage;
    cardTitle.innerHTML = article.title;
    cardDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Kolkata",});

    newsSrc.innerHTML = `${article.source.name} - ${date}`; // This will set the news source in the UI

    newsCard.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curSelectedNav?.classList.remove("active");
  curSelectedNav = navItem;
  curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");


searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

function reload(){
    window.location.reload();
}

