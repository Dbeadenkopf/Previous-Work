function animate_string(id){
    // Get the HTML element by its id
    var element = document.getElementById(id);

    // Access the text node inside the element 
    var textNode = element.childNodes[0];

    // extract the intitial text content of the text node
    var text = textNode.data;

    // now lets set up an interval to rotate the characters in the text
    // every 100 milliseconds 
    setInterval(function () {
        text = text[text.length - 1] + text.substring(0, text.length-1);

        textNode.data = text;

    }, 100);



}