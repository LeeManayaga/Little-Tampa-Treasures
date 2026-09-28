const urlParams = new URLSearchParams(window.location.search);
const selectedId = urlParams.get('id');
const container = document.getElementById('detail-container');

async function fetchItemDetails() {
  try {
    const response = await fetch(`/api/items/${selectedId}`);
    
    if (!response.ok) {
      return window.location.replace('404.html');
    }
    
    const item = await response.json();
    const maxPrice = 3;
    const priceHtml = Array.from({ length: maxPrice }, (_, index) => {
      const isActive = index < (item.price || 0);
      return `<span class="price-dollar ${isActive ? 'active' : 'inactive'}">$</span>`;
    }).join('');

    container.innerHTML = `
      <article class="detail-card">
        <img src="${item.image}" alt="${item.title}" class="detail-image">
        <div class="detail-body">
          <div class="tags-container">
            ${(item.tags || []).map(tag => `<span class="tag-pill">${tag}</span>`).join('')}
          </div>
          <h1 style="margin-bottom: 0.5rem;">${item.title}</h1>
          ${item.description ? `<p>${item.description}</p>` : ''}
          <div class="meta-info">
            <div class="meta-row">
              <span class="meta-label">PRICE RANGE</span>
              <div class="price-container">
                ${priceHtml}
              </div>
            </div>
            ${item.address ? `
              <div class="meta-row">
                <span class="meta-label">ADDRESS</span>
                <address style="margin: 0; font-style: normal;">
                  ${item.address}
                </address>
              </div>
            ` : ''}
          </div>
        </div>
      </article>
    `;
  } catch (error) {
    console.error('Error fetching details:', error);
    window.location.replace('404.html');
  }
}

fetchItemDetails();