// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化项目展开/折叠功能
    initProjectToggle();
    
    // 初始化导航链接点击事件
    initNavigation();
    
    // 初始化平滑滚动
    initSmoothScroll();
});

// 项目经历展开与折叠功能
function initProjectToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const projectContent = document.getElementById(projectId);
            
            if (projectContent) {
                // 切换展开/折叠状态
                const isExpanded = projectContent.classList.contains('expanded');
                
                if (isExpanded) {
                    // 折叠
                    projectContent.classList.remove('expanded');
                    this.textContent = '展开';
                } else {
                    // 展开
                    projectContent.classList.add('expanded');
                    this.textContent = '折叠';
                }
            }
        });
    });
}

// 导航链接点击事件
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 移除所有活动状态
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前链接的活动状态
            this.classList.add('active');
            
            // 获取目标元素
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // 平滑滚动到目标位置
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // 监听滚动事件，更新活动导航项
    window.addEventListener('scroll', function() {
        updateActiveNav();
    });
}

// 根据滚动位置更新活动导航项
function updateActiveNav() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// 平滑滚动初始化
function initSmoothScroll() {
    // 确保所有锚点链接都使用平滑滚动
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// 添加页面性能监控（可选，用于调试）
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log('页面加载时间:', loadTime + 'ms');
        
        const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;
        console.log('DOM加载时间:', domReady + 'ms');
    }
}

// 页面加载完成后记录性能
window.addEventListener('load', function() {
    // 延迟执行，确保所有资源都已加载
    setTimeout(logPerformance, 0);
});

