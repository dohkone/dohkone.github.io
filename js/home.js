document.addEventListener("DOMContentLoaded", () => {
    const iconElement = document.getElementById('nav-icon');
    const icons = [
      '/images/icons_1.png',
      '/images/icons_2.png',
      '/images/icons_3.png',
      '/images/icons_4.png'
    ];
    let currentIndex = 0;
  
    const leftNav = document.querySelector(".hero-left-nav");
    const moduleBox = document.getElementById("module-box-info");
    const heroContent = document.querySelector(".hero-content");
    const externalContainer = document.getElementById("external-page-container");

    window.showPreview = function (type, src) {
        const preview = document.getElementById('preview');
        preview.innerHTML = '';

        let el;
        if (type === 'img' || type === 'jpg') {
            el = document.createElement('img');
            el.src = src;
        } else {
            el = document.createElement('video');
            el.src = src;
            el.controls = true;
            el.autoplay = true;
        }

        preview.appendChild(el);
        preview.style.display = 'flex';
    };

    window.hidePreview = function () {
        const preview = document.getElementById('preview');
        preview.style.display = 'none';
        preview.innerHTML = '';
    };

    iconElement.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % icons.length;
      iconElement.src = icons[currentIndex];

      leftNav.classList.remove('shifted');
      moduleBox.style.display = "none";

      // 恢复介绍区，隐藏异步加载区
      heroContent.style.display = "block";
      externalContainer.style.display = "none";
      externalContainer.innerHTML = '';
    });
  
    const text = "一名前端开发者 | 分享代码与生活";
    const element = document.getElementById("typewriter");
    let index = 0;
  
    function typeOnce() {
      if (index < text.length) {
        element.textContent += text.charAt(index++);
        setTimeout(typeOnce, 50);
      }
    }
  
    typeOnce();
  
    const navLinks = document.querySelectorAll(".nav-card");
  
    navLinks.forEach(link => {
      link.addEventListener("click", async e => {
        e.preventDefault();
        const page = link.getAttribute("data-page");
        console.log("准备加载页面：", page);
    
        leftNav.classList.add("shifted");
        moduleBox.style.display = "flex";
        heroContent.style.display = "none";
        externalContainer.style.display = "block";
    
        try {
          const res = await fetch(page);
          if (!res.ok) {
            throw new Error(`网络错误，状态码：${res.status}`);
          }
          const html = await res.text();
          console.log("获取到的html长度：", html.length);
    
          // 解析body
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const fullHTML = doc.documentElement.outerHTML || "未找到页面内容";
          externalContainer.innerHTML = fullHTML;
    
          // 检查容器显示状态
          console.log("externalContainer display:", getComputedStyle(externalContainer).display);
    
        } catch (err) {
          console.error("加载页面失败:", err);
          externalContainer.innerHTML = "页面加载失败。";
        }
      });
    });

  });
  