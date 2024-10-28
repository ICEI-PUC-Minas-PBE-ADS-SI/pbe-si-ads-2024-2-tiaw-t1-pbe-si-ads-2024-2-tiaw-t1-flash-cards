// Carrega as informações de perfil do localStorage ao abrir a página principal
window.onload = function() {
    const savedName = localStorage.getItem("profileName");
    const savedBio = localStorage.getItem("profileBio");
    const savedImage = localStorage.getItem("profileImage");

    if (savedName) {
        document.getElementById("profileName").textContent = savedName;
    }
    if (savedBio) {
        document.getElementById("profileBio").textContent = savedBio;
    }
    if (savedImage) {
        document.getElementById("profileImage").src = savedImage;
    } else {
        document.getElementById("profileImage").src = "https://via.placeholder.com/150";
    }
};
