// ATENÇÃO: essa é uma proteção simples, só do lado do navegador.
// Ela impede acesso casual (quem não sabe a senha), mas NÃO é segurança de verdade:
// qualquer pessoa que abrir o código-fonte (Ctrl+U) consegue ver a senha.
// Pra proteção real, no futuro isso precisa virar um login com backend.

(function () {
  // Troque essa senha para a que você quiser usar:
  var ADMIN_PASSWORD = "troque-esta-senha";

  function isLoggedIn() {
    return sessionStorage.getItem("admin_logged_in") === "true";
  }

  // Chame no topo de toda página do admin que precisa de proteção
  function requireLogin(loginPagePath) {
    if (!isLoggedIn()) {
      window.location.href = loginPagePath;
    }
  }

  // Chame no submit do formulário de login
  function attemptLogin(password, redirectPath) {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_logged_in", "true");
      window.location.href = redirectPath;
      return true;
    }
    return false;
  }

  function logout(loginPagePath) {
    sessionStorage.removeItem("admin_logged_in");
    window.location.href = loginPagePath;
  }

  window.AdminAuth = {
    isLoggedIn: isLoggedIn,
    requireLogin: requireLogin,
    attemptLogin: attemptLogin,
    logout: logout
  };
})();
