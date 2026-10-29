const weeklyTasks = [
    [
        { title: "인기가요 실시간 앱 투표", time: "오후 3시 50분 이후", label: "하이어 실시간 투표", href: "https://bit.ly/3tpKkxX", guide: "higher" },
        { title: "뮤직뱅크 사전 투표", time: "오후 3시 이후", label: "올차트 사전 투표", href: "https://allchart.smtn.kr/audition/sector/13", guide: "allchart" },
        { title: "엠카운트다운 사전 투표", label: "엠넷플러스 사전 투표", href: "https://www.mnetplus.world/community/main?communityId=PzfktaFfF9GXMF1CBSnUO", guide: "mnet" },
        { title: "멜론 주간인기상 투표", label: "주간인기상 투표", href: "https://www.melon.com/melonaward/weekAward.htm" },
        { title: "인기가요 핫스테이지 투표", time: "오후 4시 40분 이후", label: "하이어 핫스테이지 투표", href: "https://bit.ly/3tpKkxX", guide: "higher" }
    ],
    [
        { title: "인기가요 사전 투표", time: "오전 11시 55분 이후", label: "디거스 사전 투표", href: "https://lnk.diggus.com/vote", guide: "diggus" },
        { title: "뮤직뱅크 사전 투표", label: "올차트 사전 투표", href: "https://allchart.smtn.kr/audition/sector/13", guide: "allchart" },
        { title: "엠카운트다운 사전 투표", time: "오후 11시 59분까지", label: "엠넷플러스 사전 투표", href: "https://www.mnetplus.world/community/main?communityId=PzfktaFfF9GXMF1CBSnUO", guide: "mnet" },
        { title: "멜론 주간인기상 투표", time: "오후 6시 이후", label: "주간인기상 투표", href: "https://www.melon.com/melonaward/weekAward.htm" },
        { title: "인기가요 핫스테이지 투표", label: "하이어 핫스테이지 투표", href: "https://bit.ly/3tpKkxX", guide: "higher" }
    ],
    [
        { title: "인기가요 사전 투표", label: "디거스 사전 투표", href: "https://lnk.diggus.com/vote", guide: "diggus" },
        { title: "쇼! 음악중심 사전 투표", time: "오후 6시 이후", label: "뮤빗 사전 투표", href: "https://mubeat.tv/", guide: "mubeat" },
        { title: "뮤직뱅크 사전 투표", label: "올차트 사전 투표", href: "https://allchart.smtn.kr/audition/sector/13", guide: "allchart" },
        { title: "멜론 주간인기상 투표", label: "주간인기상 투표", href: "https://www.melon.com/melonaward/weekAward.htm" },
        { title: "인기가요 핫스테이지 투표", label: "하이어 핫스테이지 투표", href: "https://bit.ly/3tpKkxX", guide: "higher" }
    ],
    [
        { title: "인기가요 사전 투표", label: "디거스 사전 투표", href: "https://lnk.diggus.com/vote", guide: "diggus" },
        { title: "쇼! 음악중심 사전 투표", time: "시청자 위원회 투표는 선정된 사람만 참여 가능", label: "뮤빗 사전 투표", href: "https://mubeat.tv/", guide: "mubeat" },
        { title: "뮤직뱅크 사전 투표", time: "오후 11시까지", label: "올차트 사전 투표", href: "https://allchart.smtn.kr/audition/sector/13", guide: "allchart" },
        { title: "멜론 주간인기상 투표", label: "주간인기상 투표", href: "https://www.melon.com/melonaward/weekAward.htm" },
        { title: "인기가요 핫스테이지 투표", label: "하이어 핫스테이지 투표", href: "https://bit.ly/3tpKkxX", guide: "higher" }
    ],
    [
        { title: "인기가요 사전 투표", label: "디거스 사전 투표", href: "https://lnk.diggus.com/vote", guide: "diggus" },
        { title: "쇼! 음악중심 사전 투표", time: "오전 11시까지 · 시청자 위원회는 선정된 사람만 참여 가능", label: "뮤빗 사전 투표", href: "https://mubeat.tv/", guide: "mubeat" },
        { title: "엠카운트다운 실시간 투표", time: "오후 6시 15분 이후", label: "엠넷플러스 실시간 투표", href: "https://www.mnetplus.world/community/main?communityId=PzfktaFfF9GXMF1CBSnUO", guide: "mnet" },
        { title: "멜론 주간인기상 투표", label: "주간인기상 투표", href: "https://www.melon.com/melonaward/weekAward.htm" },
        { title: "인기가요 핫스테이지 투표", time: "오후 12시까지", label: "하이어 핫스테이지 투표", href: "https://bit.ly/3tpKkxX", guide: "higher" }
    ],
    [
        { title: "인기가요 사전 투표", time: "오후 11시 59분까지", label: "디거스 사전 투표", href: "https://lnk.diggus.com/vote", guide: "diggus" },
        { title: "멜론 주간인기상 투표", label: "주간인기상 투표", href: "https://www.melon.com/melonaward/weekAward.htm" }
    ],
    [
        { title: "쇼! 음악중심 실시간 투표", time: "오후 3시 20분 이후", label: "뮤빗 실시간 앱 투표", href: "https://mubeat.tv/", guide: "mubeat" },
        { title: "실시간 문자 투표 (#0505)", time: "생방송 중", label: "문자 메시지 열기", href: "#", sms: true },
        { title: "엠카운트다운 사전 투표", label: "엠넷플러스 사전 투표", href: "https://www.mnetplus.world/community/main?communityId=PzfktaFfF9GXMF1CBSnUO", guide: "mnet" },
        { title: "멜론 주간인기상 투표", label: "주간인기상 투표", href: "https://www.melon.com/melonaward/weekAward.htm" }
    ]
];

const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
const englishDayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
const taskContainer = document.getElementById("task-list");
const dayTitle = document.getElementById("todo-day-title");
const dayEnglish = document.getElementById("todo-day-en");
const dateLabel = document.getElementById("todo-date");
const dayButtons = [...document.querySelectorAll(".day-picker [data-day]")];

function renderDay(day) {
    dayTitle.textContent = dayNames[day];
    dayEnglish.textContent = `${String(day + 1).padStart(2, "0")} / ${englishDayNames[day]}`;
    taskContainer.replaceChildren();

    weeklyTasks[day].forEach((task, index) => {
        const card = document.createElement("article");
        card.className = "task-card";

        const heading = document.createElement("div");
        heading.className = "task-card-heading";

        const number = document.createElement("span");
        number.className = "task-index";
        number.textContent = String(index + 1).padStart(2, "0");

        const titleGroup = document.createElement("div");
        const title = document.createElement("h4");
        title.textContent = task.title;
        titleGroup.append(title);
        if (task.time) {
            const time = document.createElement("p");
            time.className = "task-time";
            time.textContent = task.time;
            titleGroup.append(time);
        }
        heading.append(number, titleGroup);

        const actions = document.createElement("div");
        actions.className = "task-actions";
        const voteLink = document.createElement("a");
        voteLink.className = "button button-outline";
        voteLink.href = task.href;
        voteLink.textContent = task.label;
        if (task.sms) {
            const userAgent = navigator.userAgent;
            if (/iPhone|iPad/i.test(userAgent)) {
                voteLink.href = "sms:#0505&body=지수";
            } else if (/Android/i.test(userAgent)) {
                voteLink.href = "sms:%230505?body=지수";
            } else {
                voteLink.addEventListener("click", (event) => {
                    event.preventDefault();
                    window.alert("모바일에서 버튼을 누르면 메세지창으로 이동합니다");
                });
            }
        } else {
            voteLink.target = "_blank";
            voteLink.rel = "noopener noreferrer";
        }
        actions.append(voteLink);
        if (task.guide) {
            const guideLink = document.createElement("a");
            guideLink.className = "text-link";
            guideLink.href = `./vote.html#${task.guide}`;
            guideLink.textContent = "사용 가이드 ↗";
            actions.append(guideLink);
        }

        card.append(heading, actions);
        taskContainer.append(card);
    });

    dayButtons.forEach((button) => {
        const selected = Number(button.dataset.day) === day;
        button.classList.toggle("is-selected", selected);
        button.setAttribute("aria-pressed", String(selected));
    });
}

const seoulDateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Seoul",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
}).formatToParts(new Date());
const dayIndex = englishDayNames.findIndex((day) => day.toLowerCase() === seoulDateParts.find((part) => part.type === "weekday")?.value.toLowerCase());
dateLabel.textContent = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "long",
    day: "numeric"
}).format(new Date()) + " · KST";

dayButtons.forEach((button) => {
    button.addEventListener("click", () => renderDay(Number(button.dataset.day)));
});
renderDay(dayIndex < 0 ? new Date().getDay() : dayIndex);
