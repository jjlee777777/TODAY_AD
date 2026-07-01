const form = document.querySelector(".contact-form form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(form);

  fetch("https://formspree.io/f/xjgqayrl", {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json"
    }
  })
    .then(function (response) {
      if (response.ok) {
        window.location.href = "success.html";
      } else {
        alert("문의 전송 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    })
    .catch(function () {
      alert("네트워크 오류가 발생했습니다. 다시 시도해 주세요.");
    });
});