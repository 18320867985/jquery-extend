
include.define(function () {
    console.log(window.aa)
    window.bb = 33 + window.aa;
    console.log("amd3:", window.bb);
return  function (a3, b3, c3) {
      //  console.log("a*b*c");
        return a3 * b3 * c3;
    };
});



