export async function register(formData) {
  const rawFormData = Object.fromEntries(formData);

  const url = await getUrl();

  const fetchData = await fetch(`${url}/api/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(rawFormData),
  });

  if (!fetchData.ok) {
    throw new Error("Failed to register");
  }

  const res = await fetchData.json();
  return res;
}
