
let darkMode = document.querySelector("#dark-mode");
if (window.localStorage.getItem("dark") === "done") {
    document.documentElement.classList.add("dark");
    darkMode.setAttribute("aria-pressed", "true");
    document.querySelector("header").classList.add("black");
    document.querySelector("footer").classList.add("active");
}
darkMode.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    document.querySelector("header").classList.toggle("black");
    document.querySelector("footer").classList.toggle("active");
    let isDark = document.documentElement.classList.contains("dark");
    window.localStorage.setItem("dark", isDark ? "done" : "notDone");
    darkMode.setAttribute("aria-pressed", isDark ? "true" : "false");
})
// --------------------

let category_nav_list = document.querySelector(".category_nav_list");
let category_btn = document.querySelector(".category_btn");
category_btn.onclick = function (){
    category_nav_list.classList.toggle("active");
}
// ------------------

let fa_bars = document.querySelector(".icon_nav_links");
fa_bars.addEventListener("click", () => {
    document.querySelector(".nav_links").classList.toggle("active");
})
// ------------------
document.querySelector("#colse_item_all_incart").onclick = open_cart_items;
function open_cart_items() {
    document.querySelector(".big_cart_item").classList.toggle("active");
}
// Start Button To Top
window.addEventListener("DOMContentLoaded", function () {
    let scrollToTop = document.querySelector(".scrollToTop");
    window.onscroll = function () {
        if (window.scrollY >= 1000) {
            scrollToTop.classList.add("appear");
        }else {
            scrollToTop.classList.remove("appear");
        }
    }
})
// End Button To Top
// ------------------
// Start Cart
fetch('products.json')
.then(response => response.json())
.then(data => {
    const btn_add_cart = document.querySelectorAll(".btn_add_cart");

    btn_add_cart.forEach(button => {
        button.addEventListener("click", e => {
            const productId = e.target.getAttribute("data-id");
            const selectedProduct = data.find(product => Number(product.id) === Number(productId));

            addToCart(selectedProduct);

            const allMatchingButtons = document.querySelectorAll(`.btn_add_cart[data-id="${productId}"]`);
            allMatchingButtons.forEach(btn => {
                btn.classList.add("active");
                btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Item In Cart`;
            });

            document.querySelector(".big_cart_item").classList.add("active");
        });
    });
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartItemsContainer = document.querySelector("#cart_items");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const items_checkout = document.querySelector("#items_checkout");
    let Items_input = document.getElementById("all_items");
    let totalprice = document.getElementById("total_price");
    let count_items = document.getElementById("count_items");

    if (items_checkout) {
        items_checkout.innerHTML = "";
        Items_input.value = "";
        totalprice.value = "";
        count_items.value = "";
    }

    let total_price = 0;
    let total_count = 0;

    let cartHTML = "";
    let checkoutHTML = "";
    let itemsText = "";
    cartItemsContainer.innerHTML = "";
    cart.forEach((product, index) => {
        const totalPrice = product.price * product.quantity;
        total_price += totalPrice;
        total_count += product.quantity;

        itemsText += `${product.name} ---- price: $${totalPrice} ---- count: ${product.quantity}\n`;

        cartHTML += `
            <div class="item_cart">
                <img src="${product.img}" alt="">
                <div class="content">
                    <h4>${product.name}</h4>
                    <p class="price_cart">$${totalPrice}</p>
                    <div class="quantity_control">
                        <button class="decrease_quantity" data-index="${index}">-</button>
                        <span class="quantity">${product.quantity}</span>
                        <button class="increase_quantity" data-index="${index}">+</button>
                    </div>
                </div>
                <button class="delete_item" data-index="${index}">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;

        if (items_checkout) {
            checkoutHTML += `
                <div class="item_cart">
                    <div class="image_name">
                        <img src="${product.img}" alt="">
                        <div class="content">
                            <h4>${product.name}</h4>
                            <p class="price_cart">$${totalPrice}</p>
                            <div class="quantity_control">
                                <button class="decrease_quantity" data-index="${index}">-</button>
                                <span class="quantity">${product.quantity}</span>
                                <button class="increase_quantity" data-index="${index}">+</button>
                            </div>
                        </div>
                    </div>
                    <button class="delete_item" data-index="${index}">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            `;
        }
    });

    cartItemsContainer.innerHTML = cartHTML;
    if (items_checkout) {
        items_checkout.innerHTML = checkoutHTML;
        Items_input.value = itemsText;
        totalprice.value = `$${total_price + 20}`;
        count_items.value = `${total_count} Product`;
    }

    document.querySelector(".price_cart_total").innerHTML = `$${total_price}`;
    document.querySelector(".count_item_cart").innerHTML = `${total_count}`;
    document.querySelector(".count-item_header").innerHTML = `${total_count}`;

    if (items_checkout) {
        document.querySelector(".price_cart_total_checkout").innerHTML = `$${total_price}`;
        document.querySelector(".sum_of_Carts").innerHTML = `$${total_price + 20}`;
    }

    // Event Delegation للـ buttons
    cartItemsContainer.onclick = e => {
        if (e.target.classList.contains("increase_quantity")) {
            increaseQuantity(e.target.dataset.index);
        } else if (e.target.classList.contains("decrease_quantity")) {
            decreaseQuantity(e.target.dataset.index);
        } else if (e.target.closest(".delete_item")) {
            const index = e.target.closest(".delete_item").dataset.index;
            removeFromCart(index);
        }
    };

    if (items_checkout) {
        items_checkout.onclick = e => {
            if (e.target.classList.contains("increase_quantity")) {
                increaseQuantity(e.target.dataset.index);
            } else if (e.target.classList.contains("decrease_quantity")) {
                decreaseQuantity(e.target.dataset.index);
            } else if (e.target.closest(".delete_item")) {
                const index = e.target.closest(".delete_item").dataset.index;
                removeFromCart(index);
            }
        };
    }
}

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const removedProduct = cart.splice(index, 1)[0];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    updateButtonsState(removedProduct.id);
}

function updateButtonsState(productId) {
    const allMatchingButtons = document.querySelectorAll(`.btn_add_cart[data-id="${productId}"]`);
    allMatchingButtons.forEach(btn => {
        btn.classList.remove("active");
        btn.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Add To Cart`;
    });
}

updateCart();

// ----
document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY = 'favourites_v2';
    const countEl = document.querySelector('.count.count_favourite');

  // قراءة من localStorage -> Set من المفاتيح
    function readFavs() {
        try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return new Set();
        const arr = JSON.parse(raw);
        return new Set(Array.isArray(arr) ? arr : []);
        } catch (e) {
        console.warn('favs parse error', e);
        localStorage.removeItem(STORAGE_KEY);
        return new Set();
        }
    }

    function saveFavs(set) {
        try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
        } catch (e) {
        console.error('save favs failed', e);
        }
    }

    // دالة هاش بسيطة (djb2) علشان نضمن مفتاح ثابت من نص العنصر لو مفيش عنوان واضح
    function hashString(s) {
        let h = 5381;
        for (let i = 0; i < s.length; i++) {
        h = ((h << 5) + h) + s.charCodeAt(i);
        }
        return 'hash:' + (h >>> 0).toString(36);
    }

    // الحصول على كل القلوب الموجودة حاليا
    function getHearts() {
        return Array.from(document.querySelectorAll('.icon_product_heart'));
    }

    // نحاول نكوّن مفتاح ثابت لكل منتج: أسبقية - data-key / .product-title / img.src / نص العنصر hashed
    function computeKeyForHeart(heart) {
        const productEl = heart.closest('.product') || heart.parentElement || heart;
        // إذا حضرتك بتحط data-key ممكن نستخدمه (اختياري)
        if (productEl && productEl.dataset && productEl.dataset.key) {
        return 'data:' + productEl.dataset.key;
        }
        // حاول نلاقي عنوان واضح
        const titleEl = productEl && productEl.querySelector
        ? productEl.querySelector('.product-title, .title, h1, h2, h3')
        : null;
        if (titleEl && titleEl.textContent.trim()) {
        return 'title:' + titleEl.textContent.trim();
        }
        // حاول ناخد صورة
        const img = productEl && productEl.querySelector ? productEl.querySelector('img') : null;
        if (img && img.src) return 'img:' + img.src;
        //fallback: هاش من النص كله (ثابت طالما النص ثابت)
        const text = (productEl && productEl.textContent) ? productEl.textContent.trim() : (heart.textContent || '');
        return hashString(text);
    }

    // تحديث الواجهه: تفعيل كلاسات، تغيير أيقونات، تحديث العداد
    function paint() {
        const favs = readFavs();
        const hearts = getHearts();
        hearts.forEach(h => {
        const key = computeKeyForHeart(h);
        const icon = h.querySelector('i');
        if (favs.has(key)) {
            h.classList.add('active');
            if (icon) { icon.classList.remove('fa-regular'); icon.classList.add('fa-solid'); }
        } else {
            h.classList.remove('active');
            if (icon) { icon.classList.remove('fa-solid'); icon.classList.add('fa-regular'); }
        }
        });
        if (countEl) countEl.textContent = favs.size;
    }

    // toggle favourite عند النقر (تفويض حدث)
    document.addEventListener('click', (e) => {
        const heart = e.target.closest('.icon_product_heart');
        if (!heart) return;
        const key = computeKeyForHeart(heart);
        if (!key) return;
        const favs = readFavs();
        if (favs.has(key)) favs.delete(key);
        else favs.add(key);
        saveFavs(favs);
        paint();
    });

    // لو الصفحة بتولّد منتجات ديناميك، نراقب التغييرات ونرسم من جديد (بـ debounce بسيط)
    let paintTimer = null;
    const debouncedPaint = () => {
        clearTimeout(paintTimer);
        paintTimer = setTimeout(paint, 80);
    };

    const observer = new MutationObserver(debouncedPaint);
    observer.observe(document.getElementById('productsList') || document.body, { childList: true, subtree: true });

    // أول رسم
    paint();

    // (اختياري) كشف فور أي أخطاء في الـ console لو محتاج تتبع
    window.__favs_utils = { readFavs, saveFavs, computeKeyForHeart, paint };
});
// ----
// End Cart
// --------------------

// Start Input Phone Style
let inputEvents = document.querySelector("[name='Phone']");
let maxLength = inputEvents.getAttribute("maxlength");
let numEvents = document.querySelector("#numEvents");
let input_width = document.querySelector("#input-width");
numEvents.innerHTML = maxLength;
inputEvents.oninput = function () {
    numEvents.innerHTML = maxLength - this.value.length;
    numEvents.innerHTML == 0 ? numEvents.classList.add("zero") : numEvents.classList.remove("zero");
    input_width.style.width = `${(this.value.length / maxLength) * 100}%`;
}
// End Input Phone Style
/*
// ------
// fetch('products.json')
// .then((resolve) => resolve.json())
// .then((data) => {
//     const btn_add_cart = document.querySelectorAll(".btn_add_cart");
//     btn_add_cart.forEach((button) => {
//         button.addEventListener("click", (event) => {
//             const productId = event.target.getAttribute("data-id");
//             const selectedProduct = data.find((product) => Number(product.id) === Number(productId));
//             addToCart(selectedProduct);
//             const allMatchingButton = document.querySelectorAll(`.btn_add_cart[data-id="${productId}"]`);
//             allMatchingButton.forEach((btn) => {
//                 btn.classList.add("active");
//                 btn.innerHTML = `
//                 <i class="fa-solid fa-cart-shopping"></i> Item In Cart
//                 `
//             })
//             document.querySelector(".big_cart_item").classList.add("active");
//         })
//     })
// });
// function addToCart(product) {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
//     cart.push({... product, quantity: 1});
//     localStorage.setItem("cart", JSON.stringify(cart));
//     updateCart();
// }
// function updateCart() {
//     const cartItemsContainer = document.querySelector("#cart_items");
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const items_checkout = document.querySelector("#items_checkout");
//     let Items_input = document.getElementById("all_items");
//     let totalprice = document.getElementById("total_price");
//     let count_items = document.getElementById("count_items");
//     if (items_checkout) {
//         items_checkout.innerHTML = "";

//         Items_input.value = "";
//         totalprice.value = "";
//         count_items.value = "";
//     }
//     var total_price = 0;
//     var total_count = 0;
//     cartItemsContainer.innerHTML = "";
//     cart.forEach((product, index) => {
//         const totalPrice = product.price * product.quantity;
//         total_price += totalPrice;
//         total_count += product.quantity;
//         // check Out inputs
//         Items_input.value += product.name + "----" + "price: $" + totalPrice + "----" + "count: " + product.quantity + "\n"
//         totalprice.value = total_price + 20;
//         count_items.value = total_count;

//         cartItemsContainer.innerHTML += `
//             <div class="item_cart">
//                 <img src="${product.img}" alt="">
//                 <div class="content">
//                     <h4>${product.name}</h4>
//                     <p class="price_cart">$${totalPrice}</p>
//                     <div class="quantity_control">
//                         <button class="decrease_quantity" data-index="${index}">-</button>
//                         <span class="quantity">${product.quantity}</span>
//                         <button class="increase_quantity" data-index="${index}">+</button>
//                     </div>
//                 </div>
//                 <button class="delete_item" data-index="${index}">
//                     <i class="fa-solid fa-trash-can"></i>
//                 </button>
//             </div>`;
//         if (items_checkout) {
//             items_checkout.innerHTML += `
//                 <div class="item_cart">
//                     <div class="image_name">
//                         <img src="${product.img}" alt="">
//                         <div class="content">
//                             <h4>${product.name}<h4>
//                             <p class="price_cart">$${totalPrice}</p>
//                             <div class="quantity_control">
//                                 <button class="decrease_quantity" data-index="${index}">-</button>
//                                 <span class="quantity">${product.quantity}</span>
//                                 <button class="increase_quantity" data-index="${index}">+</button>
//                             </div>
//                         </div>
//                     </div>
//                     <button class="delete_item" data-index="${index}">
//                         <i class="fa-solid fa-trash-can"></i>
//                     </button>
//                 </div>`
//             }   
//     })
//     // details in home Page
//     const AllTotalPrice = document.querySelector(".price_cart_total");
//     const count_item_cart = document.querySelector(".count_item_cart");
//     const count_item_header = document.querySelector(".count-item_header");

//     AllTotalPrice.innerHTML = `$${total_price}`;
//     count_item_cart.innerHTML = `${total_count}`;
//     count_item_header.innerHTML = `${total_count}`;
//     // ------
//     // details in checkout Page
//     if (items_checkout) {
//         const subTotalCheckout = document.querySelector(".price_cart_total_checkout");
//         subTotalCheckout.innerHTML = `$${total_price}`;  
//         const subAllTotal = document.querySelector(".sum_of_Carts");
//         subAllTotal.innerHTML = `$${total_price + 20}`;
//     }

//     const decreaseButtons = document.querySelectorAll(".decrease_quantity");
//     const increaseButtons = document.querySelectorAll(".increase_quantity");

//     decreaseButtons.forEach((btn) => {
//         btn.addEventListener("click", (event) => {
//             const itemIndex = event.target.getAttribute("data-index");
//             decreaseQuantity(itemIndex);
//         })
//     });

//     increaseButtons.forEach((btn) => {
//         btn.addEventListener("click", (event) => {
//             const itemIndex = event.target.getAttribute("data-index");
//             increaseQuantity(itemIndex);
//         })
//     });

//     const deleteButtons = document.querySelectorAll(".delete_item");
//     deleteButtons.forEach((btn) => {
//         btn.addEventListener("click", (e) => {
//             const itemIndex = e.target.closest("button").getAttribute("data-index");
//             removeFromCart(itemIndex);
//         })
//     })
// }

// function increaseQuantity(index) {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     cart[index].quantity += 1;
//     localStorage.setItem("cart", JSON.stringify(cart));
//     updateCart();
// }

// function decreaseQuantity(index) {
//     let cart = JSON.parse(localStorage.getItem("cart")) || [];
//     if (cart[index].quantity > 1) {
//         cart[index].quantity -= 1;
//     }
//     localStorage.setItem("cart", JSON.stringify(cart));
//     updateCart();
// }

// function removeFromCart(index) {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const removeProduct = cart.splice(index, 1)[0];
//     localStorage.setItem("cart", JSON.stringify(cart));
//     updateCart();
//     updateButtonsState(removeProduct.id);
// }
// function updateButtonsState(btn) {
//     const allMatchingButtons = document.querySelectorAll(`.btn_add_cart[data-id="${btn}"]`);
//     allMatchingButtons.forEach((btn) => {
//         btn.classList.remove("active");
//         btn.innerHTML = `
//             <i class="fa-solid fa-cart-shopping"></i> Add To Cart
//             `
//     })
// }
// updateCart();
// */