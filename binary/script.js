document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.getElementById('card-container');
    const binaryValueEl = document.getElementById('binary-value');
    const decimalValueEl = document.getElementById('decimal-value');
    
    // 8비트를 표현하기 위해 8개의 카드를 생성 (128, 64, ..., 1)
    const cardValues = [128, 64, 32, 16, 8, 4, 2, 1];

    // 카드 생성 및 이벤트 리스너 추가
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value; // data-value 속성에 십진수 값 저장

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-front"></div>
                <div class="card-face card-back">${value}</div>
            </div>
        `;

        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
            updateValues();
        });

        cardContainer.appendChild(card);
    });

    // 이진수 및 십진수 값을 업데이트하는 함수
    function updateValues() {
        const cards = document.querySelectorAll('.card');
        let binaryString = '';
        let decimalTotal = 0;

        cards.forEach(card => {
            if (card.classList.contains('is-flipped')) {
                // 카드가 뒤집혔으면 (켜진 상태)
                binaryString += '1';
                decimalTotal += parseInt(card.dataset.value);
            } else {
                // 카드가 안 뒤집혔으면 (꺼진 상태)
                binaryString += '0';
            }
        });

        binaryValueEl.textContent = binaryString;
        decimalValueEl.textContent = decimalTotal;
    }

    // 초기 값 설정
    updateValues();
});
