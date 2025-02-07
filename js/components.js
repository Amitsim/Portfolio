class Component {
    constructor(element) {
        this.element = element;
    }

    render() {
        throw new Error('Render method must be implemented');
    }
}

class ProjectCard extends Component {
    constructor(project) {
        super();
        this.project = project;
    }

    render() {
        const template = document.getElementById('project-card-template');
        const card = template.content.cloneNode(true);
        
        // Populate template
        card.querySelector('h3').textContent = this.project.title;
        card.querySelector('p').textContent = this.project.description;
        
        // Handle media (image/video)
        const mediaContainer = card.querySelector('.project-media');
        if (this.project.video) {
            const video = mediaContainer.querySelector('video');
            video.src = this.project.video;
            video.style.display = 'block';
            mediaContainer.querySelector('img').style.display = 'none';
        } else {
            mediaContainer.querySelector('img').src = this.project.image;
        }
        
        // Add tags
        const tagsContainer = card.querySelector('.tags');
        this.project.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });
        
        // Add stats
        if (CONFIG.features.statistics) {
            const stats = card.querySelector('.project-stats');
            stats.querySelector('.views').textContent = `👁️ ${this.project.stats.views}`;
            stats.querySelector('.likes').textContent = `❤️ ${this.project.stats.likes}`;
        }
        
        return card;
    }
}

// More components (BlogPost, SkillsSection, etc.)...