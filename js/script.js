// 공용 입력 처리 함수
function handleInput(lane) {
  if (!gameActive) return;

  const judgeLine = $("#game-container").height() - 80;
  let hit = false;

  $(".note").each(function () {
    const $note = $(this);
    if ($note.data("lane") !== lane) return;

    const notePos = $note.position().top + 25;
    if (Math.abs(notePos - judgeLine) < 50) {
      $note.stop(true, true).remove();
      score++;
      $("#score").text(score);

      성공함수(lane);

      $(".key").eq(lane).addClass("perfect");
      setTimeout(() => $(".key").eq(lane).removeClass("perfect"), 300);

      hit = true;
      return false;
    }
  });

  $(".key").eq(lane).addClass("passed");
  setTimeout(() => $(".key").eq(lane).removeClass("passed"), 100);
}

// 키보드 입력
$(document).keydown(function (e) {
  const key = e.key.toLowerCase();
  if (!keyMap.hasOwnProperty(key)) return;
  handleInput(keyMap[key]);
});

// 마우스/터치/펜 입력 (pointerdown으로 통합)
$(".key")
  .off(".input")
  .on("pointerdown.input", function (e) {
    e.preventDefault(); // 더블탭 확대 방지
    const lane = +$(this).data("lane");
    handleInput(lane);
  });
