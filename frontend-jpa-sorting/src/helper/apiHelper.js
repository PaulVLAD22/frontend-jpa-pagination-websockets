import React from "react";
const apiUrl = "http://localhost:8080";

export class ApiError extends Error {
  constructor(statusCode, message) {
    console.log(statusCode);
    console.log(message);
    super(`The server responded with a code of ${statusCode}.
    ${message}`);
  }
}

function handleServerResponse(res) {
  if (!res.ok) {
    throw new ApiError(res.status);
  }
  return res.json();
}

const headers = {
  "Content-type": "application/json",
};

//TODO :: maybe componenta pageContext care tine date

export function configureApi(endpoint) {
  function retrieve(search = "", options = {}) {
    if (search) {
      search = `?${search}`;
    }
    return fetch(`${apiUrl}/${endpoint}${search}`, options).then(
      handleServerResponse
    );
  }

  function create(body, options = {}) {
    return fetch(`${apiUrl}/${endpoint}`, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...headers,
        ...options.headers,
      },
    }).then(handleServerResponse);
  }

  function update(id, body, options = {}) {
    return fetch(`${apiUrl}/${endpoint}/${id}`, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body),
      headers: {
        ...headers,
        ...options.headers,
      },
    }).then(handleServerResponse);
  }

  function remove(id, options = {}) {
    return fetch(`${apiUrl}/${endpoint}/${id}`, {
      ...options,
      method: "DELETE",
    }).then(handleServerResponse);
  }

  return {
    create,
    retrieve,
    update,
    remove,
  };
}
