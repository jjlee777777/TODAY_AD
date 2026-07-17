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

  const now = new Date();

  const currentDate =
    now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    String(now.getDate()).padStart(2, "0");

  // 팝업 닫기
  function closeTodayPopup() {
    if (todayCloseCheck.checked) {
      try {
        localStorage.setItem("todayPopupCloseDate", currentDate);
      } catch (error) {
        console.log("저장 기능을 사용할 수 없습니다.");
      }
    }

    todayPopup.style.display = "none";
  }

  // X 버튼
  popupClose.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    closeTodayPopup();
  });

  // 어두운 바깥 영역 클릭
  todayPopup.addEventListener("click", function (event) {
    if (event.target === todayPopup) {
      closeTodayPopup();
    }
  });

  // 오늘 하루 보지 않기 기록 확인
  try {
    const savedCloseDate =
      localStorage.getItem("todayPopupCloseDate");

    if (savedCloseDate === currentDate) {
      todayPopup.style.display = "none";
    }
  } catch (error) {
    console.log("저장 기록을 확인할 수 없습니다.");
  }
}


// TS 샴푸 MP4 팝업

const tsVideoCard = document.getElementById("tsVideoCard");
const localVideoModal = document.getElementById("localVideoModal");
const localVideoOverlay = document.getElementById("localVideoOverlay");
const localVideoClose = document.getElementById("localVideoClose");
const tsVideo = document.getElementById("tsVideo");

function openLocalVideo() {
  if (!localVideoModal || !tsVideo) return;

  localVideoModal.classList.add("active");
  localVideoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("video-open");

  tsVideo.currentTime = 0;
  tsVideo.play().catch(() => {
    // 모바일 브라우저에서 자동 재생이 차단되면
    // 사용자가 재생 버튼을 직접 누르면 됩니다.
  });
}

function closeLocalVideo() {
  if (!localVideoModal || !tsVideo) return;

  tsVideo.pause();
  tsVideo.currentTime = 0;

  localVideoModal.classList.remove("active");
  localVideoModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("video-open");
}

if (tsVideoCard) {
  tsVideoCard.addEventListener("click", openLocalVideo);

  tsVideoCard.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLocalVideo();
    }
  });
}

if (localVideoClose) {
  localVideoClose.addEventListener("click", closeLocalVideo);
}

if (localVideoOverlay) {
  localVideoOverlay.addEventListener("click", closeLocalVideo);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeLocalVideo();
  }
});
