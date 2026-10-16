//global variable to storre our fetched data//
let travelData={}

//fetch the Jason file//
fetch('travel_recommendation_api.json')
    .then (response =>{
        console.log("Response status is:", response.status);
        console.log("Is response.ok?", response.ok);
        if (response.ok || response.status === 304){
            return response.json()
        } else {
            throw new Error('Network resposewas not ok');
        }
    })
    .then(data => {
        travelData = data;
        console.log("Data loaded successfully:", travelData);
    })
    .catch(error =>{
        console.error("Error fetching data:", error);
    });

// Grab the elements using your exact HTML IDs
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchBtn');
const resetButton = document.getElementById('resetBtn');
const resultsContainer = document.getElementById('searchresult');
const heroSection = document.querySelector('.home'); // Selects your home hero section to hide later

/// 1. Listen for the Search button click
searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    resultsContainer.innerHTML = '';
  
    if (searchTerm === '') {
      return; 
    }
  
    let results = [];
  
    if (searchTerm.includes('beach')) {
      results = travelData.beaches;
    } else if (searchTerm.includes('temple')) {
      results = travelData.temples;
    } else {
      travelData.countries.forEach(country => {
        if (country.name.toLowerCase().includes(searchTerm)) {
          results = results.concat(country.cities);
        } else {
          country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(searchTerm) || city.description.toLowerCase().includes(searchTerm)) {
              results.push(city);
            }
          });
        }
      });
    }
  
    console.log("Matching search results:", results);
  
    // Hide the hero text content instead of the whole section, keeping icons/background safe
    const homeText = document.querySelector('.home-text');
    if (homeText) {
      homeText.style.display = 'none';
    }
  
    // Render the cards onto the page (Task 8)
    displayTravelResults(results);
  });
  // Allow pressing Enter inside the input field to trigger search
searchInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      searchButton.click();
    }
  });
  
  // Function to build and display cards in a grid
  function displayTravelResults(items) {
    if (items.length === 0) {
      resultsContainer.innerHTML = `<p style="color: #e2f0d9; font-family: Georgia, serif; font-size: 18px; text-align: center;">No magical realms found matching your search. Try searching for "beach", "temple", or a country!</p>`;
      return;
    }
  
    items.forEach(item => {
      const card = document.createElement('div');
      card.classList.add('travel-card');
  
      card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}" class="card-img">
        <div class="card-content">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </div>
      `;
  
      resultsContainer.appendChild(card);
    });
  }
  
  // Clear button handler
  resetButton.addEventListener('click', () => {
    searchInput.value = '';
    resultsContainer.innerHTML = '';
    
    // Bring back the home text when clearing
    const homeText = document.querySelector('.home-text');
    if (homeText) {
      homeText.style.display = 'block';
    }
  });