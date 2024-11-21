RenderGioHang(); // load các sản phẩm giỏ hàng nếu có//

function RenderGioHang() {
  cart = JSON.parse(localStorage.getItem("data")) || []; // lấy thông tin giỏ hàng đã lưu nếu có
  // nếu cart rỗng thì xóa nội dung giỏ hàng trên màn hình
  if (cart.length == 0) {
    const viTriThem = document.getElementsByClassName("cacSpCart")[0];
    viTriThem.innerHTML = "";
    // ẩn nút thanh toán, nút xóa
    let tt1 = document.getElementsByClassName("thanhToanCartXoaCart")[0];
    tt1.style.display = "none";
    // và ẩn thông tin thanh toán,
    let tt2 = document.getElementsByClassName("thongtin")[0];
    tt2.style.display = "none";
    return;
  }
  let viTriThem = document.getElementsByClassName("cacSpCart")[0];
  for (i = 0; i < cart.length; i++) {
    // tạo dòng mới
    var nodeMoi = document.createElement("nodeMoiSp");
    nodeMoi.classList.add("dongSpCart");
    // thêm thông tin sản phẩm
    var str = ` 
        <div class="hinhCartThongTinCart">
            <div class="hinhCart">
                <img src="${cart[i].hinhanh}" alt="Hình sản phẩm" />
            </div>
            <div class="ThongTinCart">
                <div class="TenSpCart">${cart[i].tenSp}</div>
                <div class="ThongTinSpCart">${cart[i].thongtinSp}</div>
                <div class="GiaSpCart">${convertMoney(cart[i].gia)}</div>
                <div class"nutxoasoluong">
                  <buton class='bx bx-trash-alt' onclick="XoaSp(${cart[i].idSp})"></buton>
                  <input type="number" class="soluong" value=${cart[i].soLuong} onchange="thaydoiSL(${cart[i].idSp});"/>
                </div>
            </div>
        </div>`;
        nodeMoi.innerHTML = str;
        // thêm node mới vào trang html
        viTriThem.appendChild(nodeMoi);
    }
    updateMainTongSLCart(); // sau khi vẽ giỏ hàng thì cập nhập tổng số lượng, thông tin thanh toán
}

let maKhuyenMai = {
  A: 30,
  B: 20,
  C: 10,
};

function KhuyenMai() {
  // Tại thời điểm thanh toán: xét xem thời gian khuyến mãi, có còn hay không
  var tKM = localStorage.getItem("nbdkm") || false;
  if (!tKM) {
    // Nếu không có thời gian khuyến mãi hay đã hết hạn thì thông báo đã hết thời gian khuyến mãi
    // tính theo giá bình thường
    alert("Chú ý: Thời gian khuyến mãi đã hết !!!");
    return;
  }
  
  // Có khuyến mãi, nhưng tại thời điểm thanh toán, đã hết hạn
  var currDate = new Date();
  var thoiGianConLai = Date.parse(tKM) - currDate.getTime();
  if (thoiGianConLai < 0) {
    localStorage.removeItem("nbdkm");
    alert("Chú ý: Thời gian khuyến mãi đã hết !!!");
    return;
  }

  // Nếu còn thời gian khuyến mãi
  var ttTongTien = 0; // Tổng tiền sản phẩm
  var ttVAT = 0; // Tổng tiền VAT 5%
  var ttTongTienGG = 0; // Tổng tiền khuyến mãi
  var ttTongThanhToan = 0; // Tổng tiền thanh toán
  var tongGiaTriSp = 0; // Tổng giá trị mỗi sản phẩm = số lượng * đơn giá
  for (var i = 0; i < cart.length; i++) {
    tongGiaTriSp = cart[i].soLuong * cart[i].gia;
    ttTongTien += tongGiaTriSp;
  }
  
  // Lấy và kiểm tra mã giảm giá
  var maGG = document.querySelector(".codekhuyenMai").value; // Kiểu input - value
  maGG = maGG.toUpperCase(); // Chuyển ký tự nhập thành hoa
  var phanTramGG = 0;
  if (maKhuyenMai[maGG]) {
    phanTramGG = maKhuyenMai[maGG];
  }

  // Tính toán nếu có mã khuyến mãi, mã hợp lệ, và thời gian khuyến mãi còn
  var viTriGG = document.getElementsByClassName("giamGiaCart")[0];
  if (viTriGG) {
    var vitriGGHienThi = viTriGG.getElementsByTagName("span")[0]; // Vị trí hiển thị giảm giá
    if (phanTramGG > 0) {
      ttTongTienGG = (ttTongTien * phanTramGG) / 100;
      ttTongThanhToan = ttTongTien + ttVAT - ttTongTienGG; // Giảm (tổng tiền phải thanh toán) = ((tổng tiền) + VAT) - khuyến mãi
      viTriGG.style.display = "flex";
    } else {
      // Mã khuyến mãi không hợp lệ
      ttTongThanhToan = ttTongTien + ttVAT; // (Tổng tiền phải thanh toán) = ((tổng tiền) + VAT)
      viTriGG.style.display = "none";
    }
    ttVAT = (ttTongTien * 5) / 100;
    // Hiển thị thông tin
    var ttKM = document.querySelectorAll(".clsTongTienCartVATCartTongTTCart span");
    if (ttKM.length >= 4) {
      ttKM[0].innerHTML = convertMoney(ttTongTien);
      ttKM[1].innerHTML = convertMoney(ttVAT);
      ttKM[3].innerHTML = convertMoney(ttTongThanhToan);
       viTriGG.innerHTML = convertMoney(ttTongTienGG);
    } else {
      console.error("Expected at least 4 span elements inside .clsTongTienCartVATCartTongTTCart");
    }
  } else {
    console.error("Element with class 'giamGiaCart' not found in the DOM");
  }
}

    
function updateMainTongSLCart() {
  // đếm tổng số lượng sp trong mảng cart
  var dem = 0;
  for (i = 0; i < cart.length; i++) {
    dem += cart[i].soLuong;
  }
  // Cập nhập thông tin tổng số lượng ở trang main
  var tongSL = document.getElementsByClassName("TongSL")[0];
  tongSL.innerHTML = dem;
  updateThongTinTT(); // đồng thời, cập nhập thông tin thanh toán
}
    
function updateThongTinTT() {
  // cập nhập thông tin thanh toán: tổng tiền, vat, khuyến mãi, tổng thanh toán
  var ttTongTien = 0;
  var tongGiaTriSp = 0; // tổng giả trị sản phẩm = số lượng * đơn giá
  for (i = 0; i < cart.length; i++) {
    tongGiaTriSp = cart[i].soLuong * cart[i].gia;
    ttTongTien += tongGiaTriSp;
  }
  var ttVAT = (ttTongTien * 5) / 100;
  var ttTongThanhToan = ttTongTien + ttVAT;
  let tt = document.querySelectorAll(".clsTongTienCartVATCartTongTTCart span");
  tt[0].innerHTML = convertMoney(ttTongTien);
  tt[1].innerHTML = convertMoney(ttVAT);
  tt[3].innerHTML = convertMoney(ttTongThanhToan);
}
    
function XoaGioHang() {
  cart = []; //cart hiện tại trong bộ nhớ bằng rỗng
  localStorage.setItem("data", JSON.stringify(cart)); // ghi lại vào localStorage
  updateMainTongSLCart(); // cập nhập tổng số lượng sản phẩm giỏ hàng
  RenderGioHang(cart); // render trang giỏ hàng
}
    
function thanhToanGioHang() {
  XoaGioHang();
  alert(" Cám ơn quý khách đã thanh toán");
  window.location.href = "trangchu.html";
}
  function convertMoney(num) {
  return num.toLocaleString("it-IT", { style: "currency", currency: "VND" });
}
    
function XoaSp(idSpXoa) {
  // khi xóa 1 sản phẩm
  // cập nhập lại mảng
  // ghi lại json
  // cập nhập tổng số lượng sản phẩm + thông tin thanh toán
  // vẽ lại giao diện
  for (i = 0; i < cart.length; i++) {
  // cập nhập cart hiện tại trong bộ nhớ
  if (cart[i].idSp == idSpXoa) cart.splice(i, 1);
}
  localStorage.setItem("data", JSON.stringify(cart)); // ghi lại vào localStorage
  updateMainTongSLCart(); // cập nhập lại tổng số lượng sản phẩm trong giỏ hàng
  const viTriThem = document.getElementsByClassName("cacSpCart")[0]; // xóa render của giỏ hàng hiện tại
  viTriThem.innerHTML = ""; // xóa nội dung giỏ hàng trên giao diện HTML
  RenderGioHang(cart); // vẽ lại giỏ hàng
}
    
function thaydoiSL(idSp) {
  let giaTri = event.target.value; // lấy giá trị nhập
  if (parseInt(giaTri) < 0) {
  // nếu là số âm
  event.target.value = 1; // giá trị input là 1, trên giao diện
  giaTri = 1;
}
for (i = 0; i < cart.length; i++) {
  // cập nhập vào phần tử mảng
  if (cart[i].idSp == idSp) cart[i].soLuong = Number(giaTri); // nếu không chuyển, tự động sai
  //  parseInt(giaTri) hay Number(giaTri)
}
  updateMainTongSLCart(); // cập nhập lại tổng số lượng sản phẩm trong giỏ hàng
}
    
