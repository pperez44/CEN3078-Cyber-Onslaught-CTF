const expectedFlags = {
  "plain-sight": "CTF{plain_sight}",
  logo: "flag(cyber)",
  solarflare: "ctf(h3eader_hunt3r_2026)",
};

function getAcceptedAnswers(flagValue) {
  const accepted = new Set();
  const normalized = (flagValue || "").trim().toLowerCase();

  if (!normalized) {
    return accepted;
  }

  accepted.add(normalized);

  const innerMatch = normalized.match(/[({]([^)}]+)[)}]/);
  if (innerMatch && innerMatch[1]) {
    accepted.add(innerMatch[1].trim().toLowerCase());
  }

  return accepted;
}

const forms = document.querySelectorAll(".ctf-form");

forms.forEach((form) => {
  const challenge = form.dataset.challenge;
  const feedback = form.querySelector(".feedback");
  const input = form.querySelector("input[name='flag']");

  if (!challenge || !feedback || !input) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const userFlag = input.value.trim().toLowerCase();
    const expected = expectedFlags[challenge];
    const accepted = getAcceptedAnswers(expected);

    if (userFlag && accepted.has(userFlag)) {
      feedback.textContent = "Correct";
      feedback.classList.remove("bad");
      feedback.classList.add("ok");
      return;
    }

    feedback.textContent = "Incorrect";
    feedback.classList.remove("ok");
    feedback.classList.add("bad");
  });
});
