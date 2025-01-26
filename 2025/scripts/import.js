const test = true;
let origin = window.location.origin;

if (test) {
    origin = `${window.location.origin}/2025`;
}

function init(loc) {
    insertNav(loc);
    insertMobileNav(loc);
    insertFooter();
}

function insertNav(loc) {
    var nav = document.getElementsByTagName('nav')[0];

    var logo_href = document.createElement('a');
    logo_href.href = origin;
    logo_href.style = "text-decoration: none";

    var logo_1 = document.createElement('img');
    logo_1.src = `${origin}/images/logos/JFU_logo_handwritten.png`;
    logo_1.id = "nav_logo_1";
    logo_href.appendChild(logo_1);
    // var logo_2 = document.createElement('img');
    // logo_2.src = `${origin}/images/logos/JFU_logo_3.png`;
    // logo_2.id = "nav_logo_2";
    // logo_href.appendChild(logo_2);
    nav.appendChild(logo_href);

    nav.appendChild(getNavBtn(loc, "메인", '/'));
    nav.appendChild(getNavBtn(loc, "투두리스트", '/todo'));
    nav.appendChild(getNavBtn(loc, "원클릭 스밍리스트", '/oneclick'));
    nav.appendChild(getNavBtn(loc, "가이드", '/guide'));
    nav.appendChild(getNavBtn(loc, "투표", '/vote'));
    nav.appendChild(getNavBtn(loc, '앨범 공동구매 <i class="fa-solid fa-up-right-from-square"></i>', 'https://kr.ktown4u.com/eventsub?eve_no=6512415&biz_no=967'));
}

function getNavBtn(loc, text, url) {
    var btn = document.createElement('a');
    btn.innerHTML = text;

    if (url.startsWith('http')) {
        btn.href = url;
        btn.target = '_blank';
    } else {
        btn.href = origin + url;
    }

    if (window.location.origin + loc.pathname == origin + url)
        btn.classList.add('selected');

    return btn;
}

function insertMobileNav(loc) {
    var nav = document.createElement('div');
    nav.id = "mobile_nav";

    nav.appendChild(getNavBtn(loc, `<i class="fa-solid fa-house"></i><span>메인</span>`, '/'));
    nav.appendChild(getNavBtn(loc, `<i class="fa-solid fa-list"></i><span>투두리스트</span>`, '/todo'));
    nav.appendChild(getNavBtn(loc, `<i class="fa-solid fa-hand-pointer"></i><span>원클릭</span>`, '/oneclick'));
    nav.appendChild(getNavBtn(loc, `<i class="fa-solid fa-book"></i><span>가이드</span>`, '/guide'));
    nav.appendChild(getNavBtn(loc, `<i class="fa-solid fa-check-to-slot"></i><span>투표</span>`, '/vote'));

    document.getElementsByTagName('nav')[0].after(nav);
}

function insertFooter() {
    var footer = document.getElementsByTagName('footer')[0];
    var img = document.createElement('img');
    img.src = `${origin}/images/logos/JFU_logo_5.png`;
    var slogan = document.createElement('p');
    slogan.id = "slogan";
    slogan.innerHTML = "언제나 어디서나 뭘 하든,<br> 처음 만난 그날처럼 변함없이 지수를 사랑하는 지수팬연합";
    var span = document.createElement('span');
    span.innerHTML = "&copy; 2023-2025 JISOO FAN UNION | ALL FOR BLACKPINK JISOO<br>WARNING: ALL RIGHTS RESERVED | UNAUTHORIZED COMMERCIAL USE OR PUBLICATION IS PROHIBITED";
    footer.appendChild(img);
    footer.appendChild(slogan);
    footer.appendChild(span);
}

function popup() {
    var popup = document.createElement('div');
    popup.id = "popup";
    var popup_header = document.createElement('div');
    popup_header.id = "popup_header";
    popup_header.innerText = "JISOO 2nd SOLO SUPPORT";
    var popup_close = document.createElement('span');
    popup_close.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
    popup_close.addEventListener("click", function(e) {
        document.getElementById('popup').setAttribute('style', 'display: none');
    });

    popup_header.appendChild(popup_close);
    popup.appendChild(popup_header);
    var popup_content = document.createElement('div');
    popup_content.id = "popup_content";
    popup_content.innerHTML += `<img src="images/fundraiser.jpg">`;
    popup.appendChild(popup_content);
    document.getElementsByTagName('footer')[0].after(popup);
}