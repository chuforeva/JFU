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

function getHost() {
    return window.location.origin;
}

function init() {
    insertHeader();
    insertNavMobile();
    insertNavPC();
    insertFooter();
}

function insertHeader() {
    if (window.location.pathname != "/index.html" && window.location.pathname != "/") {
        var headers = document.getElementsByTagName("header");
        for (header of headers) {
            header.innerHTML = `<a href="${window.location.origin}"><img class="pc-page-header" src="${window.location.origin}/images/logos/JFU_logo_5.png"></a>`;
        }
    }
}

function insertNavMobile() {
    fetch(window.location.origin + "/data.json")
        .then((res) => res.json())
        .then((json) => {
            var html = `<ul>
                        <li class="nav-mobile nav-logo">
                            <a href="${window.location.origin}"><img src="${window.location.origin}/images/logos/JFU_logo_4.png"></a>
                        </li>
                        <li class="nav-mobile nav-menu"><a href="javascript:menu()"><i class="fa-solid fa-bars"></i></a></li>
                    </ul>
                    <div id="menu">
                        <img src="${window.location.origin}/images/logos/JFU_logo_5.png" id="menu-logo">
                        <a href="${window.location.origin}" class="btn-menu">HOME</a>
                    `;

            for (li of json.nav) {
                if (!Array.isArray(li.link)) {
                    if (li.link.includes("javascript:comingsoon()")) {
                        html += `<a href="${li.link}" class="btn-menu btn-disable">${li.title}</a>`;

                    } else if (li.link.includes("http")) {
                        html += `<a href="${li.link}" class="btn-menu" target="_blank">${li.title}</a>`;


                    } else if (li.link.includes("javascript")) {
                        html += `<a href="${li.link}" class="btn-menu">${li.title}</a>`;

                    } else {
                        html += `<a href="${window.location.origin + li.link}" class="btn-menu">${li.title}</a>`;
                    }

                } else {
                    if (html.substring(html.length - 4, html.length) != "<hr>") {
                        html += "<hr>";
                    }
                    html += `<h1>${li.title}</h1>`;

                    for (sub of li.link) {
                        if (sub.link.includes("javascript:comingsoon()")) {
                            html += `<a href="${sub.link}" class="btn-menu btn-disable">${sub.title}</a>`;

                        } else if (sub.link.includes("http")) {
                            html += `<a href="${sub.link}" class="btn-menu" target="_blank">${sub.title}</a>`;

                        } else if (sub.link.includes("javascript")) {
                            html += `<a href="${sub.link}" class="btn-menu">${sub.title}</a>`;

                        } else {
                            html += `<a href="${window.location.origin + sub.link}" class="btn-menu">${sub.title}</a>`;
                        }
                    }
                    html += `<hr>`;
                }
            }
            if (html.substring(html.length - 4, html.length) == "<hr>") {
                html = html.substring(0, html.length - 4);
            }
            html += `</div></nav>`;

            var navs = document.getElementsByTagName("nav");
            for (nav of navs) {
                if (nav.classList.contains("mobile")) {
                    nav.innerHTML = html;
                }
            }
        });
}

function insertNavPC() {
    fetch(window.location.origin + "/data.json")
        .then((res) => res.json())
        .then((json) => {
            var html = "<ul>";
            var submenus = "";

            for (li of json.nav) {

                if (!Array.isArray(li.link)) {
                    if (li.link.includes("javascript:comingsoon()")) {
                        html += `<li class="nav-pc btn-disable"><a href="${li.link}">${li.title}</a></li>`;

                    } else if (li.link.includes("http")) {
                        html += `<li class="nav-pc"><a href="${li.link}" target="_blank">${li.title}</a></li>`;

                    } else if (li.link.includes("javascript")) {
                        html += `<li class="nav-pc"><a href="${li.link}">${li.title}</a></li>`;

                    } else {
                        html += `<li class="nav-pc"><a href="${window.location.origin + li.link}">${li.title}</a></li>`;
                    }

                } else {
                    html += `<li class="nav-pc">
                                <div class="sub-menu" data-id="${li.title}" onclick="triggerSubMenu(this)">${li.title} <i class="fa-solid fa-angle-down"></i></div>
                            </li>`;
                    submenus += `<ul class="nav-pc-sub" data-id="${li.title}" data-show="false">`;

                    for (sub of li.link) {
                        if (sub.link.includes("javascript:comingsoon()")) {
                            submenus += `<li class="btn-disable"><a href="${sub.link}">${sub.title}</a></li>`;

                        } else if (sub.link.includes("http")) {
                            submenus += `<li><a href="${sub.link}" target="_blank">${sub.title}</a></li>`;

                        } else if (sub.link.includes("javascript")) {
                            submenus += `<li><a href="${sub.link}">${sub.title}</a></li>`;

                        } else {
                            submenus += `<li><a href="${window.location.origin + sub.link}">${sub.title}</a></li>`;
                        }

                    }
                    submenus += `</ul>`;
                }
            }
            html += `</ul>`;

            var navs = document.getElementsByTagName("nav");
            for (nav of navs) {
                if (nav.classList.contains("pc")) {
                    nav.innerHTML = html + submenus;
                }
            }
        });
}

function insertFooter() {
    var footers = document.getElementsByTagName("footer");
    for (footer of footers) {
        footer.innerHTML = `<img src="${window.location.origin}/images/logos/JFU_logo_5.png" alt="JFU Footer" id="footer-logo"><br>
                            <a href="https://twitter.com/Jisoo_Fan_Union" class="socialmedia-icon" target="_blank"><img src="${window.location.origin}/images/icons/twitter_icon.png"></a>
                            <a href="https://www.youtube.com/@sooyaaa__" class="socialmedia-icon" target="_blank"><img src="${window.location.origin}/images/icons/youtube_icon.png"></a>
                            <a href="http://pf.kakao.com/_Ybtrxj" class="socialmedia-icon" target="_blank"><img src="${window.location.origin}/images/icons/kakao_icon.png"></a><br>
                            <img src="${window.location.origin}/images/logos/JFU_footer_2.png" alt="JFU Footer" id="footer-copyright">`;
    }
}

function triggerSubMenu(div) {
    var subs = document.getElementsByClassName("nav-pc-sub");

    for (sub of subs) {
        if (sub.getAttribute("data-id") == div.getAttribute("data-id")) {
            if (sub.getAttribute("data-show") == "false") {
                showSubMenu(div, sub)

                for (s of subs) {
                    if (s.getAttribute("data-id") != div.getAttribute("data-id")) {
                        var divs = document.getElementsByClassName("sub-menu");
                        for (d of divs) {
                            if (d.getAttribute("data-id") != div.getAttribute("data-id")) {
                                hideSubMenu(d, s);
                            }
                        }
                    }
                }
            } else {
                hideSubMenu(div, sub)
            }
        }
    }
}

function showSubMenu(div, sub) {
    div.classList.add("active");
    sub.style.maxHeight = sub.scrollHeight + "px";
    div.lastChild.classList.remove("fa-angle-down");
    div.lastChild.classList.add("fa-angle-up");
    sub.setAttribute("data-show", "true");
}

function hideSubMenu(div, sub) {
    div.classList.remove("active");
    sub.style.maxHeight = null;
    div.lastChild.classList.add("fa-angle-down");
    div.lastChild.classList.remove("fa-angle-up");
    sub.setAttribute("data-show", "false");
}

function melonCharge() {
    if (navigator.platform == "iPhone" || navigator.platform == "Linux aarch64") {
        console.log("mobile");
        window.open("http://bit.ly/3OkjtJw", '_blank').focus();
    } else {
        console.log("pc");
        window.open("http://m2.melon.com/buy/meloncash/charge.htm", '_blank').focus();
    }
}

function sendSMS(code, text) {
    if (navigator.platform == "iPhone") {
        window.open(`sms:#${code}&body=${text}`);

    } else if (navigator.platform == "Linux aarch64") {
        window.open(`sms:%23${code}?body=${text}`);

    } else {
        alert("모바일에서 버튼을 누르면 메세지창으로 이동합니다");
    }
}

function mubeat() {
    if (navigator.platform == "iPhone") {
        window.open("https://apps.apple.com/us/app/mubeat-for-kpop-lovers/id1320789688", "_blank").focus();

    } else if (navigator.platform == "Linux aarch64") {
        window.open("https://play.google.com/store/apps/details?id=com.vlending.apps.mubeat", "_blank").focus();

    } else {
        window.open("https://mubeat.tv/", "_blank").focus();
    }
}