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
    logo_1.src = `${origin}/images/logos/JFU_logo_4.png`;
    logo_1.id = "nav_logo_1";
    logo_href.appendChild(logo_1);
    var logo_2 = document.createElement('img');
    logo_2.src = `${origin}/images/logos/JFU_logo_3.png`;
    logo_2.id = "nav_logo_2";
    logo_href.appendChild(logo_2);
    nav.appendChild(logo_href);

    nav.appendChild(getNavBtn(loc, "메인", '/'));
    nav.appendChild(getNavBtn(loc, "투두리스트", '/todo'));
    nav.appendChild(getNavBtn(loc, "원클릭 스밍리스트", '/oneclick'));
    nav.appendChild(getNavBtn(loc, "가이드", '/guide'));
    nav.appendChild(getNavBtn(loc, "음악방송 투표", '/vote'));
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
    img.src = `${origin}/images/logos/JFU_footer.png`;
    footer.appendChild(img);
}