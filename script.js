document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const body = document.querySelector('body');
    let mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
        <div class="close-menu">
            <i class="fas fa-times"></i>
        </div>
        <ul class="nav-links">
            <li><a href="#" class="active">Trang chủ</a></li>
            <li><a href="#products">Sản phẩm</a></li>
            <li><a href="#categories">Danh mục</a></li>
            <li><a href="#about">Giới thiệu</a></li>
            <li><a href="#contact">Liên hệ</a></li>
        </ul>
        <div class="mobile-nav-icons">
            <a href="#" class="icon"><i class="fas fa-search"></i></a>
            <a href="#" class="icon"><i class="fas fa-user"></i></a>
            <a href="#" class="icon"><i class="fas fa-shopping-cart"></i> <span class="cart-count">0</span></a>
        </div>
    `;
    
    // Overlay for mobile menu
    let overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    body.appendChild(mobileMenu);
    body.appendChild(overlay);
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
    });
    
    // Close mobile menu
    const closeMenu = document.querySelector('.close-menu');
    closeMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = 'auto';
    });
    
    overlay.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = 'auto';
    });
    
    // Product Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
                
                // Add animation when showing cards
                setTimeout(() => {
                    if (card.style.display === 'block') {
                        card.classList.add('show');
                    } else {
                        card.classList.remove('show');
                    }
                }, 100);
            });
        });
    });
    
    // Show all products initially with animation
    productCards.forEach(card => {
        card.classList.add('show');
    });
    
    // Back to Top Button
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Reveal animations on scroll
    const animateElements = document.querySelectorAll('.category-card, .product-card, .feature');
    
    function checkPosition() {
        let windowHeight = window.innerHeight;
        animateElements.forEach(element => {
            let positionFromTop = element.getBoundingClientRect().top;
            
            if (positionFromTop - windowHeight <= -100) {
                element.classList.add('show');
            }
        });
    }
    
    window.addEventListener('scroll', checkPosition);
    checkPosition(); // Check position on page load
    
    // Shopping Cart Functionality
    let cartCount = 0;
    const cartCountElements = document.querySelectorAll('.cart-count');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            cartCount++;
            
            // Update all cart count displays
            cartCountElements.forEach(element => {
                element.textContent = cartCount;
                
                // Add pulse animation
                element.classList.add('pulse');
                setTimeout(() => {
                    element.classList.remove('pulse');
                }, 1000);
            });
            
            // Get product info
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            
            // Show notification
            showNotification(`${productName} đã được thêm vào giỏ hàng!`);
        });
    });
    
    // Product notification function
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <p>${message}</p>
                <span class="notification-close"><i class="fas fa-times"></i></span>
            </div>
        `;
        
        body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
        
        notification.querySelector('.notification-close').addEventListener('click', function() {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value.trim() !== '') {
                // Simulating form submission
                showNotification('Cảm ơn bạn đã đăng ký nhận tin!');
                emailInput.value = '';
            }
        });
    }
    
    // Add CSS for notifications
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            z-index: 1000;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            background-color: #fff;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            padding: 15px 20px;
            border-radius: 8px;
            min-width: 300px;
            border-left: 4px solid #4a6de5;
        }
        
        .notification-content i {
            color: #4a6de5;
            font-size: 20px;
            margin-right: 10px;
        }
        
        .notification-content p {
            flex-grow: 1;
            margin: 0;
        }
        
        .notification-close {
            cursor: pointer;
            color: #777;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .cart-count.pulse {
            animation: pulse 0.5s;
        }
    `;
    
    document.head.appendChild(style);

    // Initialize on page load
    // Trigger the "all" filter to show all products initially
    document.querySelector('.filter-btn[data-filter="all"]').click();
});
