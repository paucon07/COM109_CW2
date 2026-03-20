function showCardContent(e)
{
  const text = this.querySelector("p");
  text.classList.toggle("show");
}

document.getElementById("interactiveCard").addEventListener("click", showCardContent);