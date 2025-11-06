// Dashboard specific JavaScript functionality

// Sample grocery data for dashboard
const groceryData = [
    {
        id: 1,
        name: "Bananas (1 kg)",
        category: "fruits",
        prices: [
            { store: "Countdown", price: 3.50, distance: 2.1 },
            { store: "New World", price: 3.99, distance: 1.8 },
            { store: "PAK'nSAVE", price: 2.99, distance: 3.2 },
            { store: "FreshChoice", price: 3.79, distance: 2.5 }
        ]
    },
    {
        id: 2,
        name: "Mince Beef (500g)",
        category: "meat",
        prices: [
            { store: "Countdown", price: 8.50, distance: 2.1 },
            { store: "New World", price: 9.99, distance: 1.8 },
            { store: "PAK'nSAVE", price: 7.50, distance: 3.2 },
            { store: "The Mad Butcher", price: 8.99, distance: 1.2 }
        ]
    },
    {
        id: 3,
        name: "Milk (2L)",
        category: "dairy",
        prices: [
            { store: "Countdown", price: 4.20, distance: 2.1 },
            { store: "New World", price: 4.50, distance: 1.8 },
            { store: "PAK'nSAVE", price: 3.99, distance: 3.2 },
            { store: "Four Square", price: 4.80, distance: 0.8 }
        ]
    }
];

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    populateDashboardStats();
    populateBestDeals();
    populatePriceAlerts();
    populateQuickActions();
}

function populateDashboardStats() {
    const statsContainer = document.querySelector('.dashboard-stats');
    if (!statsContainer) return;

    // Calculate stats from grocery data
    let totalItems = groceryData.length;
    let lowestPrice = Math.min(...groceryData.map(item => Math.min(...item.prices.map(p => p.price))));
    let averagePrice = groceryData.reduce((sum, item) => {
        const itemAvg = item.prices.reduce((pSum, p) => pSum + p.price, 0) / item.prices.length;
        return sum + itemAvg;
    }, 0) / groceryData.length;

    const statsHTML = `
        <div class="stat-card">
            <i class="fas fa-shopping-basket"></i>
            <div class="stat-info">
                <h3>${totalItems}</h3>
                <p>Items Tracked</p>
            </div>
        </div>
        <div class="stat-card">
            <i class="fas fa-dollar-sign"></i>
            <div class="stat-info">
                <h3>$${lowestPrice.toFixed(2)}</h3>
                <p>Best Deal Today</p>
            </div>
        </div>
        <div class="stat-card">
            <i class="fas fa-chart-line"></i>
            <div class="stat-info">
                <h3>$${averagePrice.toFixed(2)}</h3>
                <p>Average Price</p>
            </div>
        </div>
        <div class="stat-card">
            <i class="fas fa-store"></i>
            <div class="stat-info">
                <h3>8</h3>
                <p>Stores Compared</p>
            </div>
        </div>
    `;

    statsContainer.innerHTML = statsHTML;
}

function populateBestDeals() {
    const bestDealsContainer = document.querySelector('.best-deals');
    if (!bestDealsContainer) return;

    // Find best deals (lowest price for each item)
    const bestDeals = groceryData.map(item => {
        const lowestPriceStore = item.prices.reduce((min, current) => 
            current.price < min.price ? current : min
        );
        return {
            name: item.name,
            store: lowestPriceStore.store,
            price: lowestPriceStore.price,
            category: item.category
        };
    }).slice(0, 3); // Show top 3 deals

    const dealsHTML = bestDeals.map(deal => `
        <div class="deal-item">
            <div class="deal-info">
                <h4>${deal.name}</h4>
                <p>${deal.store}</p>
            </div>
            <div class="deal-price">
                <span class="price">$${deal.price.toFixed(2)}</span>
                <span class="category">${deal.category}</span>
            </div>
        </div>
    `).join('');

    bestDealsContainer.innerHTML = dealsHTML;
}

function populatePriceAlerts() {
    const alertsContainer = document.querySelector('.alerts-grid');
    if (!alertsContainer) return;

    // Sample price alerts (in production, fetch from backend)
    const alerts = [
        { item: 'Bananas (1 kg)', targetPrice: 3.00, currentPrice: 2.99, status: 'triggered' },
        { item: 'Milk (2L)', targetPrice: 4.00, currentPrice: 4.20, status: 'waiting' },
        { item: 'Bread (Loaf)', targetPrice: 2.50, currentPrice: 2.80, status: 'waiting' }
    ];

    const alertsHTML = alerts.map(alert => `
        <div class="alert-card ${alert.status}">
            <div class="alert-info">
                <h4>${alert.item}</h4>
                <p>Target: $${alert.targetPrice.toFixed(2)}</p>
                <p>Current: $${alert.currentPrice.toFixed(2)}</p>
            </div>
            <div class="alert-status">
                <i class="fas ${alert.status === 'triggered' ? 'fa-bell text-success' : 'fa-clock text-warning'}"></i>
            </div>
        </div>
    `).join('');

    alertsContainer.innerHTML = alertsHTML;
}

function populateQuickActions() {
    const quickActionsContainer = document.querySelector('.quick-actions');
    if (!quickActionsContainer) return;

    const actionsHTML = `
        <div class="action-card" onclick="window.location.href='prices.html'">
            <i class="fas fa-search"></i>
            <h3>Compare Prices</h3>
            <p>Find the best deals across all stores</p>
        </div>


        <div class="action-card premium" onclick="showPremiumModal()">
            <i class="fas fa-star"></i>
            <h3>Premium Features</h3>
            <p>Unlock advanced price alerts and insights</p>
            <span class="premium-badge">Premium</span>
        </div>
    `;

    quickActionsContainer.innerHTML = actionsHTML;
}

// Export functions for global use
window.populateDashboardStats = populateDashboardStats;
window.populateBestDeals = populateBestDeals;
window.populatePriceAlerts = populatePriceAlerts;
window.populateQuickActions = populateQuickActions;

