let listOfCharacters = [];
let page = 1;
fetchList();
renderPageNumber();
function fetchList() {
  fetch(`https://swapi.dev/api/people/?page=${page}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      listOfCharacters = data.results;
      renderList();
    });
}
document.querySelector(".pre").addEventListener("click", () => {
  page--;
  fetchList();
});
document.querySelector(".next").addEventListener("click", () => {
  page++;
  fetchList();
});

function renderList() {
  let listItems = "";
  for (let char of listOfCharacters) {
    listItems += `<li>${char.name}</li>`;
  }

  document.querySelector("ul").innerHTML = listItems;
  renderPageNumber();
}

function renderPageNumber() {
  document.querySelector(".page").innerText = page;
}