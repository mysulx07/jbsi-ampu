// @ts-nocheck
export default async function (method, url, data = []) {
  let option = {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  };

  if ((method = "GET")) {
    option = {
      method,
    };
  }

  try {
    const response = await fetch(url, option);
    let data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
