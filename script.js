import menuArray from './data.js'

const menuItems = document.getElementById("menu-items")
const orderItems = document.getElementById("order-items")

renderMenuItems(menuArray)

document.addEventListener("click", function(e) {
    // Ищем ближайший элемент с атрибутом data-item
    const button = e.target.closest("[data-item]");
    if (button) {
        // Ищем совпадение в массиве menuArray
        const matchedItem = menuArray.find(item => item.name.toLowerCase() === button.dataset.item);


        if (matchedItem) {
            console.log(`Ты добавил в корзину ${matchedItem.name}!`);
        }
    }
});

// document.addEventListener("click", function(e){

//     if(e.target.dataset.item) {
//         // Ищем совпадение в массиве menuArray
//         const matchedItem = menuArray.find(item => item.name.toLowerCase() === e.target.dataset.item);

//         if (matchedItem) {
//             console.log(`Ты добавил в корзину ${matchedItem.name}!`);
//         }
//     }
// })

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
    console.log("Рендеринг успешно завершен")
}

console.log(orderItems)