let id = -1;
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  let data = {
    date: document.getElementById("date").value,
    task: document.getElementById("task").value,
  };

  let check = document.getElementById("create").value;

  if (check == "submit") {
    fetch("http://localhost:3000/data", {
      method: "POST",
      headers: { "content-type": "application/JSON" },
      body: JSON.stringify(data),
    });
  } else {
    fetch(`http://localhost:3000/data/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/JSON" },
      body: JSON.stringify(data),
    });
  }
});

const display = (data) => {
  data.map((item) => {
    let date = document.createElement("h2");
    date.innerHTML = item.date;
    let task = document.createElement("h3");
    task.innerHTML = item.task;
    let btn1 = document.createElement("button");
    btn1.innerHTML = "Pending";
    btn1.addEventListener("click", () => {
      if (btn1.innerHTML == "Done") {
        btn1.innerHTML = "Pending";
      } else {
        btn1.innerHTML = "Done";
      }
    });
    let btn2 = document.createElement("button");
    btn2.innerHTML = "Edit";
    btn2.addEventListener("click", () => {
      document.getElementById("date").value = item.date;
      document.getElementById("task").value = item.task;
      document.getElementById("create").value = "Update";
      id = item.id;
    });
    let div = document.createElement("div");
    div.append(date, task, btn1, btn2);
    document.getElementById("ui").append(div);
  });
};

fetch("http://localhost:3000/data")
  .then((res) => res.json())
  .then((res) => display(res));
