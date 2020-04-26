loadAllForm();

function loadAllForm() {
    fetch("https://app.bloquercovid19.com/bat/impact").then(response => {
        if (response.status == 200) {
            return response.json();
        }
    }).then(data => {
        const result = data.impact;
        const container = document.querySelector('.impact-list');
        result.forEach(impact => {
            displayImpact(impact.date, JSON.parse(impact.json), container);
        })
    }).catch(error => {
    });
}

function displayImpact(date, form, container) {
    const template = `
        <div class="impact">
            <h1>${form["nom-entreprise"].value}</h1>
            <p>${dateToString(date)}</p>
        </div>
    `;
    
    const element = new DOMParser().parseFromString(template, 'text/html');
    element.querySelector('div').addEventListener('click', () => {
        showResponse(date, form);
    })
    container.appendChild(element.querySelector('div'));
}

function showResponse(date, form) {
    window.location = '#form';
    const container = document.querySelector('.response-container');
    freeContainer(container);
    for (let key in form) {
        const question  = form[key].question;
        const response = form[key].value;
        displayForm(question, response, container);
    }
}

function dateToString(date){
    const d = new Date(date.toString());
    return (d.getDate() < 10 ? '0' : '') +  d.getDate() + "/" + (d.getMonth()+1 < 10 ? '0' : '') + (d.getMonth()+1) + "/" + d.getFullYear();
}

function displayForm(question, response, container){
    const template = `
    <div class="impact-form">
        <p class="question">${question}</h1>
        <p class="response">${response}</p>
    </div>
    `;
    const element = new DOMParser().parseFromString(template, 'text/html');
    container.appendChild(element.querySelector('div'));
}

function freeContainer(container){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}
