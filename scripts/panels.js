const YOUTUBE_VIDEO_ID = "sf02ugzPFE4";
const YOUTUBE_API_KEY = "AIzaSyCU7SBb8KHuJkbmLODZ383oDttUeTOtYWI";
const MELON_SONG_ID = "602993117";
const PANEL_REFRESH_INTERVAL = 60_000;

const numberFormatter = new Intl.NumberFormat("ko-KR", {
    notation: "compact",
    maximumFractionDigits: 1
});

function setPanelError(prefix, message, retry) {
    const error = document.getElementById(`${prefix}-error`);
    error.replaceChildren(document.createTextNode(message));

    const button = document.createElement("button");
    button.className = "panel-retry";
    button.type = "button";
    button.textContent = "다시 시도";
    button.addEventListener("click", retry);
    error.append(button);
    error.hidden = false;
}

function updatePanelTime(id) {
    document.getElementById(id).textContent =
        `마지막 업데이트 ${new Intl.DateTimeFormat("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }).format(new Date())}`;
}

async function loadYouTubeStats() {
    const panel = document.getElementById("youtube-stats");
    const error = document.getElementById("youtube-error");
    panel.setAttribute("aria-busy", "true");
    error.hidden = true;

    try {
        const url = new URL("https://www.googleapis.com/youtube/v3/videos");
        url.search = new URLSearchParams({
            part: "statistics",
            id: YOUTUBE_VIDEO_ID,
            key: YOUTUBE_API_KEY
        });

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`YouTube API returned HTTP ${response.status}`);
        }

        const data = await response.json();
        const statistics = data.items?.[0]?.statistics;
        if (!statistics) {
            throw new Error("YouTube statistics are unavailable for this video.");
        }

        document.getElementById("youtube-views").textContent = numberFormatter.format(Number(statistics.viewCount));
        document.getElementById("youtube-likes").textContent = numberFormatter.format(Number(statistics.likeCount));
        document.getElementById("youtube-comments").textContent = numberFormatter.format(Number(statistics.commentCount));
        updatePanelTime("youtube-updated");
    } catch (error) {
        console.error("Unable to load YouTube statistics:", error);
        setPanelError("youtube", "유튜브 수치를 불러오지 못했습니다.", loadYouTubeStats);
    } finally {
        panel.setAttribute("aria-busy", "false");
    }
}

async function loadMelonStreamingCard() {
    const panel = document.getElementById("streaming-card");
    const error = document.getElementById("melon-error");
    panel.setAttribute("aria-busy", "true");
    error.hidden = true;

    try {
        const url = new URL("https://m2.melon.com/m6/chart/streaming/card.json");
        url.search = new URLSearchParams({
            cpId: "AS40",
            cpKey: "14LNC3",
            appVer: "6.0.0",
            songId: MELON_SONG_ID
        });

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Melon API returned HTTP ${response.status}`);
        }

        const data = await response.json();
        const song = data.response;
        if (!song?.SONGNAME || !song?.ALBUMIMG || !song?.STREAMCOUNT || !song?.STREAMUSER) {
            throw new Error("Melon streaming card data is unavailable.");
        }

        document.getElementById("streaming-song").textContent = song.SONGNAME;
        document.getElementById("streaming-artist").textContent = song.ARTISTNAME;
        document.getElementById("streaming-cover").style.backgroundImage = `url("${song.ALBUMIMG}")`;
        document.getElementById("streaming-total").textContent = song.STREAMCOUNT;
        document.getElementById("streaming-listeners").textContent = song.STREAMUSER;
        updatePanelTime("melon-updated");
    } catch (error) {
        console.error("Unable to load Melon streaming card:", error);
        setPanelError("melon", "멜론 스트리밍 카드를 불러오지 못했습니다.", loadMelonStreamingCard);
    } finally {
        panel.setAttribute("aria-busy", "false");
    }
}

loadYouTubeStats();
loadMelonStreamingCard();
window.setInterval(loadYouTubeStats, PANEL_REFRESH_INTERVAL);
window.setInterval(loadMelonStreamingCard, PANEL_REFRESH_INTERVAL);
