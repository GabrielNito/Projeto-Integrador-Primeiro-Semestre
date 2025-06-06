const products = [
    {
      id: 1,
      name: "Zoom65",
      price: 179.99,
      description: "Teclado mecânico customizado 65% premium com design gasket mount e capacidades wireless.",
      features: [
        "Gasket mount",
        "Modos wireless e com fio",
        "PCB hot-swappable",
        "Case de alumínio",
        "Iluminação RGB por tecla",
      ],
      image: "/zoom65.jpg",
    },
    {
      id: 2,
      name: "GMK67",
      price: 199.99,
      description: "Teclado customizado 65% com estética limpa, case de alumínio CNC e experiência de digitação premium.",
      features: [
        "Case de alumínio CNC",
        "Estrutura top mount",
        "PCB hot-swappable",
        "RGB voltado para baixo",
        "Amortecimento de silicone",
      ],
      image: "/gmk67.jpg",
    },
    {
      id: 3,
      name: "Corne Keyboard",
      price: 129.99,
      description: "Teclado ergonômico split compacto otimizado para conforto e portabilidade.",
      features: [
        "Layout ergonômico split",
        "Hot-swappable switches low-profile ou MX",
        "Suporte wireless (opcional)",
        "Suporte para display OLED",
        "Firmware QMK open-source",
      ],
      image: "/corne_keyboard.webp",
    },
    {
      id: 4,
      name: "Neo75 CU",
      price: 229.99,
      description: "Teclado mecânico premium 75% com case elegante de alumínio CNC e recursos de ponta.",
      features: [
        "Layout 75%",
        "Gasket mount com espuma customizável",
        "PCB hot-swappable",
        "Conexão USB-C",
        "Programável via VIA/QMK",
      ],
      image: "/neo75cu.png",
    },
    {
      id: 5,
      name: "QK Alice Duo",
      price: 249.99,
      description: "Teclado layout Alice com design ergonômico split, suporte dual mode e estética linda.",
      features: [
        "Layout ergonômico Alice",
        "Gasket mount",
        "Modo duplo: com fio e wireless",
        "Hot-swappable",
        "RGB voltado para baixo",
      ],
      image: "/qk_alice_duo.jpg",
    },
    {
      id: 6,
      name: "KBDCraft Israfel",
      price: 189.99,
      description: "Teclado mecânico inspirado em artesanato com case estilo LEGO e recursos mecânicos customizáveis.",
      features: [
        "Design único estilo tijolo",
        "Layout 50%",
        "PCB hot-swappable",
        "Espuma de amortecimento de som",
        "Programável QMK/VIA",
      ],
      image: "/israfel.webp",
    },
  ]

  let cart = []
  let currentProduct = null
  
  function init() {
    renderProducts()
    updateCartCount()
  }
  
  function renderProducts() {
    const grid = document.getElementById("productsGrid")
    grid.innerHTML = products
      .map(
        (product) => `
          <div class="product-card" onclick="openModal(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">R$ ${product.price.toFixed(2).replace(".", ",")}</div>
                <ul class="product-features">
                    ${product.features
                      .slice(0, 3)
                      .map((feature) => `<li>${feature}</li>`)
                      .join("")}
                </ul>
            </div>
        </div>`
      )
      .join("")
  }
  
  function openModal(productId) {
    currentProduct = products.find((p) => p.id === productId)
    if (!currentProduct) return
  
    document.getElementById("modalTitle").textContent = currentProduct.name
    document.getElementById("modalImage").innerHTML =
      `<img src="${currentProduct.image}" alt="${currentProduct.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 0.5rem;">`
    document.getElementById("modalDescription").textContent = currentProduct.description
    document.getElementById("modalPrice").textContent = `R$ ${currentProduct.price.toFixed(2).replace(".", ",")}`
    document.getElementById("modalFeatures").innerHTML = currentProduct.features
      .map((feature) => `<li>${feature}</li>`)
      .join("")
    document.getElementById("quantityInput").value = 1
    document.getElementById("productModal").classList.add("active")
  }
  
  function closeModal() {
    document.getElementById("productModal").classList.remove("active")
    currentProduct = null
  }
  
  function changeQuantity(delta) {
    const input = document.getElementById("quantityInput")
    const newValue = Number.parseInt(input.value) + delta
    if (newValue >= 1) {
      input.value = newValue
    }
  }
  
  function addToCart() {
    if (!currentProduct) return
  
    const quantity = Number.parseInt(document.getElementById("quantityInput").value)
    const existingItem = cart.find((item) => item.id === currentProduct.id)
  
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.push({
        ...currentProduct,
        quantity: quantity,
      })
    }
  
    updateCartCount()
    updateCartDisplay()
    closeModal()
  
    alert(`${currentProduct.name} adicionado ao carrinho!`)
  }
  
  function toggleCart() {
    const sidebar = document.getElementById("cartSidebar")
    sidebar.classList.toggle("active")
    updateCartDisplay()
  }
  
  function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0)
    document.getElementById("cartCount").textContent = count
  }
  
  function updateCartDisplay() {
    const cartItems = document.getElementById("cartItems")
    const cartTotal = document.getElementById("cartTotal")
  
    if (cart.length === 0) {
      cartItems.innerHTML = '<div class="empty-cart">Seu carrinho está vazio</div>'
      cartTotal.textContent = "Total: R$ 0,00"
      return
    }
  
    cartItems.innerHTML = cart
      .map(
        (item) => `
          <div class="cart-item">
              <div class="product-image" style="width: 60px; height: 60px; min-width: 60px;">
                  <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 0.25rem;">
              </div>
              <div class="cart-item-info">
                  <div class="cart-item-name">${item.name}</div>
                  <div class="cart-item-price">R$ ${item.price.toFixed(2).replace(".", ",")}</div>
                  <div class="cart-item-quantity">
                      <button class="quantity-btn" onclick="event.stopPropagation(); updateCartQuantity(${item.id}, -1)">-</button>
                      <span>${item.quantity}</span>
                      <button class="quantity-btn" onclick="event.stopPropagation(); updateCartQuantity(${item.id}, 1)">+</button>
                      <button class="remove-btn" onclick="event.stopPropagation(); removeFromCart(${item.id})">Remover</button>
                  </div>
              </div>
          </div>
      `
      )
      .join("")
  
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    cartTotal.textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`
  }
  
  function updateCartQuantity(productId, delta) {
    const item = cart.find((item) => item.id === productId)
    if (item) {
      item.quantity += delta
      if (item.quantity <= 0) {
        removeFromCart(productId)
      } else {
        updateCartCount()
        updateCartDisplay()
      }
    }
  }
  
  function removeFromCart(productId) {
    cart = cart.filter((item) => item.id !== productId)
    updateCartCount()
    updateCartDisplay()
  }
  
  function checkout() {
    if (cart.length === 0) {
      alert("Seu carrinho está vazio!")
      return
    }
  
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    alert(
      `Obrigado pela sua compra! Total: R$ ${total.toFixed(2).replace(".", ",")}\n\nEsta é uma demonstração - nenhum pagamento real foi processado.`
    )
  
    cart = []
    updateCartCount()
    updateCartDisplay()
    toggleCart()
  }
  
  document.getElementById("productModal").addEventListener("click", function (e) {
    if (e.target === this) closeModal()
  })
  
  document.addEventListener("click", (e) => {
    const cartSidebar = document.getElementById("cartSidebar")
    const cartBtn = document.querySelector(".cart-btn")
  
    if (cartSidebar.classList.contains("active") &&
        !cartSidebar.contains(e.target) &&
        !cartBtn.contains(e.target)) {
      toggleCart()
    }
  })
  
  document.addEventListener("DOMContentLoaded", init)
  
  
  window.openModal = openModal
  window.closeModal = closeModal
  window.changeQuantity = changeQuantity
  window.addToCart = addToCart
  window.toggleCart = toggleCart
  window.updateCartQuantity = updateCartQuantity
  window.removeFromCart = removeFromCart
  window.checkout = checkout
  