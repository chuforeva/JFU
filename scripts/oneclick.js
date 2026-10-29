const oneclickScriptUrl = document.currentScript?.src;

function createPlatformRow(label, links) {
    const row = document.createElement("div");
    row.className = "platform-row";

    const device = document.createElement("span");
    device.textContent = label;
    row.append(device);

    links.forEach(({ label: linkLabel, href, wide = false, external = false }) => {
        const link = document.createElement("a");
        if (wide) {
            link.className = "platform-wide";
        }
        link.href = href;
        link.textContent = linkLabel;
        if (external) {
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        }
        row.append(link);
    });

    return row;
}

function buildPlaylistRows(platform, cycles) {
    const combineCycles = () => cycles.flat();

    if (platform === "melon") {
        const androidLinks = cycles.map((cycle, index) => ({
            label: String(index + 1),
            href: `melonapp://play?menuid=0&ctype=1&cid=${cycle.join(",")}`
        }));
        const pcLinks = cycles.map((cycle, index) => ({
            label: String(index + 1),
            href: `melonapp://play?cType=1&cList=${cycle.join(",")}`
        }));
        const iosTracks = combineCycles().join(",");

        return [
            createPlatformRow("ANDROID", androidLinks),
            createPlatformRow("iOS", [
                { label: "iPhone", href: `meloniphone://play?menuid=0&ctype=1&cid=${iosTracks}`, wide: true },
                { label: "iPad", href: `melonipad://play?menuid=0&ctype=1&cid=${iosTracks}`, wide: true }
            ]),
            createPlatformRow("PC", pcLinks)
        ];
    }

    const tracks = combineCycles();
    const genieTracks = tracks.join(";");

    if (platform === "genie") {
        return [
            createPlatformRow("ANDROID", [
                { label: "재생목록 열기", href: `cromegenie://scan/?landing_type=31&landing_target=${genieTracks}`, wide: true }
            ]),
            createPlatformRow("iOS", [
                { label: "재생목록 열기", href: `ktolleh00167://landing/?landing_type=31&landing_target=${genieTracks}`, wide: true }
            ]),
            createPlatformRow("PC", [
                {
                    label: "지니 웹에서 열기 ↗",
                    href: `https://www.genie.co.kr/player/shareProcessV2?xgnm=${genieTracks}`,
                    wide: true,
                    external: true
                }
            ])
        ];
    }

    if (platform === "bugs") {
        return [
            createPlatformRow("ANDROID", [
                {
                    label: "재생목록 열기",
                    href: `bugs3://app/tracks/lists?title=%EC%A0%84%EC%B2%B4%EB%93%A3%EA%B8%B0&miniplay=Y&track_ids=${tracks.join("|")}`,
                    wide: true
                }
            ])
        ];
    }

    if (platform === "vibe") {
        return [
            createPlatformRow("ANDROID", cycles.map((cycle, index) => ({
                label: String(index + 1),
                href: `vibe://listen?version=3&trackIds=${cycle.join(",")}`
            })))
        ];
    }

    throw new Error(`Unsupported streaming platform: ${platform}`);
}

function validateCycles(platform, cycles) {
    if (!Array.isArray(cycles) || cycles.length === 0 ||
        cycles.some((cycle) => !Array.isArray(cycle) || cycle.length === 0 ||
            cycle.some((trackId) => typeof trackId !== "string" || !/^\d+$/.test(trackId)))) {
        throw new Error(`Invalid playlist configuration for ${platform}.`);
    }
}

async function loadPlaylists() {
    const playlistName = new URLSearchParams(window.location.search).get("s") || "click";
    if (!/^[a-z0-9-]+$/i.test(playlistName)) {
        throw new Error("Invalid playlist selection.");
    }
    if (!oneclickScriptUrl) {
        throw new Error("Unable to determine the one-click script location.");
    }

    const dataUrl = new URL(`../data/playlist/${playlistName.toLowerCase()}.json`, oneclickScriptUrl);
    const response = await fetch(dataUrl);
    if (!response.ok) {
        throw new Error(`Playlist data request for ${playlistName} failed with status ${response.status}.`);
    }

    const release = await response.json();
    if (typeof release.title !== "string" || typeof release.description !== "string" ||
        typeof release.images?.main !== "string" || !release.playlist) {
        throw new Error(`Invalid release data in ${playlistName}.json.`);
    }

    const releaseTitle = document.getElementById("release-title");
    const releaseDescription = document.getElementById("release-description");
    const releaseImage = document.getElementById("release-image");
    const releaseFeature = document.querySelector(".release-feature");
    releaseDescription.textContent = release.description;
    releaseTitle.textContent = `${release.description} <${release.title}>`;
    releaseImage.src = new URL(`../${release.images.main}`, oneclickScriptUrl).href;
    releaseImage.alt = `${release.description} <${release.title}>`;
    releaseFeature.hidden = false;
    document.title = `ONE CLICK ${release.title} — JISOO FAN UNION`;

    const playlistPanel = document.getElementById("playlist-panel");
    const playlistImage = document.getElementById("playlist-image");
    const playlistImageLink = document.getElementById("playlist-image-link");
    if (typeof release.images.list === "string" && release.images.list.length > 0) {
        const imageUrl = new URL(`../${release.images.list}`, oneclickScriptUrl).href;
        playlistImage.src = imageUrl;
        playlistImageLink.href = imageUrl;
        playlistPanel.hidden = false;
    }

    document.querySelectorAll(".platform-actions").forEach((container) => {
        const platform = container.dataset.platform;
        const configuration = release.playlist[platform];
        if (!configuration) {
            throw new Error(`Missing playlist configuration for ${platform}.`);
        }

        validateCycles(platform, configuration.cycles);
        container.replaceChildren(...buildPlaylistRows(platform, configuration.cycles));
    });
}

loadPlaylists().catch((error) => {
    console.error("Unable to load streaming playlist links:", error);
    const releaseFeature = document.querySelector(".release-feature");
    releaseFeature.hidden = true;
    document.querySelectorAll(".platform-actions").forEach((container) => {
        container.textContent = "재생목록 링크를 불러오지 못했습니다. 페이지를 새로고침해 주세요.";
    });
});
