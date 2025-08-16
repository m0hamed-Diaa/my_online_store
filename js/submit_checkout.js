const scriptUrl = "https://script.google.com/macros/s/AKfycbzJSzH_49lgbquPt7RII5gCzsDoXLC3cNpMfQw0WA1IV9yz49icevVg60Es1aBy0GqH/exec";

let form = document.querySelector("#form_contact");

function showMessage(text, type = "success") {
    let msg = document.createElement("div");
    msg.textContent = text;
    msg.style.position = "fixed";
    msg.style.top = "20px";
    msg.style.left = "50%";
    msg.style.transform = "translateX(-50%)";
    msg.style.background = type === "success" ? "#4caf50" : "#f44336";
    msg.style.color = "#fff";
    msg.style.padding = "10px 20px";
    msg.style.borderRadius = "8px";
    msg.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
    msg.style.zIndex = "999999999";
    msg.style.fontSize = "16px";
    document.body.appendChild(msg);
    setTimeout(() => {
        msg.remove();
    }, 3000);
}
form.addEventListener("submit", (e) => {
    e.preventDefault();

    fetch(scriptUrl, {
        method: "POST",
        body: new FormData(form),
    })
    .then((res) => res.text())
    .then((text) => {
        form.reset();
        localStorage.removeItem("cart");
        showMessage("✅ تم إرسال بياناتك بنجاح", "success");

        // إعادة تحميل الصفحة بعد ثانيتين
        setTimeout(() => {
            window.location.reload();
            window.location.href = "index.html";
        }, 2000);
    })
    .catch((error) => {
        console.error("Error!", error.message);
        showMessage("❌ حدث خطأ أثناء الإرسال", "unsuccess");
    });
});
// https://docs.google.com/spreadsheets/d/1thuzJzq8UENMrLL-fWCquF8wioeM5CHRP9pUcRdiBnU/edit?gid=0#gid=0