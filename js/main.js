// js/main.js

// Language data
const translations = {
    en: {
        menu: ["Products", "Solutions", "Brands", "Contact"],
        heroTitle: "COPYMAX",
        heroVertical: "ESTONIA'S HUB FOR GLOBAL PRINT BRANDS",
        sectionLabel: "AUTHORIZED DISTRIBUTOR",
        blueprintTitle: "SOLUTIONS PORTFOLIO",
        formTitle: "REQUEST CONSULTATION",
        formCompany: "COMPANY NAME",
        formEmail: "EMAIL ADDRESS",
        formPhone: "PHONE NUMBER",
        formRequirements: "YOUR REQUIREMENTS",
        formSubmit: "SUBMIT REQUEST",
        docBilling: "BILL OF LADING",
        docDate: "DATE",
        docPhone: "CONTACT_PHONE:",
        docEmail: "CONTACT_EMAIL:",
        docLocation: "LOCATION_EST:",
        docLocationValue: "TALLINN, ESTONIA",
        docSignature: "AUTHORIZED SIGNATURE",
        docStamp: "✓ VERIFIED"
    },
    ru: {
        menu: ["Продукты", "Решения", "Бренды", "Контакты"],
        heroTitle: "COPYMAX",
        heroVertical: "ЭСТОНСКИЙ ХАБ МИРОВЫХ БРЕНДОВ ПЕЧАТИ",
        sectionLabel: "АВТОРИЗОВАННЫЙ ДИСТРИБЬЮТОР",
        blueprintTitle: "ПОРТФОЛИО РЕШЕНИЙ",
        formTitle: "ЗАПРОСИТЬ КОНСУЛЬТАЦИЮ",
        formCompany: "НАЗВАНИЕ КОМПАНИИ",
        formEmail: "ЭЛЕКТРОННАЯ ПОЧТА",
        formPhone: "НОМЕР ТЕЛЕФОНА",
        formRequirements: "ВАШИ ТРЕБОВАНИЯ",
        formSubmit: "ОТПРАВИТЬ ЗАПРОС",
        docBilling: "ТРАНСПОРТНАЯ НАКЛАДНАЯ",
        docDate: "ДАТА",
        docPhone: "ТЕЛЕФОН:",
        docEmail: "EMAIL:",
        docLocation: "АДРЕС:",
        docLocationValue: "ТАЛЛИНН, ЭСТОНИЯ",
        docSignature: "ПОДПИСЬ УПОЛНОМОЧЕННОГО ЛИЦА",
        docStamp: "✓ ПРОВЕРЕНО"
    },
    et: {
        menu: ["Tooted", "Lahendused", "Kaubamärgid", "Kontakt"],
        heroTitle: "COPYMAX",
        heroVertical: "EESTI KESKUS ÜLEMAAILMSETELE PRINTIMISBRÄNDIDELE",
        sectionLabel: "VOLITATUD LEVITAJA",
        blueprintTitle: "LAHENDUSTE PORTFELL",
        formTitle: "KÜSI KONSULTATSIOONI",
        formCompany: "ETTEVÕTTE NIMI",
        formEmail: "E-POSTI AADRESS",
        formPhone: "TELEFONINUMBER",
        formRequirements: "TEIE NÕUDED",
        formSubmit: "SAADA PÄRING",
        docBilling: "VEOKIRI",
        docDate: "KUUPÄEV",
        docPhone: "TELEFON:",
        docEmail: "E-POST:",
        docLocation: "ASUKOHT:",
        docLocationValue: "TALLINN, EESTI",
        docSignature: "VOLITATUD ALLKIRI",
        docStamp: "✓ KONTROLLITUD"
    }
};

let currentLang = 'en';

// Load content from JSON
async function loadContent() {
    try {
        const response = await fetch('content.json');
        const data = await response.json();
        window.contentData = data;
        renderContent(data);
        initInteractions();
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Render content to DOM
function renderContent(data) {
    const t = translations[currentLang];

    // Header Navigation
    const navList = document.getElementById('navList');
    navList.innerHTML = '';
    t.menu.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = item;
        li.appendChild(a);
        navList.appendChild(li);
    });

    // Hero 3D Text
    document.getElementById('hero3DText').textContent = t.heroTitle;
    
    // Vertical text - split into three columns
    const verticalContainer = document.getElementById('heroVerticalText');
    verticalContainer.innerHTML = '';
    
    const verticalParts = [
        t.heroVertical.split(' ').slice(-2).join(' '),  // "PRINT BRANDS"
        t.heroVertical.split(' ').slice(2, 5).join(' '), // "HUB FOR GLOBAL"
        t.heroVertical.split(' ').slice(0, 2).join(' ')  // "ESTONIA'S"
    ];
    
    verticalParts.forEach(part => {
        const div = document.createElement('div');
        div.textContent = part;
        verticalContainer.appendChild(div);
    });

    // Cylinder Brands
    const cylinderBrands = document.getElementById('cylinderBrands');
    cylinderBrands.innerHTML = '';
    data.brands.slice(0, 6).forEach(brand => {
        const stamp = document.createElement('div');
        stamp.className = 'brand-stamp-cylinder';
        stamp.textContent = brand;
        cylinderBrands.appendChild(stamp);
    });

    // Brands Drum - duplicate for infinite scroll
    const drumTrack = document.getElementById('drumTrack');
    drumTrack.innerHTML = '';
    const brandsList = [...data.brands, ...data.brands];
    
    brandsList.forEach(brand => {
        const stamp = document.createElement('div');
        stamp.className = 'brand-stamp';
        stamp.textContent = brand;
        drumTrack.appendChild(stamp);
    });

    // Section labels
    document.querySelector('.section-label').textContent = t.sectionLabel;
    document.querySelector('.blueprint-title').textContent = t.blueprintTitle;
    document.querySelector('.form-title').textContent = t.formTitle;

    // Products
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    data.products.forEach((product, index) => {
        const item = document.createElement('div');
        item.className = 'product-item';
        
        const number = document.createElement('div');
        number.className = 'product-number';
        number.textContent = `[${String(index + 1).padStart(2, '0')}]`;
        
        const name = document.createElement('h3');
        name.className = 'product-name';
        name.textContent = product.title;
        
        const desc = document.createElement('p');
        desc.className = 'product-desc';
        desc.textContent = product.description;
        
        item.appendChild(number);
        item.appendChild(name);
        item.appendChild(desc);
        productsGrid.appendChild(item);
    });

    // Form placeholders
    const form = document.getElementById('requestForm');
    form.querySelector('input[type="text"]').placeholder = t.formCompany;
    form.querySelector('input[type="email"]').placeholder = t.formEmail;
    form.querySelector('input[type="tel"]').placeholder = t.formPhone;
    form.querySelector('textarea').placeholder = t.formRequirements;
    form.querySelector('.submit-btn').textContent = t.formSubmit;

    // Contact in Transport Document
    const phoneLink = document.getElementById('contactPhone');
    phoneLink.textContent = data.contact.phone;
    phoneLink.href = `tel:${data.contact.phone.replace(/\s/g, '')}`;
    
    const emailLink = document.getElementById('contactEmail');
    emailLink.textContent = data.contact.email;
    emailLink.href = `mailto:${data.contact.email}`;

    // Document labels
    document.querySelector('.field-label').textContent = t.docBilling;
    document.querySelectorAll('.field-label')[1].textContent = t.docDate;
    document.querySelectorAll('.mono-label')[0].textContent = t.docPhone;
    document.querySelectorAll('.mono-label')[1].textContent = t.docEmail;
    document.querySelectorAll('.mono-label')[2].textContent = t.docLocation;
    document.querySelectorAll('.mono-value')[2].textContent = t.docLocationValue;
    document.querySelector('.signature-line span').textContent = t.docSignature;
    document.querySelector('.red-stamp').textContent = t.docStamp;

    // Current Date
    const dateEl = document.getElementById('currentDate');
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    dateEl.textContent = dateStr;
}

// Initialize interactions
function initInteractions() {
    // Language switcher
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            currentLang = btn.dataset.lang;
            langButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderContent(window.contentData);
        });
    });

    // Burger menu
    const burgerMenu = document.getElementById('burgerMenu');
    const nav = document.getElementById('nav');
    burgerMenu.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Form submission
    const form = document.getElementById('requestForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.textContent = currentLang === 'en' ? 'SENDING...' : currentLang === 'ru' ? 'ОТПРАВКА...' : 'SAATMINE...';
        btn.style.background = '#666';
        
        setTimeout(() => {
            btn.textContent = currentLang === 'en' ? '✓ REQUEST SENT' : currentLang === 'ru' ? '✓ ЗАПРОС ОТПРАВЛЕН' : '✓ PÄRING SAADETUD';
            btn.style.background = '#00AA00';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                form.reset();
            }, 2000);
        }, 1500);
    });

    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero3D = document.querySelector('.text-3d-massive');
        if (hero3D) {
            hero3D.style.transform = `perspective(1000px) rotateX(5deg) translateY(${scrolled * 0.2}px)`;
        }
    });

    // Drum interaction on hover
    const drumContainer = document.getElementById('drumContainer');
    if (drumContainer) {
        drumContainer.addEventListener('mouseenter', () => {
            const track = document.getElementById('drumTrack');
            track.style.animationPlayState = 'paused';
        });
        
        drumContainer.addEventListener('mouseleave', () => {
            const track = document.getElementById('drumTrack');
            track.style.animationPlayState = 'running';
        });
    }

    // Product cards hover effect
    const productCards = document.querySelectorAll('.product-item');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            productCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.5';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            productCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadContent();
});
