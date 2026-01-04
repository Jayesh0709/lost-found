let menu = document.querySelector(".men");
let links = document.querySelector(".links");
let clos = document.querySelector(".cl");
let th = document.querySelector(".th");
let lost = document.querySelector(".lost");
let found = document.querySelector(".found");
let isOpen = false;


// let search = document.querySelector("#searchtxt");
// let items = document.querySelectorAll(".item");

// search.addEventListener("keyup", () => {
//     let value = search.value.toLowerCase();
//     items.forEach(item => {
//          let name = item.querySelector(".itemname").textContent.toLowerCase();
//          let desc = item.querySelector(".itemdes").textContent.toLowerCase();

//          if(name.includes(value) || desc.includes(value)){
//             item.style.display = "block";
//         }
//         else{
//              item.style.display = "none";
//          }
//     })
// })



menu.addEventListener("click", () => {
    if (!isOpen) {
        // clos.style.visibility = "visible"
        let t1 = gsap.timeline();
        t1.to(th, {
            rotate: 360,
            // opacity: 0
            display:"none"
        })
        t1.to(clos, {
            rotate: 360,
            display:"block"
        })
        // th.style.visibility = "hidden"
        links.classList.add("active");
        gsap.fromTo(links,
            { opacity: 0, y: -200 },
            { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
    } else {
        // clos.style.visibility = "hidden"
        // th.style.visibility = "visible"
        let t1 = gsap.timeline();
        t1.to(clos, {
            rotate: 360,
           display:"none"
        })
        t1.to(th, {
            rotate: 360,
            display:"block"
        })
        // 
        gsap.to(links, {
            opacity: 0,
            y: -200,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                links.classList.remove("active");
            }
        });
    }
    isOpen = !isOpen;
});

lost.addEventListener("click", () => {
    window.location.href = "/lost";
})
lost.addEventListener("mouseenter", () => {
    // alert("mouse enter")
    gsap.to(lost, {
        scale: 1.1,
        duration: 0.5
    })
})
lost.addEventListener("mouseleave", () => {
    gsap.to(lost, {
        scale: 1
    })
})
found.addEventListener("click", () => {
    window.location.href = "/found";
})
found.addEventListener("mouseenter", () => {
    gsap.to(found, {
        scale: 1.1,
        duration: 0.5
    })
})
found.addEventListener("mouseleave", () => {
    gsap.to(found, {
        scale: 1
    })
})