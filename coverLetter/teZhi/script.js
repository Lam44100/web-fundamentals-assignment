// Load biodata into HTML
document.getElementById("name").textContent = bioData.name;
document.getElementById("education").textContent = bioData.education;

document.getElementById("bio1").textContent = bioData.paragraphs[0];
document.getElementById("bio2").textContent = bioData.paragraphs[1];
document.getElementById("bio3").textContent = bioData.paragraphs[2];

document.getElementById("instagram").href = bioData.contact.instagram.link;
document.getElementById("igText").textContent = bioData.contact.instagram.username;

document.getElementById("email").href = `mailto:${bioData.contact.email}`;
document.getElementById("emailText").textContent = bioData.contact.email;

// Interactive glow effect
const card = document.getElementById("card");

card.addEventListener("mousemove", (e) => {
    const x = e.offsetX;
    const y = e.offsetY;
    card.style.boxShadow = `${x/20}px ${y/20}px 40px rgba(255,255,255,0.08)`;
});

card.addEventListener("mouseleave", () => {
    card.style.boxShadow = "0 0 30px rgba(0,0,0,0.8)";
});
