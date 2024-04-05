function getRandomColor(colorName) {
    const colors = {
        "Remote-FiLe-Inclusion": "#5A6482",
        "cmd": "#453654",
        "xss-injection": "#D1F60B",
        "html": "#6DE4F7",
        "SQLI": "#31356B",
        "XML-Injection": "#EEACA9",
        "VPN": "#2CE21E"
    };

    return colors[colorName] || "#000000"; // Default to black if color not found
  }
  module.exports=getRandomColor
  