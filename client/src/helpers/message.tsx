export const message = {
  success(msg: string) {
    this.show(msg, "success");
  },
  error(msg: string) {
    this.show(msg + " !", "error");
  },
  show(msg: string, type: string) {
    const div = document.createElement("div");
    div.innerHTML = msg;
    div.className = `message ${type}`;
    div.style.zIndex = "100";
    const modalContainer = document.getElementById("message")!;
    modalContainer.appendChild(div);

    setTimeout(() => {
      div.classList.add("translate");
    }, 0);

    setTimeout(() => {
      div.classList.remove("translate");
    }, 2000);

    setTimeout(() => {
      modalContainer.innerHTML = "";
    }, 2300);
  },
};
