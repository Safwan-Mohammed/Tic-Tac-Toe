var player1 = "";
var player2 = "";
let track = 0;
let flag = 0;
let match = "";
let win1 = 0;
let win2 = 0;
let draw = 0;
let winner = "";
index = [0, 0, 0];

const choice = document.getElementsByClassName("option");
for (i = 0; i < choice.length; i++) {
  choice[i].addEventListener("click", (event) => {
    let q = event.target.id;
    if (q == "X") {
      player1 = q;
      player2 = "O";
    } else if (q == "O") {
      player1 = q;
      player2 = "X";
    } else {
      alert("Some Error Occured");
    }
    window.location.href = "index3.html?id=" + q;
  });
}

const data = document.querySelectorAll("td");

addListeners();

function handleClick(event) {
  let param = new URLSearchParams(window.location.search);
  let id = param.get("id");
  if (flag == 0) {
    if (track == 0) {
      player1 = id;
      if (player1 == "X") {
        player2 = "O";
      } else {
        player2 = "X";
      }
    }
  }
  if (track % 2 == 0) {
    if (player1 == "X") {
      event.target.style.color = "red";
    } else {
      event.target.style.color = "rgb(50, 111, 235)";
    }
    event.target.innerHTML = player1;
    ++track;
    check_match();
    this.removeEventListener("click", handleClick);
  } else {
    if (player2 == "X") {
      event.target.style.color = "red";
    } else {
      event.target.style.color = "rgb(50, 111, 235)";
    }
    event.target.innerHTML = player2;
    ++track;
    check_match();
    this.removeEventListener("click", handleClick);
  }
}

function check_match() {
  if (track > 4) {
    for (i = 0; i < data.length; i++) {
      if (data[i].innerHTML.length != 0) {
        let char = data[i].innerHTML;
        if (i + 1 < 9 && data[i + 1].innerHTML == char) {
          if (i + 2 < 9 && data[i + 2].innerHTML == char) {
            if (i % 3 == 0 && (i + 1) % 3 == 1 && (i + 2) % 3 == 2) {
              match = 1;
              index[0] = i;
              index[1] = i + 1;
              index[2] = i + 2;
            }
          }
        } else if (i + 3 < 9 && data[i + 3].innerHTML == char) {
          if (i + 6 < 9 && data[i + 6].innerHTML == char) {
            match = 1;
            index[0] = i;
            index[1] = i + 3;
            index[2] = i + 6;
          }
        } else if (i == 0 && i + 4 < 9 && data[i + 4].innerHTML == char) {
          if (i + 8 < 9 && data[i + 8].innerHTML == char) {
            match = 1;
            index[0] = i;
            index[1] = i + 4;
            index[2] = i + 8;
          }
        } else if (i == 2 && i + 2 < 9 && data[i + 2].innerHTML == char) {
          if (i + 4 < 9 && data[i + 4].innerHTML == char) {
            match = 1;
            index[0] = i;
            index[1] = i + 2;
            index[2] = i + 4;
          }
        }
      }
    }
  }
  if (match == 1 || track == 9) {
    data.forEach((element) => {
      element.removeEventListener("click", handleClick);
    });
  }
  if (track == 9) {
    match = 2;
  }
  if (match == 1) {
    for (i = 0; i < data.length; i++) {
      if (i == index[0] || i == index[1] || i == index[2]) {
        data[i].classList.add("blinking-animation");
      } else {
        data[i].style.opacity = "0.4";
      }
    }
    if (player1 == data[index[0]].innerHTML) {
      win1++;
      document.getElementById("player1").innerHTML = "Player 1 - " + win1;
      winner = "Player 1";
    } else {
      win2++;
      document.getElementById("player2").innerHTML = "Player 2 - " + win2;
      winner = "Player 2";
    }
    setTimeout(() => {
      data.forEach((element) => {
        element.style.opacity = "1";
        element.classList.remove("blinking-animation");
        popup_box();
      });
    }, 1750);
  } else if (match == 2) {
    draw++;
    document.getElementById("draw").innerHTML = "Draw - " + draw;
    popup_box();
  }
}

function popup_box() {
  document.getElementsByClassName("popup")[0].style.animation =
    "fade_in 1.25s linear forwards";
  if (match == 1) {
    document.getElementById("message").innerHTML =
      winner + " wins!!<br>Do you wish to continue or start a new game ?";
  } else if (match == 2) {
    document.getElementById("message").innerHTML =
      "Its a Draw!!<br>Do you wish to continue or start a new game ?";
  }
  let btn1 = document.getElementById("btn1");
  let btn2 = document.getElementById("btn2");
  btn1.innerHTML = "New Game";
  btn2.innerHTML = "Continue";
  btn1.addEventListener("click", button_clicked);
  btn2.addEventListener("click", button_clicked);
}

function button_clicked() {
  let id = this.id;
  let btn1 = document.getElementById("btn1");
  let btn2 = document.getElementById("btn2");
  if (id == "btn1") {
    window.location.href = "index1.html";
    btn1.removeEventListener("click", button_clicked);
    btn2.removeEventListener("click", button_clicked);
  } else {
    btn1.removeEventListener("click", button_clicked);
    btn2.removeEventListener("click", button_clicked);
    track = 0;
    flag = 0;
    match = "";
    winner = "";
    index = [0, 0, 0];
    data.forEach((element) => {
      element.innerHTML = "";
    });
    document.getElementsByClassName("popup")[0].style.animation =
      "fade_out 1s linear forwards";
    addListeners();
  }
}

function addListeners() {
  for (j = 0; j < data.length; j++) {
    data[j].addEventListener("click", handleClick);
  }
}
