export default function(to, from, savedPosition) {
  if (savedPosition) {
    return { ...savedPosition, behavior: "smooth" };
  }
  const aliases = ["items", "walls", "monsters", "microfigs"];
  if (to.name === "index" || !from.name) {
    // always scroll to top when going to home or coming from the error page
    return { x: 0, y: 0, behavior: "smooth" };
  } else if (
    // scroll below the header when going to a sub route
    aliases.some(alias => to.name.includes(alias) || from.name.includes(alias))
  ) {
    return { x: 0, y: 420, behavior: "smooth" };
  } else {
    return { x: 0, y: 0, behavior: "smooth" };
  }
}
