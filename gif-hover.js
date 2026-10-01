// GIFs can't be paused, so each one gets a canvas laid over it showing its
// first frame. Hovering hides the canvas and restarts the gif from the top.
document.querySelectorAll('img[src$=".gif"]').forEach((img) => {
  const wrap = document.createElement("span");
  wrap.className = "gif-hover";
  img.replaceWith(wrap);
  wrap.append(img);

  const canvas = document.createElement("canvas");
  wrap.append(canvas);

  const drawFirstFrame = () => {
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    canvas.getContext("2d").drawImage(img, 0, 0);
  };
  if (img.complete && img.naturalWidth) drawFirstFrame();
  else img.addEventListener("load", drawFirstFrame, { once: true });

  // hovering anywhere on an about tile counts, not just the image
  const target = wrap.closest(".about-item") || wrap;
  const src = img.src;
  target.addEventListener("mouseenter", () => {
    img.src = src; // restart from the first frame
    wrap.classList.add("playing");
  });
  target.addEventListener("mouseleave", () => {
    wrap.classList.remove("playing");
  });
});
