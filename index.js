//Fetching apis through getInfo function
let rarr;
function search() {
  let input = document.querySelector(".search > input");
  getInfo(input.value);
}

async function getInfo(username) {
  let responseProfile = await fetch(`https://api.github.com/users/${username}`);
  let responseRepo = await fetch(
    `https://api.github.com/users/${username}/repos`
  );

  let dataP = await responseProfile.json();
  let dataR = await responseRepo.json();

  EditProfile(dataP);
  rarr = dataR;
  displayPagination();
  console.log(dataR);
}

//This function will update the profile
function EditProfile(Pdata) {
  const firstDiv = document.querySelector("div > img");
  const firstParagraph = document.querySelector("div > p");

  // Select the second <div> and its child elements
  const githubProfileDiv = document.querySelector(".github-profile");
  const title = githubProfileDiv.querySelector("h1");
  const subtitle = githubProfileDiv.querySelector("h2");
  const team = githubProfileDiv.querySelector("p:nth-child(3)");
  const twitter = githubProfileDiv.querySelector("p:nth-child(4)");

  //Updating profile data according to username
  firstDiv.setAttribute("src", Pdata.avatar_url);
  firstParagraph.textContent = Pdata.login;
  title.textContent = Pdata.name;
  subtitle.textContent = Pdata.bio;
}

//Pagination
function displayPagination() {
  const totalPages = Math.ceil(rarr.length / cardsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerText = i;
    pageButton.addEventListener("click", () => {
      currentPage = i;
      repoCreate(currentPage);
    });
    document.querySelector(".pagination").appendChild(pageButton);
  }
}
const cardsPerPage = 6;
let currentPage = 1;

//This function will create  repo cards inside the main container
//RepoCreate will be executed for each page seperatly
function repoCreate(page) {
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const currentCards = rarr.slice(startIndex, endIndex);

  //Emptying the main container , for inserting new page's repo cards
  document.querySelector(".main").innerHTML = "";

  currentCards.forEach((cardData) => {
    var cardContainer = document.createElement("div");
    cardContainer.className = "card";
    cardContainer.style.width = "25rem";

    // Create the card body div with class "card-body"
    var cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Create the h5 element with class "card-title" and set its text content
    var cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = cardData.name;

    // Create the p element with class "card-text" and set its text content
    var cardText = document.createElement("p");
    cardText.className = "card-text";

    if (cardData.description === null) {
      cardText.textContent = "No description is available ";
    } else {
      cardText.textContent = cardData.description;
    }

    // Create the button element with class "button-56" and role "button"
    var button = document.createElement("button");
    button.className = "button-56";
    button.setAttribute("role", "button");
    button.textContent = cardData.language;

    // Append the elements to build the structure
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(button);

    cardContainer.appendChild(cardBody);

    // Append the cardContainer to the main of the document
    document.querySelector(".main").appendChild(cardContainer);
  });
}
