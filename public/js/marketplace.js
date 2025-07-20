// Filename: public/js/marketplace.js
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('marketplace-grid');
    const searchInput = document.getElementById('search-input');
    const categoryFilter = document.getElementById('category-filter');
    const sortOrder = document.getElementById('sort-order');
    const applyBtn = document.getElementById('apply-filters-btn');

    const createNftCard = (nft) => {
        const card = document.createElement('div');
        card.className = 'nft-card';
        card.innerHTML = `
            <img src="${nft.image_url}" alt="${nft.title}" class="card-image">
            <div class="card-info">
                <p>@${nft.creator}</p>
                <p class="price">${nft.price} ETH</p>
            </div>
            <h4 class="card-title">${nft.title}</h4>
            <button class="card-bid-btn">Place a bid</button>
        `;
        return card;
    };

    const fetchAndDisplayNfts = async () => {
        const searchTerm = searchInput.value;
        const category = categoryFilter.value;
        const sortBy = sortOrder.value;

        // Build query string
        const queryParams = new URLSearchParams({
            search: searchTerm,
            category: category,
            sort: sortBy
        });

        try {
            grid.innerHTML = '<p>Loading...</p>';
            
            const response = await fetch(`/api/nfts?${queryParams.toString()}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const nfts = await response.json();

            grid.innerHTML = '';
            if (nfts.length === 0) {
                grid.innerHTML = '<p style="text-align: center; width: 100%;">No NFTs found with the current filters.</p>';
            } else {
                nfts.forEach(nft => {
                    grid.appendChild(createNftCard(nft));
                });
            }
        } catch (error) {
            console.error('Failed to fetch marketplace NFTs:', error);
            grid.innerHTML = '<p style="text-align: center; width: 100%;">Could not load NFTs. Please try again later.</p>';
        }
    };

    // Add event listener to the apply button
    applyBtn.addEventListener('click', fetchAndDisplayNfts);
    
    // Optional: Allow pressing enter in the search bar to trigger search
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            fetchAndDisplayNfts();
        }
    });

    // Initial load of all NFTs
    fetchAndDisplayNfts();
});