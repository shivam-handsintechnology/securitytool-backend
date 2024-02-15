function UrlConverter(str) {
    let res = str.replace(/ /g, "_");
   return res
  }
  // Get the argument from the terminal
  const arguments = process.argv.slice(2).join(" ");
  // Call the UrlConverter function with the argument
console.log(UrlConverter(arguments))
  