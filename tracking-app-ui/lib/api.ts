const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer test-token",
};

/**
 * Fetch all work items from the API.
 * @param {Object} params - Optional parameters to filter the results.
 * @param {string} params.status - Filter by status.
 * @param {string} params.sortBy - Sort by field.
 * @param {string} params.order - Sort order.
 * @returns {Promise<any>} Resolves with the response data from the API.
 */
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
  await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/delete-item/${id}`, {
    method: "DELETE",
    headers,
  });
}
