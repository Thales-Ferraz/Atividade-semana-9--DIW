const data = {
  produtos: [
    { id: 1, nome: "iPhone 13", preco: 5000, categoria: "Celulares", imagem: "https://picsum.photos/150", descricao: "Celular Apple", emEstoque: true },
    { id: 2, nome: "Galaxy S22", preco: 4000, categoria: "Celulares", imagem: "https://picsum.photos/150", descricao: "Celular Samsung", emEstoque: true },
    { id: 3, nome: "Notebook Dell", preco: 3500, categoria: "Notebooks", imagem: "https://picsum.photos/150", descricao: "Notebook potente", emEstoque: false },
    { id: 4, nome: "Mouse Gamer", preco: 150, categoria: "Acessórios", imagem: "https://picsum.photos/150", descricao: "Mouse RGB", emEstoque: true },
    { id: 5, nome: "Teclado Mecânico", preco: 300, categoria: "Acessórios", imagem: "https://picsum.photos/150", descricao: "Teclado gamer", emEstoque: true },
    { id: 6, nome: "PlayStation 5", preco: 4500, categoria: "Games", imagem: "https://picsum.photos/150", descricao: "Console Sony", emEstoque: false },
    { id: 7, nome: "Xbox Series X", preco: 4300, categoria: "Games", imagem: "https://picsum.photos/150", descricao: "Console Microsoft", emEstoque: true },
    { id: 8, nome: "MacBook Air", preco: 8000, categoria: "Notebooks", imagem: "https://picsum.photos/150", descricao: "Notebook Apple", emEstoque: true }
  ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");

function formatPrice(preco) {
  return "R$ " + preco.toFixed(2);
}

function createProductCard(produto) {
  const card = document.createElement("div");

  card.setAttribute("data-id", produto.id);
  card.classList.add("card");

  // estilo via JS (obrigatório)
  card.style.backgroundColor = "#f9f9f9";

  card.innerHTML = `
    <h3>${produto.nome}</h3>
    <img src="${produto.imagem}" width="100%">
    <p>${formatPrice(produto.preco)}</p>
    <p>${produto.categoria}</p>
    <button class="details-btn">Ver detalhes</button>
    <button class="highlight-btn">Destacar</button>
  `;

  const btnDetails = card.querySelector(".details-btn");
  const btnHighlight = card.querySelector(".highlight-btn");

  // evento detalhes
  btnDetails.addEventListener("click", () => {
    showProductDetails(produto);
  });

  // evento destaque
  btnHighlight.addEventListener("click", () => {
    card.classList.toggle("highlight");
  });

  return card;
}

function renderProducts(produtos) {
  productList.innerHTML = "";

  produtos.forEach(produto => {
    const card = createProductCard(produto);
    productList.appendChild(card);
  });

  // querySelectorAll (OBRIGATÓRIO)
  const cards = document.querySelectorAll(".card");
  cards.forEach(card => {
    console.log("Card ID:", card.getAttribute("data-id"));
  });
}

function renderCategories() {
  const categorias = [...new Set(data.produtos.map(p => p.categoria))];

  categorias.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto) {
  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p>Preço: ${formatPrice(produto.preco)}</p>
    <p>Categoria: ${produto.categoria}</p>
    <p>Estoque: ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
    <p>${produto.descricao}</p>
  `;
}

function filterProducts() {
  const searchText = searchInput.value.toLowerCase();
  const categoria = categorySelect.value;

  return data.produtos.filter(produto => {
    const matchNome = produto.nome.toLowerCase().includes(searchText);
    const matchCategoria = categoria === "Todas" || produto.categoria === categoria;

    return matchNome && matchCategoria;
  });
}   

renderCategories();
renderProducts(data.produtos);