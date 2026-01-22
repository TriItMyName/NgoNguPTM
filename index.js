// Constructor function Product (đúng thứ tự đề: id, name, price, quantity, category, isAvailable)
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}

const products = [
    new Product("P01", "MacBook Pro 16", 65000000, 5, "Laptop", true),
    new Product("P02", "Dell XPS 13", 42000000, 0, "Laptop", true),
    new Product("P03", "iPhone 15 Pro", 32000000, 10, "Phone", true),
    new Product("P04", "Samsung Galaxy S24", 27000000, 8, "Phone", false),
    new Product("P05", "AirPods Pro", 6500000, 12, "Accessories", true),
    new Product("P06", "Magic Mouse", 2500000, 3, "Accessories", true)
];

function formatVND(value) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
}

function escapeHtml(text) {
    return String(text)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function renderProductsTable(list) {
    const rows = list
        .map(
            (p) => `
<tr>
  <td>${escapeHtml(p.id)}</td>
  <td>${escapeHtml(p.name)}</td>
  <td>${formatVND(p.price)}</td>
  <td>${p.quantity}</td>
  <td>${escapeHtml(p.category)}</td>
  <td><span class="badge ${p.isAvailable ? "on" : "off"}">${p.isAvailable ? "true" : "false"}</span></td>
</tr>`
        )
        .join("");

    return `
<table>
  <thead>
    <tr>
      <th>id</th>
      <th>name</th>
      <th>price</th>
      <th>quantity</th>
      <th>category</th>
      <th>isAvailable</th>
    </tr>
  </thead>
  <tbody>
    ${rows}
  </tbody>
</table>`;
}

function renderNamePriceTable(list) {
    const rows = list
        .map(
            (x) => `
<tr>
  <td>${escapeHtml(x.name)}</td>
  <td>${formatVND(x.price)}</td>
</tr>`
        )
        .join("");

    return `
<table>
  <thead>
    <tr>
      <th>name</th>
      <th>price</th>
    </tr>
  </thead>
  <tbody>
    ${rows}
  </tbody>
</table>`;
}

function renderCard({ title, desc, bodyHtml }) {
    return `
<section class="card">
  <div class="card-header">
    <h2 class="card-title">${escapeHtml(title)}</h2>
    <p class="card-desc">${escapeHtml(desc)}</p>
  </div>
  <div class="card-body">
    ${bodyHtml}
  </div>
</section>`;
}

function render() {
    const nav = document.getElementById("nav");
    const content = document.getElementById("content");

    const namePriceList = products.map((p) => ({ name: p.name, price: p.price }));
    const inStockProducts = products.filter((p) => p.quantity > 0);
    const hasProductOver30M = products.some((p) => p.price > 30000000);
    const accessories = products.filter((p) => p.category === "Accessories");
    const allAccessoriesAvailable = accessories.every((p) => p.isAvailable === true);
    const totalInventoryValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const q8Lines = products.map((p) => {
        const status = p.isAvailable ? "Đang bán" : "Ngừng bán";
        return `${p.name} - ${p.category} - ${status}`;
    });

    const sampleProduct = products[0];
    const keys = [];
    for (const key in sampleProduct) keys.push(key);
    const values = [];
    for (const key in sampleProduct) values.push(String(sampleProduct[key]));

    const sellingAndInStockNames = products
        .filter((p) => p.isAvailable === true && p.quantity > 0)
        .map((p) => p.name);

    const questions = [
        {
            id: "q2",
            label: "Câu 2",
            title: "Câu 2: Mảng products",
            desc: "Khởi tạo mảng products gồm ít nhất 6 sản phẩm, tối thiểu 2 danh mục khác nhau.",
            bodyHtml: renderProductsTable(products)
        },
        {
            id: "q3",
            label: "Câu 3",
            title: "Câu 3: Mảng (name, price)",
            desc: "Tạo mảng mới chỉ chứa name và price của mỗi sản phẩm.",
            bodyHtml: renderNamePriceTable(namePriceList)
        },
        {
            id: "q4",
            label: "Câu 4",
            title: "Câu 4: Sản phẩm còn hàng",
            desc: "Lọc ra các sản phẩm còn hàng trong kho (quantity > 0).",
            bodyHtml: renderProductsTable(inStockProducts)
        },
        {
            id: "q5",
            label: "Câu 5",
            title: "Câu 5: Có sản phẩm > 30.000.000?",
            desc: "Kiểm tra xem có ít nhất một sản phẩm có giá trên 30.000.000 hay không.",
            bodyHtml: `
<div class="pill ${hasProductOver30M ? "ok" : "no"}">
  <span style="color:${hasProductOver30M ? "var(--accent2)" : "var(--danger)"}; font-weight:700;">${hasProductOver30M ? "TRUE" : "FALSE"}</span>
  <span class="muted">(some)</span>
</div>`
        },
        {
            id: "q6",
            label: "Câu 6",
            title: "Câu 6: Accessories đều đang bán?",
            desc: "Kiểm tra xem tất cả sản phẩm thuộc danh mục 'Accessories' có isAvailable = true hay không.",
            bodyHtml: `
<div class="kpi">
  <div class="pill ${allAccessoriesAvailable ? "ok" : "no"}">
    <span style="color:${allAccessoriesAvailable ? "var(--accent2)" : "var(--danger)"}; font-weight:700;">${allAccessoriesAvailable ? "TRUE" : "FALSE"}</span>
    <span class="muted">(every)</span>
  </div>
  <div>
    <div class="muted" style="margin-bottom:8px;">Danh sách Accessories:</div>
    ${renderProductsTable(accessories)}
  </div>
</div>`
        },
        {
            id: "q7",
            label: "Câu 7",
            title: "Câu 7: Tổng giá trị kho",
            desc: "Tính tổng giá trị kho hàng. Công thức: price × quantity.",
            bodyHtml: `
<div class="kpi">
  <div class="value">${formatVND(totalInventoryValue)}</div>
  <div class="muted">(reduce)</div>
</div>`
        },
        {
            id: "q8",
            label: "Câu 8",
            title: "Câu 8: for...of in thông tin",
            desc: "Dùng for...of duyệt mảng products và in: Tên - Danh mục - Trạng thái.",
            bodyHtml: `<div class="mono">${escapeHtml(q8Lines.join("\n"))}</div>`
        },
        {
            id: "q9",
            label: "Câu 9",
            title: "Câu 9: for...in (tên thuộc tính + giá trị)",
            desc: "Dùng for...in để in ra tên thuộc tính và giá trị tương ứng của 1 sản phẩm mẫu.",
            bodyHtml: `
<div class="kpi">
  <div>
    <div class="muted" style="margin-bottom:8px;">Tên thuộc tính:</div>
    <div class="mono">${escapeHtml(keys.join("\n"))}</div>
  </div>
  <div style="margin-top:12px;">
    <div class="muted" style="margin-bottom:8px;">Giá trị tương ứng:</div>
    <div class="mono">${escapeHtml(values.join("\n"))}</div>
  </div>
</div>`
        },
        {
            id: "q10",
            label: "Câu 10",
            title: "Câu 10: Tên sản phẩm đang bán & còn hàng",
            desc: "Lấy danh sách tên các sản phẩm đang bán và còn hàng.",
            bodyHtml: `<div class="mono">${escapeHtml(sellingAndInStockNames.join("\n") || "(Không có)")}</div>`
        }
    ];

    function setActive(activeId) {
        const buttons = nav.querySelectorAll("button.nav-item");
        buttons.forEach((btn) => {
            const isActive = btn.dataset.id === activeId;
            btn.classList.toggle("active", isActive);
            btn.setAttribute("aria-current", isActive ? "page" : "false");
        });
    }

    function showQuestion(id) {
        const q = questions.find((x) => x.id === id) || questions[0];
        content.innerHTML = renderCard({ title: q.title, desc: q.desc, bodyHtml: q.bodyHtml });
        setActive(q.id);
        history.replaceState(null, "", `#${q.id}`);
    }

    nav.innerHTML = questions
        .map(
            (q) => `
<button class="nav-item" type="button" data-id="${escapeHtml(q.id)}">
  <strong>${escapeHtml(q.label)}</strong>
  <span class="small">${escapeHtml(q.title.replace(/^Câu \d+:\s*/, ""))}</span>
</button>`
        )
        .join("");

    nav.addEventListener("click", (e) => {
        const btn = e.target.closest("button.nav-item");
        if (!btn) return;
        showQuestion(btn.dataset.id);
    });

    const initial = (location.hash || "").replace("#", "");
    showQuestion(initial || "q2");
}

render();
