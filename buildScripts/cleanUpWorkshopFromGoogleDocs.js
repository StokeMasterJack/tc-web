/*
 * From google Docs Script Editor:
 *      Publish menu -> Deploy as web app
 *      Current URL: https://script.googleusercontent.com/a/macros/smart-soft.com/echo?user_content_key=jKCXvQDyazmrr3K8PsWrU_o3VqvE3shsfghGvW2H7984Oq-VfO0SSCCQa-e94q7dTSkMhPlMOIg2o4Zf5NGslnJEOmDKCC8um5_BxDlH2jW0nuo2oDemN9CCS2h10ox_nRPgeZU6HP9wqIsq1yYpP2tqjIzwr-eDS4chwneYR2uOgsB8mr388350o9klRbuCmjni0Xk-Bo3g-9tG0cTJAHkXdJ25gz3khctmZ6n_R8Rk9ObyyEieoQ&lib=MQ_K58aQ7h2fG4v2BTEaSPyjkm9ikL-OV
 *      Just change the "Thinking in React" Google Doc and refresh the above URL
 */ 

//doGet is special name - used with:  Publish menu -> Deploy as web app 
function doGet() {
  var html = ConvertGoogleDocToCleanHtml();
  return ContentService.createTextOutput("export default `<div class='workshop'>" + html + "</div>`;");
}

function ConvertGoogleDocToCleanHtml() {
  var body = DocumentApp.getActiveDocument().getBody();
  var numChildren = body.getNumChildren();
  var output = [];
  var listCounters = {};

  // Walk through all the child elements of the body.
  for (var i = 0; i < numChildren; i++) {
    var child = body.getChild(i);
    output.push(processItem(child, listCounters));
  }

  return output.join("\r");
}

function createDocumentForHtml(html) {
  var name = DocumentApp.getActiveDocument().getName() + "-as-html.txt";
  var newDoc = DocumentApp.create(name);
  newDoc.getBody().setText(html);
  newDoc.saveAndClose();
}

function dumpAttributes(atts) {
  // Log the paragraph attributes.
  for (var att in atts) {
    Logger.log(att + ":" + atts[att]);
  }
}

function processItem(item, listCounters) {
  var output = [];
  var prefix = "", suffix = "";

  if (item.getType() == DocumentApp.ElementType.PARAGRAPH) {
    switch (item.getHeading()) {
      // Add a # for each heading level. No break, so we accumulate the right number.
      case DocumentApp.ParagraphHeading.HEADING2:
        (prefix = "<h2 class='workshop-h2'>"), (suffix = "</h2>");
        break;
      case DocumentApp.ParagraphHeading.HEADING1:
        (prefix = "<h1 class='workshop-h1'>"), (suffix = "</h1>");
        break;
      case DocumentApp.ParagraphHeading.TITLE:
        (prefix = "<h1 class='workshop-title'>"), (suffix = "</h1>");
        break;
      case DocumentApp.ParagraphHeading.SUBTITLE:
        (prefix = "<div class='workshop-subtitle'>"), (suffix = "</div>");
        break;
      default:
        (prefix = "<p class='workshop-p'>"), (suffix = "</p>");
    }

    if (item.getNumChildren() == 0) return "";
  } else if (item.getType() === DocumentApp.ElementType.LIST_ITEM) {
    var listItem = item;
    var gt = listItem.getGlyphType();
    var key = listItem.getListId() + "." + listItem.getNestingLevel();
    var counter = listCounters[key] || 0;

    if (counter == 0) {
       prefix = "<ul  class='workshop-ul'><li class='workshop-li'>";
       suffix = "</li>";
    } 
    else if(item.isAtDocumentEnd() || item.getNextSibling().getType() != DocumentApp.ElementType.LIST_ITEM){
      prefix = "<li class='workshop-li'>";
      suffix = "</li></ul>";
    }
    else {
      prefix = "<li class='workshop-li'>";
      suffix = "</li>";
    }
    counter++;
    listCounters[key] = counter;
  }

  output.push(prefix);

  if (item.getType() == DocumentApp.ElementType.TEXT) {
    processText(item, output);
  } else {
    if (item.getNumChildren) {
      var numChildren = item.getNumChildren();

      // Walk through all the child elements of the doc.
      for (var i = 0; i < numChildren; i++) {
        var child = item.getChild(i);
        output.push(processItem(child, listCounters));
      }
    }
  }

  output.push(suffix);
  return output.join("");
}

function processText(item, output) {
  var text = item.getText();
  var indices = item.getTextAttributeIndices();

  if (indices.length <= 1) {
    // Assuming that a whole para fully italic is a quote
    if (item.isBold()) {
      output.push("<b>" + text + "</b>");
    } else if (item.isItalic()) {
      output.push("<blockquote>" + text + "</blockquote>");
    } else if (text.trim().indexOf("http://") == 0) {
      output.push('<a href="' + text + '" rel="nofollow">' + text + "</a>");
    } else {
      output.push(text);
    }
  } else {
    for (var i = 0; i < indices.length; i++) {
      var partAtts = item.getAttributes(indices[i]);
      var startPos = indices[i];
      var endPos = i + 1 < indices.length ? indices[i + 1] : text.length;
      var partText = text.substring(startPos, endPos);

      //Logger.log(partText);

      if (partAtts.ITALIC) {
        output.push("<i>");
      }
      if (partAtts.BOLD) {
        output.push("<b>");
      }
      if (partAtts.UNDERLINE) {
        output.push("<u>");
      }

      // If someone has written [xxx] and made this whole text some special font, like superscript
      // then treat it as a reference and make it superscript.
      // Unfortunately in Google Docs, there's no way to detect superscript
      if (partText.indexOf("[") == 0 && partText[partText.length - 1] == "]") {
        output.push("<sup>" + partText + "</sup>");
      } else if (partText.trim().indexOf("http://") == 0) {
        output.push(
          '<a href="' + partText + '" rel="nofollow">' + partText + "</a>"
        );
      } else {
        output.push(partText);
      }

      if (partAtts.ITALIC) {
        output.push("</i>");
      }
      if (partAtts.BOLD) {
        output.push("</b>");
      }
      if (partAtts.UNDERLINE) {
        output.push("</u>");
      }
    }
  }
}


