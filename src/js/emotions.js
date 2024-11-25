document.addEventListener("DOMContentLoaded", () => {
    const emotions = document.querySelectorAll(".emotion"); // Selecciona todas las emociones

    emotions.forEach(emotion => {
        emotion.addEventListener("click", () => {
            // 1. Elimina la clase "active" de todas las emociones
            emotions.forEach(e => {
                e.src = e.getAttribute("data-normal"); // Restablece la imagen normal
                e.classList.remove("active");         // Quita la clase activa
            });

            // 2. Activa la emoción seleccionada
            emotion.src = emotion.getAttribute("data-active"); // Cambia a la imagen activa
            emotion.classList.add("active");                   // Añade la clase activa
        });
    });
});
