---
title: 友情链接
---
- 某个业余无线电爱好者
<style>
  @keyframes gradientFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .gradient-link {
    display: inline-block !important;
    background: linear-gradient(-45deg, #8e4ed3ff, #2d70e4ff, #00d2ff, #4889e4ff);
    background-size: 400% 400%;
    animation: gradientFlow 15s ease infinite;
    color: rgba(0, 0, 0, 1);
    text-decoration: none;
    text-shadow: 0 1px 2px rgba(0,0,0,0.15), 
             0 0 8px rgba(255,255,255,0.25);
    border-radius: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Microsoft YaHei', sans-serif;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 0.5px;
    box-shadow: 0 6px 20px rgba(51, 80, 129, 0.22);
    transition: all 0.4s ease;
    padding: 12px 24px;
    margin: 0 !important;
    overflow: hidden;
  }
  .gradient-link:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(124, 172, 255, 0.67);
    animation-duration: 8s;
  }
  .gradient-link-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }
  .logo-img {
    height: 48px;
    border-radius: 50%;
    border: 2px solid white;
    filter: drop-shadow(0 1px 2px rgba(31, 55, 70, 1));
  }
  @media (prefers-reduced-motion: reduce) {
    .gradient-link {
      animation: none;
      background: linear-gradient(-45deg, #1e2374ff, #672e81ff);
    }
    .gradient-link:hover {
      transform: none;
    }
  }
</style>

<a href="https://blog.morizuki.top/" class="gradient-link">
  <div class="gradient-link-content">
    <img src="https://blog.morizuki.top/img/avt.jpg" alt="KAFU的小窝" class="logo-img">
    KAFU的小窝
  </div>
</a>
