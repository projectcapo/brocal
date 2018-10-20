// Require inside your project
var NutritionixClient = require('nutritionix');
var nutritionix = new NutritionixClient({
    appId: '16d9b079',
    appKey: '2e36ce73d7fef178d6e5e3fab66b5ecc'
    // debug: true, // defaults to false
});

var errMsgs = {
    brand: 'There was a problem looking up a Brand',
    item: 'There was a problem looking up an Item',
    search: 'There was a problem performing a Search',
    auto: 'There was an issue performing an autocomplete search',
    brand_search: 'There was an issue executing a Brand Search',
    natural: 'There was an issue performing a natural search',
    uncaught: 'There was an uncaught exception'
};

function logJson(o) {
    console.log(JSON.stringify(o, null, 4));
}

function RequestErrorHandler(msg) {
    return function reqErrHndlr(e) {
        console.error(msg.red);

     //   if (_.isObject(e) && !(e instanceof Error)) {
            logJson(e);
     //   } else {
     //       console.error(e);
     //   }

        process.exit(1);

    };
}

// ============================================================
// Success handlers
// ============================================================
function autoSuccess(autoResults) {
    //console.log(autoResults)
    var q = autoResults[1].text;
    console.log('autocomplete successfull searching items using: %s', q);
    return nutritionix.search({
        q: q
    });
}

function searchSuccess(searchResults) {
    //console.log(searchResults);
    
    var result = searchResults.results[1];
    var id = result.resource_id;

    var name = [
        
        result.item_name
    ].join(' - ');

    var info = [
        id,
        result.brand_name,
        result.nutrient_name,
        result.nutrient_value,
        result.thumbnail,
    ].join(' \n ');

    console.log(('Here are your nutrition facts:') + "\n " + name + "\n " + info) ;
}


// ============================================================
// Execute Tests
// ============================================================
var autocompleteQuery = {
    q: 'appl' // should autocomplete salad
};

console.log('attempting to autocomplete: %s', autocompleteQuery.q);

// start by autocompleting a phrase
nutritionix.autocomplete(autocompleteQuery)
    // perform an item search using the autocompleted phrase
    .then(autoSuccess, new RequestErrorHandler(errMsgs.auto))
    // grab the first item id from search and locates its entire record
    .then(searchSuccess, new RequestErrorHandler(errMsgs.search))
    // when an item is found attempt to locate its brand record
    //.then(itemLookUpSuccess, new RequestErrorHandler(errMsgs.item))
    
    .catch(new RequestErrorHandler(errMsgs.uncaught));