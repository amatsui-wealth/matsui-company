const header = document.querySelector("#header");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#global-nav");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuButton.classList.toggle("active", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  document.body.style.overflow = isOpen ? "hidden" : "";
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element, index) => {
  element.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
  observer.observe(element);
});

const form = document.querySelector("#contact-form");
const formMessage = form.querySelector(".form-message");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.classList.remove("error");

  if (!form.checkValidity()) {
    formMessage.textContent = "必須項目を正しく入力してください。";
    formMessage.classList.add("error");
    form.reportValidity();
    return;
  }

  formMessage.textContent = "入力を受け付けました。（デモのため実際には送信されません）";
  form.reset();
});

document.querySelector("#year").textContent = new Date().getFullYear();

