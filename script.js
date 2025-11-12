// DOMが読み込まれたら実行
document.addEventListener('DOMContentLoaded', function() {
    // 年齢注意の帯の診断
    const ageNoticeWrapper = document.querySelector('.age-notice-wrapper');
    const ageNotice = document.querySelector('.age-notice');
    if (ageNoticeWrapper && ageNotice) {
        console.log('年齢注意の帯が見つかりました:', {wrapper: ageNoticeWrapper, notice: ageNotice});
        const wrapperStyles = window.getComputedStyle(ageNoticeWrapper);
        const noticeStyles = window.getComputedStyle(ageNotice);
        console.log('Wrapper表示状態:', {
            display: wrapperStyles.display,
            visibility: wrapperStyles.visibility,
            opacity: wrapperStyles.opacity,
            position: wrapperStyles.position,
            top: wrapperStyles.top,
            zIndex: wrapperStyles.zIndex,
            offsetHeight: ageNoticeWrapper.offsetHeight,
            offsetTop: ageNoticeWrapper.offsetTop
        });
        console.log('Notice表示状態:', {
            display: noticeStyles.display,
            visibility: noticeStyles.visibility,
            opacity: noticeStyles.opacity,
            background: noticeStyles.background,
            color: noticeStyles.color,
            offsetHeight: ageNotice.offsetHeight
        });
    } else {
        console.error('年齢注意の帯が見つかりません！', {wrapper: ageNoticeWrapper, notice: ageNotice});
    }

    // スクロール時のアニメーション
    initScrollAnimation();

    // スムーススクロール
    initSmoothScroll();

    // ボタンクリック効果
    initButtonEffects();

    // スクロールトップボタン
    initScrollTopButton();

    // 記事のアニメーション
    initArticleAnimation();

    // 目次生成
    if (!(document.body && document.body.dataset && document.body.dataset.mode === 'ad')) {
        generateTableOfContents();
    }

    // 読了時間の更新
    updateReadingTime();

    // シェアボタンの初期化
    initShareButtons();

    // CTAボタンのアフィリエイトリンク設定
    initAffiliateLinks();
});

// スクロール時のアニメーション
function initScrollAnimation() {
    const sections = document.querySelectorAll('.article-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// スムーススクロール
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        // CTAボタンは除外（アフィリエイトリンク処理で処理される）
        if (link.classList.contains('hero-cta') || link.classList.contains('sidebar-btn')) {
            return;
        }

        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ボタンクリック効果
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // リップル効果
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

            // ダウンロードボタンの場合
            if (this.closest('.download-btn')) {
                showDownloadMessage();
            }
        });
    });
}

// ダウンロードメッセージ表示
function showDownloadMessage() {
    // 既存のメッセージを削除
    const existingMessage = document.querySelector('.download-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // 新しいメッセージを作成
    const message = document.createElement('div');
    message.className = 'download-message';
    message.innerHTML = `
        <div class="message-content">
            <h4>ダウンロードを開始します</h4>
            <p>ストアページに移動します...</p>
        </div>
    `;

    document.body.appendChild(message);

    // 3秒後にメッセージを消す
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// スクロールトップボタン
function initScrollTopButton() {
    // スクロールトップボタンを作成
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', 'ページトップへ戻る');
    document.body.appendChild(scrollTopBtn);

    // スクロール時の表示/非表示
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    // クリック時のスクロール
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 記事のアニメーション
function initArticleAnimation() {
    const articleTitle = document.querySelector('.article-title');
    const articleSubtitle = document.querySelector('.title-subtitle');
    const eyecatch = document.querySelector('.eyecatch');
    const articleMeta = document.querySelector('.article-meta');

    // 初期状態を設定
    [articleTitle, articleSubtitle, eyecatch, articleMeta].forEach(element => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
        }
    });

    // アニメーションを開始
    setTimeout(() => {
        if (articleTitle) {
            articleTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            articleTitle.style.opacity = '1';
            articleTitle.style.transform = 'translateY(0)';
        }
    }, 200);

    setTimeout(() => {
        if (articleSubtitle) {
            articleSubtitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            articleSubtitle.style.opacity = '1';
            articleSubtitle.style.transform = 'translateY(0)';
        }
    }, 400);

    setTimeout(() => {
        if (eyecatch) {
            eyecatch.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            eyecatch.style.opacity = '1';
            eyecatch.style.transform = 'translateY(0)';
        }
    }, 600);

    setTimeout(() => {
        if (articleMeta) {
            articleMeta.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            articleMeta.style.opacity = '1';
            articleMeta.style.transform = 'translateY(0)';
        }
    }, 800);
}

// 目次生成
function generateTableOfContents() {
    const articleBody = document.querySelector('.article-body');
    if (!articleBody) return;
    const headings = articleBody.querySelectorAll('h2');

    if (headings.length === 0) return;

    // サイドバーに目次を追加
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    const tocWidget = document.createElement('div');
    tocWidget.className = 'sidebar-widget toc-widget';

    let tocHTML = '<h3>目次</h3><nav><ul>';

    headings.forEach((heading, index) => {
        const id = heading.id || `section-${index}`;
        heading.id = id;
        const text = heading.textContent;
        tocHTML += `<li><a href="#${id}">${text}</a></li>`;
    });

    tocHTML += '</ul></nav>';
    tocWidget.innerHTML = tocHTML;

    // 最初のウィジェットとして挿入
    sidebar.insertBefore(tocWidget, sidebar.firstChild);
}

// 読了時間の計算と更新
function updateReadingTime() {
    const articleBody = document.querySelector('.article-body');
    if (!articleBody) return;
    const text = articleBody.textContent;
    const wordCount = text.split(/\s+/).length;
    const readingTimeMinutes = Math.ceil(wordCount / 200); // 1分間に200語と仮定

    const readingTimeElement = document.querySelector('.read-time');
    if (readingTimeElement) {
        readingTimeElement.innerHTML = `<i class="fas fa-clock"></i> 約${readingTimeMinutes}分で読めます`;
    }
}

// シェアボタンの初期化
function initShareButtons() {
    // Twitterシェアボタン
    const shareTwitter = document.createElement('div');
    shareTwitter.className = 'share-button twitter-share';
    shareTwitter.innerHTML = '<i class="fab fa-twitter"></i> ツイート';
    shareTwitter.onclick = () => shareOnTwitter();

    // Facebookシェアボタン
    const shareFacebook = document.createElement('div');
    shareFacebook.className = 'share-button facebook-share';
    shareFacebook.innerHTML = '<i class="fab fa-facebook-f"></i> シェア';
    shareFacebook.onclick = () => shareOnFacebook();

    // シェアウィジェットを作成
    const shareWidget = document.createElement('div');
    shareWidget.className = 'sidebar-widget share-widget';
    shareWidget.innerHTML = `
        <h3>この記事をシェア</h3>
        <div class="share-buttons">
        </div>
    `;

    shareWidget.querySelector('.share-buttons').appendChild(shareTwitter);
    shareWidget.querySelector('.share-buttons').appendChild(shareFacebook);

    // サイドバーに追加
    const sidebar = document.querySelector('.sidebar');
    const downloadWidget = sidebar.querySelector('.download-widget');
    sidebar.insertBefore(shareWidget, downloadWidget);
}

// Twitterシェア機能
function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(document.title + ' #Tapple #マッチングアプリ');
    const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
}

// Facebookシェア機能
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(facebookUrl, '_blank', 'width=600,height=600');
}

// デバイス判定関数
function detectDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // iOS判定
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'ios';
    }
    
    // Android判定
    if (/android/i.test(userAgent)) {
        return 'android';
    }
    
    // その他（デスクトップなど）
    return 'other';
}

// アフィリエイトリンクの設定
function initAffiliateLinks() {
    // デバイス判定
    const device = detectDevice();

    // CTAボタンのクリックイベントを設定
    const ctaButtons = document.querySelectorAll('.hero-cta, .sidebar-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // #downloadへのスクロールを防ぐ
            if (this.getAttribute('href') === '#download') {
                e.preventDefault();
            }

            // HTMLのdata属性からリンクを取得
            const iosLink = this.getAttribute('data-ios-link');
            const androidLink = this.getAttribute('data-android-link');

            // デバイスに応じたリンクに遷移
            if (device === 'ios' && iosLink) {
                window.location.href = iosLink;
            } else if (device === 'android' && androidLink) {
                window.location.href = androidLink;
            } else {
                // その他のデバイスの場合は、既存の#downloadセクションにスクロール
                const downloadSection = document.getElementById('download');
                if (downloadSection) {
                    e.preventDefault();
                    const headerOffset = document.querySelector('.header')?.offsetHeight || 0;
                    const elementPosition = downloadSection.offsetTop;
                    const offsetPosition = elementPosition - headerOffset - 20;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ダウンロードボタンのCSSを追加
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }

        .scroll-top-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #FF69B4, #FFB6C1);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
        }

        .scroll-top-btn.visible {
            opacity: 1;
            visibility: visible;
        }

        .scroll-top-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(255, 105, 180, 0.4);
        }

        .download-message {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: messageFadeIn 0.3s ease;
        }

        .message-content h4 {
            color: #FF69B4;
            margin-bottom: 0.5rem;
            font-size: 1.2rem;
        }

        .message-content p {
            color: #666;
            margin: 0;
        }

        @keyframes messageFadeIn {
            from {
                opacity: 0;
                transform: translate(-50%, -60%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%);
            }
        }

        /* シェアボタンスタイル */
        .share-button {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.8rem 1.2rem;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
        }

        .twitter-share {
            background: #1da1f2;
            color: white;
        }

        .twitter-share:hover {
            background: #0d95e8;
            transform: translateY(-2px);
        }

        .facebook-share {
            background: #1877f2;
            color: white;
        }

        .facebook-share:hover {
            background: #166fe5;
            transform: translateY(-2px);
        }

        /* 目次スタイル */
        .toc-widget nav ul {
            list-style: none;
            padding: 0;
        }

        .toc-widget nav ul li {
            margin-bottom: 0.8rem;
            padding-left: 1rem;
            position: relative;
        }

        .toc-widget nav ul li::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0.5rem;
            width: 6px;
            height: 6px;
            background: #FF69B4;
            border-radius: 50%;
        }

        .toc-widget nav ul li a {
            color: #666;
            text-decoration: none;
            transition: color 0.3s ease;
        }

        .toc-widget nav ul li a:hover {
            color: #FF69B4;
        }

        /* アクティブな目次項目 */
        .toc-widget .active {
            color: #FF69B4;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
}

// 動的スタイルを追加
addDynamicStyles();

// パフォーマンス最適化のためのデバウンス関数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ウィンドウリサイズ時の処理
window.addEventListener('resize', debounce(function() {
    // リサイズ時の処理をここに追加
}, 250));
