/**
 * PORT-AI 데모 화면 인터랙션 스크립트
 */

document.addEventListener('DOMContentLoaded', function() {
    // 인터랙티브 데모 요소 초기화
    initDemoInteractions();

    // 화면 전환 효과
    initScreenTransitions();

    // 라이브 데이터 시뮬레이션
    initLiveDataSimulation();
});

/**
 * 데모 페이지 인터랙션 초기화
 */
function initDemoInteractions() {
    // 스크린샷 이미지에 확대/축소 효과 추가
    const demoImages = document.querySelectorAll('.demo-screenshot img');
    
    demoImages.forEach(img => {
        img.addEventListener('click', function() {
            openLightbox(this.src);
        });
    });

    // 툴팁 및 정보 표시
    const infoElements = document.querySelectorAll('[data-info]');
    
    infoElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            showTooltip(this, this.getAttribute('data-info'));
        });
        
        element.addEventListener('mouseleave', function() {
            hideTooltip();
        });
    });

    // 인터랙티브 요소에 클릭 효과 추가
    const interactiveElements = document.querySelectorAll('.interactive');
    
    interactiveElements.forEach(element => {
        element.addEventListener('click', function() {
            this.classList.add('active');
            
            // 활성화 효과 2초 후 제거
            setTimeout(() => {
                this.classList.remove('active');
            }, 2000);
        });
    });
}

/**
 * 라이트박스 효과 열기
 */
function openLightbox(imageSrc) {
    // 라이트박스 요소 생성
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    
    const lightboxContent = document.createElement('div');
    lightboxContent.classList.add('lightbox-content');
    
    const lightboxImage = document.createElement('img');
    lightboxImage.src = imageSrc;
    
    const closeButton = document.createElement('span');
    closeButton.classList.add('lightbox-close');
    closeButton.innerHTML = '&times;';
    
    // 라이트박스 구조 만들기
    lightboxContent.appendChild(lightboxImage);
    lightboxContent.appendChild(closeButton);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);
    
    // 라이트박스 스타일 설정
    lightbox.style.display = 'flex';
    lightbox.style.position = 'fixed';
    lightbox.style.top = '0';
    lightbox.style.left = '0';
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    lightbox.style.zIndex = '1000';
    lightbox.style.justifyContent = 'center';
    lightbox.style.alignItems = 'center';
    
    lightboxContent.style.position = 'relative';
    lightboxContent.style.maxWidth = '90%';
    lightboxContent.style.maxHeight = '90%';
    
    lightboxImage.style.maxWidth = '100%';
    lightboxImage.style.maxHeight = '90vh';
    lightboxImage.style.objectFit = 'contain';
    
    closeButton.style.position = 'absolute';
    closeButton.style.top = '-40px';
    closeButton.style.right = '0';
    closeButton.style.fontSize = '40px';
    closeButton.style.color = 'white';
    closeButton.style.cursor = 'pointer';
    
    // 닫기 버튼 이벤트
    closeButton.addEventListener('click', function() {
        document.body.removeChild(lightbox);
    });
    
    // 배경 클릭 시 닫기
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            document.body.removeChild(lightbox);
        }
    });
}

/**
 * 툴팁 표시
 */
function showTooltip(element, text) {
    // 이미 툴팁이 있으면 제거
    hideTooltip();
    
    // 툴팁 요소 생성
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = text;
    
    // 툴팁 스타일 설정
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(0, 52, 91, 0.9)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '10px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.fontSize = '14px';
    tooltip.style.maxWidth = '200px';
    tooltip.style.zIndex = '100';
    tooltip.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.2)';
    
    // 툴팁 위치 계산
    document.body.appendChild(tooltip);
    const rect = element.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    
    tooltip.style.top = `${rect.top + window.scrollY - tooltipRect.height - 10}px`;
    tooltip.style.left = `${rect.left + window.scrollX + (rect.width / 2) - (tooltipRect.width / 2)}px`;
    
    // 작은 화살표 추가
    tooltip.style.setProperty('--arrow-left', '50%');
    tooltip.style.setProperty('--arrow-top', '100%');
    tooltip.style.setProperty('--arrow-color', 'rgba(0, 52, 91, 0.9)');
    
    tooltip.setAttribute('id', 'active-tooltip');
}

/**
 * 툴팁 숨기기
 */
function hideTooltip() {
    const tooltip = document.getElementById('active-tooltip');
    if (tooltip) {
        document.body.removeChild(tooltip);
    }
}

/**
 * 화면 전환 효과
 */
function initScreenTransitions() {
    const demoNavLinks = document.querySelectorAll('.demo-nav a');
    const demoSections = document.querySelectorAll('section[id]');
    
    demoNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // 현재 활성화된 링크 제거
                demoNavLinks.forEach(link => link.classList.remove('active'));
                
                // 현재 링크 활성화
                this.classList.add('active');
                
                // 화면 전환 효과
                demoSections.forEach(section => {
                    section.classList.remove('active');
                    section.classList.add('hidden');
                });
                
                // 타겟 섹션 활성화
                targetSection.classList.remove('hidden');
                
                // 페이드인 효과
                setTimeout(() => {
                    targetSection.classList.add('active');
                }, 50);
                
                // 스크롤 위치 조정
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 라이브 데이터 시뮬레이션
 */
function initLiveDataSimulation() {
    const liveDataElements = document.querySelectorAll('[data-live]');
    
    if (liveDataElements.length === 0) return;
    
    // 실시간 데이터 업데이트
    setInterval(() => {
        liveDataElements.forEach(element => {
            const dataType = element.getAttribute('data-live');
            
            switch (dataType) {
                case 'datetime':
                    updateDateTime(element);
                    break;
                case 'vessels':
                    updateVesselCount(element);
                    break;
                case 'operation-rate':
                    updateOperationRate(element);
                    break;
                case 'notifications':
                    updateNotifications(element);
                    break;
                case 'weather':
                    updateWeather(element);
                    break;
            }
        });
    }, 3000);
}

/**
 * 날짜 및 시간 업데이트
 */
function updateDateTime(element) {
    const now = new Date();
    element.textContent = now.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

/**
 * 선박 수 업데이트
 */
function updateVesselCount(element) {
    // 현재 값에서 랜덤하게 변동
    const currentValue = parseInt(element.textContent);
    const change = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
    const newValue = Math.max(0, currentValue + change);
    
    // 값이 변경되면 시각적 효과 추가
    if (currentValue !== newValue) {
        element.textContent = newValue;
        
        if (newValue > currentValue) {
            element.classList.add('value-increase');
        } else {
            element.classList.add('value-decrease');
        }
        
        setTimeout(() => {
            element.classList.remove('value-increase', 'value-decrease');
        }, 1000);
    }
}

/**
 * 운영률 업데이트
 */
function updateOperationRate(element) {
    // 90~99% 사이의 랜덤값
    const currentRate = parseFloat(element.textContent);
    const newRate = 90 + (Math.random() * 9);
    
    element.textContent = newRate.toFixed(1) + '%';
    
    // 값에 따라 색상 변경
    if (newRate >= 98) {
        element.style.color = '#4CAF50'; // 녹색
    } else if (newRate >= 95) {
        element.style.color = '#2196F3'; // 파란색
    } else {
        element.style.color = '#FF9800'; // 주황색
    }
}

/**
 * 알림 업데이트
 */
function updateNotifications(element) {
    // 10% 확률로 새 알림 추가
    if (Math.random() < 0.1) {
        const notifications = [
            "선박 도착 일정 업데이트",
            "화물 하역 작업 완료",
            "장비 유지보수 필요",
            "터미널 혼잡도 증가",
            "선석 배정 변경 알림",
            "기상 악화 주의 알림"
        ];
        
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        
        // 알림 요소 생성
        const notificationElement = document.createElement('div');
        notificationElement.classList.add('notification-item');
        notificationElement.textContent = randomNotification;
        
        // 알림 컨테이너에 추가
        element.prepend(notificationElement);
        
        // 애니메이션 효과
        notificationElement.style.animation = 'slideIn 0.5s ease-out';
        
        // 최대 5개만 유지
        const notificationItems = element.querySelectorAll('.notification-item');
        if (notificationItems.length > 5) {
            element.removeChild(notificationItems[notificationItems.length - 1]);
        }
    }
}

/**
 * 날씨 정보 업데이트
 */
function updateWeather(element) {
    const weatherTypes = ['맑음', '구름조금', '구름많음', '흐림', '비', '강풍'];
    const temperatures = [18, 19, 20, 21, 22, 23, 24];
    
    // 가끔씩만 날씨 변경 (20% 확률)
    if (Math.random() < 0.2) {
        const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
        const randomTemp = temperatures[Math.floor(Math.random() * temperatures.length)];
        
        element.textContent = `${randomWeather} ${randomTemp}°C`;
    }
}
