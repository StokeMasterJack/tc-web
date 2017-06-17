package scratch

fun main(args: Array<String>) {


    val nums = arrayOf(2, 4, 1, 3, 78, 7, 4)

    data class Person(val id: Int, val region: Int, val sales: Int)

    var i = 0
    val persons = arrayOf(
            Person(i++, 1, 10),
            Person(i++, 2, 10),
            Person(i++, 3, 10),
            Person(i++, 1, 10),
            Person(i++, 3, 10),
            Person(i++, 1, 10),
            Person(i, 2, 10)
    )

    val map = mapOf("a" to persons[0], "b" to persons[1])

    val sortedBy = persons.sortedBy { it.region }
    val sum = persons.sumBy { it.sales }
    val avg1 = nums.average()
    val avg2 = persons.map { it.sales }.average()
    val map1 = persons.associate { it.id to it.sales }
    val map2 = persons.associateBy { it.id }
    val sorted = nums.sorted()
    val index = sorted.binarySearch(4)

    val g = persons.groupingBy { it.region }

    val map3 = g.eachCount()
    val map4: Map<Int, Int> = g.aggregate { _, total, person, _ -> person.sales + (total ?: 0) }


    val groupBy = persons.groupBy({ it.region }, { it })
    println(groupBy)

}

