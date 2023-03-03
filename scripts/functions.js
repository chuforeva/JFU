function menu() {
    var menu = document.getElementById("menu");
    var menu_btn = document.getElementsByClassName("nav-menu")[0];
    var icon = menu_btn.lastElementChild.lastElementChild;

    if (menu_btn.classList.contains("open")) {
        menu_btn.classList.remove("open");
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
        menu.style.maxHeight = null;
    } else {
        menu_btn.classList.add("open");
        icon.classList.add("fa-xmark");
        icon.classList.remove("fa-bars");
        menu.style.maxHeight = "calc(100vh - 40px)";
    }
}

function comingsoon() {
    alert("COMING SOON!");
}