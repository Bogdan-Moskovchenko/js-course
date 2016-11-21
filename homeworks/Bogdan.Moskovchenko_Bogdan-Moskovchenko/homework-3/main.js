(function () {

    console.log("***********#1*************");

    var timeout = window.setTimeout;

    window.setTimeout = function(delay, fn) {
        return timeout.call(this , fn, delay);
    }

    console.log("*************#2**************");

    window.setInterval = function(fn, delay) {
        return setTimeout(delay, function recursion(){
            fn();
            setTimeout(delay, recursion)
        });
    }

    console.log("*************#3**************");

    function fncToDelay (p) {
                console.log('Delayed run : ' + p);
            }
    function freeze (delay, fnc) {
        var timeout = [],
            idx;
        return function () {
            var args = arguments;
            timeout[idx] = setTimeout(delay, function () {
                fnc.apply(this, args);
            });
            if(timeout[1]){
                clearTimeout(timeout[1]);
            }
            idx = 1;
        }
    }

    console.log("*************#4**************");

    function createPipe (originalFnc, args) {
        return function (result) {
            var idx = 0,
                len = args.length;
            for ( ; idx < len; idx++) {
                result = args[idx](result);
            }

            originalFnc(result);
        }
    }
    function originalFnc (string) {
        var result = "",
            idx = 0,
            len = string.length,
            nextToUpper = true;
        for ( ; idx < len; idx++) {
            if (nextToUpper) {
                result += string.charAt(idx).toUpperCase();
                nextToUpper = false;
            } else {
                result += string.charAt(idx);
            }
            if (string.charAt(idx) === " " && string.charAt(idx + 1) !== " ") {
                nextToUpper = true;
            }
        }
        console.log(result);
                }
    function filterDigits (string) {
        var regDigits = /\d/;
        var result = string;
        while (regDigits.test(result)) {
            result = result.replace(regDigits, "");
        }
        return result;
    }
    function filterSpecial (string) {
        var regSpecial = /[!@#$%^&*()+=]/;
        var result = string;
        while (regSpecial.test(result)) {
            result = result.replace(regSpecial, "");
        }
        return result;
            }
    function filterWhiteSpaces (string) {
        var regWhiteSpaces = /\s{2,}/;
        var result = string;
        while (regWhiteSpaces.test(result)) {
            result = result.replace(regWhiteSpaces, " ");
        }
        return result;
    }
})();
