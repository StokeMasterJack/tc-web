package outline

import com.github.kittinunf.fuel.Fuel
import java.io.File

fun refreshKotlinOutline() {
    refreshOutline("kotlin", "620525")
}

fun refreshReactOutline() {
    refreshOutline("react", "621287")
}

fun refreshFlutterOutline() {
    refreshOutline("flutter", "671859")
}

private fun refreshOutline(workshopKey: String, outlineId: String) {
    val text = fetchOutlineSync(outlineId)
    saveOutline(workshopKey, text)
}

private fun saveOutline(workshopKey: String, text: String) {
    file(workshopKey).writeText(text)
}

private fun file(workshopKey: String): File {
    return File("/Volumes/repos/tc-web/client/src/data/outlines/$workshopKey-outline.json")
}

private fun fetchOutlineSync(outlineId: String): String {
    val url = "https://beta.checkvist.com/checklists/$outlineId/tasks.json?with_notes=true"
    println("Fetching outline[$url]...")
    val (request, response, text) = Fuel.get(url).responseString()
    println("  Fetching outline complete!")
    return text.get()
}

