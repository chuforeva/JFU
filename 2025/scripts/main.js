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