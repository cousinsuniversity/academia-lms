document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.getElementById("main-content");
    const toggleBtn = document.getElementById("toggle-btn");
    const darkModeBtn = document.getElementById("dark-mode-btn");
    
    const navItems = document.querySelectorAll(".nav-item");
    const viewSections = document.querySelectorAll(".view-section");

    const dialogOverlay = document.getElementById("custom-dialog-overlay");
    const dialogTitle = document.getElementById("dialog-title");
    const dialogMessage = document.getElementById("dialog-message");
    const dialogCloseBtn = document.querySelector(".dialog-close-icon");
    const dialogActionBtn = document.getElementById("dialog-action-btn");

    const showDialog = (title, message) => {
        dialogTitle.innerText = title;
        dialogMessage.innerText = message;
        dialogOverlay.style.display = "flex";
        setTimeout(() => {
            dialogOverlay.classList.add("show");
        }, 10);
    };

    const closeDialog = () => {
        dialogOverlay.classList.remove("show");
        setTimeout(() => {
            dialogOverlay.style.display = "none";
        }, 300);
    };

    dialogCloseBtn.addEventListener("click", closeDialog);
    dialogActionBtn.addEventListener("click", closeDialog);
    dialogOverlay.addEventListener("click", (e) => {
        if (e.target === dialogOverlay) {
            closeDialog();
        }
    });

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

    const activeCourseTitle = document.getElementById('active-course-title');
    const activeCourseInstructor = document.getElementById('active-course-instructor');
    const activeCourseBanner = document.getElementById('active-course-banner');

    cards.forEach(card => {
        card.style.animationPlayState = 'paused';
        observer.observe(card);

        card.addEventListener("click", () => {
            const title = card.querySelector("h3").innerText;
            const instructor = card.querySelector("p").innerText.replace("Instructor: ", "");
            const colorClass = card.getAttribute("data-color");
            
            activeCourseTitle.innerText = title;
            activeCourseInstructor.innerText = instructor;
            
            activeCourseBanner.className = "course-banner";
            activeCourseBanner.classList.add(colorClass);

            switchView("single-course-view");
        });
    });

    const backToDashboardBtn = document.getElementById("back-to-dashboard");
    if(backToDashboardBtn) {
        backToDashboardBtn.addEventListener("click", () => {
            switchView("dashboard-view");
        });
    }

    const interactiveElements = document.querySelectorAll(".interactive-element");
    interactiveElements.forEach(el => {
        el.addEventListener("click", (e) => {
            if(!el.classList.contains('course-card')) {
                e.stopPropagation();
                const type = el.getAttribute("data-type");
                const title = el.getAttribute("data-title") || "Feature Accessed";
                
                let msg = "";
                switch(type) {
                    case "module":
                        msg = `Opening content for ${title}. Materials will be displayed in the document viewer.`;
                        break;
                    case "survey":
                        msg = `Redirecting to the evaluation portal for ${title}.`;
                        break;
                    case "profile":
                        msg = `Viewing full faculty profile and contact information.`;
                        break;
                    case "action":
                        msg = `Accessing ${title} portal.`;
                        break;
                    case "catalog":
                        msg = `Enrollment request initiated for this course.`;
                        break;
                    case "grades":
                        msg = `Fetching detailed grading rubric and feedback for ${title}.`;
                        break;
                    case "calendar":
                        msg = `Viewing agenda and tasks for ${title}.`;
                        break;
                    default:
                        msg = `Action processed successfully.`;
                }
                showDialog(title, msg);
            }
        });
    });

    const settingsForm = document.getElementById("settings-form");
    if(settingsForm) {
        settingsForm.addEventListener("submit", (e) => {
            e.preventDefault();
            showDialog("Settings Saved", "Your account preferences have been updated successfully.");
        });
    }
});
