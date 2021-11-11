class App {
    API_ENDPOINT = "https://swapi.dev/api/";
    PEOPLE_PER_PAGE = 10;

    PEOPLE;
    CURRENT_PERSON;
    CURRENT_PERSON_PLANET;
    PAGE;

    PEOPLE_EL;
    PREV_PAGE_EL;
    NEXT_PAGE_EL;
    CURRENT_PAGE_NUMBER_EL;
    PAGE_COUNT_EL;
    CURRENT_PERSON_EL;

    constructor() {
            this._bindElements();
            this._bindEvents();
            this._getPeople();
        }
        // Sparar elementen som variabler
    _bindElements() {
            this.PEOPLE_EL = document.querySelector('[data-people]');
            this.PREV_PAGE_EL = document.querySelector('[data-prev-page]')
            this.NEXT_PAGE_EL = document.querySelector('[data-next-page]')
            this.CURRENT_PAGE_NUMBER_EL = document.querySelector('[data-current-page-number]')
            this.PAGE_COUNT_EL = document.querySelector('[data-page-count-number]')
            this.CURRENT_PERSON_EL = document.querySelector('[data-current-person]')
        }
        // Kontroll delen ifrån MVC
    _bindEvents() {
            this.PREV_PAGE_EL.addEventListener('click', () => {
                if (!this.PEOPLE.previous) return;
                this._getPage(this.PEOPLE.previous);
            })

            this.NEXT_PAGE_EL.addEventListener('click', () => {
                if (!this.PEOPLE.next) return;
                this._getPage(this.PEOPLE.next);
            })
        }
        // Laddar in en sida asynkront 
    async _getPage(url) {
        this.PAGE = new URL(url).searchParams.get('page');
        this.PEOPLE_EL.classList.add('is-loading')
        const response = await fetch(url);
        this.PEOPLE_EL.classList.remove('is-loading')
        this._setPeople(await response.json());
    }

    async _getPeople() {
        this.PEOPLE_EL.classList.add('is-active')
        this.PEOPLE_EL.classList.add('is-loading')
        const response = await fetch(`${this.API_ENDPOINT}people`);
        this.PEOPLE_EL.classList.remove('is-loading')
        this._setPeople(await response.json());
    }

    _setPeople(people) {
        this.PEOPLE = people;
        this._updateHTML();
    }

    async _getPerson(person) {
        this.CURRENT_PERSON_EL.classList.add('is-loading')
        const response = await fetch(person.url);
        this.CURRENT_PERSON = await response.json();
        await this._getPlanet(person.homeworld);
        this.CURRENT_PERSON_EL.classList.remove('is-loading')
        this._updateHTML();
    }

    async _getPlanet(url) {
            const response = await fetch(url);
            this.CURRENT_PERSON_PLANET = await response.json();
        }
        // Uppdaterar HTML och view delen 
    _updateHTML() {
        this.PEOPLE_EL.querySelector('[data-people-list]').innerHTML = ""

        this.PEOPLE.results.forEach(person => {
            const item = document.createElement('li')
            item.append(person.name)
            this.PEOPLE_EL.querySelector('[data-people-list]').appendChild(item)
            item.addEventListener('click', () => this._getPerson(person))
        })

        this.CURRENT_PAGE_NUMBER_EL.innerHTML = this.PAGE || 1;
        this.PAGE_COUNT_EL.innerHTML = Math.ceil(this.PEOPLE.count / this.PEOPLE_PER_PAGE);

        if (this.CURRENT_PERSON) {
            this.PEOPLE_EL.classList.add('is-active')
            this.CURRENT_PERSON_EL.querySelector('[data-current-person-title]').innerHTML = this.CURRENT_PERSON.name;
            this.CURRENT_PERSON_EL.querySelector('[data-current-person-details]').innerHTML = `
                <span class="item">Height: ${this.CURRENT_PERSON.height}cm</span>
                <span class="item">Mass: ${this.CURRENT_PERSON.mass}kg</span>
                <span class="item">Haircolor: ${this.CURRENT_PERSON.hair_Color}</span>
                <span class="item">Skincolor: ${this.CURRENT_PERSON.skin_color}</span>
                <span class="item">Eyecolor: ${this.CURRENT_PERSON.eye_color}</span>
                <span class="item">Birth year: ${this.CURRENT_PERSON.birth_year}</span>
                <span class="item">Gender: ${this.CURRENT_PERSON.gender}</span>
            `

            this.CURRENT_PERSON_EL.classList.add('is-active')
            this.CURRENT_PERSON_EL.querySelector('[data-current-person-meta-title]').innerHTML = this.CURRENT_PERSON_PLANET.name;
            this.CURRENT_PERSON_EL.querySelector('[data-current-person-meta-details]').innerHTML = `
                <span class="item">Rotationperiod: ${this.CURRENT_PERSON_PLANET.rotation_period}h</span>
                <span class="item">Orbitalperiod: ${this.CURRENT_PERSON_PLANET.orbital_period}days</span>
                <span class="item">Diameter: ${this.CURRENT_PERSON_PLANET.diameter}km</span>
                <span class="item">Climate": ${this.CURRENT_PERSON_PLANET.climate}</span>
                <span class="item">Gravity: ${this.CURRENT_PERSON_PLANET.gravity}</span>
                <span class="item">Terrain: ${this.CURRENT_PERSON_PLANET.terrain}</span>
            `;
        }
    }
}
// Instansiera en ny app när window har laddats 
window.onload = new App();