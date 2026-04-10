document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
    const toggleBtn = document.getElementById("toggle-btn");
    const darkModeBtn = document.getElementById("dark-mode-btn");
    
    const modal = document.getElementById("course-modal");
    const closeBtn = document.querySelector(".close-btn");
    const modalTitle = document.getElementById("modal-title");
    const modalInstructor = document.getElementById("modal-instructor");
    const enterCourseBtn = document.getElementById("enter-course-btn");
    
    const navItems = document.querySelectorAll(".nav-item");
    const viewSections = document.querySelectorAll(".view-section");

    const switchView = (targetId) => {
        navItems.forEach(item => item.classList.remove("active"));
        const targetNav = document.querySelector(`[data-target="${targetId}"]`);
        if(targetNav) targetNav.classList.add("active");

        viewSections.forEach(section => {
            section.classList.remove("active");
        });
        document.getElementById(targetId).classList.add("active");
    };

    navItems.forEach(item => {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = item.getAttribute("data-target");
            switchView(targetId);
        });
    });

    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("hidden");
        mainContent.classList.toggle("expanded");
    });

    darkModeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    const cards = document.querySelectorAll('.course-card');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);

        card.addEventListener("click", () => {
            const title = card.querySelector("h3").innerText;
            const instructor = card.querySelector("p").innerText;
            
            modalTitle.innerText = title;
            modalInstructor.innerText = instructor;
            
            modal.style.display = "flex";
            setTimeout(() => {
                modal.classList.add("show");
            }, 10);
        });
    });

    const closeModal = () => {
        modal.classList.remove("show");
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    };

    closeBtn.addEventListener("click", closeModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    enterCourseBtn.addEventListener("click", () => {
        closeModal();
        setTimeout(() => {
            switchView("courses-view");
        }, 300);
    });

    const moduleBtns = document.querySelectorAll(".module-btn");
    moduleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const courseName = btn.parentElement.querySelector("h3").innerText;
            alert(`Opening modules for ${courseName}`);
        });
    });

    const settingsForm = document.getElementById("settings-form");
    if(settingsForm) {
        settingsForm.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Settings saved successfully.");
        });
    }
});
