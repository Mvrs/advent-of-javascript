const menu = document.querySelector('ul.menu')
const cartSummary = document.querySelector('.cart-summary')
const totalText = document.querySelector('.amount.price.total')
const taxtText = document.querySelector('.amount.price.tax')
const subtotalText = document.querySelector('.amount.price.subtotal')

const menuItems = [
    {
        name: 'French Fries with Ketchup',
        price: 223,
        image: 'plate__french-fries.png',
        alt: 'French Fries',
        count: 0
    },
    {
        name: 'Salmon and Vegetables',
        price: 512,
        image: 'plate__salmon-vegetables.png',
        alt: 'Salmon and Vegetables',
        count: 0
    },
    {
        name: 'Spaghetti Meat Sauce',
        price: 782,
        image: 'plate__spaghetti-meat-sauce.png',
        alt: 'Spaghetti with Meat Sauce',
        count: 0
    },
    {
        name: 'Bacon, Eggs, and Toast',
        price: 599,
        image: 'plate__bacon-eggs.png',
        alt: 'Bacon, Eggs, and Toast',
        count: 0
    },
    {
        name: 'Chicken Salad with Parmesan',
        price: 698,
        image: 'plate__chicken-salad.png',
        alt: 'Chicken Salad with Parmesan',
        count: 0
    },
    {
        name: 'Fish Sticks and Fries',
        price: 634,
        image: 'plate__fish-sticks-fries.png',
        alt: 'Fish Sticks and Fries',
        count: 0
    }
]

const renderMenu = () => {
    const menuItemsHTMLString = menuItems.map((item, index) => {
        const [dollars, cents] = getDollarsAndCents(item.price)
        const formattedPrice = formatPrice(dollars, cents)
        const inCart = item.count > 0
        return `
            <li>
                <div class="plate">
                    <img src="images/${item.image}" alt="${item.alt}" class="plate">
                </div>
                <div class="content">
                    <p class="menu-item">${item.name}</p>
                    <p class="price">${formattedPrice}</p>

                    ${!inCart ? `<button class="add" onClick="addToCart(${index})">Add to Cart</button>` :
                `<button class="in-cart">
                    <img src="images/check.svg"/>
                    In Cart
            </button>`
            }
                </div>
            </li>
        `
    }).join('')

    console.log(menuItemsHTMLString)
    menu.innerHTML = menuItemsHTMLString
}

const renderCart = () => {
    const cartSummaryHTMLString = menuItems.map((menuItem, index) => {
        if (menuItem.count === 0) return ""
        const [dollars, cents] = getDollarsAndCents(menuItem.price * menuItem.count)
        const formattedPrice = formatPrice(dollars, cents)

        const totalPrice = menuItem.price * menuItem.count
        const [totalDollars, totalCents] = getDollarsAndCents(totalPrice)
        const formattedTotalPrice = formatPrice(totalDollars, totalCents)
        return `  
        <li>
        <div class="plate">
          <img
            src="images/${menuItem.image}"
            alt="${menuItem.alt}"
            class="plate"
          />
          <div class="quantity">${menuItem.count}</div>
        </div>
        <div class="content">
          <p class="menu-item">${menuItem.name}</p>
          <p class="price">${formattedPrice}</p>
        </div>
        <div class="quantity__wrapper">
          <button class="decrease" onClick="subtractCountFromItem(${index})">
            <img src="images/chevron.svg" />
          </button>
          <div class="quantity">${menuItem.count}</div>
          <button class="increase" onClick="addCountToItem(${index})">
            <img src="images/chevron.svg" />
          </button>
        </div>
        <div class="subtotal">${formattedTotalPrice}</div>
      </li>
      `

    }).join('')
    cartSummary.innerHTML = cartSummaryHTMLString

    const subTotalPrice = menuItems.reduce((acc, curItem) => {
        return acc + curItem.price * curItem.count
    }, 0)
    const [subTotalDollars, subTotalCents] = getDollarsAndCents(subTotalPrice)
    subtotalText.innerText = formatPrice(subTotalDollars, subTotalCents)

    const taxPrice = Math.floor(subTotalPrice / 10)
    const [taxDollars, taxCents] = getDollarsAndCents(taxPrice)
    taxText.innerText = formatPrice(taxDollars, taxCents)

    const totalPrice = subTotalPrice + taxPrice
    const [totalDollars, totalCents] = getDollarsAndCents(totalPrice)
    totalText.innerText = formatPrice(totalDollars, totalCents)



}

const addToCart = (index) => {
    menuItems[index].count++
    renderMenu()
    renderCart()
}

const addCountToItem = (index) => {
    menuItems[index].count++
    renderCart()
}

const subtractCountFromItem = (index) => {
    menuItems[index].count--
    if (menuItems[index].count === 0) {
        renderMenu()
    }
    renderCart()
}


// write function to getDollarsAndCents
const getDollarsAndCents = (price) => {
    const dollars = Math.floor(price / 100)
    const cents = price % 100
    return [dollars, cents]
}

const formatPrice = (dollars, cents) => {
    if (cents < 10) {
        cents = cents + '0'
    }
    return `$${dollars}.${cents}`
}

renderMenu()
