// Real egg price data from PAK'nSAVE New Zealand - Complete dataset
const groceryData = [
    { id: 1, name: "Rise N Shine Fresh Colony Mixed Grade Eggs (18pk)", category: "cage-free", brand: "Rise N Shine", packSize: "18pk", pricePerEgg: 0.69, prices: [{ store: "PAK'nSAVE", price: 12.49, distance: 3.2 }] },
    { id: 2, name: "Farmer Brown Fresh Colony Size 6 Eggs (12pk)", category: "cage-free", brand: "Farmer Brown", packSize: "12pk", pricePerEgg: 0.69, prices: [{ store: "PAK'nSAVE", price: 8.29, distance: 3.2 }] },
    { id: 3, name: "Farmer Brown Fresh Colony Size 7 Eggs (12pk)", category: "cage-free", brand: "Farmer Brown", packSize: "12pk", pricePerEgg: 0.73, prices: [{ store: "PAK'nSAVE", price: 8.79, distance: 3.2 }] },
    { id: 4, name: "Henergy Barn Size 6 Eggs (18pk)", category: "barn-laid", brand: "Henergy", packSize: "18pk", pricePerEgg: 0.78, prices: [{ store: "PAK'nSAVE", price: 14.05, distance: 3.2 }] },
    { id: 5, name: "Farmer Brown Cage-Free Barn Size 6 Eggs (12pk)", category: "barn-laid", brand: "Farmer Brown", packSize: "12pk", pricePerEgg: 0.80, prices: [{ store: "PAK'nSAVE", price: 9.59, distance: 3.2 }] },
    { id: 6, name: "Little Red Hen Cage Free Mixed Grade Barn Eggs (20pk)", category: "barn-laid", brand: "Little Red Hen", packSize: "20pk", pricePerEgg: 0.80, prices: [{ store: "PAK'nSAVE", price: 15.99, distance: 3.2 }] },
    { id: 7, name: "Farmer Brown Barn Size 6 Eggs (18pk)", category: "barn-laid", brand: "Farmer Brown", packSize: "18pk", pricePerEgg: 0.81, prices: [{ store: "PAK'nSAVE", price: 14.49, distance: 3.2 }] },
    { id: 8, name: "Farmer Brown Cage-Free Barn Size 7 Eggs (12pk)", category: "barn-laid", brand: "Farmer Brown", packSize: "12pk", pricePerEgg: 0.84, prices: [{ store: "PAK'nSAVE", price: 10.09, distance: 3.2 }] },
    { id: 9, name: "Farmer Brown Barn Cage Free Size 7 Eggs (18pk)", category: "barn-laid", brand: "Farmer Brown", packSize: "18pk", pricePerEgg: 0.86, prices: [{ store: "PAK'nSAVE", price: 15.49, distance: 3.2 }] },
    { id: 10, name: "Zealand Farms Free Range Animal Welfare Foods Mixed Grade Eggs (12pk)", category: "free-range", brand: "Zealand Farms", packSize: "12pk", pricePerEgg: 0.87, prices: [{ store: "PAK'nSAVE", price: 10.49, distance: 3.2 }] },
    { id: 11, name: "Natural Green Free Range Eggs (20pk)", category: "free-range", brand: "Natural Green", packSize: "20pk", pricePerEgg: 0.88, prices: [{ store: "PAK'nSAVE", price: 17.59, distance: 3.2 }] },
    { id: 12, name: "Wholesome Barn Cage Free Size 7 Eggs (10pk)", category: "barn-laid", brand: "Wholesome", packSize: "10pk", pricePerEgg: 0.88, prices: [{ store: "PAK'nSAVE", price: 8.79, distance: 3.2 }] },
    { id: 13, name: "Henergy Cage-Free A Grade Jumbo Eggs (10pk)", category: "cage-free", brand: "Henergy", packSize: "10pk", pricePerEgg: 0.90, prices: [{ store: "PAK'nSAVE", price: 8.99, distance: 3.2 }] },
    { id: 14, name: "Farmer Brown Fresh Colony Size 8 Eggs (6pk)", category: "cage-free", brand: "Farmer Brown", packSize: "6pk", pricePerEgg: 0.90, prices: [{ store: "PAK'nSAVE", price: 5.39, distance: 3.2 }] },
    { id: 15, name: "Woodland Free Range Size 6 Eggs (18pk)", category: "free-range", brand: "Woodland", packSize: "18pk", pricePerEgg: 0.92, prices: [{ store: "PAK'nSAVE", price: 16.49, distance: 3.2 }] },
    { id: 16, name: "Better Eggs Mixed Free Range Eggs (12pk)", category: "free-range", brand: "Better Eggs", packSize: "12pk", pricePerEgg: 0.92, prices: [{ store: "PAK'nSAVE", price: 10.99, distance: 3.2 }] },
    { id: 17, name: "Woodland Free Range Size 6 Eggs (10pk)", category: "free-range", brand: "Woodland", packSize: "10pk", pricePerEgg: 0.93, prices: [{ store: "PAK'nSAVE", price: 9.29, distance: 3.2 }] },
    { id: 18, name: "Otaika Valley Premium Free Range Mixed Grade Eggs (10pk)", category: "free-range", brand: "Otaika Valley", packSize: "10pk", pricePerEgg: 0.93, prices: [{ store: "PAK'nSAVE", price: 9.29, distance: 3.2 }] },
    { id: 19, name: "Otaika Valley Premium Free Range Mixed Grade Eggs (18pk)", category: "free-range", brand: "Otaika Valley", packSize: "18pk", pricePerEgg: 0.94, prices: [{ store: "PAK'nSAVE", price: 16.89, distance: 3.2 }] },
    { id: 20, name: "Farmer Brown Barn Cage Free Size 8 Eggs (10pk)", category: "barn-laid", brand: "Farmer Brown", packSize: "10pk", pricePerEgg: 0.95, prices: [{ store: "PAK'nSAVE", price: 9.49, distance: 3.2 }] },
    { id: 21, name: "Woodland Free Range Size 7 Eggs (10pk)", category: "free-range", brand: "Woodland", packSize: "10pk", pricePerEgg: 0.96, prices: [{ store: "PAK'nSAVE", price: 9.59, distance: 3.2 }] },
    { id: 22, name: "Better Eggs Free Range Size 7 Eggs (12pk)", category: "free-range", brand: "Better Eggs", packSize: "12pk", pricePerEgg: 0.96, prices: [{ store: "PAK'nSAVE", price: 11.49, distance: 3.2 }] },
    { id: 23, name: "Higgins Family Free Range Size 7 Eggs (12pk)", category: "free-range", brand: "Higgins Family", packSize: "12pk", pricePerEgg: 0.97, prices: [{ store: "PAK'nSAVE", price: 11.69, distance: 3.2 }] },
    { id: 24, name: "Otaika Valley Premium Free Range Size 7 Eggs (12pk)", category: "free-range", brand: "Otaika Valley", packSize: "12pk", pricePerEgg: 0.98, prices: [{ store: "PAK'nSAVE", price: 11.75, distance: 3.2 }] },
    { id: 25, name: "Better Eggs Free Range Size 7 Eggs (6pk)", category: "free-range", brand: "Better Eggs", packSize: "6pk", pricePerEgg: 1.00, prices: [{ store: "PAK'nSAVE", price: 6.00, distance: 3.2 }] },
    { id: 26, name: "Woodland Free Range Grade 8 Eggs (10pk)", category: "free-range", brand: "Woodland", packSize: "10pk", pricePerEgg: 1.10, prices: [{ store: "PAK'nSAVE", price: 10.99, distance: 3.2 }] },
    { id: 27, name: "Otaika Valley Premium Free Range Size 7 Eggs (6pk)", category: "free-range", brand: "Otaika Valley", packSize: "6pk", pricePerEgg: 1.13, prices: [{ store: "PAK'nSAVE", price: 6.75, distance: 3.2 }] },
    { id: 28, name: "Wholesome New Zealand Organic Mixed Grade Eggs (10pk)", category: "organic", brand: "Wholesome", packSize: "10pk", pricePerEgg: 1.18, prices: [{ store: "PAK'nSAVE", price: 11.79, distance: 3.2 }] },
    { id: 29, name: "Better Eggs Free Range Size 8 Eggs (10pk)", category: "free-range", brand: "Better Eggs", packSize: "10pk", pricePerEgg: 1.19, prices: [{ store: "PAK'nSAVE", price: 11.89, distance: 3.2 }] },
    { id: 30, name: "Otaika Valley Premium Free Range Size 8 Eggs (10pk)", category: "free-range", brand: "Otaika Valley", packSize: "10pk", pricePerEgg: 1.23, prices: [{ store: "PAK'nSAVE", price: 12.29, distance: 3.2 }] },
    { id: 31, name: "Zeagold Egg White Natural Protein (980ml)", category: "specialty", brand: "Zeagold", packSize: "980ml", pricePerEgg: null, prices: [{ store: "PAK'nSAVE", price: 12.39, distance: 3.2, priceUnit: "$1.26/100ml" }] },
    // Countdown Products
    { id: 32, name: "Farmer Brown Eggs Cage Free Barn Size 6 (12pk)", category: "barn-laid", brand: "Farmer Brown", packSize: "12pk", pricePerEgg: 0.74, prices: [{ store: "Countdown", price: 8.90, distance: 2.1, specialOffer: "Save $1.85 (was $10.75)" }] },
    { id: 33, name: "Henergy Eggs Cage Free Size 6 (18pk)", category: "cage-free", brand: "Henergy", packSize: "18pk", pricePerEgg: 0.79, prices: [{ store: "Countdown", price: 14.30, distance: 2.1, specialOffer: "Save $1.69 (was $15.99)" }] },
    { id: 34, name: "Woolworths Eggs Barn Mixed Grade (12pk)", category: "barn-laid", brand: "Woolworths", packSize: "12pk", pricePerEgg: 0.79, prices: [{ store: "Countdown", price: 9.50, distance: 2.1, specialOffer: "LOW PRICE" }] },
    { id: 35, name: "Henergy Eggs Cage Free Jumbo (10pk)", category: "cage-free", brand: "Henergy", packSize: "10pk", pricePerEgg: 0.80, prices: [{ store: "Countdown", price: 8.00, distance: 2.1, specialOffer: "20% Off (was $10.20)" }] },
    { id: 36, name: "Woolworths Eggs Barn Mixed Grade (20pk)", category: "barn-laid", brand: "Woolworths", packSize: "20pk", pricePerEgg: 0.83, prices: [{ store: "Countdown", price: 16.50, distance: 2.1, specialOffer: "LOW PRICE" }] },
    { id: 37, name: "Farmer Brown Eggs Cage Free Barn Size 6 (18pk)", category: "barn-laid", brand: "Farmer Brown", packSize: "18pk", pricePerEgg: 0.88, prices: [{ store: "Countdown", price: 15.80, distance: 2.1 }] },
    { id: 38, name: "Woolworths Eggs Barn Size 7 (12pk)", category: "barn-laid", brand: "Woolworths", packSize: "12pk", pricePerEgg: 0.88, prices: [{ store: "Countdown", price: 10.50, distance: 2.1, specialOffer: "LOW PRICE" }] },
    { id: 39, name: "Macro Eggs Free Range Mixed Grade (18pk)", category: "free-range", brand: "Macro", packSize: "18pk", pricePerEgg: 0.89, prices: [{ store: "Countdown", price: 16.00, distance: 2.1, specialOffer: "LOW PRICE" }] },
    { id: 40, name: "Otaika Valley Eggs Free Range Mixed Grade (10pk)", category: "free-range", brand: "Otaika Valley", packSize: "10pk", pricePerEgg: 0.89, prices: [{ store: "Countdown", price: 8.90, distance: 2.1, specialOffer: "Save $1.09 (was $9.99)" }] },
    { id: 41, name: "Henergy Eggs Cage Free Size 6 (12pk)", category: "cage-free", brand: "Henergy", packSize: "12pk", pricePerEgg: 0.90, prices: [{ store: "Countdown", price: 10.79, distance: 2.1 }] },
    { id: 42, name: "Macro Eggs Free Range Mixed Grade (12pk)", category: "free-range", brand: "Macro", packSize: "12pk", pricePerEgg: 0.90, prices: [{ store: "Countdown", price: 10.80, distance: 2.1, specialOffer: "LOW PRICE" }] },
    { id: 43, name: "Woolworths Eggs Barn Mixed Grade (6pk)", category: "barn-laid", brand: "Woolworths", packSize: "6pk", pricePerEgg: 0.90, prices: [{ store: "Countdown", price: 5.40, distance: 2.1, specialOffer: "LOW PRICE" }] },
    { id: 44, name: "Woolworths Eggs Barn Size 7 (18pk)", category: "barn-laid", brand: "Woolworths", packSize: "18pk", pricePerEgg: 0.90, prices: [{ store: "Countdown", price: 16.20, distance: 2.1, specialOffer: "LOW PRICE" }] },
    { id: 45, name: "Traditional Eggs Free Range Size 6 (20pk)", category: "free-range", brand: "Traditional", packSize: "20pk", pricePerEgg: 0.90, prices: [{ store: "Countdown", price: 17.90, distance: 2.1 }] },
    { id: 46, name: "Animal Welfare Foods Eggs Free Range Mixed Grade (12pk)", category: "free-range", brand: "Animal Welfare Foods", packSize: "12pk", pricePerEgg: 0.92, prices: [{ store: "Countdown", price: 11.00, distance: 2.1 }] },
    { id: 47, name: "Better Eggs SPCA Eggs Free Range Mixed Grade (12pk)", category: "free-range", brand: "Better Eggs", packSize: "12pk", pricePerEgg: 0.92, prices: [{ store: "Countdown", price: 10.99, distance: 2.1, specialOffer: "Member Price (Non-member $12.29)" }] },
    { id: 48, name: "Farmer Brown Eggs Cage Free Barn Size 7 (18pk)", category: "barn-laid", brand: "Farmer Brown", packSize: "18pk", pricePerEgg: 0.93, prices: [{ store: "Countdown", price: 16.70, distance: 2.1 }] },
    { id: 49, name: "Henergy Eggs Cage Free Size 7 (18pk)", category: "cage-free", brand: "Henergy", packSize: "18pk", pricePerEgg: 0.93, prices: [{ store: "Countdown", price: 16.70, distance: 2.1 }] },
    { id: 50, name: "Henergy Eggs Cage Free Size 7 (12pk)", category: "cage-free", brand: "Henergy", packSize: "12pk", pricePerEgg: 0.94, prices: [{ store: "Countdown", price: 11.25, distance: 2.1 }] },
    { id: 51, name: "Farmer Brown Eggs Cage Free Barn Size 7 (12pk)", category: "barn-laid", brand: "Farmer Brown", packSize: "12pk", pricePerEgg: 0.94, prices: [{ store: "Countdown", price: 11.30, distance: 2.1 }] },
    { id: 52, name: "Woodland Eggs Free Range Size 7 (10pk)", category: "free-range", brand: "Woodland", packSize: "10pk", pricePerEgg: 0.97, prices: [{ store: "Countdown", price: 9.70, distance: 2.1, specialOffer: "Save $1.15 (was $10.85)" }] },
    { id: 53, name: "Woolworths Eggs Barn Size 7 (6pk)", category: "barn-laid", brand: "Woolworths", packSize: "6pk", pricePerEgg: 0.97, prices: [{ store: "Countdown", price: 5.80, distance: 2.1, specialOffer: "LOW PRICE" }] },
    { id: 54, name: "Otaika Valley Eggs Free Range Mixed Grade (18pk)", category: "free-range", brand: "Otaika Valley", packSize: "18pk", pricePerEgg: 0.97, prices: [{ store: "Countdown", price: 17.40, distance: 2.1 }] },
    { id: 55, name: "Otaika Valley Eggs Free Range Size 7 (6pk)", category: "free-range", brand: "Otaika Valley", packSize: "6pk", pricePerEgg: 0.98, prices: [{ store: "Countdown", price: 5.90, distance: 2.1, specialOffer: "Save $0.85 (was $6.75)" }] },
    { id: 56, name: "Woodland Eggs Free Range Size 6 (18pk)", category: "free-range", brand: "Woodland", packSize: "18pk", pricePerEgg: 0.98, prices: [{ store: "Countdown", price: 17.59, distance: 2.1 }] },
    { id: 57, name: "Woolworths Eggs Barn Size 8 (10pk)", category: "barn-laid", brand: "Woolworths", packSize: "10pk", pricePerEgg: 1.00, prices: [{ store: "Countdown", price: 10.00, distance: 2.1, specialOffer: "LOW PRICE" }] },
    { id: 58, name: "Woolworths Eggs Barn Size 8 (6pk)", category: "barn-laid", brand: "Woolworths", packSize: "6pk", pricePerEgg: 1.00, prices: [{ store: "Countdown", price: 6.00, distance: 2.1, specialOffer: "LOW PRICE" }] },
    { id: 59, name: "Macro Eggs Free Range Size 7 (18pk)", category: "free-range", brand: "Macro", packSize: "18pk", pricePerEgg: 1.00, prices: [{ store: "Countdown", price: 18.00, distance: 2.1, specialOffer: "LOW PRICE" }] },
    { id: 60, name: "Better Eggs SPCA Eggs Free Range Size 7 (12pk)", category: "free-range", brand: "Better Eggs", packSize: "12pk", pricePerEgg: 1.02, prices: [{ store: "Countdown", price: 12.20, distance: 2.1, specialOffer: "Member Price (Non-member $12.90)" }] },
    { id: 61, name: "Macro Eggs Free Range Size 7 (12pk)", category: "free-range", brand: "Macro", packSize: "12pk", pricePerEgg: 1.02, prices: [{ store: "Countdown", price: 12.20, distance: 2.1, specialOffer: "LOW PRICE" }] },
    { id: 62, name: "Woodland Eggs Free Range Size 6 (10pk)", category: "free-range", brand: "Woodland", packSize: "10pk", pricePerEgg: 1.02, prices: [{ store: "Countdown", price: 10.20, distance: 2.1 }] },
    { id: 63, name: "Traditional Eggs Free Range Size 7 (12pk)", category: "free-range", brand: "Traditional", packSize: "12pk", pricePerEgg: 1.04, prices: [{ store: "Countdown", price: 12.50, distance: 2.1 }] },
    { id: 64, name: "Otaika Valley Eggs Free Range Size 7 (18pk)", category: "free-range", brand: "Otaika Valley", packSize: "18pk", pricePerEgg: 1.04, prices: [{ store: "Countdown", price: 18.75, distance: 2.1 }] },
    { id: 65, name: "Otaika Valley Eggs Free Range Size 7 (12pk)", category: "free-range", brand: "Otaika Valley", packSize: "12pk", pricePerEgg: 1.05, prices: [{ store: "Countdown", price: 12.60, distance: 2.1 }] },
    { id: 66, name: "Farmer Brown Eggs Cage Free Barn Size 8 (10pk)", category: "barn-laid", brand: "Farmer Brown", packSize: "10pk", pricePerEgg: 1.05, prices: [{ store: "Countdown", price: 10.49, distance: 2.1 }] },
    { id: 67, name: "Otaika Valley Eggs Free Range Size 8 (10pk)", category: "free-range", brand: "Otaika Valley", packSize: "10pk", pricePerEgg: 1.05, prices: [{ store: "Countdown", price: 10.50, distance: 2.1, specialOffer: "Save $1.49 (was $11.99)" }] },
    { id: 68, name: "Better Eggs SPCA Eggs Free Range Size 7 (6pk)", category: "free-range", brand: "Better Eggs", packSize: "6pk", pricePerEgg: 1.07, prices: [{ store: "Countdown", price: 6.40, distance: 2.1, specialOffer: "Member Price (Non-member $6.80)" }] },
    { id: 69, name: "Macro Eggs Free Range Size 7 (6pk)", category: "free-range", brand: "Macro", packSize: "6pk", pricePerEgg: 1.07, prices: [{ store: "Countdown", price: 6.40, distance: 2.1, specialOffer: "LOW PRICE" }] },
    { id: 70, name: "Otaika Valley Eggs Free Range Mixed Grade (6pk)", category: "free-range", brand: "Otaika Valley", packSize: "6pk", pricePerEgg: 1.08, prices: [{ store: "Countdown", price: 6.50, distance: 2.1 }] },
    { id: 71, name: "Woodland Eggs Free Range Size 7 (6pk)", category: "free-range", brand: "Woodland", packSize: "6pk", pricePerEgg: 1.16, prices: [{ store: "Countdown", price: 6.95, distance: 2.1 }] },
    { id: 72, name: "Macro Eggs Free Range Size 8 (10pk)", category: "free-range", brand: "Macro", packSize: "10pk", pricePerEgg: 1.19, prices: [{ store: "Countdown", price: 11.90, distance: 2.1, specialOffer: "LOW PRICE" }] },
    { id: 73, name: "Woodland Eggs Free Range Size 8 (10pk)", category: "free-range", brand: "Woodland", packSize: "10pk", pricePerEgg: 1.23, prices: [{ store: "Countdown", price: 12.25, distance: 2.1 }] },
    { id: 74, name: "Better Eggs SPCA Eggs Free Range Size 8 (10pk)", category: "free-range", brand: "Better Eggs", packSize: "10pk", pricePerEgg: 1.25, prices: [{ store: "Countdown", price: 12.45, distance: 2.1 }] },
    { id: 75, name: "Wholesome New Zealand Eggs Organic Free Range (10pk)", category: "organic", brand: "Wholesome", packSize: "10pk", pricePerEgg: 1.25, prices: [{ store: "Countdown", price: 12.45, distance: 2.1 }] },
    { id: 76, name: "Macro Eggs Free Range Size 8 (6pk)", category: "free-range", brand: "Macro", packSize: "6pk", pricePerEgg: 1.25, prices: [{ store: "Countdown", price: 7.50, distance: 2.1, specialOffer: "LOW PRICE" }] },
    { id: 77, name: "Woodland Eggs Free Range Size 8 (6pk)", category: "free-range", brand: "Woodland", packSize: "6pk", pricePerEgg: 1.33, prices: [{ store: "Countdown", price: 7.99, distance: 2.1 }] },
    // New World Products
    { id: 78, name: "Rise N Shine Size 7 12 Pack Colony Eggs (12pk)", category: "cage-free", brand: "Rise N Shine", packSize: "12pk", pricePerEgg: 0.62, prices: [{ store: "New World", price: 7.49, distance: 1.8 }] },
    { id: 79, name: "Morning Harvest Colony Size 6 Eggs (12pk)", category: "cage-free", brand: "Morning Harvest", packSize: "12pk", pricePerEgg: 0.72, prices: [{ store: "New World", price: 8.69, distance: 1.8 }] },
    { id: 80, name: "Morning Harvest Colony Laid Size 7 Eggs (12pk)", category: "cage-free", brand: "Morning Harvest", packSize: "12pk", pricePerEgg: 0.73, prices: [{ store: "New World", price: 8.79, distance: 1.8 }] },
    { id: 81, name: "New Day Free Range Mixed Grade Eggs (6pk)", category: "free-range", brand: "New Day", packSize: "6pk", pricePerEgg: 0.98, prices: [{ store: "New World", price: 5.89, distance: 1.8 }] },
    { id: 82, name: "Otaika Valley Premium Free Range Size 7 Eggs (12pk)", category: "free-range", brand: "Otaika Valley", packSize: "12pk", pricePerEgg: 0.98, prices: [{ store: "New World", price: 11.79, distance: 1.8 }] },
    { id: 83, name: "Sungold Organic Free Range Mixed Grade Eggs (10pk)", category: "organic", brand: "Sungold", packSize: "10pk", pricePerEgg: 1.21, prices: [{ store: "New World", price: 12.09, distance: 1.8 }] },
    { id: 84, name: "Otaika Valley Premium Free Range Size 8 Eggs (10pk)", category: "free-range", brand: "Otaika Valley", packSize: "10pk", pricePerEgg: 1.25, prices: [{ store: "New World", price: 12.49, distance: 1.8 }] },
    { id: 85, name: "Otaika Valley Premium Free Range Size 8 Eggs (6pk)", category: "free-range", brand: "Otaika Valley", packSize: "6pk", pricePerEgg: 1.35, prices: [{ store: "New World", price: 8.09, distance: 1.8 }] },
    { id: 86, name: "Zeagold Egg White Natural Protein (980ml)", category: "specialty", brand: "Zeagold", packSize: "980ml", pricePerEgg: null, prices: [{ store: "New World", price: 13.29, distance: 1.8, priceUnit: "$1.36/100ml" }] }
];

// Global variables
let userLocation = null;

// Initialize filtered data globally
window.filteredData = [...groceryData];

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        initializeDashboard();
    }
});

function initializeDashboard() {
    displayRecentDeals();
    updateDashboardStats();
}

function displayRecentDeals() {
    const alertsGrid = document.getElementById('alertsGrid');
    if (!alertsGrid) return;

    // Get best deals (lowest price per egg)
    const bestDeals = groceryData
        .filter(item => item.pricePerEgg !== null)
        .sort((a, b) => a.pricePerEgg - b.pricePerEgg)
        .slice(0, 4);

    alertsGrid.innerHTML = bestDeals.map(deal => {
        const price = deal.prices[0];
        return `
            <div class="alert-card">
                <div class="alert-icon">
                    <i class="fas fa-egg"></i>
                </div>
                <div class="alert-content">
                    <h3>${deal.name}</h3>
                    <p class="deal-text">Best value at $${deal.pricePerEgg.toFixed(2)} per egg</p>
                    <div class="price-info">
                        <span class="current-price">$${price.price.toFixed(2)} NZD</span>
                        <span class="store-name">at ${price.store}</span>
                        </div>
                </div>
                <button onclick="viewDeal(${deal.id})" class="view-deal-btn">
                    View Deal
                </button>
            </div>
        `;
    }).join('');
}

function updateDashboardStats() {
    // Update total savings
    const totalSavingsElement = document.getElementById('totalSavings');
    if (totalSavingsElement) {
        const avgPricePerEgg = groceryData
            .filter(item => item.pricePerEgg !== null)
            .reduce((sum, item) => sum + item.pricePerEgg, 0) / 
            groceryData.filter(item => item.pricePerEgg !== null).length;
        
        const cheapestPrice = Math.min(...groceryData
            .filter(item => item.pricePerEgg !== null)
            .map(item => item.pricePerEgg));
        
        const potentialSavings = (avgPricePerEgg - cheapestPrice) * 12 * 52; // Per year
        totalSavingsElement.textContent = `$${potentialSavings.toFixed(2)}`;
    }

    // Update store count
    const storeCountElement = document.getElementById('storeCount');
    if (storeCountElement) {
        const uniqueStores = new Set();
        groceryData.forEach(item => {
            item.prices.forEach(price => uniqueStores.add(price.store));
        });
        storeCountElement.textContent = uniqueStores.size;
    }

    // Update last update time
    const lastUpdateElement = document.getElementById('lastUpdate');
    if (lastUpdateElement) {
        lastUpdateElement.textContent = new Date().toLocaleTimeString();
    }
}

function viewDeal(dealId) {
    window.location.href = `prices.html?highlight=${dealId}`;
}

function openPriceAlerts() {
    // Check if user is logged in
    if (!window.authSystem || !window.authSystem.isLoggedIn()) {
        showAuthModal('signup');
        return;
    }
    
    // Check if user is premium
    if (!window.authSystem.isPremium()) {
        showPremiumModal();
        return;
    }
    
    // For demo purposes, show a simple price alerts interface
    const alertModal = document.createElement('div');
    alertModal.className = 'modal';
    alertModal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>Price Alerts</h2>
            <p>Set up alerts for your favorite egg products:</p>
            <div class="alert-form">
                <select id="alertProduct">
                    <option value="">Select a product...</option>
                    ${groceryData.slice(0, 10).map(item => 
                        `<option value="${item.id}">${item.name}</option>`
                    ).join('')}
                </select>
                <input type="number" id="alertPrice" placeholder="Alert when price drops below..." step="0.01">
                <button onclick="setPriceAlert()">Set Alert</button>
            </div>
            <div id="activeAlerts">
                <h3>Active Alerts</h3>
                <p>No active alerts set.</p>
            </div>
        </div>
    `;
    document.body.appendChild(alertModal);
}

function openShoppingList() {
    // Check if user is logged in
    if (!window.authSystem || !window.authSystem.isLoggedIn()) {
        showAuthModal('signup');
        return;
    }
    
    // For demo purposes, show a simple shopping list interface
    const listModal = document.createElement('div');
    listModal.className = 'modal';
    listModal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>Egg Shopping List</h2>
            <p>Track your egg purchases and compare prices:</p>
            <div class="shopping-form">
                <select id="listProduct">
                    <option value="">Add a product to your list...</option>
                    ${groceryData.slice(0, 15).map(item => 
                        `<option value="${item.id}">${item.name} - $${getLowestPrice(item).toFixed(2)}</option>`
                    ).join('')}
                </select>
                <button onclick="addToList()">Add to List</button>
            </div>
            <div id="shoppingList">
                <h3>Your Shopping List</h3>
                <p>No items in your list yet.</p>
            </div>
        </div>
    `;
    document.body.appendChild(listModal);
}

function setPriceAlert() {
    const productId = document.getElementById('alertProduct').value;
    const alertPrice = document.getElementById('alertPrice').value;
    
    if (!productId || !alertPrice) {
        alert('Please select a product and set a price');
        return;
    }
    
    const product = groceryData.find(item => item.id == productId);
    if (product) {
        showToast(`Price alert set for ${product.name} at $${alertPrice}`, 'success');
        document.getElementById('activeAlerts').innerHTML = `
            <h3>Active Alerts</h3>
            <div class="alert-item">
                <strong>${product.name}</strong><br>
                Alert when price drops below $${alertPrice}
            </div>
        `;
    }
}

function addToList() {
    const productId = document.getElementById('listProduct').value;
    
    if (!productId) {
        alert('Please select a product');
        return;
    }
    
    const product = groceryData.find(item => item.id == productId);
    if (product) {
        showToast(`Added ${product.name} to your shopping list`, 'success');
        document.getElementById('shoppingList').innerHTML = `
            <h3>Your Shopping List</h3>
            <div class="list-item">
                <strong>${product.name}</strong><br>
                Best price: $${getLowestPrice(product).toFixed(2)} at ${product.prices.find(p => p.price === getLowestPrice(product)).store}
            </div>
        `;
    }
}

function getLowestPrice(item) {
    return Math.min(...item.prices.map(p => p.price));
}

// Real Stripe payment functionality
function testStripePayment() {
    if (!window.authSystem || !window.authSystem.isLoggedIn()) {
        showAuthModal('signup');
        return;
    }
    
    if (window.stripePaymentHandler) {
        console.log('💳 Starting Stripe payment...');
        window.stripePaymentHandler.createPremiumSubscription();
    } else {
        console.error('❌ Stripe payment handler not available');
        showToast('Stripe payment handler not available', 'error');
    }
}

// Make functions globally accessible
window.viewDeal = viewDeal;
window.openPriceAlerts = openPriceAlerts;
window.openShoppingList = openShoppingList;
window.setPriceAlert = setPriceAlert;
window.addToList = addToList;
window.getLowestPrice = getLowestPrice;
window.testStripePayment = testStripePayment;
