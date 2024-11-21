document.addEventListener("DOMContentLoaded", function() {
  themDemo();
  themSp();
  checkCart();
});

function Product(idSp, hinhanh, tenSp, thongtinSp, gia) {
  this.idSp = idSp;
  this.hinhanh = hinhanh;
  this.tenSp = tenSp;
  this.thongtinSp = thongtinSp;
  this.gia = gia;
}

function themDemo() {
inventory = [];
let sp1 = new Product(
  1,
  "images/giay1.png",
  "Nike Pegasus 41 Blueprint",
  "Men's Road Running Shoes",
  3829000
);
let sp2 = new Product(
  2,
  "images/giay2.png",
  "Nike Pegasus 41 Blueprint",
  "Women's Road Running Shoes",
  3829000
);
let sp3 = new Product(
  3,
  "images/giay3.png",
  "Nike Mercurial Vapor 16 Elite",
  "FG Low-Top Football Boot",
  7319000
);
let sp4 = new Product(
  4,
  "images/giay8.png",
  "Nike Mercurial Vapor 16 Elite",
  "FG Low-Top Football Boot",
  7319000
);
let sp5 = new Product(
  5,
  "images/giay4.png",
  "Nike Alphafly 3 Blueprint",
  "Men's Road Running Shoes",
  8059000
);
let sp6 = new Product(
  6,
  "images/giay7.png",
  "Nike Alphafly 3 Blueprint",
  "Women's Road Running Shoes",
  8059000
);
let sp7 = new Product(
  7,
  "images/giay5.png",
  "Nike Pegasus EasyOn Blueprint",
  "Men's Road Running Shoes",
  3829000
);
let sp8 = new Product(
  8,
  "images/giay6.png",
  "Nike Pegasus EasyOn Blueprint",
  "Women's Road Running Shoes",
  3829000
);
let sp9 = new Product(
  9,
  "images/giay9.png",
  "Nike Invincible 3 Blueprint",
  "Men's Road Running Shoes",
  5279000
);
let sp10 = new Product(
  10,
  "images/giay10.png",
  "Nike Pegasus 41 Blueprint",
  "Women's Road Running Shoes",
  5279000
);
let sp11 = new Product(
  11,
  "images/giay11.png",
  "Nike InfinityRN 4 Blueprint",
  "Men's Road Running Shoes",
  4699000
);
let sp12 = new Product(
  12,
  "images/giay12.png",
  "Nike InfinityRN 4 Blueprint",
  "Women's Road Running Shoes",
  4699000
);

inventory.push(sp1, sp2, sp3, sp4, sp5, sp6, sp7, sp8, sp9, sp10, sp11, sp12);
}

function themSp() {
  var dongMoi = document.createElement("div");
  dongMoi.classList.add("dongSp");
  for (i = 0; i < inventory.length; i++) {
    var dem = i + 1;
    var nodeSp = document.createElement("div");
    nodeSp.classList.add("Sp");
    var str = ` 
      <div class="sanpham">
          <div class="anh">
              <img src="${inventory[i].hinhanh}">
              <h3>${inventory[i].tenSp}</h3>
              <p>${inventory[i].thongtinSp}</p>
          <div class="giaNutMua">
              <p class="gia">${convertMoney(inventory[i].gia)}</p>
              <div class="p1" onclick="ThemSpVaoGioHang(${inventory[i].idSp});">Add To Bag</div>
          </div> 
      </div>`;
    nodeSp.innerHTML = str;
    dongMoi.appendChild(nodeSp);
    if (dem % 4 == 0) {
      var viTriGan = document.getElementsByClassName("psanpham")[0];
      viTriGan.appendChild(dongMoi);
      var dongMoi = document.createElement("div");
      dongMoi.classList.add("dongSp");
    }
  }
  if (dem % 4 > 0) {
    let viTriGan = document.getElementsByClassName("psanpham")[0];
    viTriGan.appendChild(dongMoi);
  }
}

function convertMoney(num){
  return num.toLocaleString("it-IT", { style: "currency", currency: "VND" });
}

cart = []; // giỏ hàng, mảng lưu trữ các mặt hàng
function ProductCart(idSp, hinhanh, tenSp, thongtinSp, gia, soLuong) {
  // Tạo lớp Product trong giỏ hàng
  this.idSp = idSp;
  this.hinhanh = hinhanh;
  this.tenSp = tenSp;
  this.thongtinSp = thongtinSp;
  this.gia = gia;
  this.soLuong = soLuong;
}

function checkCart() {
  // Kiểm tra số lượng sản phẩm của giỏ hàng - nếu có
  cart = JSON.parse(localStorage.getItem("data")) || []; // lấy thông tin giỏ hàng đã lưu
  updateMainTongSL(); // cập nhập tổng số lượng sản phẩm nếu có
}

function ThemSpVaoGioHang(idSThem) {
  checkCart(); // kiểm tra giỏ hàng đã có thông tin hay chưa

  // khi bấm nút, thêm sản phẩm vào giỏ hàng
  var chuaCo = true; // giả sử đây là sản phẩm mới, trong giỏ hàng chưa có
  // Nếu sản phẩm chưa có trong giỏ hàng thì tạo mới sản phẩm
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].idSp == idSThem) {
      // Nếu sản phẩm có trong giỏ hàng thì tăng số lượng sản phẩm lên 1, mổi khi bấm nút thêm
      cart[i].soLuong += 1;
      chuaCo = false; // sản phẩm đã có trong giỏ hàng
      break;
    }
  }
  if (chuaCo) {
    // nếu sản phẩm chưa có trong giỏ hàng -> sản phẩm mới
    for (var i = 0; i < inventory.length; i++) {
      // lấy thông tin sản phẩm có id
      if (inventory[i].idSp == idSThem) break;
    } // xác định phần tử nguồn thông tin
    let spCart = new ProductCart(); // tạo sản phẩm mới cho giỏ hàng
    spCart.idSp = idSThem;
    spCart.tenSp = inventory[i].tenSp;
    spCart.hinhanh = inventory[i].hinhanh;
    spCart.thongtinSp = inventory[i].thongtinSp;
    spCart.gia = inventory[i].gia;
    spCart.soLuong = 1;
    cart.push(spCart);
  }
  updateMainTongSL(); // cập nhập tổng số lượng sản phẩm của giỏ hàng
  localStorage.setItem("data", JSON.stringify(cart)); // lưu giỏ hàng
}

function updateMainTongSL() {
  // đếm tổng số lượng sp trong mảng cart
  var dem = 0;
  for (var i = 0; i < cart.length; i++) {
    dem += cart[i].soLuong;
  }
  // Cập nhập thông tin tổng số lượng ở trang main
  var tongSL = document.getElementsByClassName("TongSL")[0];
  tongSL.innerHTML = dem;
}
