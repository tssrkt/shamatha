(function ($) {
  "use strict";

  var pageFiles = ["index.html"];
  for (var i = 1; i <= 11; i += 1) {
    pageFiles.push("stage-" + String(i).padStart(2, "0") + ".html");
  }
  pageFiles.push("finish.html");

  function setLanguage(language) {
    var lang = language === "en" ? "en" : "ru";
    $("[data-lang-content]").each(function () {
      $(this).prop("hidden", $(this).data("lang-content") !== lang);
    });
    $("[data-lang]").each(function () {
      var active = $(this).data("lang") === lang;
      $(this).toggleClass("is-active", active).attr("aria-pressed", String(active));
    });
    $("html").attr("lang", lang);
    document.title = $("h1 [data-lang-content='" + lang + "']").text();
    try { localStorage.setItem("shamatha-language", lang); } catch (error) { /* Storage may be disabled. */ }
  }

  $(function () {
    var savedLanguage = "ru";
    try { savedLanguage = localStorage.getItem("shamatha-language") || "ru"; } catch (error) { /* Use RU. */ }
    setLanguage(savedLanguage);

    $("[data-lang]").on("click", function () { setLanguage($(this).data("lang")); });

    var startX = null;
    var startY = null;
    var currentPage = Number($("body").data("page"));

    $(document).on("touchstart", function (event) {
      var touch = event.originalEvent.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    }).on("touchend", function (event) {
      if (startX === null || startY === null) return;
      var touch = event.originalEvent.changedTouches[0];
      var deltaX = touch.clientX - startX;
      var deltaY = touch.clientY - startY;
      startX = startY = null;
      if (Math.abs(deltaX) < 70 || Math.abs(deltaX) < Math.abs(deltaY) * 1.35) return;
      if (deltaX < 0 && currentPage < pageFiles.length - 1) window.location.href = pageFiles[currentPage + 1];
      if (deltaX > 0 && currentPage > 0) window.location.href = pageFiles[currentPage - 1];
    });
  });
}(jQuery));
