$(function(){
    var segementedAutocompleteDropDown = function(ctx, data) {
      // You'll need a separate array for each segment of the autocomplete dropdown.
      // Here, we're splitting it twice.
      var segment_one = [], segment_two = [];
      
      // This is where we split the autocomplete in to segments using conditionals
      $.each(data, function(docType, results) {
        $.each(results, function(idx, result) {
         // Specify a valid Swiftype field/meta tag. results.FIELD == VALUE
          if (result.type == 'page'){
            segment_one.push(result);
          }
          else {
            segment_two.push(result);
          }
        });
      });
      
      // This is where the magic happens. We chose to split the two segments into divs.
      // You can use pretty much whatever kind of HTML you want.
      var segment_one_list = $(
        '<div class="autocomplete__segment">' + 
          '<div class="autocomplete__segment-header">Segment One</div>' + 
        '</div>');
      var segment_two_list = $(
        '<div class="autocomplete__segment">' + 
          '<div class="autocomplete__segment-header">Segment Two</div>' + 
        '</div>');
      
      // Create a reusable function to render results.
      function renderResult(result) {
        return $(
          '<a href="' + result['url'] + '" class="autocomplete-result">' + 
            '<span class="autocomplete-result__title">' + result['title'] + '</span>' +
            '<span class="autocomplete-result__description">' + result['body'] + '</span>' +
          '</a>'
        )
      }
      
      // Add results to each segment
      $.each(segment_one, function(idx, item){
        ctx.registerResult(renderResult(item).appendTo(segment_one_list), item);
      });
      $.each(segment_two, function(idx, item) {
        ctx.registerResult(renderResult(item).appendTo(segment_two_list), item);
      });
      
      if (segment_one.length > 0) {
        segment_one_list.appendTo(ctx.list);
      }
      if (segment_two.length > 0) {
        segment_two_list.appendTo(ctx.list);
      }
   console.log(data)
    };
  
  $('#search-input').swiftype({
    engineKey: 'HBLkYadiX6YqZZh4NXMx',
    resultLimit: 5,
    resultRenderFunction: segementedAutocompleteDropDown,
    suggestionListType: 'div',
    resultListSelector: '.autocomplete-result',
    fetchFields: { 'page': ['url', 'title', 'type', 'body'],
                 'spells': ['url', 'title', 'body', 'type']}
   });
  });