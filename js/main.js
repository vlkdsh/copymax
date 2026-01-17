// js/main.js

// Load content from JSON
async function loadContent() {
    try {
        const response = await fetch('content.json');
        const data = await response.json();
        renderContent(data);
        initInteractions();
    } catch (error) {
        console.error('Error loading content:', error);
    }
}

// Render content to DOM
function renderContent(data) {
    // Header Navigation
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

    // Brands Drum - duplicate for infinite scroll
    const drumTrack = document.getElementById('drumTrack');
    const brandsList = [...data.brands, ...data.brands];
    
    brandsList.forEach(brand => {
        const stamp = document.createElement('div');
        stamp.className = 'brand-stamp';
        stamp.textContent = brand;
        drumTrack.appendChild(stamp);
    });

    // Products
    const productsGrid = document.getElementById('productsGrid');
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

    // Contact in Transport Document
    const phoneLink = document.getElementById('contactPhone');
    phoneLink.textContent = data.contact.phone;
    phoneLink.href = `tel:${data.contact.phone.replace(/\s/g, '')}`;
    
    const emailLink = document.getElementById('contactEmail');
    emailLink.textContent = data.contact.email;
    emailLink.href = `mailto:${data.contact.email}`;

    // Current Date
    const dateEl = document.getElementById('currentDate');
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    dateEl.textContent = dateStr;
}

// Initialize interactions
function initInteractions() {
    // Form submission
    const form = document.getElementById('requestForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Animate submit button
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.textContent;
        btn.textContent = 'SENDING...';
        btn.style.background = '#666';
        
        setTimeout(() => {
            btn.textContent = '✓ REQUEST SENT';
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
        const hero = document.querySelector('.hero-logo-massive span');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Drum interaction on hover
    const drumContainer = document.getElementById('drumContainer');
    drumContainer.addEventListener('mouseenter', () => {
        const track = document.getElementById('drumTrack');
        track.style.animationPlayState = 'paused';
    });
    
    drumContainer.addEventListener('mouseleave', () => {
        const track = document.getElementById('drumTrack');
        track.style.animationPlayState = 'running';
    });

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
