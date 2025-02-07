document.addEventListener("DOMContentLoaded", async function () {
    await loadProjects();
    await loadBlogPosts();
    setupDarkMode();
    setupMobileMenu();
});

// Load projects from JSON
async function loadProjects() {
    const response = await fetch("../data/data.json");
    const data = await response.json();
    const projectsContainer = document.getElementById("projects-container");

    data.projects.forEach(project => {
        const projectElement = document.createElement("div");
        projectElement.className = "project-card";
        projectElement.innerHTML = `
            <img src="${project.image}" alt="${project.title}" loading="lazy">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <a href="${project.link}">View Project →</a>
            </div>
        `;
        projectsContainer.appendChild(projectElement);
    });
}

// Load blog posts from JSON
async function loadBlogPosts() {
    const response = await fetch("../data/data.json");
    const data = await response.json();
    const blogContainer = document.getElementById("blog-container");

    data.blogPosts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.className = "blog-card";
        postElement.innerHTML = `
            <div class="date">${post.date}</div>
            <h3>${post.title}</h3>
            <p>${post.preview}</p>
            <a href="${post.link}">Read More →</a>
        `;
        blogContainer.appendChild(postElement);
    });
}

// Dark Mode Toggle
function setupDarkMode() {
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}
