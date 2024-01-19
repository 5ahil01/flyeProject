//Fetching apis through getInfo function

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
  compoCreate(dataR);
  console.log(typeof dataR);
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

//This function will create new components for repos
function compoCreate(darr) {
  for (let index = 0; index < darr.length; index++) {
    // Create the main container div with class "card" and inline style
    var cardContainer = document.createElement("div");
    cardContainer.className = "card";
    cardContainer.style.width = "25rem";

    // Create the card body div with class "card-body"
    var cardBody = document.createElement("div");
    cardBody.className = "card-body";

    // Create the h5 element with class "card-title" and set its text content
    var cardTitle = document.createElement("h5");
    cardTitle.className = "card-title";
    cardTitle.textContent = darr[index].name;

    // Create the p element with class "card-text" and set its text content
    var cardText = document.createElement("p");
    cardText.className = "card-text";

    if (darr[index].description === null) {
      cardText.textContent = "No description is available ";
    } else {
      cardText.textContent = darr[index].description;
    }

    // Create the button element with class "button-56" and role "button"
    var button = document.createElement("button");
    button.className = "button-56";
    button.setAttribute("role", "button");
    button.textContent = darr[index].language;

    // Append the elements to build the structure
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(button);

    cardContainer.appendChild(cardBody);

    var main = document.querySelector(".main");
    // Append the main container to the body of the document
    main.appendChild(cardContainer);
  }
}
