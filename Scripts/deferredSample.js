/// <reference path="jquery-2.1.0.js" />
function timeOutAsync(milliseconds) {
    var deferred = $.Deferred();
    setTimeout(function () { deferred.resolve(); }, milliseconds);
    return deferred.promise();
}

function DefAsync(includeThird) {
    var deferred = $.Deferred();
    var count = 0;

    var firstPromise = timeOutAsync(2000);
    var secondPromise = timeOutAsync(3000);
    var thirdPromise = includeThird ? timeOutAsync(1000) : $.when();
    var fourthPromise = timeOutAsync(1234);

    firstPromise.always(function () { deferred.notify(++count); });
    secondPromise.always(function () { deferred.notify(++count); });
    thirdPromise.always(function () { deferred.notify(++count); });
    fourthPromise.always(function () { deferred.notify(++count); });

    $.when(firstPromise, secondPromise, thirdPromise, fourthPromise)
            .then(function () { console.log("All done!"); deferred.resolve(); },
                   function () { console.log("Reject"); deferred.reject(); });
    return deferred.promise();
}

function NotifyDefAsync() {
    var promise = DefAsync();
    promise.progress(function (msg) { console.log(msg); })

    return promise;
}