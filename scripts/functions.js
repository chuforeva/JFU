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
    insertNavMobile();
    insertNavPC();
}

function insertNavPC() {
    fetch(window.location.origin + "/data.json")
        .then((res) => res.json())
        .then((json) => {
            var html = "<ul>";
            var submenus = "";

            for (li of json.nav) {

                if (!Array.isArray(li.link)) {
                    if (li.link.includes("javascript")) {
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
                        if (sub.link.includes("javascript")) {
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

/* 
<nav class="mobile">
    <ul>
        <li class="nav-mobile nav-logo">
            <a href="../index.html"><img src="../images/logos/JFU_logo_4.png"></a>
        </li>
        <li class="nav-mobile nav-menu"><a href="javascript:menu()"><i class="fa-solid fa-bars"></i></a></li>
    </ul>
    <div id="menu">
        <img src="../images/logos/JFU_logo_5.png" id="menu-logo">
        <a href="../index.html" class="btn-menu">HOME</a>
        <a href="javascript:comingsoon()" class="btn-menu btn-disable">TO DO LIST</a>
        <a href="javascript:comingsoon()" class="btn-menu btn-disable">ONE CLICK STREAMING LIST</a>
        <hr>
        <h1>STREAMING</h1>
        <a href="javascript:comingsoon()" class="btn-menu btn-disable">음원 스트리밍 가이드</a>
        <a href="javascript:comingsoon()" class="btn-menu btn-disable">음원 다운로드 가이드</a>
        <a href="javascript:comingsoon()" class="btn-menu btn-disable">음원 선물하기 가이드</a>
        <a href="javascript:comingsoon()" class="btn-menu btn-disable">뮤비 스트리밍 가이드</a>
        <a href="javascript:comingsoon()" class="btn-menu btn-disable">음원사이트 스트리밍권</a>
        <hr>
        <h1>VOTING</h1>
        <a href="voting-app-guide.html" class="btn-menu">투표앱 사용 가이드</a>
        <a href="javascript:comingsoon()" class="btn-menu btn-disable">쇼! 음악중심 사전/실시간 투표</a>
        <a href="javascript:comingsoon()" class="btn-menu btn-disable">인기가요 사전/실시간 투표</a>
        <a href="javascript:comingsoon()" class="btn-menu btn-disable">멜론 주간 인기상 투표</a>
        <a href="javascript:comingsoon()" class="btn-menu btn-disable">라디오 신청 가이드</a>
    </div>
</nav>
*/

function insertNavMobile() {
    fetch(window.location.origin + "/data.json")
        .then((res) => res.json())
        .then((json) => {
            var html = `<ul>
                        <li class="nav-mobile nav-logo">
                            <a href="${window.location.origin}/index.html"><img src="${window.location.origin}/images/logos/JFU_logo_4.png"></a>
                        </li>
                        <li class="nav-mobile nav-menu"><a href="javascript:menu()"><i class="fa-solid fa-bars"></i></a></li>
                    </ul>
                    <div id="menu">
                        <img src="${window.location.origin}/images/logos/JFU_logo_5.png" id="menu-logo">
                        <a href="${window.location.origin}/index.html" class="btn-menu">HOME</a>
                    `;

            for (li of json.nav) {
                if (!Array.isArray(li.link)) {
                    if (li.link.includes("javascript")) {
                        html += `<a href="${li.link}" class="btn-menu btn-disable">${li.title}</a>`;

                    } else {
                        html += `<a href="${window.location.origin + li.link}" class="btn-menu">${li.title}</a>`;
                    }

                } else {
                    html += `<hr>
                        <h1>${li.title}</h1>`;

                    for (sub of li.link) {
                        if (sub.link.includes("javascript")) {
                            html += `<a href="${sub.link}" class="btn-menu btn-disable">${sub.title}</a>`;
                        } else {
                            html += `<a href="${window.location.origin + sub.link}" class="btn-menu">${sub.title}</a>`;
                        }

                    }
                }
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