// Prices page functionality with enhanced features

// Use global window.filteredData from script.js
let groceryDataLoaded = false;

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('prices.html')) {
        initializePricesPage();
    }
});

function initializePricesPage() {
    console.log('🚀 Initializing prices page...');
    
    // Load groceryData
    ensureGroceryDataLoaded();
    
    if (groceryDataLoaded && window.groceryData && window.groceryData.length > 0) {
        console.log('📊 Displaying', window.groceryData.length, 'products');
        
        // Use global groceryData and initialize window.filteredData
        window.filteredData = [...window.groceryData];
        
        displayEggs(window.groceryData);
        updatePriceStats();
        setupFilters();
        setupPriceChart();
        setupSearch();
    } else {
        console.error('❌ Failed to load grocery data');
        displayError();
    }
}

function ensureGroceryDataLoaded() {
    // Check if groceryData is available from script.js
    if (typeof groceryData !== 'undefined' && groceryData.length > 0) {
        window.groceryData = groceryData;
        groceryDataLoaded = true;
        console.log('✅ Loaded grocery data from script.js:', groceryData.length, 'products');
        return;
    }
    
    // Use fallback data if script.js data not available
    console.log('⚠️ Using fallback data - script.js not loaded');
    window.groceryData = getFallbackData();
    groceryDataLoaded = true;
}

function getFallbackData() {
    // Return a subset of the data for fallback
    // This ensures we always have some data available
    return [
        { id: 1, name: "Rise N Shine Fresh Colony Mixed Grade Eggs (18pk)", category: "cage-free", brand: "Rise N Shine", packSize: "18pk", pricePerEgg: 0.69, prices: [{ store: "PAK'nSAVE", price: 12.49, distance: 3.2 }] },
        { id: 2, name: "Farmer Brown Fresh Colony Size 6 Eggs (12pk)", category: "cage-free", brand: "Farmer Brown", packSize: "12pk", pricePerEgg: 0.69, prices: [{ store: "PAK'nSAVE", price: 8.29, distance: 3.2 }] },
        { id: 3, name: "Farmer Brown Fresh Colony Size 7 Eggs (12pk)", category: "cage-free", brand: "Farmer Brown", packSize: "12pk", pricePerEgg: 0.73, prices: [{ store: "PAK'nSAVE", price: 8.79, distance: 3.2 }] },
        { id: 4, name: "Henergy Barn Size 6 Eggs (18pk)", category: "barn-laid", brand: "Henergy", packSize: "18pk", pricePerEgg: 0.78, prices: [{ store: "PAK'nSAVE", price: 14.05, distance: 3.2 }] },
        { id: 5, name: "Farmer Brown Cage-Free Barn Size 6 Eggs (12pk)", category: "barn-laid", brand: "Farmer Brown", packSize: "12pk", pricePerEgg: 0.80, prices: [{ store: "PAK'nSAVE", price: 9.59, distance: 3.2 }] },
        { id: 32, name: "Farmer Brown Eggs Cage Free Barn Size 6 (12pk)", category: "barn-laid", brand: "Farmer Brown", packSize: "12pk", pricePerEgg: 0.74, prices: [{ store: "Countdown", price: 8.90, distance: 2.1, specialOffer: "Save $1.85 (was $10.75)" }] },
        { id: 33, name: "Henergy Eggs Cage Free Size 6 (18pk)", category: "cage-free", brand: "Henergy", packSize: "18pk", pricePerEgg: 0.79, prices: [{ store: "Countdown", price: 14.30, distance: 2.1, specialOffer: "Save $1.69 (was $15.99)" }] },
        { id: 78, name: "Rise N Shine Size 7 12 Pack Colony Eggs (12pk)", category: "cage-free", brand: "Rise N Shine", packSize: "12pk", pricePerEgg: 0.62, prices: [{ store: "New World", price: 7.49, distance: 1.8 }] }
    ];
}

function displayError() {
    const grid = document.getElementById('groceryGrid');
    if (grid) {
        grid.innerHTML = `
            <div class="no-results">
                <h3>Unable to load price data</h3>
                <p>We're having trouble loading the latest prices. Please try refreshing the page or check back later.</p>
                <button onclick="location.reload()" class="refresh-btn">
                    <i class="fas fa-refresh"></i> Refresh Page
                </button>
            </div>
        `;
    }
}

function setupFilters() {
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterByCategory);
    }
    
    // Sort filter
    const sortFilter = document.getElementById('sortFilter');
    if (sortFilter) {
        sortFilter.addEventListener('change', sortPrices);
    }
    
    // Store filter
    const storeFilter = document.getElementById('storeFilter');
    if (storeFilter) {
        storeFilter.addEventListener('change', filterByStore);
    }
}

function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchGroceries();
            }
        });
    }
}

function searchGroceries() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm.trim() === '') {
        window.filteredData = [...window.groceryData];
    } else {
        window.filteredData = window.groceryData.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm) ||
            item.prices.some(p => p.store.toLowerCase().includes(searchTerm))
        );
    }
    
    displayEggs(window.filteredData);
    updatePriceStats();
}

function filterByCategory() {
    const category = document.getElementById('categoryFilter').value;
    
    if (category === '') {
        window.filteredData = [...window.groceryData];
    } else {
        window.filteredData = window.groceryData.filter(item => item.category === category);
    }
    
    displayEggs(window.filteredData);
    updatePriceStats();
}

function filterByStore() {
    const storeName = document.getElementById('storeFilter').value.toLowerCase();
    
    if (storeName === '') {
        window.filteredData = [...window.groceryData];
    } else {
        window.filteredData = window.groceryData.filter(item => 
            item.prices.some(p => p.store.toLowerCase().includes(storeName))
        );
    }
    
    displayEggs(window.filteredData);
    updatePriceStats();
}

function sortPrices() {
    const sortType = document.getElementById('sortFilter').value;
    
    switch (sortType) {
        case 'name':
            window.filteredData.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-low':
            window.filteredData.sort((a, b) => getLowestPrice(a) - getLowestPrice(b));
            break;
        case 'price-high':
            window.filteredData.sort((a, b) => getHighestPrice(b) - getHighestPrice(a));
            break;
        case 'price-per-egg':
            window.filteredData.sort((a, b) => (a.pricePerEgg || 0) - (b.pricePerEgg || 0));
            break;
        case 'pack-size':
            window.filteredData.sort((a, b) => {
                const aSize = parseInt(a.packSize.match(/\d+/)?.[0] || '0');
                const bSize = parseInt(b.packSize.match(/\d+/)?.[0] || '0');
                return aSize - bSize;
            });
            break;
        case 'brand':
            window.filteredData.sort((a, b) => (a.brand || '').localeCompare(b.brand || ''));
            break;
        case 'updated':
            // Sort by most recently updated (simulated)
            window.filteredData.sort(() => Math.random() - 0.5);
            break;
    }
    
    displayEggs(window.filteredData);
}

function getLowestPrice(item) {
    return Math.min(...item.prices.map(p => p.price));
}

function getHighestPrice(item) {
    return Math.max(...item.prices.map(p => p.price));
}

function getSavings(item) {
    const lowest = getLowestPrice(item);
    const highest = getHighestPrice(item);
    return highest - lowest;
}

function displayEggs(data) {
    console.log('🎯 displayEggs called with', data ? data.length : 'null', 'items');
    const grid = document.getElementById('groceryGrid');
    if (!grid) {
        console.error('❌ groceryGrid element not found');
        return;
    }
    
    if (!data || data.length === 0) {
        console.log('⚠️ No data to display');
        grid.innerHTML = '<div class="no-results"><h3>No eggs found matching your criteria.</h3><p>Try adjusting your filters or search terms.</p></div>';
        return;
    }
    
    grid.innerHTML = data.map(item => {
        const sortedPrices = [...item.prices].sort((a, b) => a.price - b.price);
        const lowestPrice = sortedPrices[0];
        const highestPrice = sortedPrices[sortedPrices.length - 1];
        const savings = highestPrice.price - lowestPrice.price;
        
        return `
            <div class="grocery-item enhanced" data-item-id="${item.id}">
                <div class="grocery-header">
                    <h3 class="grocery-name">${item.name}</h3>
                    <div class="product-meta">
                        <span class="brand-badge">${item.brand || ''}</span>
                    <span class="category-badge">${item.category}</span>
                        <span class="pack-size-badge">${item.packSize}</span>
                    </div>
                    <div class="item-actions">
                        <button onclick="toggleFavorite(${item.id})" class="favorite-btn" title="Add to favorites">
                            <i class="far fa-heart"></i>
                        </button>
                        <button onclick="addToPriceAlert(${item.id})" class="alert-btn" title="Set price alert">
                            <i class="fas fa-bell"></i>
                        </button>
                    </div>
                </div>
                
                <div class="price-comparison-list">
                    ${sortedPrices.map(priceItem => `
                        <div class="price-item enhanced" data-store="${priceItem.store}">
                            <div class="store-info">
                                <span class="store-name">${priceItem.store}</span>
                                <span class="store-distance">${priceItem.distance} km</span>
                            </div>
                            <div class="price-info">
                                <span class="price ${priceItem.price === lowestPrice.price ? 'lowest' : priceItem.price === highestPrice.price ? 'highest' : ''}" data-item-id="${item.id}" data-store="${priceItem.store}">
                                    <span class="price-amount">$${priceItem.price.toFixed(2)} NZD</span>
                                    ${priceItem.priceUnit ? `<span class="price-unit">(${priceItem.priceUnit})</span>` : ''}
                                    ${priceItem.specialOffer ? `<span class="special-offer">${priceItem.specialOffer}</span>` : ''}
                                </span>
                                <button onclick="viewPriceHistory(${item.id}, '${priceItem.store}')" class="history-btn" title="View price history">
                                    <i class="fas fa-chart-line"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                ${savings > 0 ? `
                    <div class="savings-info">
                        <span class="savings">Save $${savings.toFixed(2)} NZD by choosing ${lowestPrice.store}</span>
                        <div class="savings-percentage">${((savings / highestPrice.price) * 100).toFixed(1)}% savings</div>
                    </div>
                ` : ''}
                
                <div class="item-stats">
                    <div class="stat">
                        <span class="stat-label">Pack Size:</span>
                        <span class="stat-value">${item.packSize}</span>
                    </div>
                    ${item.pricePerEgg ? `
                    <div class="stat">
                        <span class="stat-label">Price per Egg:</span>
                        <span class="stat-value">$${item.pricePerEgg.toFixed(2)}</span>
                    </div>
                    ` : ''}
                    <div class="stat">
                        <span class="stat-label">Total Price:</span>
                        <span class="stat-value">$${lowestPrice.price.toFixed(2)}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Brand:</span>
                        <span class="stat-value">${item.brand || 'Unknown'}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function updatePriceStats() {
    if (!window.filteredData.length) return;
    
    // Update total items
    const totalItemsElement = document.getElementById('totalItems');
    if (totalItemsElement) {
        totalItemsElement.textContent = window.filteredData.length;
    }
    
    // Update average savings
    const avgSavingsElement = document.getElementById('avgSavings');
    if (avgSavingsElement) {
        const totalSavings = window.filteredData.reduce((sum, item) => sum + getSavings(item), 0);
        const avgSavings = totalSavings / window.filteredData.length;
        avgSavingsElement.textContent = `$${avgSavings.toFixed(2)}`;
    }
    
    // Update best store
    const bestStoreElement = document.getElementById('bestStore');
    if (bestStoreElement) {
        const storeSavings = {};
        
        window.filteredData.forEach(item => {
            const lowestPrice = getLowestPrice(item);
            const bestStore = item.prices.find(p => p.price === lowestPrice).store;
            storeSavings[bestStore] = (storeSavings[bestStore] || 0) + 1;
        });
        
        const bestStore = Object.keys(storeSavings).reduce((a, b) => 
            storeSavings[a] > storeSavings[b] ? a : b
        );
        
        bestStoreElement.textContent = bestStore;
    }
}

function setupPriceChart() {
    const canvas = document.getElementById('priceChart');
    if (!canvas || typeof Chart === 'undefined') return;
    
    const ctx = canvas.getContext('2d');
    
    // Generate sample price trend data
    const days = 7;
    const labels = [];
    const datasets = [];
    
    // Generate last 7 days
    for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        labels.push(date.toLocaleDateString('en-NZ', { weekday: 'short' }));
    }
    
    // Create datasets for top 3 most popular items
    const popularItems = window.filteredData.slice(0, 3);
    const colors = ['#667eea', '#f093fb', '#28a745'];
    
    popularItems.forEach((item, index) => {
        const basePrice = getLowestPrice(item);
        const data = [];
        
        // Generate realistic price fluctuations
        for (let i = 0; i < days; i++) {
            const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
            data.push(+(basePrice * (1 + variation)).toFixed(2));
        }
        
        datasets.push({
            label: item.name,
            data: data,
            borderColor: colors[index],
            backgroundColor: colors[index] + '20',
            borderWidth: 2,
            tension: 0.4
        });
    });
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toFixed(2);
                        }
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Price Trends (Last 7 Days)'
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            }
        }
    });
}

// Enhanced functionality for premium features
function toggleFavorite(itemId) {
    if (!window.authSystem || !window.authSystem.isLoggedIn()) {
        showAuthModal('signup');
        return;
    }
    
    // Toggle favorite status (simplified implementation)
    const favoriteBtn = event.target;
    const isCurrentlyFavorite = favoriteBtn.classList.contains('favorited');
    
    if (isCurrentlyFavorite) {
        favoriteBtn.classList.remove('favorited');
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
        showToast('Removed from favorites', 'info');
    } else {
        favoriteBtn.classList.add('favorited');
        favoriteBtn.innerHTML = '<i class="fas fa-heart"></i>';
        showToast('Added to favorites', 'success');
    }
}

function addToPriceAlert(itemId) {
    if (!window.authSystem || !window.authSystem.isLoggedIn()) {
        showAuthModal('signup');
        return;
    }
    
    if (!window.authSystem.isPremium()) {
        showPremiumModal();
        return;
    }
    
    // Premium feature: Set price alert
    const item = groceryData.find(i => i.id === itemId);
    if (item) {
        const targetPrice = prompt(`Set price alert for ${item.name}. Current lowest price: $${getLowestPrice(item).toFixed(2)} NZD\n\nAlert me when price drops below:`);
        
        if (targetPrice && !isNaN(targetPrice)) {
            showToast(`Price alert set for ${item.name} at $${parseFloat(targetPrice).toFixed(2)} NZD`, 'success');
        }
    }
}

function viewPriceHistory(itemId, store) {
    if (!window.authSystem || !window.authSystem.isLoggedIn()) {
        showAuthModal('signup');
        return;
    }
    
    if (!window.authSystem.isPremium()) {
        showPremiumModal();
        return;
    }
    
    // Premium feature: View detailed price history
    const item = groceryData.find(i => i.id === itemId);
    if (item) {
        showToast(`Opening price history for ${item.name} at ${store}`, 'info');
        // In a real app, this would open a detailed price history modal
    }
}

function refreshPrices() {
    // Show loading state
    const refreshBtn = document.querySelector('.refresh-btn');
    if (refreshBtn) {
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
        refreshBtn.disabled = true;
    }
    
    // Simulate refresh by reloading data
    setTimeout(() => {
        ensureGroceryDataLoaded();
        window.filteredData = [...window.groceryData];
        displayEggs(window.filteredData);
        updatePriceStats();
        
        // Update last updated time
        const lastUpdateElement = document.getElementById('lastUpdateTime');
        if (lastUpdateElement) {
            lastUpdateElement.textContent = new Date().toLocaleTimeString();
        }
        
        if (typeof showToast === 'function') {
            showToast('Price data refreshed!', 'success');
        }
        
        // Reset refresh button
        if (refreshBtn) {
            refreshBtn.innerHTML = '<i class="fas fa-refresh"></i> Refresh';
            refreshBtn.disabled = false;
        }
    }, 1000);
}

// Debug function to test data loading
window.debugPrices = function() {
    console.log('🔍 Debug Prices Function');
    console.log('groceryDataLoaded:', groceryDataLoaded);
    console.log('window.groceryData:', window.groceryData ? window.groceryData.length : 'undefined');
    console.log('groceryData (from script.js):', typeof groceryData !== 'undefined' ? groceryData.length : 'undefined');
    console.log('window.filteredData:', window.filteredData ? window.filteredData.length : 'undefined');
    
    if (window.groceryData && window.groceryData.length > 0) {
        console.log('First product:', window.groceryData[0]);
        displayEggs(window.groceryData.slice(0, 3)); // Show first 3 products
    }
};

// Make functions globally accessible
window.refreshPrices = refreshPrices;
window.searchGroceries = searchGroceries;
window.filterByCategory = filterByCategory;
window.filterByStore = filterByStore;
window.sortPrices = sortPrices;