function init(loc) {
    insertNav(loc);
    insertFooter();
}

function insertNav(loc) {
    var nav = document.getElementsByTagName('nav')[0];

    var logo_1 = document.createElement('img');
    logo_1.src = `${window.location.origin}/images/logos/JFU_logo_4.png`;
    logo_1.id = "nav_logo_1";
    nav.appendChild(logo_1);
    var logo_2 = document.createElement('img');
    logo_2.src = `${window.location.origin}/images/logos/JFU_logo_3.png`;
    logo_2.id = "nav_logo_2";
    nav.appendChild(logo_2);

    nav.appendChild(getNavBtn(loc, "메인", '/'));
    nav.appendChild(getNavBtn(loc, "투두리스트", '/to-do'));
    nav.appendChild(getNavBtn(loc, "원클릭 스밍리스트", '/one-click'));
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
        btn.href = window.location.origin + url;
    }

    if (loc.pathname == url)
        btn.classList.add('selected');

    return btn;
}

function insertFooter() {
    var footer = document.getElementsByTagName('footer')[0];
    var img = document.createElement('img');
    img.src = `${window.location.origin}/images/logos/JFU_footer.png`;
    footer.appendChild(img);
}