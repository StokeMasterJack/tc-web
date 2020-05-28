plugins {
    kotlin("jvm") version "1.3.71"
}

group = "ss.tcweb.dev"
version = "1.0-SNAPSHOT"

repositories {
    jcenter()
//    maven("https://dl.bintray.com/kotlin/kotlin-eap")
    mavenCentral()
}

dependencies {
    implementation(kotlin("stdlib"))
    //com.github.kittinunf.fuel:fuel
    implementation("com.github.kittinunf.fuel:fuel:1.1.0")
//    implementation("result-1.1.0"))
//    implementation("fuel-1.7.0"))
}

tasks {
    compileKotlin {
        kotlinOptions.jvmTarget = "1.8"
    }
    compileTestKotlin {
        kotlinOptions.jvmTarget = "1.8"
    }
}