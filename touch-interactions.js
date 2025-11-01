// 触摸友好的交互增强
document.addEventListener('DOMContentLoaded', function() {
    // 触摸设备检测
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
        // 添加触摸反馈类
        document.body.classList.add('touch-device');
        
        // 为所有可点击元素添加触摸反馈
        const touchElements = document.querySelectorAll('.nav-link, .nav-card, button, .btn, .experience-item, .ability-card, .skill-item, .equipment-item, .contact-method');
        
        touchElements.forEach(element => {
            // 触摸开始
            element.addEventListener('touchstart', function(e) {
                this.classList.add('touch-active');
                // 创建涟漪效果
                createRipple(e, this);
            }, { passive: true });
            
            // 触摸结束
            element.addEventListener('touchend', function() {
                const self = this;
                setTimeout(() => {
                    self.classList.remove('touch-active');
                }, 150);
            }, { passive: true });
            
            // 触摸取消
            element.addEventListener('touchcancel', function() {
                this.classList.remove('touch-active');
            }, { passive: true });
        });
        
        // 滑动手势支持
        addSwipeGestures();
        
        // 长按支持
        addLongPressSupport();
    }
    
    // 创建涟漪效果
    function createRipple(e, element) {
        // 移除现有涟漪
        const existingRipple = element.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }
        
        // 创建新涟漪
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        // 计算涟漪位置和大小
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.touches[0].clientX - rect.left - size / 2;
        const y = e.touches[0].clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        // 添加到元素
        element.appendChild(ripple);
        
        // 动画结束后移除
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // 添加滑动手势支持
    function addSwipeGestures() {
        let touchStartX = 0;
        let touchEndX = 0;
        let touchStartY = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        document.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const minSwipeDistance = 50; // 最小滑动距离
            
            // 水平滑动
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    // 向右滑动
                    document.body.classList.add('swipe-right');
                    setTimeout(() => {
                        document.body.classList.remove('swipe-right');
                    }, 300);
                } else {
                    // 向左滑动
                    document.body.classList.add('swipe-left');
                    setTimeout(() => {
                        document.body.classList.remove('swipe-left');
                    }, 300);
                }
            }
            
            // 垂直滑动
            if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
                if (deltaY > 0) {
                    // 向下滑动
                    document.body.classList.add('swipe-down');
                    setTimeout(() => {
                        document.body.classList.remove('swipe-down');
                    }, 300);
                } else {
                    // 向上滑动
                    document.body.classList.add('swipe-up');
                    setTimeout(() => {
                        document.body.classList.remove('swipe-up');
                    }, 300);
                }
            }
        }
    }
    
    // 添加长按支持
    function addLongPressSupport() {
        let pressTimer;
        const longPressElements = document.querySelectorAll('.nav-card, .ability-card, .skill-item');
        
        longPressElements.forEach(element => {
            element.addEventListener('touchstart', function(e) {
                const self = this;
                pressTimer = setTimeout(() => {
                    self.classList.add('long-press');
                    // 触觉反馈（如果支持）
                    if (navigator.vibrate) {
                        navigator.vibrate(50);
                    }
                }, 500);
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                clearTimeout(pressTimer);
                this.classList.remove('long-press');
            }, { passive: true });
            
            element.addEventListener('touchmove', function() {
                clearTimeout(pressTimer);
            }, { passive: true });
        });
    }
    
    // 添加惯性滚动支持
    addInertialScrolling();
    
    // 添加双击缩放支持
    addDoubleTapZoom();
});

// 添加惯性滚动支持
function addInertialScrolling() {
    const scrollContainers = document.querySelectorAll('.content, .timeline, .abilities-grid, .skills-grid, .equipment-grid');
    
    scrollContainers.forEach(container => {
        let isScrolling = false;
        let startY = 0;
        let scrollTop = 0;
        
        container.addEventListener('touchstart', function(e) {
            isScrolling = true;
            startY = e.touches[0].pageY;
            scrollTop = this.scrollTop;
        }, { passive: true });
        
        container.addEventListener('touchmove', function(e) {
            if (!isScrolling) return;
            
            const y = e.touches[0].pageY;
            const scrollSpeed = (y - startY) * 0.5;
            
            this.scrollTop = scrollTop - y + startY;
        }, { passive: true });
        
        container.addEventListener('touchend', function() {
            isScrolling = false;
        }, { passive: true });
    });
}

// 添加双击缩放支持
function addDoubleTapZoom() {
    let lastTouchEnd = 0;
    const zoomElements = document.querySelectorAll('.experience-item, .ability-card, .skill-item, .equipment-item');
    
    zoomElements.forEach(element => {
        element.addEventListener('touchend', function(e) {
            const now = Date.now();
            if (now - lastTouchEnd < 300) {
                e.preventDefault();
                toggleZoom(this);
            }
            lastTouchEnd = now;
        }, { passive: false });
    });
}

// 切换缩放
function toggleZoom(element) {
    if (element.classList.contains('zoomed')) {
        element.classList.remove('zoomed');
        element.style.transform = 'scale(1)';
    } else {
        element.classList.add('zoomed');
        element.style.transform = 'scale(1.05)';
    }
}