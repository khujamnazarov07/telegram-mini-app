// Ishlatish: node split.js  (meanings.js dan meanings/<til>.js fayllarini yaratadi; meanings.js ni tahrirlagach qayta ishga tushiring)
global.window = {}
require("vm").runInThisContext(require("fs").readFileSync(__dirname + "/meanings.js", "utf8"))
var M = window.MEANINGS, L = ["uz", "uz_kr", "ru", "en", "ar", "tr", "id", "zh", "hi", "es"]
require("fs").mkdirSync(__dirname + "/meanings", { recursive: true })
L.forEach(function (l) {
  var arr = M.map(function (m) { return typeof m === "string" ? m : (m[l] || m.en || m.uz || m.ru || "") })
  require("fs").writeFileSync(__dirname + "/meanings/" + l + ".js", "(window.MEANINGS_BY=window.MEANINGS_BY||{})." + l + "=" + JSON.stringify(arr) + "\n")
})
console.log("ok")
