/* =========================================================
   HOME PAGE - TYPING ANIMATION
========================================================= */

const roles = [
    "Full-Stack Developer",
    "QA & Software Tester",
    "IT & Network Support Professional",
    "Cybersecurity Enthusiast"
];

const typingText = document.getElementById("typingText");

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

const typingSpeed = 75;
const deletingSpeed = 40;
const pauseAfterTyping = 1800;
const pauseAfterDeleting = 350;


function typeRole() {

    if (!typingText) {
        return;
    }

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        if (characterIndex === currentRole.length) {

            deleting = true;

            setTimeout(
                typeRole,
                pauseAfterTyping
            );

            return;
        }

        setTimeout(
            typeRole,
            typingSpeed
        );

    } else {

        typingText.textContent =
            currentRole.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) %
                roles.length;

            setTimeout(
                typeRole,
                pauseAfterDeleting
            );

            return;
        }

        setTimeout(
            typeRole,
            deletingSpeed
        );
    }
}


if (typingText) {
    typeRole();
}


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");

const savedTheme =
    localStorage.getItem("portfolio-theme");


if (savedTheme === "dark") {

    document.body.classList.add(
        "dark-mode"
    );
}


themeToggle?.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );

        const currentTheme =
            document.body.classList.contains(
                "dark-mode"
            )
                ? "dark"
                : "light";

        localStorage.setItem(
            "portfolio-theme",
            currentTheme
        );
    }
);


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

const sidebar =
    document.getElementById("sidebar");

const sidebarOverlay =
    document.getElementById("sidebarOverlay");


function openSidebar() {

    sidebar?.classList.add("open");

    sidebarOverlay?.classList.add(
        "show"
    );

    mobileMenuBtn?.setAttribute(
        "aria-expanded",
        "true"
    );

    document.body.style.overflow =
        "hidden";
}


function closeSidebar() {

    sidebar?.classList.remove("open");

    sidebarOverlay?.classList.remove(
        "show"
    );

    mobileMenuBtn?.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.style.overflow = "";
}


mobileMenuBtn?.addEventListener(
    "click",
    () => {

        if (
            sidebar?.classList.contains(
                "open"
            )
        ) {

            closeSidebar();

        } else {

            openSidebar();
        }
    }
);


sidebarOverlay?.addEventListener(
    "click",
    closeSidebar
);


document
    .querySelectorAll(".nav-link")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                if (
                    window.innerWidth <= 1000
                ) {

                    closeSidebar();
                }
            }
        );
    });


window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 1000
        ) {

            closeSidebar();
        }
    }
);


/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYear =
    document.getElementById("currentYear");


if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================================
   CERTIFICATE SEARCH + FILTER
========================================================= */

const certificateCards =
    document.querySelectorAll(
        ".certificate-card"
    );

const certificateFilters =
    document.querySelectorAll(
        ".certificate-filter"
    );

const certificateSearch =
    document.getElementById(
        "certificateSearch"
    );

const certificateEmpty =
    document.getElementById(
        "certificateEmpty"
    );


let activeCertificateFilter =
    "all";


function filterCertificates() {

    if (
        certificateCards.length === 0
    ) {
        return;
    }


    const searchValue =
        certificateSearch
            ? certificateSearch.value
                .toLowerCase()
                .trim()
            : "";


    let visibleCards = 0;


    certificateCards.forEach(card => {

        const category =
            (
                card.dataset.category ||
                ""
            )
            .toLowerCase()
            .trim();


        const title =
            (
                card.dataset.title ||
                ""
            )
            .toLowerCase();


        const cardText =
            card.textContent
                .toLowerCase();


        const categoryMatch =
            activeCertificateFilter ===
            "all" ||
            category ===
            activeCertificateFilter;


        const searchMatch =
            title.includes(searchValue) ||
            cardText.includes(searchValue);


        const shouldShow =
            categoryMatch &&
            searchMatch;


        card.classList.toggle(
            "hidden",
            !shouldShow
        );


        if (shouldShow) {
            visibleCards++;
        }
    });


    certificateEmpty?.classList.toggle(
        "show",
        visibleCards === 0
    );
}


certificateFilters.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                certificateFilters
                    .forEach(filterButton => {

                        filterButton
                            .classList
                            .remove("active");
                    });


                button.classList.add(
                    "active"
                );


                activeCertificateFilter =
                    button.dataset.filter ||
                    "all";


                filterCertificates();
            }
        );
    }
);


certificateSearch?.addEventListener(
    "input",
    filterCertificates
);


/* =========================================================
   PROJECT SEARCH + FILTER + SORT
========================================================= */

const projectsGrid =
    document.getElementById(
        "projectsGrid"
    );


const projectCards =
    projectsGrid
        ? Array.from(
            projectsGrid.querySelectorAll(
                ".project-card"
            )
        )
        : [];


const originalProjectOrder =
    [...projectCards];


const projectFilters =
    document.querySelectorAll(
        ".project-filter"
    );


const projectSearch =
    document.getElementById(
        "projectSearch"
    );


const projectSort =
    document.getElementById(
        "projectSort"
    );


const projectEmpty =
    document.getElementById(
        "projectEmpty"
    );


let activeProjectFilter =
    "all";


function filterProjects() {

    if (
        projectCards.length === 0
    ) {
        return;
    }


    const searchValue =
        projectSearch
            ? projectSearch.value
                .toLowerCase()
                .trim()
            : "";


    let visibleProjects = 0;


    projectCards.forEach(card => {

        const categories =
            (
                card.dataset.category ||
                ""
            )
            .toLowerCase()
            .split(/\s+/)
            .filter(Boolean);


        const title =
            (
                card.dataset.title ||
                ""
            )
            .toLowerCase();


        const description =
            card.querySelector(
                ".project-description"
            )?.textContent
                .toLowerCase() ||
            "";


        const tags =
            Array.from(
                card.querySelectorAll(
                    ".project-tags span"
                )
            )
            .map(
                tag =>
                    tag.textContent
                        .toLowerCase()
            )
            .join(" ");


        const categoryMatch =
            activeProjectFilter ===
            "all" ||
            categories.includes(
                activeProjectFilter
            );


        const searchText =
            `${title} ${description} ${tags}`;


        const searchMatch =
            searchText.includes(
                searchValue
            );


        const shouldShow =
            categoryMatch &&
            searchMatch;


        card.classList.toggle(
            "hidden",
            !shouldShow
        );


        if (shouldShow) {
            visibleProjects++;
        }
    });


    projectEmpty?.classList.toggle(
        "show",
        visibleProjects === 0
    );
}


/* =========================================================
   PROJECT FILTER BUTTONS
========================================================= */

projectFilters.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                projectFilters.forEach(
                    filterButton => {

                        filterButton
                            .classList
                            .remove("active");
                    }
                );


                button.classList.add(
                    "active"
                );


                activeProjectFilter =
                    button.dataset.filter ||
                    "all";


                filterProjects();
            }
        );
    }
);


/* =========================================================
   PROJECT SEARCH
========================================================= */

projectSearch?.addEventListener(
    "input",
    filterProjects
);


/* =========================================================
   PROJECT SORT
========================================================= */

projectSort?.addEventListener(
    "change",
    () => {

        if (!projectsGrid) {
            return;
        }


        let sortedCards =
            [...projectCards];


        if (
            projectSort.value === "az"
        ) {

            sortedCards.sort(
                (a, b) => {

                    const titleA =
                        a.dataset.title ||
                        "";

                    const titleB =
                        b.dataset.title ||
                        "";

                    return titleA.localeCompare(
                        titleB
                    );
                }
            );
        }


        else if (
            projectSort.value === "za"
        ) {

            sortedCards.sort(
                (a, b) => {

                    const titleA =
                        a.dataset.title ||
                        "";

                    const titleB =
                        b.dataset.title ||
                        "";

                    return titleB.localeCompare(
                        titleA
                    );
                }
            );
        }


        else {

            sortedCards =
                [...originalProjectOrder];
        }


        sortedCards.forEach(
            card => {

                projectsGrid.appendChild(
                    card
                );
            }
        );


        filterProjects();
    }
);


/* =========================================================
   CONTACT - COPY EMAIL
========================================================= */

const copyButtons =
    document.querySelectorAll(
        ".copy-contact-btn"
    );


const copyNotification =
    document.getElementById(
        "copyNotification"
    );


copyButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            async () => {

                const value =
                    button.dataset.copy;


                if (!value) {
                    return;
                }


                try {

                    if (
                        navigator.clipboard &&
                        window.isSecureContext
                    ) {

                        await navigator
                            .clipboard
                            .writeText(value);

                    } else {

                        fallbackCopyText(
                            value
                        );
                    }


                    showCopySuccess(
                        button
                    );

                } catch (error) {

                    console.error(
                        "Unable to copy:",
                        error
                    );
                }
            }
        );
    }
);


/* =========================================================
   FALLBACK COPY
========================================================= */

function fallbackCopyText(text) {

    const textarea =
        document.createElement(
            "textarea"
        );


    textarea.value = text;


    textarea.style.position =
        "fixed";

    textarea.style.left =
        "-9999px";


    document.body.appendChild(
        textarea
    );


    textarea.focus();

    textarea.select();


    document.execCommand(
        "copy"
    );


    textarea.remove();
}


/* =========================================================
   COPY SUCCESS
========================================================= */

function showCopySuccess(button) {

    const icon =
        button.querySelector("i");


    if (icon) {

        icon.className =
            "fa-solid fa-check";
    }


    copyNotification
        ?.classList
        .add("show");


    setTimeout(
        () => {

            if (icon) {

                icon.className =
                    "fa-regular fa-copy";
            }


            copyNotification
                ?.classList
                .remove("show");

        },
        2200
    );
}


/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById(
        "contactForm"
    );


const contactFormStatus =
    document.getElementById(
        "contactFormStatus"
    );


const contactSubmitBtn =
    document.getElementById(
        "contactSubmitBtn"
    );


function showContactStatus(
    message,
    type
) {

    if (!contactFormStatus) {
        return;
    }


    contactFormStatus.textContent =
        message;


    contactFormStatus.className =
        `contact-form-status ${type}`;


    setTimeout(
        () => {

            contactFormStatus.className =
                "contact-form-status";

            contactFormStatus.textContent =
                "";

        },
        5000
    );
}


/* =========================================================
   CONTACT EMAIL VALIDATION
========================================================= */

function isValidEmail(email) {

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    return emailPattern.test(
        email
    );
}


/* =========================================================
   CONTACT SUBMISSION
========================================================= */

contactForm?.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const fullName =
            document.getElementById(
                "fullName"
            )?.value
                .trim() ||
            "";


        const email =
            document.getElementById(
                "email"
            )?.value
                .trim() ||
            "";


        const subject =
            document.getElementById(
                "subject"
            )?.value
                .trim() ||
            "";


        const message =
            document.getElementById(
                "message"
            )?.value
                .trim() ||
            "";


        /* -----------------------------------------
           CHECK EMPTY FIELDS
        ----------------------------------------- */

        if (
            !fullName ||
            !email ||
            !subject ||
            !message
        ) {

            showContactStatus(
                "Please complete all required fields.",
                "error"
            );

            return;
        }


        /* -----------------------------------------
           CHECK EMAIL
        ----------------------------------------- */

        if (!isValidEmail(email)) {

            showContactStatus(
                "Please enter a valid email address.",
                "error"
            );

            return;
        }


        /* -----------------------------------------
           PREPARE EMAIL
        ----------------------------------------- */

        const destinationEmail =
            "mulaulinetshamutshedzi@gmail.com";


        const emailSubject =
            encodeURIComponent(
                `${subject} - Portfolio Contact`
            );


        const emailBody =
            encodeURIComponent(
`Hello Netshamutshedzi,

My name is ${fullName}.

${message}

Contact Information
-------------------
Name: ${fullName}
Email: ${email}

Sent from your portfolio website.`
            );


        /* -----------------------------------------
           BUTTON FEEDBACK
        ----------------------------------------- */

        if (contactSubmitBtn) {

            contactSubmitBtn.disabled =
                true;


            const originalHTML =
                contactSubmitBtn.innerHTML;


            contactSubmitBtn.innerHTML =
                `
                <span>
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Opening Email
                </span>

                <i class="fa-solid fa-arrow-right"></i>
                `;


            setTimeout(
                () => {

                    contactSubmitBtn
                        .disabled =
                        false;


                    contactSubmitBtn
                        .innerHTML =
                        originalHTML;

                },
                2500
            );
        }


        showContactStatus(
            "Opening your email application...",
            "success"
        );


        /* -----------------------------------------
           OPEN EMAIL CLIENT
        ----------------------------------------- */

        window.location.href =
            `mailto:${destinationEmail}?subject=${emailSubject}&body=${emailBody}`;
    }
);


/* =========================================================
   ESC KEY - CLOSE MOBILE SIDEBAR
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeSidebar();
        }
    }
);