// Json File => "Products"
fetch('products.json')
.then((resolve) => resolve.json())
.then((data) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const swiper_item_sale = document.querySelector("#swiper_item_sale");
    const swiper_electronics = document.querySelector("#swiper_elctronics");
    const swiper_appliances = document.querySelector("#swiper_appliances");
    const swiper_mobiles = document.querySelector("#swiper_mobiles");

    data.forEach((product) => {
        if (product.old_price) {
            const isInCart = cart.some(productId => productId.id === product.id);
            const perecent_discont = Math.floor((product.old_price - product.price) / product.old_price * 100);
            swiper_item_sale.innerHTML += `
                <div class="swiper-slide product">
                    <span class="sale_present">%${perecent_discont}</span>
                    <div class="img_product">
                        <a href="#"><img src="${product.img}" alt="${product.catetory}"></a>
                    </div>
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <p class="name_product">
                        <a href="#">${product.name}</a>
                    </p>
                    <div class="price">
                        <p><span>${product.price}$</span></p>
                        <p class="old_price">${product.old_price}$</p>
                    </div>
                    <div class="icon">
                        <span class="btn_add_cart ${isInCart ? "active" : ""}" data-id="${product.id}">
                            <i class="fa-solid fa-cart-shopping"></i> ${isInCart ? "Item In Cart" : "Add To Cart"}
                        </span>
                        <span class="icon_product_heart">
                            <i class="fa-regular fa-heart"></i>
                        </span>
                    </div>
                </div>
            `
        }
    })
    data.forEach((product) => {
        if (product.catetory === "electronics") {
            const isInCart = cart.some(productId => productId.id === product.id);
            const old_price_defiend = product.old_price ? `<p class="old_price">${product.old_price}$</p>` : "";
            const perecent_discont = product.old_price ? `<span class="sale_present">%${Math.floor((product.old_price - product.price) / product.old_price * 100)}</span>`: "";
            swiper_electronics.innerHTML += `
                <div class="swiper-slide product">
                    ${perecent_discont}
                    <div class="img_product">
                        <a href="#"><img src="${product.img}" alt="${product.catetory}"></a>
                    </div>
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <p class="name_product">
                        <a href="#">${product.name}</a>
                    </p>
                    <div class="price">
                        <p><span>${product.price}$</span></p>
                        ${old_price_defiend}
                    </div>
                    <div class="icon">
                        <span class="btn_add_cart ${isInCart ? "active" : ""}" data-id="${product.id}">
                            <i class="fa-solid fa-cart-shopping"></i> ${isInCart ? "Item In Cart" : "Add To Cart"}
                        </span>
                        <span class="icon_product_heart">
                            <i class="fa-regular fa-heart"></i>
                        </span>
                    </div>
                </div>
            `
        }
    })
    data.forEach((product) => {
        if (product.catetory === "appliances") {
            const isInCart = cart.some(productId => productId.id === product.id);
            const old_price_defiend = product.old_price ? `<p class="old_price">${product.old_price}$</p>` : "";
            const perecent_discont = product.old_price ? `<span class="sale_present">%${Math.floor((product.old_price - product.price) / product.old_price * 100)}</span>`: "";
            swiper_appliances.innerHTML += `
                <div class="swiper-slide product">
                    ${perecent_discont}
                    <div class="img_product">
                        <a href="#"><img src="${product.img}" alt="${product.catetory}"></a>
                    </div>
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <p class="name_product">
                        <a href="#">${product.name}</a>
                    </p>
                    <div class="price">
                        <p><span>${product.price}$</span></p>
                        ${old_price_defiend}
                    </div>
                    <div class="icon">
                        <span class="btn_add_cart ${isInCart ? "active" : ""}" data-id="${product.id}">
                            <i class="fa-solid fa-cart-shopping"></i> ${isInCart ? "Item In Cart" : "Add To Cart"}
                        </span>
                        <span class="icon_product_heart">
                            <i class="fa-regular fa-heart"></i>
                        </span>
                    </div>
                </div>
            `
        }
    })
    data.forEach((product) => {
        if (product.catetory === "mobiles") {
            const isInCart = cart.some(productId => productId.id === product.id);
            const old_price_defiend = product.old_price ? `<p class="old_price">${product.old_price}$</p>` : "";
            const perecent_discont = product.old_price ? `<span class="sale_present">%${Math.floor((product.old_price - product.price) / product.old_price * 100)}</span>`: "";
            swiper_mobiles.innerHTML += `
                <div class="swiper-slide product">
                    ${perecent_discont}
                    <div class="img_product">
                        <a href="#"><img src="${product.img}" alt="${product.catetory}"></a>
                    </div>
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <p class="name_product">
                        <a href="#">${product.name}</a>
                    </p>
                    <div class="price">
                        <p><span>${product.price}$</span></p>
                        ${old_price_defiend}
                    </div>
                    <div class="icon">
                        <span class="btn_add_cart ${isInCart ? "active" : ""}" data-id="${product.id}">
                            <i class="fa-solid fa-cart-shopping"></i> ${isInCart ? "Item In Cart" : "Add To Cart"}
                        </span>
                        <span class="icon_product_heart">
                            <i class="fa-regular fa-heart"></i>
                        </span>
                    </div>
                </div>
            `
        }
    }
)});

// window.localStorage.clear();