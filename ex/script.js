// DOM이 모두 로드된 후 스크립트 실행
document.addEventListener('DOMContentLoaded', () => {

    // 폼 요소 선택
    const codeForm = document.getElementById('code-form');

    // 폼 제출(submit) 이벤트 리스너 추가
    codeForm.addEventListener('submit', (event) => {
        // 폼의 기본 동작(페이지 새로고침) 방지
        event.preventDefault();

        // 폼 입력 필드에서 값 가져오기
        const title = document.getElementById('code-title').value;
        const language = document.getElementById('code-language').value;
        const content = document.getElementById('code-content').value;

        // 1. 파일 이름 생성 (입력값이 없으면 기본값 사용)
        // 공백은 밑줄(_)로 변경
        const safeTitle = title.replace(/\s+/g, '_') || 'untitled';
        const extension = language || 'txt';
        const filename = `${safeTitle}.${extension}`;

        // 2. 파일 콘텐츠를 Blob 객체로 생성
        // Blob(Binary Large Object)은 파일과 같은 불변의 원시 데이터 객체입니다.
        const blob = new Blob([content], {
            type: 'text/plain;charset=utf-8'
        });

        // 3. 다운로드를 위한 임시 <a> 태그 생성
        const link = document.createElement('a');
        
        // 4. Blob 객체에 대한 URL 생성
        link.href = URL.createObjectURL(blob);
        
        // 5. 다운로드할 파일 이름 설정
        link.download = filename;

        // 6. <a> 태그를 body에 추가 (클릭 이벤트를 발생시키기 위해)
        document.body.appendChild(link);
        
        // 7. 프로그래매틱하게 <a> 태그 클릭 (다운로드 시작)
        link.click();

        // 8. 임시 <a> 태그와 생성된 URL 제거
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        // (선택) 폼 초기화 및 알림
        alert('파일이 성공적으로 생성되었습니다! (다운로드 확인)');
        codeForm.reset();
    });

});