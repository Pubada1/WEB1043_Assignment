loadMenu();

function loadMenu() {
  let t = document.getElementsByClassName("pmenu")[0];
  t.innerHTML = `
        <div class="container">
            <div class="h1">
                <a href="trangchu.html"><img href="ass.html" src="images/OIP.jpg"></a>
            </div>

            <div class="side-menu">
                <ul>  
                    <li><a href="">New & Featured</a></li>
                    <li><a href="">Men</a></li>
                    <li><a href="">Women</a></li>
                    <li><a href="">Kids</a></li>
                    <li><a href="">Sale</a></li>
                    <li><a href="">Customise</a></li>
                    <li><a href="km.html">promotion</a></li>
                </ul>
            </div>

            <div class="ic1">
                <i class='bx bxs-user'></i>  
                <a href="giohang.html">
                    <i class='bx bx-shopping-bag'></i> 
                    <p class="TongSL"></p>
                </a>
            </div>
        </div>`;
}
