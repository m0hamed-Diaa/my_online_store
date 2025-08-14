window.addEventListener("storage", function (event) {
    if (event.key === "cart") {
        window.location.reload();
    }
});