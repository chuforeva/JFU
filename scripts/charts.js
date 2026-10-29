const chartSources = [
    {
        id: "melon-top100",
        timeId: "melon-time",
        url: "https://m2.melon.com/m6/chart/ent/songChartList.json?cpId=AS40&cpKey=14LNC3&appVer=6.5.8.1",
        chartUrl: "https://www.melon.com/chart/index.htm",
        artistId: "995174",
        getSongs: (data) => data.response.SONGLIST,
        getTime: (data) => data.response.RANKHOUR,
        matches: (song, artistId) => song.ARTISTLIST.some((artist) => String(artist.ARTISTID) === artistId),
        getSong: (song) => ({
            rank: song.CURRANK,
            previousRank: song.PASTRANK,
            albumImage: song.ALBUMIMG,
            title: song.SONGNAME,
            artists: song.ARTISTLIST.map((artist) => artist.ARTISTNAME).join(", ")
        })
    },
    {
        id: "melon-hot100",
        timeId: "melon-hot100-time",
        url: "https://m2.melon.com/m6/chart/hot100/list.json?cpId=AS40&cpKey=14LNC3&appVer=6.5.8.1",
        chartUrl: "https://www.melon.com/chart/hot100/index.htm",
        artistId: "995174",
        getSongs: (data) => data.response.SONGLIST,
        getTime: (data) => data.response.RANKHOUR,
        matches: (song, artistId) => song.ARTISTLIST.some((artist) => String(artist.ARTISTID) === artistId),
        getSong: (song) => ({
            rank: song.CURRANK,
            previousRank: song.PASTRANK,
            albumImage: song.ALBUMIMG,
            title: song.SONGNAME,
            artists: song.ARTISTLIST.map((artist) => artist.ARTISTNAME).join(", ")
        })
    },
    {
        id: "genie-realtime",
        timeId: "genie-time",
        url: "https://app.genie.co.kr/chart/j_RealTimeRankSongList.json?pg=1&pgsize=200",
        chartUrl: "https://www.genie.co.kr/chart/top200",
        artistId: "80539782",
        getSongs: (data) => data.DataSet.DATA,
        getTime: (data) => data.PageInfo.ChartTime,
        matches: (song, artistId) => String(song.ARTIST_ID) === artistId,
        getSong: (song) => ({
            rank: song.RANK_NO,
            previousRank: song.PRE_RANK_NO,
            albumImage: song.ALBUM_IMG_PATH,
            title: song.SONG_NAME,
            artists: song.ARTIST_NAME
        })
    }
];

function getRankMovement(currentRank, previousRank) {
    const current = Number(currentRank);
    const previous = Number(previousRank);
    if (!Number.isFinite(current) || !Number.isFinite(previous) || previous === 0) {
        return { label: "-", direction: "" };
    }

    const difference = previous - current;
    if (difference > 0) {
        return { label: `▲ ${difference}`, direction: "is-up" };
    }
    if (difference < 0) {
        return { label: `▼ ${Math.abs(difference)}`, direction: "is-down" };
    }

    return { label: "-", direction: "" };
}

function createChartEntry(song, chartUrl) {
    const entry = document.createElement("a");
    entry.className = "chart-entry";
    entry.href = chartUrl;
    entry.target = "_blank";
    entry.rel = "noopener noreferrer";
    entry.setAttribute("aria-label", `${song.title} - ${song.artists}, 차트 순위 ${song.rank}위`);

    const rank = document.createElement("span");
    rank.className = "chart-rank";
    rank.textContent = song.rank;

    const movement = document.createElement("span");
    const rankMovement = getRankMovement(song.rank, song.previousRank);
    movement.className = `chart-movement ${rankMovement.direction}`;
    movement.textContent = rankMovement.label;

    const albumImage = document.createElement("img");
    albumImage.className = "chart-album";
    albumImage.src = song.albumImage;
    albumImage.alt = "";
    albumImage.loading = "lazy";
    albumImage.referrerPolicy = "no-referrer";

    const details = document.createElement("span");
    details.className = "chart-song";

    const title = document.createElement("span");
    title.className = "chart-song-title";
    title.textContent = song.title;

    const artists = document.createElement("span");
    artists.className = "chart-song-artist";
    artists.textContent = song.artists;

    details.append(title, artists);
    entry.append(rank, movement, albumImage, details);
    return entry;
}

function renderChartError(chart, message) {
    const entries = document.getElementById(chart.id);
    entries.replaceChildren();

    const status = document.createElement("p");
    status.className = "chart-error";
    status.textContent = message;

    const retry = document.createElement("button");
    retry.className = "chart-retry";
    retry.type = "button";
    retry.textContent = "다시 시도";
    retry.addEventListener("click", () => loadChart(chart));

    status.append(retry);
    entries.append(status);
    entries.setAttribute("aria-busy", "false");
    document.getElementById(chart.timeId).textContent = "차트 정보를 불러오지 못했습니다.";
}

async function loadChart(chart) {
    const entries = document.getElementById(chart.id);
    const updated = document.getElementById(chart.timeId);
    entries.replaceChildren();
    entries.setAttribute("aria-busy", "true");
    updated.textContent = "차트 정보를 불러오는 중입니다.";

    try {
        const response = await fetch(chart.url);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const songs = chart.getSongs(data);
        if (!Array.isArray(songs)) {
            throw new Error("Unexpected chart response");
        }

        const matchingSongs = songs
            .filter((song) => chart.matches(song, chart.artistId))
            .map(chart.getSong);

        updated.textContent = `${chart.getTime(data)} 기준`;
        entries.setAttribute("aria-busy", "false");

        if (matchingSongs.length === 0) {
            const empty = document.createElement("p");
            empty.className = "chart-empty";
            empty.textContent = "현재 차트인 중인 곡이 없습니다.";
            entries.append(empty);
            return;
        }

        const fragment = document.createDocumentFragment();
        matchingSongs.forEach((song) => fragment.append(createChartEntry(song, chart.chartUrl)));
        entries.append(fragment);
    } catch (error) {
        console.error(`Unable to load ${chart.id} chart:`, error);
        renderChartError(chart, "차트 정보를 불러오지 못했습니다. 네트워크 연결을 확인해 주세요.");
    }
}

chartSources.forEach(loadChart);
