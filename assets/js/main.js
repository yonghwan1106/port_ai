/**
 * PORT-AI 제안서 웹사이트 메인 스크립트
 */

document.addEventListener('DOMContentLoaded', function() {
    // 스크롤 애니메이션
    initScrollAnimations();
    
    // 스크롤 시 헤더 스타일 변경
    initStickyHeader();
    
    // 페이지 내 네비게이션 스크롤
    initSmoothScroll();
    
    // 반응형 네비게이션 설정
    initMobileNav();
});

/**
 * 스크롤 애니메이션 초기화
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animatedElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * 스크롤 시 헤더 스타일 변경
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
}

/**
 * 부드러운 스크롤 기능
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * 모바일 네비게이션 초기화
 */
function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('nav');
    
    if (!menuToggle || !mobileNav) return;
    
    menuToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('nav-open');
        menuToggle.classList.toggle('toggle-open');
    });
    
    // 모바일 메뉴 아이템 클릭 시 메뉴 닫기
    const menuItems = mobileNav.querySelectorAll('a');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileNav.classList.remove('nav-open');
            menuToggle.classList.remove('toggle-open');
        });
    });
}

/**
 * 현재 활성화된 섹션 표시
 */
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

/**
 * 이미지 지연 로딩
 */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * 데모 화면으로 이동 버튼 효과
 */
function initDemoButton() {
    const demoButton = document.querySelector('.demo-button');
    
    if (!demoButton) return;
    
    demoButton.addEventListener('mouseenter', () => {
        demoButton.classList.add('pulse');
    });
    
    demoButton.addEventListener('mouseleave', () => {
        demoButton.classList.remove('pulse');
    });
}

// 추가 기능 필요 시 활성화
// window.addEventListener('load', function() {
//     highlightActiveSection();
//     initLazyLoading();
//     initDemoButton();
// });
