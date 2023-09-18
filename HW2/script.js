window.onload = function () {
  

artistList = ["queen", "eminem", "rancid"]

for(artist of artistList) {
  loadArtist(artist);
}
    
  
};

// Chiamata alla funzione per creare la card con i dati dell'artista

function search() {
  const searchField = document.getElementById("searchField").value;
  loadArtist(searchField);
}

function createArtistSection(name) {
  // Crea il div con classe "row"
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row");

  // Crea il div con classe "col-10"
  const col10Div = document.createElement("div");
  col10Div.classList.add("col-10");

  // Crea il div con classe "artistNameDescription"
  const artistNameDescriptionDiv = document.createElement("div");
  artistNameDescriptionDiv.classList.add("artistNameDescription");

  // Crea l'elemento h2 con il nome dell'artista
  const h2Element = document.createElement("h2");
  h2Element.textContent = name;

  // Crea il div con classe "row" per le card
  const cardRowDiv = document.createElement("div");
  cardRowDiv.classList.add("row");
  cardRowDiv.classList.add("row-cols-1");
  cardRowDiv.classList.add("row-cols-sm-2");
  cardRowDiv.classList.add("row-cols-lg-3");
  cardRowDiv.classList.add("row-cols-xl-4");
  cardRowDiv.classList.add("imgLinks");
  cardRowDiv.classList.add("py-3");
  cardRowDiv.classList.add("resultSection");
  cardRowDiv.id = `${name}`;
  

  // Collega gli elementi in una struttura gerarchica
  artistNameDescriptionDiv.appendChild(h2Element);
  artistNameDescriptionDiv.appendChild(cardRowDiv);
  col10Div.appendChild(artistNameDescriptionDiv);
  rowDiv.appendChild(col10Div);

  return rowDiv;
}

// Funzione per creare una nuova card con i dati forniti
function createCard(artist) {
  // Creazione degli elementi HTML per la card
  const cardDiv = document.createElement("div");
  cardDiv.classList.add("card");

  const cardImage = document.createElement("img");
  cardImage.classList.add("card-img-top");
  cardImage.setAttribute("src", artist.album.cover_medium);
  cardImage.setAttribute("alt", "Album Cover");

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const cardTitle = document.createElement("h4");
  cardTitle.classList.add("card-text");
  cardTitle.textContent = artist.title_short;

  const cardDescription = document.createElement("p");
  cardDescription.classList.add("card-text");
  cardDescription.textContent = artist.artist.name;

  // Aggiunta degli elementi alla card
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardDescription);

  cardDiv.appendChild(cardImage);
  cardDiv.appendChild(cardBody);

  return cardDiv;
}


function printloadArtist(artist) {

  const firstDisplay = document.querySelector("#first-display");
  const artistName = artist.data[0].artist.name;
  const artistDisplay = createArtistSection(artistName);
  firstDisplay.appendChild(artistDisplay);
  
  const resultSection = document.querySelector(`#${artistName}`);

  //Prendiamo i dati dalla API e creiamo un oggetto
  for (let i = 0; i < albumsToShow; i++) {
    const albumList = artist.data; // Oggetto contenente gli album
    const albumTitle = artist.data[i].title_short; //Variabile per short_title
    const albumDuration = artist.data[i].duration; //Variabile per durata
    const albumArtist = artist.data[i].artist.name; //Variabile per nome artista
    const albumImageMedium = artist.data[i].album.cover_medium; //Variabile per immagine

    const artistData = {
      album: {
        cover_medium: albumImageMedium,
      },
      title_short: albumTitle,
      artist: {
        name: albumArtist,
      },
    };

    // Creo la card e l'aggiungo
    resultSection.appendChild(createCard(artistData));
  }
}

let albumsToShow = 4;

function loadArtist(artist) {
  
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
    .then((response) => response.json())
    .then(printloadArtist)
    .catch((error) => {
      console.log(error.message);
    });
}


// Seleziona l'elemento da svuotare
const firstDisplay = document.querySelector("#first-display");

// Seleziona il bottone
const searchButton = document.querySelector("#button-search");

// Aggiungi un event listener al bottone

searchButton.addEventListener("click", function() {
    albumsToShow = 20;
    firstDisplay.innerHTML = ""; // Svuota il contenuto dell'elemento
    const searchValue = document.querySelector("#searchField").value;
    loadArtist(searchValue)
});

