package outline

import com.smartsoft.ssutil.Sys
import java.io.File

object Config {

    object dir {
        val userHome = Sys.getUserHome()
        val repos = File(userHome, "r/dev")
        val tcWeb = File(repos, "tc-web")
        val tcWebClient = File(tcWeb, "client")
        val outlines = File(tcWebClient, "src/data/outlines")
    }

}