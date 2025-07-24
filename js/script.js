/*ano*/
const ano = document.querySelector(".ano");
const anoatual = new Date().getFullYear();
ano.textContent = anoatual;

/*navegacao mobile*/
const btonavEl = document.querySelector(".bto--mobile-nav");
const headerEl = document.querySelector(".cabecalho");

btonavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-aberto");
});

/*rolagem efeitos*/
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    /*rolagem de volta pro topo*/
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    /*rolagem suave para todos os outros #*/
    if (href !== "#" && href.startsWith("#")) {
      const secaoEl = document.querySelector(href);
      secaoEl.scrollIntoView({ behavior: "smooth" });
    }

    /*fechar a navegacao mobile*/
    if (link.classList.contains("nav-principal-link"))
      headerEl.classList.toggle("nav-aberto");
  });
});

/*navegacao pegajosa depois do hero*/
const secaoHeroEl = document.querySelector(".secao-hero");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (ent.isIntersecting == false) {
      document.body.classList.add("pegajoso");
    }
    if (ent.isIntersecting) {
      document.body.classList.remove("pegajoso");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-60px",
  }
);
obs.observe(secaoHeroEl);

/*correcao do gap do flexbox no safari*/
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("sem-flexbox-gap");
}
checkFlexGap();
