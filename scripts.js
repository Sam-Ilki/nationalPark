'use strict';

const apiKey = '4jVqyQGhdo2gOWSCZbeLteM9qbOrYxT306mXkPmn';
const searchURL = 'http://api.nps.gov/api/v1/parks';

function formatQueryParams(params){
    const queryItem = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItem.join('&');
};

function displayResults(responseJson){
    console.log(responseJson);
    $('#results-list').empty();
    for(let i=0; i<responseJson.data.length; i++){

    
    $('#results-list').append(
    `<li>
    <h3 class='result-name'>${responseJson.data[i].fullName}</h3>
    <p class='result-description'>${responseJson.data[i].description}</p>
    <a href=${responseJson.data[i].url} class='website-URL'>${responseJson.data[i].url}</a>
    <p>Address: ${responseJson.data[i].addresses[0].line1}, ${responseJson.data[i].addresses[0].city}
    ${responseJson.data[i].addresses[0].stateCode} ${responseJson.data[i].addresses[0].postalCode}</p>
    </li>`)}; 
    

$('#results').removeClass('hidden');
}

function getNationalParks(query, maxResults=10){
    const params ={
        stateCode: query,
        limit: maxResults-1,
        fields: "addresses"
    
    };
    // console.log('I am also doing things');
    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryString;
    console.log(queryString);
    console.log(url);

    const options = {
        header: new Headers({
            'X-Api-Key': apiKey}),
    };

    fetch(url, options)
        .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error(response.status);
        })
         .then(responseJson => displayResults(responseJson))   
         .catch(err => {
             $('#js-error-message').text(`Something went wrong: ${err.message}`);
         });
}


function watchForm(event){
$('form').submit(event => {
    event.preventDefault();
    // console.log('I am working');
    const searchTerm = $('#js-state-search').val().toString();
    const maxResults = $('#js-max-results').val();
    getNationalParks(searchTerm, maxResults);
});
}

$(watchForm);