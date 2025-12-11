const form = document.getElementById("variable-form");
const statusBox = document.getElementById("status");
const errorBox = document.getElementById("error");
const submitBtn = document.getElementById("submit-btn");

function showStatus(message) {
  statusBox.textContent = message;
  statusBox.classList.add("show");
  errorBox.classList.remove("show");
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.add("show");
  statusBox.classList.remove("show");
}

function parseValue(type, rawValue) {
  if (type === "number") {
    return Number(rawValue);
  }
  if (type === "boolean") {
    return rawValue.trim().toLowerCase() === "true";
  }
  if (type === "json") {
    try {
      return JSON.parse(rawValue);
    } catch (error) {
      throw new Error("JSON is invalid. Please provide valid JSON text.");
    }
  }
  return rawValue;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusBox.classList.remove("show");
  errorBox.classList.remove("show");

  const formData = new FormData(form);
  const variableName = formData.get("variableName")?.toString().trim();
  const variableType = formData.get("variableType")?.toString() || "string";
  const variableValue = formData.get("variableValue")?.toString() || "";
  const token = formData.get("token")?.toString().trim();
  const baseUrl = formData.get("baseUrl")?.toString().trim();

  if (!variableName || !variableValue || !token || !baseUrl) {
    showError("All fields are required.");
    return;
  }

  let parsedValue;
  try {
    parsedValue = parseValue(variableType, variableValue);
  } catch (error) {
    showError(error.message);
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Updating…";

  try {
    const response = await fetch(
      `${baseUrl}/v1/variables/${encodeURIComponent(variableName)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: variableName,
          type: variableType,
          value: parsedValue,
        }),
      }
    );

    const responseText = await response.text();
    if (!response.ok) {
      throw new Error(
        `Failed to update variable. Status ${response.status} - ${responseText}`
      );
    }

    showStatus(`Updated "${variableName}" successfully. ${responseText || ""}`);
  } catch (error) {
    showError(error.message || "Unexpected error occurred.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Update Variable";
  }
});
