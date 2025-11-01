// 移动端菜单交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取菜单按钮和导航菜单
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');
    
    // 检查元素是否存在
    if (menuToggle && mainNav) {
        // 点击菜单按钮切换菜单显示状态
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            
            // 切换汉堡菜单图标
            const lines = menuToggle.querySelectorAll('.hamburger-line');
            if (mainNav.classList.contains('active')) {
                // 转换为关闭图标 (X)
                lines[0].style.transform = 'rotate(45deg)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg)';
            } else {
                // 恢复汉堡菜单图标
                lines[0].style.transform = 'rotate(0)';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'rotate(0)';
            }
        });
        
        // 点击导航链接后关闭菜单
        const navLinks = mainNav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                
                // 恢复汉堡菜单图标
                const lines = menuToggle.querySelectorAll('.hamburger-line');
                lines[0].style.transform = 'rotate(0)';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'rotate(0)';
            });
        });
        
        // 点击页面其他区域关闭菜单
        document.addEventListener('click', function(event) {
            if (!menuToggle.contains(event.target) && !mainNav.contains(event.target)) {
                mainNav.classList.remove('active');
                
                // 恢复汉堡菜单图标
                const lines = menuToggle.querySelectorAll('.hamburger-line');
                lines[0].style.transform = 'rotate(0)';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'rotate(0)';
            }
        });
    }
    
    // 添加平滑滚动效果
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // 考虑固定头部高度
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 添加滚动时的头部阴影效果
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.main-header');
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.7)';
        } else {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
        }
    });
});