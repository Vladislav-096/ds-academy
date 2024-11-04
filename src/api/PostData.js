export const postData = async (data) => {
  return fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => {
      console.log("postData response", res);
      return res;
    })
    .catch((error) => {
      console.log("postData error: ", error);
      throw error;
    });
};
