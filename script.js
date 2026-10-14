const frame = document.querySelector(".hero-frame");
const photo = document.querySelector(".hero-photo");
const vehicleGrid = document.querySelector(".vehicle-grid");

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

let dragStartX = 0;
let dragStartScrollLeft = 0;
let activePointerId = null;
let isDragging = false;
let suppressClick = false;

vehicleGrid.addEventListener("pointerdown", (event) => {
  if (event.pointerType !== "mouse" || event.button !== 0) return;

  dragStartX = event.clientX;
  dragStartScrollLeft = vehicleGrid.scrollLeft;
  activePointerId = event.pointerId;
  isDragging = false;
  suppressClick = false;
});

document.addEventListener("pointermove", (event) => {
  if (event.pointerId !== activePointerId) return;

  const distance = event.clientX - dragStartX;
  if (!isDragging && Math.abs(distance) > 5) {
    isDragging = true;
    vehicleGrid.classList.add("is-dragging");
  }

  if (isDragging) {
    event.preventDefault();
    vehicleGrid.scrollLeft = dragStartScrollLeft - distance;
  }
});

const stopDragging = (event) => {
  if (event.pointerId !== activePointerId) return;

  suppressClick = isDragging;
  isDragging = false;
  activePointerId = null;
  vehicleGrid.classList.remove("is-dragging");
};

document.addEventListener("pointerup", stopDragging);
document.addEventListener("pointercancel", stopDragging);

vehicleGrid.addEventListener(
  "click",
  (event) => {
    if (!suppressClick) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    suppressClick = false;
  },
  true,
);
