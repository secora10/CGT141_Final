const SAMPLE_POOL = [
  { image: "images/Cat1.png", title: "Cat1" },
  { image: "images/Cat2.png", title: "Cat2" },
  { image: "images/Cat3.png", title: "Cat3" },
  { image: "images/Cat4.png", title: "Cat4" },
];

const STORAGE_KEYS = {
  POOL: "gachaPool",
  COLLECTION: "gachaCollection"
};

const els = {
  pullBtn: document.getElementById("pullBtn"),
  resultImage: document.getElementById("resultImage"),
  resultTitle: document.getElementById("resultTitle"),
  collection: document.getElementById("collection"),
  clearHistoryBtn: document.getElementById("clearHistoryBtn"),
};

let pool = [];
let collection = [];

function save(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}
function load(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

function loadState() {
  const savedPool = load(STORAGE_KEYS.POOL);
  pool = Array.isArray(savedPool) && savedPool.length ? savedPool : SAMPLE_POOL.slice();


  const savedCol = load(STORAGE_KEYS.COLLECTION);
  collection = Array.isArray(savedCol) ? savedCol : [];
}
loadState();

function renderCollection() {
  els.collection.innerHTML = "";
  if (!collection.length) {
    els.collection.insertAdjacentHTML("beforeend", `<div style="color:#6b6b6b;font-size:0.9rem;padding:12px 0;">No items yet — pull something!</div>`);
    return;
  }

  collection.slice().reverse().forEach(item => { 
    const div = document.createElement("div");
    div.className = "col-item";
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title || "Prize";
    const t = document.createElement("div");
    t.className = "title";
    t.textContent = item.title || "Untitled";
    div.appendChild(img);
    div.appendChild(t);
    els.collection.appendChild(div);
  });
}

function showResult(item) {
  els.resultImage.src = item.image;
  els.resultImage.alt = item.title || "Prize";
  els.resultTitle.textContent = item.title ? `You got: ${item.title}!` : "You got a prize!";
}

function pickRandom(arr) {
  if (!arr.length) return null;
  return arr[Math.floor(Math.random() * arr.length)];
}

els.pullBtn.addEventListener("click", () => {
  if (!pool.length) {
    alert("Prize pool is empty. Please add images to the pool in the script.js file.");
    return;
  }
  const prize = pickRandom(pool);
  showResult(prize);

  collection.push({
    image: prize.image,
    title: prize.title || "",
    timestamp: Date.now()
  });
  save(STORAGE_KEYS.COLLECTION, collection);
  renderCollection();
});

els.clearHistoryBtn.addEventListener("click", () => {
  if (!confirm("Clear your saved collection? This cannot be undone.")) return;
  collection = [];
  save(STORAGE_KEYS.COLLECTION, collection);
  renderCollection();
  els.resultImage.src = "";
  els.resultImage.alt = "Your prize will appear here";
  els.resultTitle.textContent = "Ready to Pull!";
});

renderCollection();
if (collection.length) {
  showResult(collection[collection.length - 1]);
} else {
  els.resultImage.src = SAMPLE_POOL[0].image; 
  els.resultTitle.textContent = "Ready to Pull!";
}