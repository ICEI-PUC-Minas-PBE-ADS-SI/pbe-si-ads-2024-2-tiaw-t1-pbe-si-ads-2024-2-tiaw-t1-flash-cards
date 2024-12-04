const profileImage = document.getElementById("profileImage");
const fileInput = document.getElementById("fileInput");
const nameInput = document.getElementById("nameInput");
const bioInput = document.getElementById("bioInput");
const removeImageButton = document.getElementById("removeImageButton");

// URL da imagem padrão
const defaultImage = "https://via.placeholder.com/150";

// Carrega os dados salvos no localStorage ao abrir a página de edição
window.onload = function() {
    const savedName = localStorage.getItem("profileName");
    const savedBio = localStorage.getItem("profileBio");
    const savedImage = localStorage.getItem("profileImage");

    if (savedName) {
        nameInput.value = savedName;
    }
    if (savedBio) {
        bioInput.value = savedBio;
    }
    if (savedImage) {
        profileImage.src = savedImage;
        if (savedImage !== defaultImage) {
            removeImageButton.style.display = "block";
        }
    } else {
        profileImage.src = defaultImage;
    }
};

// Atualiza a imagem de perfil ao selecionar uma nova foto
fileInput.addEventListener("change", function() {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            profileImage.src = e.target.result;
            localStorage.setItem("profileImage", e.target.result);
            removeImageButton.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
});

// Função para remover a foto de perfil e voltar para a imagem padrão
removeImageButton.addEventListener("click", function() {
    profileImage.src = defaultImage;
    localStorage.setItem("profileImage", defaultImage);
    removeImageButton.style.display = "none";
});

// Função para salvar o nome e a biografia no localStorage
function saveProfile() {
    const name = nameInput.value;
    const bio = bioInput.value;

    localStorage.setItem("profileName", name);
    localStorage.setItem("profileBio", bio);

    alert("Perfil atualizado com sucesso!");
    window.location.href = 
    window.location.hostname.includes("github.io")
    ? "https://icei-puc-minas-pbe-ads-si.github.io/pbe-si-ads-2024-2-tiaw-t1-pbe-si-ads-2024-2-tiaw-t1-flash-cards/codigo/"
    : "perfil.html"; // Redireciona de volta à página de perfil
}
