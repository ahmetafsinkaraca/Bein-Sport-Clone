class EventRenderer {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) {
            throw new Error('Container element not found.');
        }
    }

    renderEvents(events) {
        this.container.innerHTML = '';

        events.forEach((event, index) => {
            const eventHTML = this.createEventHTML(event);

            this.container.appendChild(eventHTML);

            if (index < events.length - 1) {
                const lineDiv = document.createElement('div');
                lineDiv.className = 'line';
                this.container.appendChild(lineDiv);
            }
        });
    }

    createEventHTML(event) {
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'event';

        const minuteDiv = document.createElement('div');
        minuteDiv.className = 'minute';
        minuteDiv.textContent = event.minute;
        wrapperDiv.appendChild(minuteDiv);

        const detailsContainer = document.createElement('div');
        detailsContainer.className = `details-container ${event.side}`;

        const link = document.createElement('a');
        link.href = '/';

        const contentDiv = document.createElement('div');

        const leftIconDiv = document.createElement('div');
        leftIconDiv.className = 'play-icon';
        const leftIcon = document.createElement('i');
        leftIcon.className = event.icons[0];
        leftIconDiv.appendChild(leftIcon);
        contentDiv.appendChild(leftIconDiv);

        const textDiv = document.createElement('div');
        textDiv.className = 'detail-text';

        const detailSpan = document.createElement('span');
        detailSpan.textContent = event.detail;
        textDiv.appendChild(detailSpan);

        if (event.icons[1]) {
            const rightIcon = document.createElement('i');
            rightIcon.className = event.icons[1];
            textDiv.appendChild(rightIcon);
        }

        contentDiv.appendChild(textDiv);
        link.appendChild(contentDiv);
        detailsContainer.appendChild(link);
        wrapperDiv.appendChild(detailsContainer);

        return wrapperDiv;
    }
}

const events1 = [
    { minute: "0'", detail: "İlk 11'ler", side: 'center', icons: ['fa-solid fa-play'] },
    { minute: "15'", detail: "Gol", side: 'left', icons: ['fa-solid fa-play', 'fa-regular fa-futbol'] },
    { minute: "30'", detail: "Faul", side: 'right', icons: ['fa-solid fa-play', 'fa-regular fa-futbol'] },
    { minute: "90'", detail: "Faul", side: 'center', icons: ['fa-solid fa-play'] }
];

const events2 = [
    { minute: "0'", detail: "İlk 11'ler", side: 'center', icons: ['fa-solid fa-play'] },
    { minute: "15'", detail: "Gol", side: 'left', icons: ['fa-solid fa-play', 'fa-regular fa-futbol'] },
    { minute: "30'", detail: "Faul", side: 'right', icons: ['fa-solid fa-play', 'fa-regular fa-futbol'] },
    { minute: "90'", detail: "Faul", side: 'center', icons: ['fa-solid fa-play'] }
];

const events3 = [
    { minute: "0'", detail: "İlk 11'ler", side: 'center', icons: ['fa-solid fa-play'] },
    { minute: "15'", detail: "Gol", side: 'left', icons: ['fa-solid fa-play', 'fa-regular fa-futbol'] },
    { minute: "30'", detail: "Faul", side: 'right', icons: ['fa-solid fa-play', 'fa-regular fa-futbol'] },
    { minute: "90'", detail: "Faul", side: 'center', icons: ['fa-solid fa-play'] }
];

const renderer1 = new EventRenderer('#content1');
renderer1.renderEvents(events1);

const renderer2 = new EventRenderer('#content2');
renderer2.renderEvents(events2);

const renderer3 = new EventRenderer('#content3');
renderer3.renderEvents(events3);
