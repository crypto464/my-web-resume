/**
 * 웹 명함 & 이력서 - 기능 제어 스크립트 (v2)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Lucide 아이콘 초기화
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. 버튼 이벤트 등록 (onclick 대신 addEventListener 사용 - 최신 모범 사례)
    const toggleToResume = document.getElementById('toggleToResume');
    const toggleToCard = document.getElementById('toggleToCard');
    const cardWrapper = document.getElementById('cardWrapper');

    if (toggleToResume) {
        toggleToResume.addEventListener('click', () => {
            cardWrapper.classList.add('is-flipped');
        });
    }

    if (toggleToCard) {
        toggleToCard.addEventListener('click', () => {
            cardWrapper.classList.remove('is-flipped');
        });
    }

    // 3. 순차 등장 애니메이션 재생 (카드 전환 시 뒷면 요소도 자연스럽게 등장)
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                const isFlipped = cardWrapper.classList.contains('is-flipped');
                const target = isFlipped ? '.card-back' : '.card-front';
                const items = document.querySelectorAll(`${target} .animate-item`);
                
                items.forEach((item, index) => {
                    item.style.animation = 'none';
                    // reflow를 발생시켜 애니메이션 재시작
                    item.offsetHeight;
                    item.style.animation = '';
                    item.style.animationDelay = `${index * 0.06}s`;
                });
            }
        });
    });

    observer.observe(cardWrapper, { attributes: true });
});
