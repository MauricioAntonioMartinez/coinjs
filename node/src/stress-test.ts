import axios from "axios";

const makeStress = async () => {
  const res = await axios.post("http://localhost:8080/login", {
    username: "mcuve",
    password: "maotrix1",
  });
  const headers = res.headers;
  console.log(headers["set-cookie"]);

  for (let i = 0; i < 400; i++) {
    const url = i % 2 === 0 ? "withdrawal" : "mine";
    try {
      await axios.patch(
        `http://localhost:8080/${url}`,
        {
          amount: i * 30,
        },
        {
          headers: {
            Cookie: headers["set-cookie"] + "; domain=localhost",
          },
        }
      );
    } catch (e) {
      console.log(e.response.data.message);
    }
  }
};

makeStress();
