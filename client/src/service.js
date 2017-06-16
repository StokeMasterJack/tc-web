import workshops from "./data/workshops.json"
import kotlinOutline from "./data/outlines/kotlin-outline.json"
import reactOutline from "./data/outlines/react-outline.json"


const outlines = {
  kotlin: kotlinOutline,
  react: reactOutline
}

// maybe use this in future
// const url = "https://checkvist.com/checklists/620525/tasks.json?with_notes=true"

export function loadWorkshopSync(workshopKey: string): Object {
  if (!workshopKey) throw Error("workshopKey is a required parameter")
  for (let workshop of workshops) {
    if(workshop.key === workshopKey) return workshop
  }
  throw Error()
}

export function loadOutlineSync(workshopKey: string): Object {
  if (!workshopKey) throw Error("workshopKey is a required parameter")
  const outline = outlines[workshopKey]
  if (!outline) throw new Error("Bad workshopKey[" + workshopKey + "]")
  const workshop = loadWorkshopSync(workshopKey)
  outline.title = workshop.title
  outline.subtitle = workshop.subtitle
  return outline
}