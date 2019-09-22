(function() { "use strict";
  $(document).ready(function () {
    var $form = $('form[name=contact-form]');

    // replace form by a success message
    var successMessage = function (name) {
      var message = '<strong>' + name + '</strong>,';
      message += '<br><br>Thank you for your message! ';
      message += '<i class="fa fa-heart" aria-hidden="true"></i>';
      message += '<i class="fa fa-heart" aria-hidden="true"></i>';
      message += '<br>I will get back to you as soon as I can. ';
      message += '<br><br><i class="fa fa-sun-o" aria-hidden="true"></i>';
      message += '<i class="fa fa-sun-o" aria-hidden="true"></i>';
      message += ' Pooja Shah ';
      message += '<i class="fa fa-sun-o" aria-hidden="true"></i>';
      message += '<i class="fa fa-sun-o" aria-hidden="true"></i>';
      var $p = $('<p />').html(message);
      var $backlink = $('<p />').append(
        $('<a />').html(
          '<i class="fa fa-hand-o-right" aria-hidden="true"></i> ' +
          'In the mean time, you can check out my portfolio!'
        ).prop('href', GH_URL + '/portfolio')
      );
      $('.contact .about-item').html('').append($p).append($backlink);

    }
    var errorMessage = function (name) {
      var $error = $('<div />').addClass(
        'alert alert-danger'
      ).html(
        '<i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ' +
        '<span class="sr-only">Error:</span>' +
        ' Sorry ' + name + ', we couldn\'t send your email! :( <br><br>' +
        '<a href="' + GH_URL + '/contact">Please try again. </a>'
      );
      $('.contact .about-item').html('').append($error);
    }

    // Submit handler
    $form.submit(function (e) {
      handleFormSubmit(e);
    });

    function handleFormSubmit(event) {  // handles form submit without any jquery
      event.preventDefault();           // we are submitting via xhr below
      var form = event.target;
      var formData = getFormData(form);
      var data = formData.data;
      var name = $form.children('[name=name]').val();

      // If a honeypot field is filled, assume it was done so by a spam bot.
      if (formData.honeypot) {
        return false;
      }

      $form.attr('disabled', true);
      var url = form.action;
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      // xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            successMessage(name);
          }
          else {
            errorMessage(name);
          }
      };
      // url encode form data for sending as post data
      var encoded = Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
      }).join('&');
      xhr.send(encoded);
    }


    function getFormData(form) {
      var elements = form.elements;
      var honeypot;

      var fields = Object.keys(elements).filter(function(k) {
        if (elements[k].name === "honeypot") {
          honeypot = elements[k].value;
          return false;
        }
        return true;
      }).map(function(k) {
        if(elements[k].name !== undefined) {
          return elements[k].name;
        // special case for Edge's html collection
        }else if(elements[k].length > 0){
          return elements[k].item(0).name;
        }
      }).filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
      });

      var formData = {};
      fields.forEach(function(name){
        var element = elements[name];

        // singular form elements just have one value
        formData[name] = element.value;

        // when our element has multiple items, get their values
        if (element.length) {
          var data = [];
          for (var i = 0; i < element.length; i++) {
            var item = element.item(i);
            if (item.checked || item.selected) {
              data.push(item.value);
            }
          }
          formData[name] = data.join(', ');
        }
      });

      // add form-specific values into the data
      formData.formDataNameOrder = JSON.stringify(fields);
      formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
      formData.formGoogleSend
        = form.dataset.email || ""; // no email by default

      return {data: formData, honeypot: honeypot};
    }


  });


})(jQuery);
