window.onload = () => {

const container = document.getElementById("techContainer");
if(!container) return;

const techs = document.querySelectorAll(".tech");
let dragged = null;

techs.forEach(el => {
    const w = el.offsetWidth || 80;
    const h = el.offsetHeight || 44;

    el.x = Math.random() * Math.max(container.clientWidth - w, 10);
    el.y = Math.random() * Math.max(container.clientHeight - h, 10);

    el.vx = (Math.random() - 0.5) * 0.5;
    el.vy = (Math.random() - 0.5) * 0.5;

    el.style.left = el.x + "px";
    el.style.top = el.y + "px";

    el.addEventListener("mousedown", () => {
        dragged = el;
        el.classList.add("dragging");
    });

    el.addEventListener("touchstart", () => {
        dragged = el;
        el.classList.add("dragging");
    }, { passive: true });
});

container.addEventListener("mousemove", (e) => {
    if(!dragged) return;
    const rect = container.getBoundingClientRect();
    dragged.x = e.clientX - rect.left - dragged.offsetWidth / 2;
    dragged.y = e.clientY - rect.top - dragged.offsetHeight / 2;
});

container.addEventListener("touchmove", (e) => {
    if(!dragged) return;
    const rect = container.getBoundingClientRect();
    const touch = e.touches[0];
    dragged.x = touch.clientX - rect.left - dragged.offsetWidth / 2;
    dragged.y = touch.clientY - rect.top - dragged.offsetHeight / 2;
}, { passive: true });

window.addEventListener("mouseup", () => {
    if(dragged){
        dragged.classList.remove("dragging");
        dragged = null;
    }
});

window.addEventListener("touchend", () => {
    if(dragged){
        dragged.classList.remove("dragging");
        dragged = null;
    }
});

function animate(){
    techs.forEach(el => {
        if(el !== dragged){
            el.x += el.vx;
            el.y += el.vy;

            const w = el.offsetWidth;
            const h = el.offsetHeight;

            if(el.x < 0 || el.x > container.clientWidth - w) el.vx *= -1;
            if(el.y < 0 || el.y > container.clientHeight - h) el.vy *= -1;
        }

        el.style.left = el.x + "px";
        el.style.top = el.y + "px";
    });

    requestAnimationFrame(animate);
}
animate();

for(let i = 0; i < 35; i++){
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    container.appendChild(p);
}

};
