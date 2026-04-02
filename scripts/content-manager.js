// Content Management System for Manasa Hari's Portfolio
class ContentManager {
    constructor() {
        this.contentData = null;
        this.init();
    }

    async init() {
        try {
            const response = await fetch('/data/content.json');
            this.contentData = await response.json();

            // Render page-specific content if containers exist
            this.renderPageContent();

            this.setupEventListeners();
        } catch (error) {
            console.error('Error loading content data:', error);
        }
    }

    renderPageContent() {
        // Achievements page
        const achievementsContainer = document.querySelector('.achievements-container');
        if (achievementsContainer) {
            this.renderAchievements();
        }

        // Home page testimonials
        const homeTestimonials = document.querySelector('.home-testimonials');
        if (homeTestimonials) {
            this.renderHomeTestimonials();
        }

        // Home page career timeline
        const careerTimeline = document.querySelector('.career-timeline');
        if (careerTimeline) {
            this.renderCareerTimeline();
        }
    }

    setupEventListeners() {
        // Add event listeners for content management features
        const addAchievementBtn = document.getElementById('add-achievement-btn');
        if (addAchievementBtn) {
            addAchievementBtn.addEventListener('click', () => this.showAddAchievementForm());
        }

        // Setup achievement filters
        const filterButtons = document.querySelectorAll('.achievement-filter');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.filterAchievements(category);
            });
        });
    }

    showAddAchievementForm() {
        const modal = document.createElement('div');
        modal.className = 'content-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Add New Achievement</h3>
                <form id="achievement-form">
                    <div class="form-group">
                        <label for="title">Title:</label>
                        <input type="text" id="title" required>
                    </div>
                    <div class="form-group">
                        <label for="year">Year:</label>
                        <input type="number" id="year" required>
                    </div>
                    <div class="form-group">
                        <label for="month">Month:</label>
                        <select id="month" required>
                            <option value="JAN">January</option>
                            <option value="FEB">February</option>
                            <option value="MAR">March</option>
                            <option value="APR">April</option>
                            <option value="MAY">May</option>
                            <option value="JUN">June</option>
                            <option value="JUL">July</option>
                            <option value="AUG">August</option>
                            <option value="SEP">September</option>
                            <option value="OCT">October</option>
                            <option value="NOV">November</option>
                            <option value="DEC">December</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="description">Description:</label>
                        <textarea id="description" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="category">Category:</label>
                        <select id="category" required>
                            <option value="scholarship">Scholarship</option>
                            <option value="hackathon">Hackathon</option>
                            <option value="recognition">Recognition</option>
                            <option value="public-speaking">Public Speaking</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="image">Image URL:</label>
                        <input type="text" id="image">
                    </div>
                    <div class="form-group">
                        <label for="link">Link URL:</label>
                        <input type="url" id="link">
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn-primary">Add Achievement</button>
                        <button type="button" class="btn-secondary" onclick="this.closest('.content-modal').remove()">Cancel</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Add form submission handler
        const form = modal.querySelector('#achievement-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewAchievement(form);
        });

        // Add modal styles
        this.addModalStyles();
    }

    addModalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .content-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            }

            .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 8px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
            }

            .form-group {
                margin-bottom: 1rem;
            }

            .form-group label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 500;
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 0.5rem;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 1rem;
            }

            .form-group textarea {
                height: 100px;
                resize: vertical;
            }

            .form-actions {
                display: flex;
                gap: 1rem;
                margin-top: 1.5rem;
            }

            .btn-primary {
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
            }

            .btn-secondary {
                background: #6b7280;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    }

    async addNewAchievement(form) {
        const formData = new FormData(form);
        const achievement = {
            id: this.generateId(formData.get('title')),
            title: formData.get('title'),
            year: formData.get('year'),
            month: formData.get('month'),
            description: formData.get('description'),
            category: formData.get('category'),
            image: formData.get('image') || null,
            link: formData.get('link') || null
        };

        // Add to content data
        this.contentData.achievements.unshift(achievement);

        // Save to localStorage for now (in a real app, you'd save to a server)
        localStorage.setItem('portfolioContent', JSON.stringify(this.contentData));

        // Refresh the achievements display
        this.renderAchievements();

        // Close modal
        form.closest('.content-modal').remove();

        // Show success message
        this.showNotification('Achievement added successfully!', 'success');
    }

    generateId(title) {
        return title.toLowerCase()
            .replace(/[^a-z0-9]/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }

    filterAchievements(category) {
        const achievements = document.querySelectorAll('.achievement-item');
        const filterButtons = document.querySelectorAll('.achievement-filter');

        // Update active filter button
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            }
        });

        // Filter achievements
        achievements.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    }

    renderAchievements() {
        const container = document.querySelector('.achievements-container');
        if (!container || !this.contentData || !this.contentData.achievements) return;

        container.innerHTML = this.contentData.achievements.map(achievement => `
            <div class="achievement-item item row" data-category="${achievement.category}">
                <div class="">
                    <h1>
                        ${achievement.link ? `
                            <a class="achievement-title-link" href="${achievement.link}" target="_blank" rel="noopener noreferrer">${achievement.title}</a>
                        ` : `
                            <span class="achievement-title-link">${achievement.title}</span>
                        `}
                    </h1>
                    <p class="mb-2">
                        <i><b><span class="achievement-meta-link">${achievement.month} ${achievement.year}</span></b></i>
                        <br>
                        ${achievement.description ? `${achievement.description}<br>` : ''}
                        <br>
                        ${achievement.image ? `<img src="../${achievement.image}" alt="${achievement.title}" loading="lazy"><br>` : ''}
                        ${achievement.image2 ? `<img src="../${achievement.image2}" alt="${achievement.title}" loading="lazy"><br>` : ''}
                        ${achievement.link ? `
                            <span class="achievement-link-label">Link: </span>
                            <a class="achievement-link-url" href="${achievement.link}" target="_blank" rel="noopener noreferrer">${achievement.link}</a>
                        ` : ''}
                        <hr>
                    </p>
                </div>
            </div>
        `).join('');
    }

    renderHomeTestimonials() {
        if (!this.contentData || !this.contentData.testimonials) return;

        const container = document.querySelector('.home-testimonials');
        if (!container) return;

        container.innerHTML = this.contentData.testimonials.map(testimonial => `
            <article class="testimonial-card">
                <div class="testimonial-quote">
                    <i class="fas fa-quote-left quote-icon" aria-hidden="true"></i>
                    <p>${testimonial.quote}</p>
                </div>
                <div class="testimonial-author">
                    <strong>${testimonial.author}</strong>
                    <span>${testimonial.title}</span>
                    ${testimonial.linkedin ? `
                        <a href="${testimonial.linkedin}" target="_blank" rel="noopener noreferrer" class="highlight-link">
                            View profile
                        </a>
                    ` : ''}
                </div>
            </article>
        `).join('');
    }

    renderCareerTimeline() {
        if (!this.contentData || !this.contentData.career) return;

        const container = document.querySelector('.career-timeline');
        if (!container) return;

        const groupedItems = this.contentData.career.reduce((groups, item) => {
            const year = item.year || 'Other';
            if (!groups[year]) {
                groups[year] = [];
            }
            groups[year].push(item);
            return groups;
        }, {});

        container.innerHTML = Object.entries(groupedItems).map(([year, items]) => `
            <div class="timeline__group">
                <span class="timeline__year">${year}</span>
                ${items.map(item => `
                    <div class="timeline__box">
                        <div class="timeline__date">
                            ${item.month ? `<span class="timeline__month">${item.month}</span>` : ''}
                        </div>
                        <div class="timeline__post">
                            <div class="timeline__content">
                                <p>
                                    ${item.title}
                                    ${item.company ? ` at ${item.companyUrl ? `
                                        <a href="${item.companyUrl}" target="_blank" rel="noopener noreferrer" style="color:#990000;">${item.company}</a>
                                    ` : item.company}` : ''}
                                    ${item.description ? `. ${item.description}` : ''}
                                    ${item.certificate ? `<br><a href="${item.certificate}" target="_blank" rel="noopener noreferrer" style="color:#990000;">View Certificate</a>` : ''}
                                </p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 4px;
            color: white;
            z-index: 10001;
            animation: slideIn 0.3s ease;
        `;

        if (type === 'success') {
            notification.style.background = '#10b981';
        } else if (type === 'error') {
            notification.style.background = '#ef4444';
        } else {
            notification.style.background = '#3b82f6';
        }

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Export content data for backup
    exportContent() {
        const dataStr = JSON.stringify(this.contentData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'portfolio-content.json';
        link.click();
        URL.revokeObjectURL(url);
    }

    // Import content data
    async importContent(file) {
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            this.contentData = data;
            localStorage.setItem('portfolioContent', JSON.stringify(data));
            this.renderAchievements();
            this.showNotification('Content imported successfully!', 'success');
        } catch (error) {
            this.showNotification('Error importing content: ' + error.message, 'error');
        }
    }
}

// Initialize content manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.contentManager = new ContentManager();
});

// Add admin panel functionality
function showAdminPanel() {
    const adminPanel = document.createElement('div');
    adminPanel.className = 'admin-panel';
    adminPanel.innerHTML = `
        <div class="admin-content">
            <h3>Content Management</h3>
            <div class="admin-actions">
                <button onclick="window.contentManager.showAddAchievementForm()" class="btn-primary">
                    Add Achievement
                </button>
                <button onclick="window.contentManager.exportContent()" class="btn-secondary">
                    Export Content
                </button>
                <input type="file" id="import-file" accept=".json" style="display: none;" 
                       onchange="window.contentManager.importContent(this.files[0])">
                <button onclick="document.getElementById('import-file').click()" class="btn-secondary">
                    Import Content
                </button>
            </div>
            <button onclick="this.closest('.admin-panel').remove()" class="btn-close">×</button>
        </div>
    `;

    // Add admin panel styles
    const style = document.createElement('style');
    style.textContent = `
        .admin-panel {
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 10000;
        }

        .admin-actions {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }

        .btn-close {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
        }

        @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(adminPanel);
}

// Add admin panel trigger (you can remove this in production)
if (window.location.search.includes('admin=true')) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(showAdminPanel, 1000);
    });
} 
