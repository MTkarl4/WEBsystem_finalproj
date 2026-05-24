const menuBtn = document.getElementById('menuToggle');
const megaMenu = document.getElementById('mega-menu');
const overlay = document.getElementById('menu-overlay');

menuBtn.addEventListener('click', function(e) {
    e.stopPropagation(); 
    menuBtn.classList.toggle('active');
    megaMenu.classList.toggle('active');
    overlay.classList.toggle('active');
});

window.addEventListener('click', function(e) {
    if (megaMenu.classList.contains('active')) {
        if (!megaMenu.contains(e.target) && e.target !== menuBtn) {
            menuBtn.classList.remove('active');
            megaMenu.classList.remove('active');
            overlay.classList.remove('active');
        }
    }
});

document.querySelectorAll('.menu-section a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        megaMenu.classList.remove('active');
        overlay.classList.remove('active');
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const menus = [
        {
            btn: document.getElementById("causesDropdownBtn"),
            panel: document.getElementById("causesDropdownPanel")
        },
        {
            btn: document.getElementById("solutionsDropdownBtn"),
            panel: document.getElementById("solutionsDropdownPanel")
        },
        {
            btn: document.getElementById("lessonsDropdownBtn"),
            panel: document.getElementById("lessonsDropdownPanel")
        }
    ];

    const overlay = document.getElementById("dropdownOverlay");
    function closeAllMenus() {
        menus.forEach(item => {
            if (item.panel) item.panel.classList.remove("show-menu");
        });
        if (overlay) overlay.classList.remove("show-overlay");
    }
    menus.forEach(item => {
        if (item.btn && item.panel) {
            item.btn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const isOpen = item.panel.classList.contains("show-menu");
                closeAllMenus();
                if (!isOpen) {
                    item.panel.classList.add("show-menu");
                    if (overlay) overlay.classList.add("show-overlay");
                }
            });
        }
    });
    if (overlay) {
        overlay.addEventListener("click", closeAllMenus);
    }
    window.addEventListener("click", (e) => {
        const clickedInsideAMenu = menus.some(item => item.panel && item.panel.contains(e.target));
        const clickedAMenuButton = menus.some(item => item.btn && item.btn === e.target);

        if (!clickedInsideAMenu && !clickedAMenuButton) {
            closeAllMenus();
        }
    });
});
