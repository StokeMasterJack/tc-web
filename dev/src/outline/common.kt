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

fun refreshOoOutline() {
    refreshOutline("oo", "718390")
}

fun refreshPatternsOutline() {
    refreshOutline("patterns", "719189")
}

fun refreshFooOutline() {
    refreshOutline("foo", "719578")
}

private fun refreshOutline(workshopKey: String, outlineId: String) {
    val text = fetchOutlineSync(outlineId)
    saveOutline(workshopKey, text)
}

private fun saveOutline(workshopKey: String, text: String) {
    outlineFile(workshopKey).writeText(text)
}

private fun outlineFile(workshopKey: String): File {
    return File(Config.dir.outlines, "$workshopKey-outline.json")
}

public fun loginToCheckvistSync(): String {
    val url = "https://checkvist.com/auth/login.json?username=StokeMasterJack&remote_key=6425krkr"
    println("Logging in to checkvist[$url]...")
    val (request, response, text) = Fuel.get(url).responseString()
    println("  Logging in complete!")
    return text.get()
}

private fun fetchOutlineSync(outlineId: String): String {
    val token = loginToCheckvistSync().trimStart('\"').trimEnd('\"')
    val url = "https://checkvist.com/checklists/$outlineId/tasks.json?with_notes=true&token=$token"
    println("Fetching outline[$url]...")
    val (request, response, text) = Fuel.get(url).responseString()
    println("  Fetching outline complete!")
    return text.get()
}

