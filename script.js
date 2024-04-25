function numberToChinese(number) {
    const maxNumber = 10**16 - 1;
    if (number > maxNumber) {
        throw new Error("數字超出最大範圍千兆");
    }

    const digits = "零一二三四五六七八九";
    const units = ['', '十', '百', '千'];
    const bigUnits = ['', '萬', '億', '兆'];
    if (number === 0) {
        return '零';
    }

    let result = '';
    let unitGroup = 0;

    while (number > 0) {
        let part = number % 10000;
        if (part > 0) {
            let partStr = '';
            let unitIndex = 0;
            while (part > 0) {
                const digit = part % 10;
                if (digit > 0) {
                    partStr = digits[digit] + (units[unitIndex] ? units[unitIndex] : '') + partStr;
                } else if (partStr && !partStr.startsWith('零')) {
                    partStr = '零' + partStr;
                }
                part /= 10;
                part = Math.floor(part);
                unitIndex += 1;
            }
            partStr += bigUnits[unitGroup];
            result = partStr + result;
        }
        number /= 10000;
        number = Math.floor(number);
        unitGroup += 1;
    }

    return result;
}

function convertNumber() {
    const input = document.getElementById('numberInput');
    const resultText = document.getElementById('resultText');
    try {
        const number = parseInt(input.value, 10);
        if (isNaN(number)) throw new Error("請輸入有效的數字");
        const result = numberToChinese(number);
        resultText.textContent = result;
    } catch (error) {
        alert(error.message);
        input.value = '';
        resultText.textContent = '';
    }
}

function clearFields() {
    document.getElementById('numberInput').value = '';
    document.getElementById('resultText').textContent = '';
}
