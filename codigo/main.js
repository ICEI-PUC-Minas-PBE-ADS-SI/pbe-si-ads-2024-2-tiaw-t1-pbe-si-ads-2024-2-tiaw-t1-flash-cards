export async function initializeLocalStorage() {
  try {
    const storedData = localStorage.getItem("appData");
    if (storedData) {
      console.log("Dados já presentes no localStorage.");
      return;
    }

    const BASE_PATH = window.location.hostname.includes("github.io")
      ? "https://icei-puc-minas-pbe-ads-si.github.io/pbe-si-ads-2024-2-tiaw-t1-pbe-si-ads-2024-2-tiaw-t1-flash-cards/codigo/"
      : "";
    const response = await fetch(`${BASE_PATH}/db/db.json`);

    if (!response.ok) {
      throw new Error(`Erro ao carregar db.json: ${response.statusText}`);
    }

    const dbData = await response.json();

    const appData = {
      users: dbData.users || [],
      decks: dbData.decks || [],
      flashcards: dbData.flashcards || [],
      answers: dbData.answers || [],
      perfil: dbData.perfil || [],
      botoes: dbData.botoes || [],
    };

    localStorage.setItem("appData", JSON.stringify(appData));
    console.log("Dados carregados com sucesso no localStorage.");
  } catch (error) {
    console.error("Erro ao inicializar o localStorage:", error);
  }
}

export function authLogin() {
  const loggedUserId = localStorage.getItem("loggedUserId");

  if (!loggedUserId) {
    console.warn(
      "Nenhum usuário está logado. Redirecionando para a página de login."
    );
    window.location.href = window.location.hostname.includes("github.io")
    ? "https://icei-puc-minas-pbe-ads-si.github.io/pbe-si-ads-2024-2-tiaw-t1-pbe-si-ads-2024-2-tiaw-t1-flash-cards/codigo/"
    : "modulos/login/login.html";
  } else {
    console.log("Usuário logado:", loggedUserId);
  }
}
