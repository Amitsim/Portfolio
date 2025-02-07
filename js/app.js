class PortfolioApp {
    constructor() {
        this.initializeApp();
        this.setupEventListeners();
        this.loadContent();
    }

    async initializeApp() {
        // Apply configuration
        document.title = CONFIG.name + " - " + CONFIG.title;
        
        // Setup analytics
        if (CONFIG.features.analytics.enabled) {
            this.setupAnalytics();
        }
        
        // Apply saved theme
        if (CONFIG.features.darkMode) {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                document.body.setAttribute('data-theme', savedTheme);
            }
        }
    }

    setupEventListeners() {
        // Theme toggle
        if (CONFIG.features.darkMode) {
            const themeToggle = document.createElement('button');
            themeToggle.className = 'theme-toggle';
            themeToggle.textContent = '🌓';
            themeToggle.addEventListener('click', this.toggleTheme.bind(this));
            document.body.appendChild(themeToggle);
        }

        // Project filters
        if (CONFIG.features.projectFilters) {
            this.setupFilters();
        }
    }

    async loadContent() {
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.textContent = 'Loading...';
        document.body.appendChild(loading);

        try {
            // Load and render all sections
            await this.renderProjects();
            await this.renderBlog();
            // More sections...
            
            loading.remove();
        } catch (error) {
            console.error('Error loading content:', error);
            loading.textContent = 'Error loading content. Please refresh.';
        }
    }

    async renderProjects() {
        const container = document.getElementById('projects-container');
        CONTENT.projects.forEach(project => {
            const card = new ProjectCard(project);
            container.appendChild(card.render());
        });
    }

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    setupFilters() {
        const tags = new Set();
        CONTENT.projects.forEach(project => {
            project.tags.forEach(tag => tags.add(tag));
        });

        const filterBar = document.createElement('div');
        filterBar.className = 'filter-bar';
        tags.forEach(tag => {
            const button = document.createElement('button');
            button.className = 'filter-button';
            button.textContent = tag;
            button.addEventListener('click', () => this.filterProjects(tag));
            filterBar.appendChild(button);
        });

        const projectsSection = document.querySelector('#projects');
        projectsSection.insertBefore(filterBar, projectsSection.firstChild);
    }

    filterProjects(tag) {
        const buttons = document.querySelectorAll('.filter-button');
        buttons.forEach(button => {
            button.classList.toggle('active', button.textContent === tag);
        });

        const cards = document.querySelectorAll('.project-card');
        cards.forEach(card => {
            const hasTag = card.querySelector('.tags').textContent.includes(tag);
            card.style.display = hasTag ? 'block' : 'none';
        });
    }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    window.app = new PortfolioApp();
});