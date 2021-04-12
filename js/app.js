const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url){
  return fetch(url)
          .then(res => checkStatus(res))
          .then(res => res.json())
          .catch(error => console.error('Look like there was a problem!', error));
}


Promise.all([
  fetchData('https://dog.ceo/api/breeds/list'),
  fetchData('https://dog.ceo/api/breeds/image/random')
])
  .then(data => {
    generateOptions(data[0].message);
    generateImage(data[1].message);
  });


// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response){
  if(response.ok){
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}


function generateImage(data){
  const html = `
    <img src='${data}' alt>
    <p>Click to view images of ${select.value}s</p>
  `;
  card.innerHTML = html;
}

function generateOptions(data){
  const options = data.map(option => `<option value=${option}>${option}</option>`).join('');
  select.innerHTML = options;
  
};


function generateBreed(){
  const breed = select.value;
  const img = document.querySelector('.card img');
  const p = document.querySelector('.card p');

  fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(data => {
      img.src = data.message;
      img.alt = breed;
      p.textContent = `Click to view images of ${breed}s`;
    });
}


// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', generateBreed);
card.addEventListener('click', generateBreed);


// ------------------------------------------
//  POST DATA
// ------------------------------------------


