const greet = new Promise((resolve, reject) => { 
    setTimeout(function () { 
        resolve("Welcome to GeeksforGeeks!"); 
        document.getElementById( 
            "one"
        ).innerHTML = `Poly means that it could be  
        solved using a wide range of techniques it  
        wasn't limited to just being done using  
        JavaScript, and fill would fill the gap in 
        the browser where the technology was needed.`; 
        document.getElementById( 
            "two"
        ).innerHTML = `A polyfill is a piece of code  
        that adds functionality to older browsers  
        that have incompatibility issues.`; 
        document.getElementById( 
            "three"
        ).innerHTML = `In older browsers, Promises,  
        Array.from, Array.includes, Array.of, Map,  
        Set, Symbol, object.values, etc require  
        polyfill support by explicitly defining  
        the functions`; 
        document.getElementById("four").innerHTML = 
            "Promises represent uncompleted operations."; 
    }, 3000); 
}); 
  
greet.then((msg) => { 
    console.log(msg); 
}); 