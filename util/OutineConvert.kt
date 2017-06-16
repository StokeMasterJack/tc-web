import org.dom4j.DocumentHelper
import org.dom4j.Element
import java.io.File

fun main(args: Array<String>) {
    val text = File("/Volumes/repos/tc-web/util/html.xml").readText()

    val fromDoc = DocumentHelper.parseText(text)
    val fromRoot = fromDoc.rootElement

    val toRoot = DocumentHelper.createElement("outline")
    toRoot.addAttribute("text","Topics")

    val elements: List<Element> = fromRoot.elements() as List<Element>
    var i = 0

    while (true) {
        val (list, index) = readGroup(elements, i)
        val group = createGroup(list)
        toRoot.add(group.toOpmlGroup())
        if (index === null) break
        i = index
    }

    println(toRoot.asXML())
}

fun readGroup(list: List<Element>, index: Int): Pair<List<Element>, Int?> {
    var i = index
    val h2 = list[i]
    check(h2.name == "h2")
    i++
    val a = mutableListOf<Element>()
    a.add(h2)
    while (true) {
        val e = list.getOrNull(i)
        if (e === null) return Pair(a, null)
        if (e.name == "h2") break
        a.add(e)
        i++
    }
    return Pair(a, i)
}

fun createGroup(list: List<Element>): Group {
    check(list[0].name == "h2")
    val h2 = list[0]
    val p = createP(list)
    val ul = createUL(list)
    return Group(h2, p, ul)
}

fun createP(list: List<Element>): Element? {
    if (list.size == 1) return null
    if (list.size > 1 && list[1].name == "p") return list[1]
    if (list.size > 2 && list[2].name == "p") return list[2]
    return null
}

fun createUL(list: List<Element>): Element? {
    if (list.size == 1) return null
    if (list.size > 1 && list[1].name == "ul") return list[1]
    if (list.size > 2 && list[2].name == "ul") return list[2]
    return null
}

data class Group(val h2: Element, val p: Element?, val ul: Element?) {
    fun print() {
        println(h2.text)
        if (p != null) {
            println(p.text)
        }
        if (ul != null) {
            val lis = ul.elements() as List<Element>
            for (li in lis) {
                println(li.text)
            }
        }
    }

    fun toOpmlGroup(): Element {
        val groupOutline = DocumentHelper.createElement("outline")
        groupOutline.addAttribute("text", h2.text)
        if (p != null) {
            val pOutline = groupOutline.addElement("outline")
            pOutline.addAttribute("text", p.text)
            pOutline.addAttribute("type", "note")
            pOutline.addAttribute("isComment", "true")
        }
        if (ul != null) {
            val lis = ul.elements() as List<Element>
            for (li in lis) {
                val liOutline = groupOutline.addElement("outline")
                liOutline.addAttribute("text", li.textTrim)
            }

        }
        return groupOutline
    }
}

fun createOutNode(inNode: Element) {
    val outline = DocumentHelper.createElement("outline")

}