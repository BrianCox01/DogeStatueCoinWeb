document.addEventListener("DOMContentLoaded", () => {
    const whoSection = document.querySelector("#who-section");
    const strike2 = document.querySelector(".strike2");
    const strike3 = document.querySelector(".strike3");


    if (whoSection && strike2) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        strike2.classList.add("animate"); // Add the animate class
                        strike3.classList.add("animate2"); // Add the animate class

                        observer.unobserve(whoSection); // Stop observing after adding the class
                    }
                });
            }, {
                threshold: 0.1, // Trigger when 10% of #who-section is visible
            }
        );

        observer.observe(whoSection);
    } else {
        console.error(
            "#who-section or .strike2 not found. Check your HTML structure."
        );
    }
});