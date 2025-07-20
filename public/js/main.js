document.addEventListener('DOMContentLoaded', () => {
    const nftGrid = document.getElementById('nft-grid');
    const filterTabs = document.querySelectorAll('.tab-btn');

    // Function to create an NFT card element
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

    // Function to fetch and display NFTs
    const fetchAndDisplayNfts = async (category = 'Art') => {
        try {
            // Clear current grid
            nftGrid.innerHTML = '<p>Loading...</p>'; 
            
            const response = await fetch(`/api/nfts?category=${category}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const nfts = await response.json();

            // Clear loading message
            nftGrid.innerHTML = ''; 

            if (nfts.length === 0) {
                nftGrid.innerHTML = '<p>No items found in this category.</p>';
            } else {
                nfts.forEach(nft => {
                    const nftCard = createNftCard(nft);
                    nftGrid.appendChild(nftCard);
                });
            }
        } catch (error) {
            console.error('Failed to fetch NFTs:', error);
            nftGrid.innerHTML = '<p>Could not load NFTs. Please try again later.</p>';
        }
    };

    // Event listener for filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab style
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Fetch data for the selected category
            const category = tab.getAttribute('data-category');
            fetchAndDisplayNfts(category);
        });
    });

    // Initial load
    fetchAndDisplayNfts('Art'); // Load 'Art' category by default
});