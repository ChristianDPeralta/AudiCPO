const frame = document.querySelector(".hero-frame");
const photo = document.querySelector(".hero-photo");

photo.addEventListener("error", () => {
  frame.classList.add("image-fallback");
});

if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  frame.addEventListener("pointermove", (event) => {
    const bounds = frame.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    photo.style.setProperty("--photo-x", `${x * -8}px`);
    photo.style.setProperty("--photo-y", `${y * -6}px`);
  });

  frame.addEventListener("pointerleave", () => {
    photo.style.setProperty("--photo-x", "0");
    photo.style.setProperty("--photo-y", "0");
  });
}
