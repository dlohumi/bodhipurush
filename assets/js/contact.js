function selectChip(el) {
  document.querySelectorAll(".subject-chip").forEach((chip) => chip.classList.remove("selected"));
  el.classList.add("selected");
}

function submitForm() {
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  if (!email || !message) {
    alert("Please fill in your email and message.");
    return;
  }
  document.getElementById("formWrap").style.display = "none";
  document.getElementById("formSuccess").style.display = "block";
}
