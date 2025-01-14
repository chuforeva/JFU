function convertToKorUnit(num) {
    if (num == 0) return "0";

    if (num < 10000) return String(num);

    const units = ["", "만", "억"];
    let unitIndex = 0;
    let remain = num;

    while (remain > 10000) {
        remain = remain / 10000;
        unitIndex++;
        if (unitIndex > 2) break;
    }

    return remain.toFixed(1) + units[unitIndex];
}

function sendSMS(code, text) {
    if (navigator.platform == "iPhone") {
        window.open(`sms:#${code}&body=${text}`);

    } else if (navigator.platform == "Linux aarch64") {
        window.open(`sms:%23${code}?body=${text}`);

    } else {
        alert("모바일에서 버튼을 누르면 메세지창으로 이동합니다");
    }
}