export default class Gnome {
  constructor(imageSrc, rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.onClick = null;
    this.element = this.createGnomeElement(imageSrc);
  }

  createGnomeElement(imageSrc) {
    const img = document.createElement("img");
    img.src = imageSrc;
    img.className = "gnome";
    img.alt = "Gnome";

    img.addEventListener("click", (e) => {
      e.stopPropagation();
      if (this.onClick) this.onClick();
    });

    return img;
  }
}
