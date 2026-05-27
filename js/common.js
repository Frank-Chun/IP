/* 公共：高ight 当前 nav */
document.addEventListener("DOMContentLoaded", () => {
  const path = location.pathname.replace(/\/$/, "");
  document.querySelectorAll("[data-nav]").forEach(a => {
    const ap = a.getAttribute("data-nav");
    if (path.endsWith(ap)) a.classList.add("active");
  });
});