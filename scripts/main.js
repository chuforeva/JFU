const navigationItems = [
    { href: "todo", label: "TO DO", page: "todo" },
    { href: "oneclick?s=click", label: "ONE CLICK STREAMING", page: "oneclick" },
    { href: "guide", label: "GUIDE", page: "guide" },
    { href: "vote", label: "VOTE", page: "vote" }
];

const primaryNavigation = document.getElementById("primary-nav");
const menuToggle = document.querySelector(".nav-toggle");

if (primaryNavigation) {
    const isNestedRoute = /\/(?:onclick|oneclick)\//i.test(window.location.pathname);
    const pagePrefix = isNestedRoute ? "../" : "./";
    const currentPage = window.location.pathname.match(/(?:^|\/)(todo|guide|vote|oneclick|onclick|click)(?:\.html)?\/?$/i)?.[1]?.toLowerCase();

    navigationItems.forEach(({ href, label, page }) => {
        const link = document.createElement("a");
        link.href = `${pagePrefix}${href}`;
        link.textContent = label;
        if (currentPage === page || (page === "oneclick" && ["click", "onclick"].includes(currentPage))) {
            link.setAttribute("aria-current", "page");
        }
        primaryNavigation.append(link);
    });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
        const targetId = link.getAttribute('href');
        if (targetId === '#') {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const target = document.querySelector(targetId);
        if (target) {
            event.preventDefault();
            const disclosure = target.closest("details");
            if (disclosure) {
                disclosure.open = true;
            }
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

function openHashDisclosure() {
    if (window.location.hash.length < 2) {
        return;
    }

    const hashTarget = document.getElementById(window.location.hash.slice(1));
    const disclosure = hashTarget ? hashTarget.closest("details") : null;
    if (disclosure) {
        disclosure.open = true;
    }
}

openHashDisclosure();
window.addEventListener("load", openHashDisclosure, { once: true });

if (menuToggle && primaryNavigation) {
    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        menuToggle.setAttribute("aria-label", isExpanded ? "메뉴 열기" : "메뉴 닫기");
        primaryNavigation.classList.toggle("is-open", !isExpanded);
    });

    primaryNavigation.addEventListener("click", (event) => {
        if (event.target instanceof HTMLAnchorElement) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "메뉴 열기");
            primaryNavigation.classList.remove("is-open");
        }
    });
}
