let projects = [];

const container = document.getElementById('cards-container');
const searchInput = document.getElementById('search');
const tagFiltersContainer = document.getElementById('tag-filters');

function populateTagFilters() {
  if (!tagFiltersContainer) return;
  const allTags = [...new Set(projects.flatMap(project => project.tags || []))];
  tagFiltersContainer.innerHTML = `
    <legend>Filter by Tags</legend>
    ${allTags.map(tag => `
      <label>
        <input type="checkbox" name="tag" value="${tag}">
        ${tag.charAt(0).toUpperCase() + tag.slice(1)}
      </label>
    `).join('')}
  `;
}

function renderCards(data) {
  if (!container) return;
  if (data.length === 0) {
    container.innerHTML = '<p>No matching projects found.</p>';
    return;
  }
  container.innerHTML = data.map(card => `
    <a href="details.html?id=${card.id}" class="card-link">
      <article class="hover-card">
        <img src="${card.image}" alt="${card.title}" class="card-image">
        <div class="card-overlay">
          <h3 style="margin-bottom: 0;">${card.title}</h3>
          <div class="tags-container">
            ${(card.tags || []).map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
          </div>
        </div>
      </article>
    </a>
  `).join('');
}

function handleFilters() {
  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const activeCheckboxes = document.querySelectorAll('input[name="tag"]:checked');
  const activeTags = Array.from(activeCheckboxes).map(box => box.value);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm);
    const matchesTags = activeTags.length === 0 || 
                        activeTags.every(tag => (project.tags || []).includes(tag));
    return matchesSearch && matchesTags;
  });

  renderCards(filteredProjects);
}

// Fetch from the Render database instead of data.js
async function fetchItems() {
  try {
    const response = await fetch('/api/items');
    projects = await response.json();
    populateTagFilters();
    renderCards(projects);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchItems();

if (searchInput) searchInput.addEventListener('input', handleFilters);
if (tagFiltersContainer) tagFiltersContainer.addEventListener('change', handleFilters);