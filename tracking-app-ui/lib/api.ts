const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer test-token",
};

export async function getWorkItems(params?: {
  status?: string;
  sortBy?: string;
  order?: string;
}) {
  const query = new URLSearchParams();
  if (params?.status && params.status !== "all") {
    query.append("status", params.status);
  }

  if (params?.sortBy) {
    query.append("sortBy", params.sortBy);
  }

  if (params?.order) {
    query.append("order", params.order);
  }
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/get-all-items?${query.toString()}`,
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/delete-item/${id}`,
    {
      method: "DELETE",
      headers,
    },
  );
  return res.json();
}
