(function () {
  var $ = function (id) {
    return document.getElementById(id);
  };
  // The shy "No" button
  var no = $("no"),
    yes = $("yes"),
    hint = $("hint"),
    tries = 0;
  var lines = [
    "Are you sure? 🥺",
    "Try again?",
    "The button is shy, too.",
    "Hmm, it keeps slipping away…",
    "Maybe the other button?",
    "Last chance, I promise 🙈",
  ];

  function dodge(e) {
    if (e && e.preventDefault) e.preventDefault();
    tries++;
    var w = no.offsetWidth,
      h = no.offsetHeight;
    var vw = document.documentElement.clientWidth,
      vh = window.innerHeight;
    if (no.parentNode !== document.body) document.body.appendChild(no);
    no.classList.add("run");
    no.style.left = 12 + Math.random() * Math.max(0, vw - w - 24) + "px";
    no.style.top = 56 + Math.random() * Math.max(0, vh - h - 100) + "px";
    hint.textContent = lines[Math.min(tries - 1, lines.length - 1)];
    var maxScale = vw < 480 ? 1.25 : 1.8;
    yes.style.transform = "scale(" + Math.min(1 + tries * 0.1, maxScale) + ")";
    yes.style.margin = (vw < 480 ? tries : tries * 3) + "px";
    if (tries >= 6) {
      no.style.display = "none";
      hint.textContent = "Okay, only one button left 💙";
    }
  }
  no.addEventListener("pointerenter", function (e) {
    if (e.pointerType === "mouse") dodge(e);
  });
  no.addEventListener("pointerdown", dodge);
  no.addEventListener("focus", function () {
    if (tries === 0) dodge();
  });

  // "Yes" celebration
  yes.addEventListener("click", function () {
    $("card").classList.add("yes");
    no.style.display = "none";
    var emojis = ["💙", "💎", "🩵", "✨", "🦋", "💫"],
      n = 0;
    var timer = setInterval(function () {
      var s = document.createElement("span");
      s.className = "heart";
      s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      s.style.left = Math.random() * 100 + "vw";
      s.style.fontSize = 18 + Math.random() * 22 + "px";
      s.style.animationDuration = 2.5 + Math.random() * 2.5 + "s";
      document.body.appendChild(s);
      setTimeout(function () {
        s.remove();
      }, 5500);
      if (++n > 70) clearInterval(timer);
    }, 70);
  });
})();
