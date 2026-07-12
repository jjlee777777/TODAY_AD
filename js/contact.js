const form = document.querySelector(".contact-form form");

if (form) { 

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
}

// 메인 배너 슬라이드
const slides = document.querySelectorAll(".slide");

if (slides.length > 0) {
  let current = 0;

  setInterval(function () {
    slides[current].classList.remove("active");

    current++;

    if (current >= slides.length) {
      current = 0;
    }

    slides[current].classList.add("active");
  }, 5000);
}

// TODAY AD 팝업
const todayPopup = document.getElementById("todayPopup");
const popupClose = document.getElementById("popupClose");
const todayCloseCheck = document.getElementById("todayCloseCheck");

if (todayPopup && popupClose && todayCloseCheck) {

  // 오늘 하루 보지 않기를 선택한 날짜
  const savedCloseDate = localStorage.getItem("todayPopupCloseDate");

  // 오늘 날짜
  const currentDate = new Date().toLocaleDateString("ko-KR");

  // 오늘 이미 닫았다면 팝업 숨기기
  if (savedCloseDate === currentDate) {
    todayPopup.classList.add("popup-hidden");
  }

  // X 버튼 클릭
  popupClose.addEventListener("click", () => {

    // 오늘 하루 보지 않기 체크 여부
    if (todayCloseCheck.checked) {
      localStorage.setItem("todayPopupCloseDate", currentDate);
    }

    todayPopup.classList.add("popup-hidden");
  });

  // 어두운 배경 클릭 시 닫기
  todayPopup.addEventListener("click", (event) => {

    if (event.target === todayPopup) {
      todayPopup.classList.add("popup-hidden");
    }

  });
}