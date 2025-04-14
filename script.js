import menuArray from './data.js'

const menuItems = document.getElementById("menu-items")
const orderItems = document.getElementById("order-items")
const totalPrice = document.getElementById("total-price")
const popUpOverlay = document.getElementById("pop-up-overlay")
const orderInfo = document.getElementById("order-info")
const successInfo = document.getElementById("success-info")
const paymentForm = document.getElementById("payment-form")
const completeOrderBtn = document.getElementById("complete-order-btn")
const payBtn = document.getElementById("pay-btn")

const orderItemsArray =  []

renderMenuItems(menuArray)

document.addEventListener("click", function(e) {
    const addButton = e.target.closest("[data-item]");
    const removeButton = e.target.dataset.remove
    if (addButton) {
        const matchedMenuItem = menuArray.find(item => item.name.toLowerCase() === addButton.dataset.item);
        if (matchedMenuItem) {
            orderItemsArray.push(matchedMenuItem);
            renderOrderItems() 
        }
    } 
    
    if(removeButton){
        const matchedOrderItem = orderItemsArray.find(item => item.name.toLowerCase() === removeButton);
        deleteOrderedItem(matchedOrderItem)
    } 
    
    if(e.target === completeOrderBtn){
        popUpOverlay.style.display = "flex"
    }

    if(e.target === payBtn) {
        e.preventDefault()
        renderSuccessMessage()
    }
});

function renderOrderItems(){
    if(orderItemsArray.length){
        orderInfo.style.display = "block"
        successInfo.style.display = "none"

        let renderedOrderItems = ''
    
        orderItemsArray.forEach(function(item){
            renderedOrderItems += `
            <div class="order-item">
               <h2>${item.name}</h2>
               <button class="remove-btn" id="remove-btn" data-remove="${item.name.toLowerCase()}">remove</button>
               <p class="item-price">$${item.price}</p>
           </div>
           `
        })
        orderItems.innerHTML = renderedOrderItems
        calculateTotalPrice()
        console.log(orderItemsArray)
    } else {
        orderInfo.style.display = "none"
    }
}

function calculateTotalPrice(){
    totalPrice.textContent = `$${
        orderItemsArray.reduce(function(total, item) {
            return total + item.price
        }, 0)
    }`
}

function deleteOrderedItem(orderedItem){
    const index = orderItemsArray.findIndex(item => item.name === orderedItem.name)
    
    if(index !== -1) {
        orderItemsArray.splice(index, 1)
    }

    console.log(orderItemsArray)
    renderOrderItems()
}

function renderMenuItems(array) {
    array.forEach(function(item){
        menuItems.innerHTML += `
         <div class="menu-item">
            <div class="menu-item-icon">${item.emoji}</div>
            <div class="menu-item-description">
                <h2>${item.name}</h2>
                <p class="item-content">${item.ingredients}</p>
                <p class="item-price">$${item.price}</p>
            </div>
            <button class="add-button" data-item = "${item.name.toLowerCase()}">
                <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.83949 13.8068V0.011363H8.16903V13.8068H6.83949ZM0.612216 7.57955V6.23864H14.3963V7.57955H0.612216Z" fill="currentColor"/>
                </svg>
            </button>
        </div>
        `
    })
}

function renderSuccessMessage(){
    if (!paymentForm.checkValidity()) {
        paymentForm.reportValidity(); // покажет встроенные браузерные ошибки
        return; // отменим отправку
      }
    popUpOverlay.style.display = "none"
    orderInfo.style.display = "none"
    successInfo.style.display = "block"
    successInfo.innerHTML = `
    <p>Thanks, ${paymentForm.name.value}! Your order is on its way!</p>`
    orderItemsArray.splice(0, orderItemsArray.length)
    paymentForm.reset()
}