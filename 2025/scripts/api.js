function getYouTubeRecord(id) {
    const api_key = 'AIzaSyCU7SBb8KHuJkbmLODZ383oDttUeTOtYWI';
    const url = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${api_key}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('youtube_view').getElementsByTagName('span')[0].innerText = convertToKorUnit(parseInt(data['items'][0]['statistics']['viewCount']));
            document.getElementById('youtube_like').getElementsByTagName('span')[0].innerText = convertToKorUnit(parseInt(data['items'][0]['statistics']['likeCount']));
            document.getElementById('youtube_comment').getElementsByTagName('span')[0].innerText = convertToKorUnit(parseInt(data['items'][0]['statistics']['commentCount']));
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function getStreamingCard(id) {
    const url = "https://m2.melon.com/m6/chart/streaming/card.json?cpId=AS40&cpKey=14LNC3&appVer=6.0.0&songId=" + id;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("streaming_card_song").innerText = data['response']['SONGNAME'];
            document.getElementById("streaming_card_artist").innerText = data['response']['ARTISTNAME'];
            var imgElement = document.createElement('img');
            imgElement.setAttribute('src', data['response']['ALBUMIMG']);
            document.getElementById("streaming_card_album_cover").appendChild(imgElement);
            document.getElementById("streaming_card_total").innerText = data['response']['STREAMCOUNT'];
            document.getElementById("streaming_card_listener").innerText = data['response']['STREAMUSER'];
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function getMelonTop100(artists) {
    const url = "https://m2.melon.com/m6/chart/ent/songChartList.json?cpId=AS40&cpKey=14LNC3&appVer=6.5.8.1";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("melon_time").innerText = data['response']['RANKHOUR'] + " 기준";

            var count = 0;
            for (const song of data['response']['SONGLIST']) {
                var found = false;
                for (const artist of song['ARTISTLIST']) {
                    if (artists.includes(artist['ARTISTID'])) {
                        found = true;
                        break;
                    }
                }

                if (found) {
                    var rank = song['CURRANK'];
                    var diff = parseInt(song['PASTRANK']) - parseInt(song['CURRANK']);
                    var album_img = song['ALBUMIMG'];
                    var song_title = song['SONGNAME'];
                    
                    var artist_str = "";
                    for (const artist of song['ARTISTLIST']) {
                        artist_str += `${artist['ARTISTNAME']}, `;
                    }
                    artist_str = artist_str.substring(0, artist_str.length - 2);
                   
                    var div = createChartRow(rank, diff, album_img, song_title, artist_str);
                    document.getElementById('melon_top100').appendChild(div);
                    count++;
                }
            }

            if (count == 0) {
                var div = document.createElement('div');
                div.classList.add('chart_song');
                div.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="margin: 0 10px"></i> 현재 차트인 중인 곡이 없습니다';
                div.style = 'color: rgb(100, 100, 100)';
                document.getElementById('melon_top100').appendChild(div);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function getGenieRealTime(artists) {
    const url = "https://app.genie.co.kr/chart/j_RealTimeRankSongList.json?pg=1&pgsize=100";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("genie_time").innerText = data['PageInfo']['ChartTime'] + " 기준";

            var count = 0;
            for (const song of data['DataSet']['DATA']) {
                if (artists.includes(song['ARTIST_ID'])) {
                    var rank = song['RANK_NO'];
                    var diff = parseInt(song['PRE_RANK_NO']) - parseInt(song['RANK_NO']);
                    var album_img = song['ALBUM_IMG_PATH'];
                    var song_title = song['SONG_NAME'];
                    var artist_str = song['ARTIST_NAME'];
                   
                    var div = createChartRow(rank, diff, album_img, song_title, artist_str);
                    document.getElementById('genie_realtime').appendChild(div);
                    count++;
                }
            }
            
            if (count == 0) {
                var div = document.createElement('div');
                div.classList.add('chart_song');
                div.innerHTML = '<i class="fa-solid fa-circle-exclamation" style="margin: 0 10px"></i> 현재 차트인 중인 곡이 없습니다';
                div.style = 'color: rgb(100, 100, 100)';
                document.getElementById('genie_realtime').appendChild(div);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function createChartRow(rank, diff, album_img, song, artist) {
    var div = document.createElement('div');
    div.classList.add('chart_song');

    var chart_song_rank = document.createElement('div');
    chart_song_rank.classList.add('chart_song_rank');
    chart_song_rank.innerText = rank;
    div.appendChild(chart_song_rank);

    var chart_song_rank_diff = document.createElement('div');
    chart_song_rank_diff.classList.add('chart_song_rank_diff');
    if (diff == 0) {
        chart_song_rank_diff.innerText = "-";
    } else if (diff > 0) {
        chart_song_rank_diff.classList.add('up');
        chart_song_rank_diff.innerHTML = `<i class="fa-solid fa-caret-up"></i> ${diff}</div>`
    } else {
        chart_song_rank_diff.classList.add('down');
        chart_song_rank_diff.innerHTML = `<i class="fa-solid fa-caret-down"></i> ${Math.abs(diff)}</div>`
    }
    div.appendChild(chart_song_rank_diff);

    var chart_album_cover = document.createElement('div');
    chart_album_cover.classList.add('chart_album_cover');
    var imgElement = document.createElement('img');
    imgElement.setAttribute('src', decodeURIComponent(album_img));
    chart_album_cover.appendChild(imgElement);
    div.appendChild(chart_album_cover);

    var chart_song_detail = document.createElement('div');
    chart_song_detail.classList.add('chart_song_detail');

    var chart_song_title = document.createElement('div');
    chart_song_title.classList.add('chart_song_title');
    chart_song_title.innerText = decodeURIComponent(song);
    chart_song_detail.appendChild(chart_song_title);

    var chart_song_artists = document.createElement('div');
    chart_song_artists.classList.add('chart_song_artists');
    chart_song_artists.innerText = decodeURIComponent(artist);
    chart_song_detail.appendChild(chart_song_artists);
    div.appendChild(chart_song_detail);

    document.getElementById('genie_realtime').appendChild(div);

    return div
}