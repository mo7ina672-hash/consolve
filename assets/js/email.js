const EMAILJS_PUBLIC_KEY = "rUiPWRkwl8M4cixXB";
const EMAILJS_SERVICE_ID = "service_mfphdbo";
const EMAILJS_TEMPLATE_ID = "template_sxhvvst";

(function () {
  if (typeof emailjs !== "undefined") {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  } else {
    console.error("EmailJS SDK not loaded! Add this to your HTML head:");
    console.error(
      '<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>',
    );
  }
})();

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = "جاري الإرسال...";
    formMessage.style.display = "none";

    const fullname = contactForm.querySelector('[name="fullname"]').value;
    const company = contactForm.querySelector('[name="company"]').value;
    const jobtitle = contactForm.querySelector('[name="jobtitle"]').value;
    const phone = contactForm.querySelector('[name="phone"]').value;
    const email = contactForm.querySelector('[name="email"]').value;
    const userMessage = contactForm.querySelector('[name="message"]').value;

    const templateParams = {
      title: fullname + " - " + company,
      name: fullname,
      email: email,
      fullname: fullname,
      company: company,
      jobtitle: jobtitle,
      phone: phone,
      message: userMessage,
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        formMessage.style.display = "block";
        formMessage.style.backgroundColor = "#d4edda";
        formMessage.style.color = "#155724";
        formMessage.style.border = "1px solid #c3e6cb";
        formMessage.textContent = "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.";
        contactForm.reset();
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        formMessage.style.display = "block";
        formMessage.style.backgroundColor = "#f8d7da";
        formMessage.style.color = "#721c24";
        formMessage.style.border = "1px solid #f5c6cb";
        formMessage.textContent =
          "حدث خطأ في الإرسال. الرجاء المحاولة مرة أخرى.";
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      });
  });
}
