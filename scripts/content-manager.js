// Content Management System for Manasa Hari's Portfolio
(function () {
    const CONTENT_DATA_KEY = 'portfolioContent';
    const MODAL_STYLE_ID = 'content-manager-modal-styles';
    const ADMIN_STYLE_ID = 'content-manager-admin-styles';
    const CONTENT_PATH = '/data/content.json';
    const MONTH_ORDER = {
        JAN: 1,
        FEB: 2,
        MAR: 3,
        APR: 4,
        MAY: 5,
        JUN: 6,
        JUL: 7,
        AUG: 8,
        SEP: 9,
        OCT: 10,
        NOV: 11,
        DEC: 12
    };

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

    class ContentManager {
        constructor() {
            this.contentData = null;
            this.selectors = {
                achievementsContainer: '.achievements-container',
                homeTestimonials: '.home-testimonials',
                careerTimeline: '.career-timeline',
                filterButton: '.achievement-filter'
            };
            this.init();
        }

        async init() {
            try {
                this.contentData = await this.loadContentData();
                this.renderPageContent();
                this.setupEventListeners();
            } catch (error) {
                console.error('Error loading content data:', error);
            }
        }

        async loadContentData() {
            try {
                const response = await fetch(`${CONTENT_PATH}?v=${Date.now()}`, { cache: 'no-store' });
                if (!response.ok) {
                    throw new Error(`Failed to fetch content data: ${response.status}`);
                }

                const data = await response.json();
                window.localStorage.setItem(CONTENT_DATA_KEY, JSON.stringify(data));
                return data;
            } catch (fetchError) {
                const savedContent = window.localStorage.getItem(CONTENT_DATA_KEY);
                if (savedContent) {
                    try {
                        return JSON.parse(savedContent);
                    } catch (parseError) {
                        console.warn('Ignoring invalid saved content data:', parseError);
                    }
                }

                throw fetchError;
            }
        }

        renderPageContent() {
            if ($(this.selectors.achievementsContainer)) {
                this.renderAchievements();
            }

            if ($(this.selectors.homeTestimonials)) {
                this.renderHomeTestimonials();
            }

            if ($(this.selectors.careerTimeline)) {
                this.renderCareerTimeline();
            }
        }

        setupEventListeners() {
            const addAchievementBtn = $('#add-achievement-btn');
            if (addAchievementBtn) {
                addAchievementBtn.addEventListener('click', () => this.showAddAchievementForm());
            }

            $$(this.selectors.filterButton).forEach((button) => {
                button.addEventListener('click', () => {
                    this.filterAchievements(button.dataset.category || 'all');
                });
            });
        }

        showAddAchievementForm() {
            this.injectStyle(MODAL_STYLE_ID, `
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
                    background: var(--primary-color, #009688);
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
            `);

            const modal = document.createElement('div');
            modal.className = 'content-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>Add New Achievement</h3>
                    <form id="achievement-form">
                        <div class="form-group">
                            <label for="title">Title:</label>
                            <input type="text" id="title" name="title" required>
                        </div>
                        <div class="form-group">
                            <label for="year">Year:</label>
                            <input type="number" id="year" name="year" required>
                        </div>
                        <div class="form-group">
                            <label for="month">Month:</label>
                            <select id="month" name="month" required>
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
                            <textarea id="description" name="description" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="category">Category:</label>
                            <select id="category" name="category" required>
                                <option value="scholarship">Scholarship</option>
                                <option value="hackathon">Hackathon</option>
                                <option value="recognition">Recognition</option>
                                <option value="public-speaking">Public Speaking</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="image">Image URL:</label>
                            <input type="text" id="image" name="image">
                        </div>
                        <div class="form-group">
                            <label for="link">Link URL:</label>
                            <input type="url" id="link" name="link">
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn-primary">Add Achievement</button>
                            <button type="button" class="btn-secondary" data-close-modal>Cancel</button>
                        </div>
                    </form>
                </div>
            `;

            document.body.appendChild(modal);

            const form = $('#achievement-form', modal);
            const closeButton = $('[data-close-modal]', modal);

            form.addEventListener('submit', (event) => {
                event.preventDefault();
                this.addNewAchievement(form);
            });

            closeButton.addEventListener('click', () => modal.remove());
        }

        async addNewAchievement(form) {
            const formData = new FormData(form);
            const achievement = {
                id: this.generateId(formData.get('title') || ''),
                title: formData.get('title'),
                year: formData.get('year'),
                month: formData.get('month'),
                description: formData.get('description'),
                category: formData.get('category'),
                image: formData.get('image') || null,
                link: formData.get('link') || null
            };

            this.contentData.achievements.unshift(achievement);
            window.localStorage.setItem(CONTENT_DATA_KEY, JSON.stringify(this.contentData));
            this.renderAchievements();
            form.closest('.content-modal').remove();
            this.showNotification('Achievement added successfully!', 'success');
        }

        generateId(title) {
            return String(title)
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
        }

        filterAchievements(category) {
            $$('.achievement-item').forEach((item) => {
                item.style.display = category === 'all' || item.dataset.category === category ? 'block' : 'none';
            });

            $$(this.selectors.filterButton).forEach((button) => {
                button.classList.toggle('active', button.dataset.category === category);
            });
        }

        renderAchievements() {
            const container = $(this.selectors.achievementsContainer);
            if (!container || !this.contentData?.achievements) {
                return;
            }

            container.innerHTML = this.contentData.achievements
                .map((achievement) => this.renderAchievementItem(achievement))
                .join('');
        }

        renderAchievementItem(achievement) {
            const titleMarkup = achievement.link
                ? `<a class="achievement-title-link" href="${achievement.link}" target="_blank" rel="noopener noreferrer">${achievement.title}</a>`
                : `<span class="achievement-title-link">${achievement.title}</span>`;

            const imagesMarkup = [achievement.image, achievement.image2]
                .filter(Boolean)
                .map((imagePath) => `<img src="../${imagePath}" alt="${achievement.title}" loading="lazy"><br>`)
                .join('');

            const linkMarkup = achievement.link
                ? `
                    <span class="achievement-link-label">Link: </span>
                    <a class="achievement-link-url" href="${achievement.link}" target="_blank" rel="noopener noreferrer">${achievement.link}</a>
                `
                : '';

            return `
                <div class="achievement-item item row" data-category="${achievement.category}">
                    <div>
                        <h1>${titleMarkup}</h1>
                        <p class="mb-2">
                            <i><b><span class="achievement-meta-link">${achievement.month} ${achievement.year}</span></b></i>
                            <br>
                            ${achievement.description ? `${achievement.description}<br>` : ''}
                            <br>
                            ${imagesMarkup}
                            ${linkMarkup}
                            <hr>
                        </p>
                    </div>
                </div>
            `;
        }

        renderHomeTestimonials() {
            const container = $(this.selectors.homeTestimonials);
            if (!container || !this.contentData?.testimonials) {
                return;
            }

            container.innerHTML = this.contentData.testimonials.map((testimonial) => `
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
            const container = $(this.selectors.careerTimeline);
            if (!container || !this.contentData?.career) {
                return;
            }

            const sortedCareerItems = [...this.contentData.career].sort((left, right) => {
                return this.getCareerSortValue(right) - this.getCareerSortValue(left);
            });

            const groupedItems = sortedCareerItems.reduce((groups, item) => {
                const year = item.year || 'Other';
                let group = groups.find(([groupYear]) => groupYear === year);

                if (!group) {
                    group = [year, []];
                    groups.push(group);
                }

                group[1].push(item);
                return groups;
            }, []);

            container.innerHTML = groupedItems.map(([year, items]) => `
                <div class="timeline__group">
                    <span class="timeline__year">${year}</span>
                    ${items.map((item) => this.renderCareerTimelineItem(item)).join('')}
                </div>
            `).join('');
        }

        renderCareerTimelineItem(item) {
            const companyMarkup = item.company
                ? ` at ${item.companyUrl
                    ? `<a href="${item.companyUrl}" target="_blank" rel="noopener noreferrer" style="color:#990000;">${item.company}</a>`
                    : item.company}`
                : '';

            const certificateMarkup = item.certificate
                ? `<br><a href="${item.certificate}" target="_blank" rel="noopener noreferrer" style="color:#990000;">View Certificate</a>`
                : '';

            const relatedLinks = [
                item.link
                    ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" style="color:#990000;">View LinkedIn post</a>`
                    : '',
                item.videoUrl
                    ? `<a href="${item.videoUrl}" target="_blank" rel="noopener noreferrer" style="color:#990000;">Watch full interview</a>`
                    : ''
            ].filter(Boolean).join(' | ');

            const relatedLinksMarkup = relatedLinks ? `<br>${relatedLinks}` : '';

            return `
                <div class="timeline__box">
                    <div class="timeline__date">
                        ${item.month ? `<span class="timeline__month">${item.month}</span>` : ''}
                    </div>
                    <div class="timeline__post">
                        <div class="timeline__content">
                            <p>
                                ${item.title}${companyMarkup}${item.description ? `. ${item.description}` : ''}${relatedLinksMarkup}${certificateMarkup}
                            </p>
                        </div>
                    </div>
                </div>
            `;
        }

        getCareerSortValue(item) {
            const yearText = String(item.year || '0');
            const normalizedYear = yearText.includes('-')
                ? yearText.split('-').pop()
                : yearText;
            const year = Number.parseInt(normalizedYear, 10) || 0;
            const month = MONTH_ORDER[item.month] || 0;

            return (year * 100) + month;
        }

        showNotification(message, type = 'info') {
            const backgroundColor = {
                success: '#10b981',
                error: '#ef4444',
                info: '#3b82f6'
            }[type] || '#3b82f6';

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
                background: ${backgroundColor};
            `;

            document.body.appendChild(notification);
            window.setTimeout(() => notification.remove(), 3000);
        }

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

        async importContent(file) {
            try {
                const text = await file.text();
                const data = JSON.parse(text);
                this.contentData = data;
                window.localStorage.setItem(CONTENT_DATA_KEY, JSON.stringify(data));
                this.renderAchievements();
                this.showNotification('Content imported successfully!', 'success');
            } catch (error) {
                this.showNotification(`Error importing content: ${error.message}`, 'error');
            }
        }

        injectStyle(id, cssText) {
            if (document.getElementById(id)) {
                return;
            }

            const style = document.createElement('style');
            style.id = id;
            style.textContent = cssText;
            document.head.appendChild(style);
        }
    }

    function showAdminPanel() {
        if (!window.contentManager) {
            return;
        }

        window.contentManager.injectStyle(ADMIN_STYLE_ID, `
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
        `);

        const adminPanel = document.createElement('div');
        adminPanel.className = 'admin-panel';
        adminPanel.innerHTML = `
            <div class="admin-content">
                <h3>Content Management</h3>
                <div class="admin-actions">
                    <button data-admin-action="add" class="btn-primary">Add Achievement</button>
                    <button data-admin-action="export" class="btn-secondary">Export Content</button>
                    <input type="file" id="import-file" accept=".json" style="display: none;">
                    <button data-admin-action="import" class="btn-secondary">Import Content</button>
                </div>
                <button data-admin-action="close" class="btn-close">×</button>
            </div>
        `;

        const importFileInput = $('#import-file', adminPanel);

        adminPanel.addEventListener('click', (event) => {
            const action = event.target.dataset.adminAction;
            if (!action) {
                return;
            }

            if (action === 'add') {
                window.contentManager.showAddAchievementForm();
            } else if (action === 'export') {
                window.contentManager.exportContent();
            } else if (action === 'import') {
                importFileInput.click();
            } else if (action === 'close') {
                adminPanel.remove();
            }
        });

        importFileInput.addEventListener('change', () => {
            const [file] = importFileInput.files;
            if (file) {
                window.contentManager.importContent(file);
            }
        });

        document.body.appendChild(adminPanel);
    }

    document.addEventListener('DOMContentLoaded', () => {
        window.contentManager = new ContentManager();

        if (window.location.search.includes('admin=true')) {
            window.setTimeout(showAdminPanel, 1000);
        }
    });
})();
