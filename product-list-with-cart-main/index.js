let cart = {};

function addToCart(button){

    let name = button.getAttribute("data-name");
    let price = Number(button.getAttribute("data-price"));

    // لو المنتج موجود نزود الكمية
    if(cart[name]){
        cart[name].quantity++;
    }else{
        cart[name] = {
            price: price,
            quantity: 1
        };
    }

    updateCart();

    // تغيير شكل الزر
    button.innerHTML = `
        <div class="quantity-box">

            <span onclick="decrease(event,this)">
                -
            </span>

            <span class="count">
                ${cart[name].quantity}
            </span>

            <span onclick="increase(event,this)">
                +
            </span>

        </div>
    `;
}



// زيادة العدد
function increase(event, element){

    event.stopPropagation();

    let parent = element.parentElement;

    let button = parent.closest(".cart-btn");

    let name = button.getAttribute("data-name");

    cart[name].quantity++;

    parent.querySelector(".count").innerText =
    cart[name].quantity;

    updateCart();
}



// تقليل العدد
function decrease(event, element){

    event.stopPropagation();

    let parent = element.parentElement;

    let button = parent.closest(".cart-btn");

    let name = button.getAttribute("data-name");

    cart[name].quantity--;

    // لو العدد بقى صفر
    if(cart[name].quantity <= 0){

        delete cart[name];

        // رجوع الزر الطبيعي
        button.innerHTML = `
            <img src="assets/images/icon-add-to-cart.svg" class="Btn">
            Add To Cart
        `;

    }else{

        parent.querySelector(".count").innerText =
        cart[name].quantity;
    }

    updateCart();
}



// حذف منتج من الكارت
function removeItem(item){

    delete cart[item];

    // رجوع الزر الطبيعي
    let buttons = document.querySelectorAll(".cart-btn");

    buttons.forEach(button => {

        if(button.getAttribute("data-name") === item){

            button.innerHTML = `
                <img src="assets/images/icon-add-to-cart.svg" class="Btn">
                Add To Cart
            `;
        }
    });

    updateCart();
}





// تحديث الكارت
function updateCart(){

    let cartDiv = document.querySelector(".Cart");

    let totalItems = 0;

    let totalPrice = 0;

    let itemsHTML = "";



    for(let item in cart){

        let quantity = cart[item].quantity;

        let price = cart[item].price;

        let itemTotal = quantity * price;

        totalItems += quantity;

        totalPrice += itemTotal;



        itemsHTML += `

            <div class="cart-item">

                <div>

                    <p class="item-name">
                        ${item}
                    </p>

                    <p class="item-details">
                        ${quantity} × $${price.toFixed(2)}
                    </p>

                    <p class="item-total">
                        $${itemTotal.toFixed(2)}
                    </p>

                </div>


                <button 
                    class="remove-btn"
                    onclick="removeItem('${item}')"
                >
                    ❌
                </button>

            </div>
        `;
    }



    // لو الكارت فاضي
    if(totalItems === 0){

        cartDiv.innerHTML = `

            <h3 class="title_Cart">
                Your Cart (0)
            </h3>

            <img 
                src="assets/images/illustration-empty-cart.svg" 
                class="img_Cart"
            >

            <p class="text_Cart">
                Your added items will appear here
            </p>
        `;

    }else{

        cartDiv.innerHTML = `

            <h3 class="title_Cart">
                Your Cart (${totalItems})
            </h3>


            <div class="cart-content">

                ${itemsHTML}

            </div>


            <p class="Order_Total">

                Order Total:

                <span class="Total_Price">

                    $${totalPrice.toFixed(2)}

                </span>

            </p>
        `;
    }
  

}