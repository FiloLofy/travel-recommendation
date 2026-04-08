let travelData = null;

fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => {
    travelData = data;
    console.log('Data loaded:', data);
  })
  .catch(error => console.error('Error:', error));

function search() {
  if (!travelData) {
    alert('Data not loaded yet, please wait and try again.');
    return;
  }
  const input = document.getElementById('searchInput').value.toLowerCase().trim();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';
  if (!input) return;

  let results = [];

  if (input.includes('beach') || input.includes('beaches')) {
    results = travelData.beaches.map(item => ({
      name: item.name,
      description: item.description,
      image: getImage(item.name)
    }));
  } else if (input.includes('temple') || input.includes('temples')) {
    results = travelData.temples.map(item => ({
      name: item.name,
      description: item.description,
      image: getImage(item.name)
    }));
  } else {
    travelData.countries.forEach(country => {
      if (country.name.toLowerCase().includes(input)) {
        country.cities.forEach(city => {
          results.push({
            name: city.name,
            description: city.description,
            image: getImage(city.name)
          });
        });
      }
    });
  }

  if (results.length === 0) {
    resultsDiv.innerHTML = '<p style="padding:20px;text-align:center;">No results found. Try: beach, temple, Japan, Australia, Brazil</p>';
    return;
  }

  results.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="card-body">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
    `;
    resultsDiv.appendChild(card);
  });
}

function clearResults() {
  document.getElementById('searchInput').value = '';
  document.getElementById('results').innerHTML = '';
}

function getImage(name) {
  const images = {
    'Bora Bora, French Polynesia': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
    'Copacabana Beach, Brazil': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600',
    'Angkor Wat, Cambodia': 'https://images.unsplash.com/photo-1540638349517-3abd5afc5847?w=600',
    'Taj Mahal, India': 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600',
    'Sydney, Australia': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600',
    'Melbourne, Australia': 'https://images.unsplash.com/photo-1514395462725-fb4566210144?w=600',
    'Tokyo, Japan': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600',
    'Kyoto, Japan': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600',
    'Rio de Janeiro, Brazil': 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=600',
    'Sao Paulo, Brazil': 'https://images.unsplash.com/photo-1578002171197-b96d488dec13?w=600',
  };
  return images[name] || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600';
}