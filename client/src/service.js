import workshops from "./data/workshops.json"
import flutterOutline from "./data/outlines/flutter-outline.json"
import kotlinOutline from "./data/outlines/kotlin-outline.json"
import reactOutline from "./data/outlines/react-outline.json"


const outlines = {
  flutter: flutterOutline,
  kotlin: kotlinOutline,
  react: reactOutline
}

const CHECKVIST_USER_NAME = "dford@smart-soft.com"
const CHECKVIST_API_KEY = "TAGApuHsGDnVz8"
let checkvistAuthToken = null


export function loadWorkshopSync(workshopKey: string): Object {
  if (!workshopKey) throw Error("workshopKey is a required parameter")
  for (let workshop of workshops) {
    if (workshop.key === workshopKey) return workshop
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

// maybe use this in future
// const url = "https://checkvist.com/checklists/620525/tasks.json?with_notes=true"
export function loadOutlineAsync(workshopKey: string): Object {
  const url = "https://beta.checkvist.com/checklists/621510/tasks.json?with_notes=true"


  //headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

  /*
   {method:'GET',
   headers: headers,
   //credentials: 'user:passwd'
   }
   */

  /*
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   */

  checkvistLoginAsync().then(authToken => {
    const headers = new Headers()
    const auth = "Basic " + btoa("dford@smart-soft.com:" + authToken)
    console.log("auth: ", auth)
    headers.append('Authorization', auth)
    return fetch(url, {method: "GET", headers: headers})
  }).catch(error => console.log(error))


}

/*
 username - User login (email)
 remote_key - User's remote API Key from profile page (or user password)
 callback - Optional javascript callback function (will get token as a parameter)

 Returns quoted token string in the body, unless callback parameter is passed. If authentication failed, will return HTTP status 403 Forbidden.
 */
export function checkvistLoginAsync(): Promise<string> {
  if (checkvistAuthToken) {
    return Promise.resolve(checkvistAuthToken)
  }
  else {
    const url = `https://beta.checkvist.com/auth/login.json?username=${CHECKVIST_USER_NAME}&remote_key=${CHECKVIST_API_KEY}`
    return fetch(url)
  }
}