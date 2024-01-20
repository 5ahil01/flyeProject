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
  console.log(dataP);
}

//This function will update the profile
function EditProfile(Pdata) {
  const imageProfile = document.querySelector("div > img");
  const GHlink = document.querySelector("div > a");

  // Select the second <div> and its child elements
  const githubProfileDiv = document.querySelector(".github-profile");
  const title = document.querySelector(".UserfullName");
  const gitHUBuserName = document.querySelector(".GHuserName");
  const bio = document.querySelector(".bio");
  const location = document.querySelector(".Location");
  const twitter = document.querySelector(".twitter");

  //Updating profile data according to username
  imageProfile.setAttribute("src", Pdata.avatar_url);
  GHlink.textContent = Pdata.html_url;
  GHlink.setAttribute("href", Pdata.html_url);
  title.textContent = Pdata.name;
  gitHUBuserName.textContent = Pdata.login;
  bio.textContent = Pdata.bio;

  if (Pdata.location == null) {
    location.textContent = "Location : not available";
  } else {
    location.textContent = "Location : " + Pdata.location;
  }
  if (Pdata.twitter == null) {
    twitter.textContent = "Twitter : not available";
  } else {
    twitter.textContent = "Twitter :" + Pdata.twitter;
  }
}

//Pagination
function displayPagination() {
  const totalPages = Math.ceil(rarr.length / cardsPerPage);
  let pageBtnArr = [];

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("button");
    pageBtnArr.push(pageButton);
    pageButton.innerText = i;
    pageButton.addEventListener("click", (e) => {
      pageBtnArr.forEach((p) => p.classList.remove("highlight"));
      currentPage = i;
      e.target.classList.add("highlight");
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
