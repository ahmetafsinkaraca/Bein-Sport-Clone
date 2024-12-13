class InfiniteScroll {
    constructor(containerSelector, contentSelector, loaderSelector, data) {
        this.container = document.querySelector(containerSelector);
        this.content = document.querySelector(contentSelector);
        this.loader = document.querySelector(loaderSelector);
        this.data = data;
        this.page = 1;
        this.itemsPerPage = 1;
        this.loading = false;

        if (!this.container) {
            console.error("Container bulunamadı. Lütfen doğru bir sınıf adı girin.");
            return;
        }

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
            div.className = "news-item";

            const paragraphs = item.text.map(paragraph => {
                if (paragraph.type === "normal") {
                    return `<p>${paragraph.content}</p>`;
                } else if (paragraph.type === "styled") {
                    return `<p class="${paragraph.class || ''}">${paragraph.content}</p>`;
                }
            }).join('');

            const updatedDates = item.text
                .filter(paragraph => paragraph.type === "updatedDate")
                .map(paragraph => paragraph.content);

            const dropdownItems = [];

            if (item.publishedDate) {
                dropdownItems.push(`<li><a class="dropdown-item" href="#"><strong>Yayınlanma Tarihi </strong>${item.publishedDate}</a></li>`);
            }

            if (item.publishedDate && updatedDates.length > 0) {
                dropdownItems.push('<li><hr class="dropdown-divider"></li>');
            }

            updatedDates.forEach(date => {
                dropdownItems.push(`<li><a class="dropdown-item" href="#"><strong>Güncelleme Tarihi </strong>${date}</a></li>`);
            });

            div.innerHTML = `
                <h5 class="body-content-header">${item.title}</h5>
                <div class="body-content-type-date">
                    <div class="body-content-type">
                        <span>${item.type}</span>
                    </div>
                    <div class="body-content-line">|</div>
                    <div class="dropdown">
                        <button class="btn body-content-date" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>${item.date}</span>
                            <i class="fa-solid fa-chevron-down"></i>
                        </button>
                        <ul class="dropdown-menu">
                            ${dropdownItems.join('')}
                        </ul>
                    </div>
                </div>
                <div class="body-content-text">
                    <img src="${item.image}" alt="${item.title}">
                    ${paragraphs}
                </div>
            `;
            this.content.appendChild(div);
        });
    }

    handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = this.container;

        if (scrollHeight - scrollTop <= clientHeight + 500) {
            console.log("Yeni veri yükleniyor...");
            this.fetchData();
        }
    }

    init() {
        this.container.addEventListener('scroll', () => this.handleScroll());
        this.fetchData();
    }
}


const newsData = [
    { "image": "../assets/image/news3.jpg", "title": "Galatasaray, eski yıldızını geri istiyor! Devre arasında...", "type": "TRANSFER HABERLERİ", "date": "9 Aralık 2024 Pts 11:38",
       "text": [
            { "type": "normal", "content": "Trendyol Süper Lig'de son olarak <a href='/team/sivasspor'>Sivasspor</a>'u 3-2 mağlup eden Galatasaray, devre arası transfer çalışmalarına da hız verdi." },
            { "type": "styled", "content": "Kaan , şu ifadeleri kullandı:", "class": "text-detay"  },
            { "type": "normal", "content": "Sarı-kırmızılı ekip, 2022 yazında Sevilla'ya 13 milyon Euro bonservis bedeliyle gönderdiği Brezilyalı savunmacı Marcao'yu geri istiyor." },
            { "type": "normal", "content": "Kulübe yakınlığıyla bilinen Vamos Mi Sevilla, Galatasaray yönetiminin Marcao'yu kiralamak için ocak ayında İspanyol ekibinin kapısını çalacağını yazdı." }
        ],
     },
     { "image": "../assets/image/news3.jpg", "title": "Galatasaray, eski yıldızını geri istiyor! Devre arasında...", "type": "TRANSFER HABERLERİ", "date": "9 Aralık 2024 Pts 11:38", "publishedDate": "5 Aralık 2024 Per 11:17",
        "text": [
             { "type": "normal", "content": "Trendyol Süper Lig'de son olarak <a href='/team/sivasspor'>Sivasspor</a>'u 3-2 mağlup eden Galatasaray, devre arası transfer çalışmalarına da hız verdi." },
             { "type": "styled", "content": "Kaan , şu ifadeleri kullandı:", "class": "text-detay"  },
             { "type": "normal", "content": "Sarı-kırmızılı ekip, 2022 yazında Sevilla'ya 13 milyon Euro bonservis bedeliyle gönderdiği Brezilyalı savunmacı Marcao'yu geri istiyor." },
             { "type": "normal", "content": "Kulübe yakınlığıyla bilinen Vamos Mi Sevilla, Galatasaray yönetiminin Marcao'yu kiralamak için ocak ayında İspanyol ekibinin kapısını çalacağını yazdı." },
             { "type": "updatedDate", "content": "6 Aralık 2024 Cum 14:00" },
         ],
      },
      { "image": "../assets/image/news3.jpg", "title": "Galatasaray, eski yıldızını geri istiyor! Devre arasında...", "type": "TRANSFER HABERLERİ", "date": "9 Aralık 2024 Pts 11:38", "publishedDate": "5 Aralık 2024 Per 11:17",
        "text": [
             { "type": "normal", "content": "Trendyol Süper Lig'de son olarak <a href='/team/sivasspor'>Sivasspor</a>'u 3-2 mağlup eden Galatasaray, devre arası transfer çalışmalarına da hız verdi." },
             { "type": "styled", "content": "Kaan , şu ifadeleri kullandı:", "class": "text-detay"  },
             { "type": "normal", "content": "Sarı-kırmızılı ekip, 2022 yazında Sevilla'ya 13 milyon Euro bonservis bedeliyle gönderdiği Brezilyalı savunmacı Marcao'yu geri istiyor." },
             { "type": "normal", "content": "Kulübe yakınlığıyla bilinen Vamos Mi Sevilla, Galatasaray yönetiminin Marcao'yu kiralamak için ocak ayında İspanyol ekibinin kapısını çalacağını yazdı." },
             { "type": "updatedDate", "content": "6 Aralık 2024 Cum 14:00" },
             { "type": "updatedDate", "content": "6 Aralık 2024 Cum 14:00" },
         ],
      },
      { "image": "../assets/image/news3.jpg", "title": "Galatasaray, eski yıldızını geri istiyor! Devre arasında...", "type": "TRANSFER HABERLERİ", "date": "9 Aralık 2024 Pts 11:38", "publishedDate": "5 Aralık 2024 Per 11:17",
        "text": [
             { "type": "normal", "content": "Trendyol Süper Lig'de son olarak <a href='/team/sivasspor'>Sivasspor</a>'u 3-2 mağlup eden Galatasaray, devre arası transfer çalışmalarına da hız verdi." },
             { "type": "styled", "content": "Kaan , şu ifadeleri kullandı:", "class": "text-detay"  },
             { "type": "normal", "content": "Sarı-kırmızılı ekip, 2022 yazında Sevilla'ya 13 milyon Euro bonservis bedeliyle gönderdiği Brezilyalı savunmacı Marcao'yu geri istiyor." },
             { "type": "normal", "content": "Kulübe yakınlığıyla bilinen Vamos Mi Sevilla, Galatasaray yönetiminin Marcao'yu kiralamak için ocak ayında İspanyol ekibinin kapısını çalacağını yazdı." },
             { "type": "updatedDate", "content": "6 Aralık 2024 Cum 14:00" },
         ],
      },
      { "image": "../assets/image/news3.jpg", "title": "Galatasaray, eski yıldızını geri istiyor! Devre arasında...", "type": "TRANSFER HABERLERİ", "date": "9 Aralık 2024 Pts 11:38", "publishedDate": "5 Aralık 2024 Per 11:17",
        "text": [
             { "type": "normal", "content": "Trendyol Süper Lig'de son olarak <a href='/team/sivasspor'>Sivasspor</a>'u 3-2 mağlup eden Galatasaray, devre arası transfer çalışmalarına da hız verdi." },
             { "type": "styled", "content": "Kaan , şu ifadeleri kullandı:", "class": "text-detay"  },
             { "type": "normal", "content": "Sarı-kırmızılı ekip, 2022 yazında Sevilla'ya 13 milyon Euro bonservis bedeliyle gönderdiği Brezilyalı savunmacı Marcao'yu geri istiyor." },
             { "type": "normal", "content": "Kulübe yakınlığıyla bilinen Vamos Mi Sevilla, Galatasaray yönetiminin Marcao'yu kiralamak için ocak ayında İspanyol ekibinin kapısını çalacağını yazdı." },
             { "type": "updatedDate", "content": "6 Aralık 2024 Cum 14:00" },
         ],
      },
];

new InfiniteScroll('.page-body', '#content-1', '#loader-1', newsData);
new InfiniteScroll('.page-body', '#content-2', '#loader-2', newsData);

