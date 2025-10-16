document.addEventListener('DOMContentLoaded', () => {

    // 부호 없는 정수 관련 요소
    const unsignedContainer = document.getElementById('unsigned-card-container');
    const unsignedBinaryEl = document.getElementById('unsigned-binary-value');
    const unsignedDecimalEl = document.getElementById('unsigned-decimal-value');

    // 부호 있는 정수 관련 요소
    const signedContainer = document.getElementById('signed-card-container');
    const signedBinaryEl = document.getElementById('signed-binary-value');
    const signedDecimalEl = document.getElementById('signed-decimal-value');
    
    // 자릿값 배열 정의
    const unsignedValues = [128, 64, 32, 16, 8, 4, 2, 1];
    const signedValues = [-128, 64, 32, 16, 8, 4, 2, 1]; // 최상위 비트가 -128

    /**
     * 카드를 생성하고 컨테이너에 추가하는 함수
     * @param {HTMLElement} container - 카드가 추가될 부모 컨테이너
     * @param {number[]} values - 카드의 자릿값 배열
     * @param {function} updateCallback - 값이 변경될 때 호출될 콜백 함수
     */
    function createCards(container, values, updateCallback) {
        values.forEach(value => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.value = value;

            // 부호 비트인 경우 특별한 클래스 추가
            if (value < 0) {
                card.classList.add('sign-bit');
            }

            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-face card-front"></div>
                    <div class="card-face card-back">${value}</div>
                </div>
            `;

            card.addEventListener('click', () => {
                card.classList.toggle('is-flipped');
                updateCallback();
            });
            container.appendChild(card);
        });
    }
    
    /**
     * 이진수/십진수 값을 계산하고 화면을 업데이트하는 범용 함수
     * @param {HTMLElement} container - 계산할 카드가 있는 부모 컨테이너
     * @param {HTMLElement} binaryEl - 이진수 값을 표시할 요소
     * @param {HTMLElement} decimalEl - 십진수 값을 표시할 요소
     */
    function updateDisplay(container, binaryEl, decimalEl) {
        const cards = container.querySelectorAll('.card');
        let binaryString = '';
        let decimalTotal = 0;

        cards.forEach(card => {
            if (card.classList.contains('is-flipped')) {
                binaryString += '1';
                decimalTotal += parseInt(card.dataset.value, 10);
            } else {
                binaryString += '0';
            }
        });

        binaryEl.textContent = binaryString;
        decimalEl.textContent = decimalTotal;
    }

    // 부호 없는 정수 계산기 생성 및 초기화
    const updateUnsigned = () => updateDisplay(unsignedContainer, unsignedBinaryEl, unsignedDecimalEl);
    createCards(unsignedContainer, unsignedValues, updateUnsigned);
    updateUnsigned();

    // 부호 있는 정수 계산기 생성 및 초기화
    const updateSigned = () => updateDisplay(signedContainer, signedBinaryEl, signedDecimalEl);
    createCards(signedContainer, signedValues, updateSigned);
    updateSigned();
});
