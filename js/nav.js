document.addEventListener("DOMContentLoaded", () => {
    // Activate sidebar nav
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        const http = new XMLHttpRequest();
        http.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status != 200) return;

                // Muat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
                    elm.innerHTML = http.responseText;
                });

                document.querySelectorAll(".sidenav a, .topnav a").forEach((elm) => {
                    elm.addEventListener("click", (event) => {
                        let sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        http.open("GET", "nav.html", true)
        http.send();
    }
});

let page = window.location.hash.substr(1);
if (page == "")
    page = "home";
loadPage(page);

function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            let content = document.querySelector("#body-content");
            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
                console.log(page)
            } else if (this.status == 404) {
                content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
            } else {
                content.innerHTML = "<p>Ups... halaman tidak dapat di akses.</p>";
            }
        }
    };

    xhttp.open("GET", `pages/${page}.html`, true);
    xhttp.send();
}

