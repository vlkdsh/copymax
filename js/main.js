// js/main.js

// Load content from JSON
async function loadContent() {
    try {
        const response = await fetch('content.json');
        const data = await response.json();
        renderContent(data);
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Render content to DOM
function renderContent(data) {
    // Header
    document.getElementById('logo').textContent = data.header.logo;
    
    const navList = document.getElementById('navList');
    data.header.menu.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = item;
        li.appendChild(a);
        navList.appendChild(li);
    });

    // Hero
    document.getElementById('heroTitle').textContent = data.hero.title;
    document.getElementById('heroSubtitle').textContent = data.hero.subtitle;

    // Brands
    const brandsGrid = document.getElementById('brandsGrid');
    data.brands.forEach(brand => {
        const div = document.createElement('div');
        div.className = 'brand-item';
        div.textContent = brand;
        brandsGrid.appendChild(div);
    });

    // Products
    const productsGrid = document.getElementById('productsGrid');
    data.products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const icon = document.createElement('div');
        icon.className = 'product-icon';
        
        const title = document.createElement('h3');
        title.className = 'product-title';
        title.textContent = product.title;
        
        const description = document.createElement('p');
        description.className = 'product-description';
        description.textContent = product.description;
        
        card.appendChild(icon);
        card.appendChild(title);
        card.appendChild(description);
        productsGrid.appendChild(card);
    });

    // Contact
    const phoneLink = document.getElementById('contactPhone');
    phoneLink.textContent = data.contact.phone;
    phoneLink.href = `tel:${data.contact.phone.replace(/\s/g, '')}`;
    
    const emailLink = document.getElementById('contactEmail');
    emailLink.textContent = data.contact.email;
    emailLink.href = `mailto:${data.contact.email}`;
}

// Mobile menu toggle
function initMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadContent();
    initMenu();
});
