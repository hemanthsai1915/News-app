let api_key = "8de7c1f33483425e8361f9304f463ea9"; //this is 1st reuse api key first one expired// using proxy api using node and render for github deploy
// let url = `https://news-app-proxy.onrender.com/news`;
let url=`https://news-app-proxy-8rla.onrender.com/news`
// let url = `https://newsapi.org/v2/everything`;

let search_btn = document.getElementById("search-btn");
let container = document.getElementById("news-container");

let fetchData = async (search) => {
  try {
    let response = await fetch(
      // `${url}?q=${search}&sortBy=popularity&apikey=${api_key}`
      `${url}?q=${search}&sortBy=popularity`
    );
    let jsonData = await response.json();
    let articles = jsonData.articles;
    container.innerHTML = ""; // Clear old results
    if (!articles || articles.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 30px;">
          <p style="font-size: 16px; color: #ef4444;">
            😕 No articles found for "<strong>${search}</strong>". Try another topic.
          </p>
        </div>
      `;
      return;
    }
    //
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
    // container.innerHTML = "<p style='color:red;'>Error fetching news.</p>";
    container.innerHTML = `
      <div style="text-align: center; padding: 30px;">
        <h1 style="font-size: 16px; font-weight:bold;color: #ef4444;">
          🚫 Error fetching news. Please check your internet or try again.
        </h1>
      </div>
    `;
  }
};

function showLoading() {
  container.innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <div class="loader"></div>
      <p>Fetching news...</p>
    </div>
  `;
}

search_btn.addEventListener("click", () => {
  const value = input.value.trim();

  if (value.length > 1) {
    showLoading();
    fetchData(value);
  }
  //   else if(fetchData.articles.length===0){
  // container.innerHTML = "<h3 style='text-align:center;'>🔍 No Data Found.</h3>";
  //   }
  else {
    container.innerHTML =
      "<p style='text-align:center;'>🔍 Type to search news or explore trending topics.</p>";
    // container.innerHTML = "<h3 style='text-align:center;'>🔍 No Data Found.</h3>";
    // Optionally reload default
    fetchData("India");
  }
});

async function fetchTrendingIndia() {
  try {
    let pop = "popularity";
    let q = "India";
    const response = await fetch(
      // `${url}?q=${q}&sortBy=${pop}&apikey=${api_key}`
      `${url}?q=${q}&sortBy=${pop}`
    );
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

// document.addEventListener("DOMContentLoaded", () => {
//   const themeSelector = document.getElementById("themeSelector");

//   themeSelector.addEventListener("change", () => {
//     document.body.classList.remove("dark-mode", "sunny-mode", "forest-mode");

//     const selected = themeSelector.value;
//     if (selected !== "blue") {
//       document.body.classList.add(`${selected}-mode`);
//     }
//   });

//   themeSelector.value = "blue"; // Default theme
// });

document.addEventListener("DOMContentLoaded", () => {
  // Find all theme dots
  const dots = document.querySelectorAll(".dot");

  // Set blue theme as default
  document.querySelector('[data-theme="blue"]')?.classList.add("active-dot");

  // When a dot is clicked
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const theme = dot.getAttribute("data-theme");

      // Remove previous theme classes
      document.body.classList.remove("dark-mode", "sunny-mode", "forest-mode");

      // If not blue, add the theme class
      if (theme !== "blue") {
        document.body.classList.add(`${theme}-mode`);
      }

      // Update active dot styling
      dots.forEach((d) => d.classList.remove("active-dot"));
      dot.classList.add("active-dot");
    });
  });
});
// supress google translate pop up

window.addEventListener("DOMContentLoaded", () => {
  showLoading();
  fetchData("India"); // or use a neutral keyword like "top", "news", or "latest"
});
