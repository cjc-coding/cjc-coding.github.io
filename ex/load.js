document.addEventListener('DOMContentLoaded', () => {

    const fileInput = document.getElementById('file-input');
    const codeDisplay = document.getElementById('code-display');

    // 파일 입력(input)에 'change' 이벤트가 발생했을 때(파일이 선택됐을 때)
    fileInput.addEventListener('change', (event) => {
        
        // 선택된 파일 가져오기
        const file = event.target.files[0];

        // 파일이 선택되지 않았다면 함수 종료
        if (!file) {
            return;
        }

        // FileReader 객체 생성
        const reader = new FileReader();

        // 파일 읽기가 성공적으로 완료됐을 때 실행될 콜백 함수
        reader.onload = (e) => {
            // 파일의 텍스트 내용을 가져옴
            const content = e.target.result;
            // <pre><code> 태그 안에 텍스트 내용 삽입
            // textContent를 사용해야 HTML 태그로 해석되지 않고 순수 텍스트로 들어감
            codeDisplay.textContent = content;
        };

        // 파일 읽기 중 에러가 발생했을 때
        reader.onerror = () => {
            console.error('파일을 읽는 중 오류가 발생했습니다.');
            codeDisplay.textContent = '파일을 읽을 수 없습니다.';
        };

        // 파일 읽기 시작 (텍스트로 읽기)
        reader.readAsText(file);
    });

});