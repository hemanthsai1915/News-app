// let api_key = "886a51ca6e744102958383a81efc4e28"; // using proxy api using node and render for github deploy
let url = `https://news-app-proxy.onrender.com/news`;

let input = document.getElementById("inp");
let container = document.getElementById("news-container");

let fetchData = async (search) => {
  try {
    let response = await fetch(`${url}?q=${search}&sortBy=popularity`);
    let jsonData = await response.json();
    let articles = jsonData.articles;

    container.innerHTML = ""; // Clear old results

    if (!articles.length) {
      container.innerHTML = "<p style='color:red;'>No articles found.</p>";
      return;
    }

    articles.forEach((article) => {
      const card = document.createElement("div");

      // card.style.border = "1px solid #ccc";
      // card.style.borderRadius = "10px";
      // card.style.padding = "10px";
      // card.style.width = "300px";
      // card.style.boxShadow = "2px 2px 8px rgba(0,0,0,0.1)";
      // card.style.backgroundColor = "#E8FFD7";
      //   card.style.fontFamily = "Arial";
      // card.style.border = "2px solid black";
      card.classList.add("card"); //using this we can give the styles in the css itself for card class

      let cardHTML = "";

      if (article.urlToImage) {
        cardHTML += `<img src="${article.urlToImage}" alt="News Image" style="width: 100%; height: auto; border-radius: 5px;" />`;
      }

      if (article.title) {
        cardHTML += `<h3>${article.title}</h3>`;
      }

      cardHTML += `<a href="${article.url}" target="_blank">Read more</a>`;
      card.innerHTML = cardHTML;

      container.appendChild(card);
    });
  } catch (error) {
    console.log("Error:", error);
    container.innerHTML = "<p style='color:red;'>Error fetching news.</p>";
  }
};

input.addEventListener("input", () => {
  const value = input.value.trim();
  if (value.length > 1) {
    fetchData(value);
  }
});

async function fetchTrendingIndia() {
  try {
    const response = await fetch(`https://news-app-proxy.onrender.com/news`);
    const jsonData = await response.json();
    const articles = jsonData.articles;

    const stopWords = [
      "The",
      "And",
      "With",
      "From",
      "Into",
      "About",
      "After",
      "More",
      "That",
      "This",
      "Will",
      "They",
    ];
    const frequency = {};

    articles.forEach((article) => {
      const titleWords = article.title.split(" ");
      titleWords.forEach((word) => {
        const cleaned = word.replace(/[^a-zA-Z]/g, "");
        if (
          cleaned.length > 3 &&
          /^[A-Z]/.test(cleaned) &&
          !stopWords.includes(cleaned)
        ) {
          frequency[cleaned] = (frequency[cleaned] || 0) + 1;
        }
      });
    });

    // Sort keywords by frequency
    const sortedKeywords = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .map((entry) => entry[0])
      .slice(0, 8);

    const trendingList = document.getElementById("trending-list");
    trendingList.innerHTML = "";

    sortedKeywords.forEach((word) => {
      const btn = document.createElement("button");
      btn.textContent = word;
      btn.classList.add("trend-button");
      btn.onclick = () => fetchData(word);
      trendingList.appendChild(btn);
    });
  } catch (error) {
    console.error("Error fetching trending topics in India:", error);
  }
}

fetchTrendingIndia();

// async function fetchTrending() {
//   try {
//     let response = await fetch(`${url}?q=news&sortBy=popularity&apiKey=${api_key}`);
//     let jsonData = await response.json();
//     let articles = jsonData.articles;

//     let keywords = new Set();
//     articles.slice(0, 10).forEach(article => {
//       const titleWords = article.title.split(" ");
//       titleWords.forEach(word => {
//         if (word.length > 3 && word[0] === word[0].toUpperCase()) {
//           keywords.add(word.replace(/[^a-zA-Z]/g, ''));
//         }
//       });
//     });

//     const trendingList = document.getElementById("trending-list");
//     trendingList.innerHTML = "";
//     [...keywords].slice(0, 6).forEach(word => {
//       const btn = document.createElement("button");
//       btn.textContent = word;
//       btn.classList.add("trend-button");
//       btn.onclick = () => fetchData(word);
//       trendingList.appendChild(btn);
//     });
//   } catch (err) {
//     console.log("Trending error", err);
//   }
// }

// fetchTrending();

document.addEventListener("DOMContentLoaded", () => {
  const themeSelector = document.getElementById("themeSelector");

  themeSelector.addEventListener("change", () => {
    document.body.classList.remove("dark-mode", "sunny-mode", "forest-mode");

    const selected = themeSelector.value;
    if (selected !== "blue") {
      document.body.classList.add(`${selected}-mode`);
    }
  });

  themeSelector.value = "blue"; // Default theme
});
// supress google translate pop up
