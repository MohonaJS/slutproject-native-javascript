console.clear();
/* Array.from(data).map( item => {
    let row = document.createElement('tr');
    let titleColumn = document.createElement('td');
    titleColumn.innerText = item.title;
    let titleBody = document.createElement('td');
    titleBody.innerText = item.body;
    row.appendChild(titleColumn);
    row.appendChild(titleBody);
    container.appendChild(row);
 
}) 

let container = document.querySelector('tbody');
*/

const makeRequest = (method, url, data) => {
    let xml = new XMLHttpRequest();
    xml.open(method,url);
   xml.onload = () => {
    let data = xml.response;
     console.log(JSON.parse(data));
      
     
   }

   xml.onerror = () => {
       console.log('we don\' get any data');
   }
    xml.send(JSON.stringify);
    
}

const getdata = () => {
     makeRequest('get', 'https://swapi.dev/api/people/?page=${page}');
  
}

const postdata = () => {
    makeRequest('post','https://swapi.dev/api/people/?page=${page}');
    method: 'POST',
    body: JSON.stringify({
        character,
    })
}


getdata();
