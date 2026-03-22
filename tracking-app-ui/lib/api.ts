const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer test-token",
};

console.log("base_url", process.env.NEXT_PUBLIC_BASE_API_URL);

export async function getWorkItems() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/get-all-items`,
    {
      headers,
    },
  );
  return res.json();
}

export async function getWorkItem(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/get-item/${id}`,
    {
      headers,
    },
  );
  return res.json();
}

export async function createWorkItem(data: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/create-item`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    },
  );

  return res.json();
}

export async function updateWorkItem(id: string, data: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/edit-item/${id}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(data),
    },
  );

  return res.json();
}

export async function deleteWorkItem(id: string) {
  await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/delete-item}/${id}`, {
    method: "DELETE",
    headers,
  });
}
