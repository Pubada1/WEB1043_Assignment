loadTGKMHome(); //trang chủ Home - load HTML thời gian khuyến mãi
checkTGKM(); // trang chủ Home - kiểm tra thời gian khuyến mãi nếu còn
loadTGKMToInput(); //trang thiết lập thời gian khuyến mãi - nếu có thời gian khuyến mãi thì load và nạp lên giao diên input -

//////// Trang Chủ Home

function loadTGKMHome() {
  let tgKM1 = document.getElementsByClassName("pTGKM")[0];  
  tgKM1.innerHTML = `
      <div>Promotion period remaining</div>
      <div id="idTgKM"></div> 
      <div class="ngay"></div>
      <div class="gio"></div>
      <div class="phut"></div>
      <div class="giay"></div>`;
}

function anThongTinKM(message) {
  let t = document.getElementsByClassName("pTGKM")[0];
  if (t) {
    t.style.display = "none";
    if (message) {
      t.innerHTML = message;
    }
  }
}

function checkTGKM() {
  var tgKM = localStorage.getItem("nbdkm");
  
  if (!tgKM) {
    anThongTinKM("No promotions today");
    return;
  }
  
  // Bắt đầu cập nhật hiển thị thời gian còn lại
  thoiGianIn = setInterval(function() {
    TinhToanCapNhapHienThi(tgKM);
  }, 1000);
}

function TinhToanCapNhapHienThi(tgKM) {
  var d = TinhToanThoiGianConLai(tgKM);
  
  if (d.tongMiliGiayCon < 0) {
    localStorage.removeItem("nbdkm");
    anThongTinKM("No promotions today");
    clearInterval(thoiGianIn);
    return;
  }
  
  var locationNgay = document.getElementsByClassName("ngay")[0];
  var locationGio = document.getElementsByClassName("gio")[0];
  var locationPhut = document.getElementsByClassName("phut")[0];
  var locationGiay = document.getElementsByClassName("giay")[0];
  
  if (locationNgay) locationNgay.innerHTML = d.ngay + " Day";
  if (locationGio) locationGio.innerHTML = d.gio + " Hour";
  if (locationPhut) locationPhut.innerHTML = d.phut + " Minute";
  if (locationGiay) locationGiay.innerHTML = d.giay + " Second";
}

function TinhToanThoiGianConLai(tgKM) {
  var currDate = new Date();
  var tgRemain = Date.parse(tgKM) - currDate.getTime(); // số mili giây

  var tongSoGiay = Math.floor(tgRemain / 1000);
  var tongSoPhut = Math.floor(tongSoGiay / 60);
  var tongSoGio = Math.floor(tongSoPhut / 60);
  var tongSoNgay = Math.floor(tongSoGio / 24);

  var tongSoGiayLe = tongSoGiay % 60;
  var tongSoPhutLe = tongSoPhut % 60;
  var tongSoGioLe = tongSoGio % 24;

  return {
    tongMiliGiayCon: tgRemain,
    ngay: tongSoNgay,
    gio: tongSoGioLe,
    phut: tongSoPhutLe,
    giay: tongSoGiayLe,
  };
}

//////// Trang Thiết Lập Thời Gian Khuyến Mãi

function loadTGKMToInput() {
  var t1 = localStorage.getItem("nbdkm");
  if (t1) {
    var nkm = document.querySelector("input[name='tgKM']");
    if (nkm) {
      var ngay = new Date(t1);
      ngay.setHours(0, 0, 0, 0);
      nkm.valueAsDate = ngay;
    }
  }
}

function thietlapKMToLocal() {
  var nkm = document.querySelector("input[name='tgKM']");
  if (nkm) {
    var t = new Date(nkm.value);
    t.setHours(0, 0, 0, 0);
    localStorage.setItem("nbdkm", t.toISOString());
  }
}

