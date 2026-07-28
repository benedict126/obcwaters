// ================================
// OBC Water Order Calculator
// ================================

// Product Prices
const prices = {
    sachet: 500,
    bottle50: 200,
    bottle75: 300,
    bottle15: 1000,
    dispenser: 5000
};

// Input Elements
const sachet = document.getElementById("sachet");
const bottle50 = document.getElementById("bottle50");
const bottle75 = document.getElementById("bottle75");
const bottle15 = document.getElementById("bottle15");
const dispenser = document.getElementById("dispenser");

// Summary Elements
const sumSachet = document.getElementById("sumSachet");
const sum50 = document.getElementById("sum50");
const sum75 = document.getElementById("sum75");
const sum15 = document.getElementById("sum15");
const sumDisp = document.getElementById("sumDisp");
const totalPrice = document.getElementById("totalPrice");

// Create hidden field for Formspree
const form = document.getElementById("orderForm");
const email = document.getElementById("email");
const replyTo = document.getElementById("replyto");

const hiddenSummary = document.createElement("input");
hiddenSummary.type = "hidden";
hiddenSummary.name = "Order Summary";
form.appendChild(hiddenSummary);

// Format Naira
function formatMoney(amount){
    return "₦" + amount.toLocaleString();
}

// Update Order
function updateOrder(){

    const qtySachet = Number(sachet.value) || 0;
    const qty50 = Number(bottle50.value) || 0;
    const qty75 = Number(bottle75.value) || 0;
    const qty15 = Number(bottle15.value) || 0;
    const qtyDisp = Number(dispenser.value) || 0;

    const total =
        (qtySachet * prices.sachet) +
        (qty50 * prices.bottle50) +
        (qty75 * prices.bottle75) +
        (qty15 * prices.bottle15) +
        (qtyDisp * prices.dispenser);

    // Update Summary
    sumSachet.textContent = qtySachet + " Bag(s)";
    sum50.textContent = qty50 + " Bottle(s)";
    sum75.textContent = qty75 + " Bottle(s)";
    sum15.textContent = qty15 + " Bottle(s)";
    sumDisp.textContent = qtyDisp + " Unit(s)";

    totalPrice.textContent = formatMoney(total);

    // Send summary to Formspree
    hiddenSummary.value =
`Sachet Water: ${qtySachet}
50cl Bottled Water: ${qty50}
75cl Bottled Water: ${qty75}
1.5L Bottled Water: ${qty15}
Water Dispenser: ${qtyDisp}

Estimated Total: ${formatMoney(total)}`;
    if (replyTo) {
        replyTo.value = email ? email.value : "";
    }
}

// Update whenever quantity changes
[
    sachet,
    bottle50,
    bottle75,
    bottle15,
    dispenser
].forEach(input => {
    input.addEventListener("input", updateOrder);
});

if (email) {
    email.addEventListener("input", updateOrder);
}

// Prevent empty orders
form.addEventListener("submit", function(e){

    const totalItems =
        Number(sachet.value) +
        Number(bottle50.value) +
        Number(bottle75.value) +
        Number(bottle15.value) +
        Number(dispenser.value);

    if(totalItems === 0){
        e.preventDefault();
        alert("Please select at least one product before placing your order.");
        return;
    }

    updateOrder();
});

// Initial calculation
updateOrder();
// Increase or decrease quantity
function changeQty(id, amount){

    const input = document.getElementById(id);

    let value = parseInt(input.value) || 0;

    value += amount;

    if(value < 0){
        value = 0;
    }

    input.value = value;

    updateOrder();

}