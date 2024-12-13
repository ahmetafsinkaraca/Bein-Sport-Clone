class InfiniteScroll {
    constructor(containerSelector, contentSelector, loaderSelector, data) {
        this.container = document.querySelector(containerSelector);
        this.content = document.querySelector(contentSelector);
        this.loader = document.querySelector(loaderSelector);
        this.data = data;
        this.page = 1;
        this.itemsPerPage = 6;
        this.loading = false;

        this.init();
    }

    async fetchData() {
        if (this.loading) return;
        this.loading = true;
        this.loader.style.display = 'block';

        try {
            const startIndex = (this.page - 1) * this.itemsPerPage;
            const endIndex = this.page * this.itemsPerPage;
            const pageData = this.data.slice(startIndex, endIndex);

            if (pageData.length === 0) {
                console.log("Tüm veriler yüklendi.");
                this.loader.style.display = 'none';
                return;
            }

            this.renderItems(pageData);
            this.page++;
        } catch (error) {
            console.error('Hata:', error.message);
        } finally {
            this.loader.style.display = 'none';
            this.loading = false;
        }
    }

    renderItems(data) {
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = "col-12 col-sm-6 col-md-4 col-lg-2";
            div.innerHTML = `
                <a class="news-content-item" href="${item.link}">
                    <div class="news-content-image-part">
                        <div class="news-content-image">
                            <img src="${item.image}" alt="${item.title}">
                        </div>
                        <div class="news-content-icon">
                            <i class="fa-solid fa-play"></i>
                        </div>
                    </div>
                    <div class="news-content-text-content">
                        <span class="news-content-title">${item.title}</span>
                    </div>
                </a>
            `;
            this.content.appendChild(div);
        });
    }

    handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = this.container;
        if (scrollHeight - scrollTop <= clientHeight + 10) {
            this.fetchData();
        }
    }

    init() {
        this.container.addEventListener('scroll', () => this.handleScroll());
        this.fetchData();
    }
}

const newsData = [
    { "image": "assets/image/news4.jpg", "title": "Mateusz Lis: \"Türkçe öğrenmeye başlamalıyım\"", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Yeni sezon hedefleri belirlendi", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
    { "image": "assets/image/news4.jpg", "title": "Futbol dünyasında son gelişmeler", "link": "/" },
];

new InfiniteScroll('.body-content', '#content', '#loader', newsData);
