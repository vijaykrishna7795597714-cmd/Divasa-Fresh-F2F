document.getElementById("enquiryForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = Object.fromEntries(new FormData(form));

  const status = document.getElementById("status");
  status.textContent = "Submitting...";

  const response = await fetch("/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  status.textContent = result.message;
  form.reset();
});
