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
    var span = document.createElement('span');
    span.innerHTML = "&copy; 2023-2025 JISOO FAN UNION | ALL FOR BLACKPINK JISOO<br>WARNING: ALL RIGHTS RESERVED | UNAUTHORIZED COMMERCIAL USE OR PUBLICATION IS PROHIBITED";
    footer.appendChild(img);
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
    popup_content.innerHTML += `<iframe src="https://www.youtube.com/embed/7JF8GpBjXH4" title="JISOO COMING SOON" id="youtube_embed" frameborder="0" allowfullscreen style="width: 100%;"></iframe>
        카카오뱅크 ㅂㄷㄱ<br>
        <span style="font-size: 2rem;">3333 17 3766359</span><br><br>
        DC 지수 갤러리에서 다가오는 지수의 두 번째 솔로 활동 서포트를 위한 모금을 진행합니다!<br>많은 후원 부탁드립니다.<br>
        모금 받은 금액은 추후 지수팬연합 계좌로 전액 이체되며, 오로지 지수의 솔로 활동 서포트에 사용됩니다.<br>
        정산은 서포트가 최종적으로 마무리 된 후 입금자에 한해 공개 예정입니다.`;
    popup.appendChild(popup_content);
    document.getElementsByTagName('footer')[0].after(popup);
}