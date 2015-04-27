angular.module('templates-app', ['login/login.tpl.html']);

angular.module("login/login.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("login/login.tpl.html",
    "<span id=\"login\">\n" +
    "    This will be the login form.\n" +
    "\n" +
    "</span>");
}]);
