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
    $form.children('input[type=submit]').click(function (e) {
      var name = $form.children('[name=name]').val();
      var email = $form.children('[name=email]').val();
      var subject = $form.children('[name=subject]').val();
      var message = $form.children('[name=message]').val();
      var data = {
        name: name, email: email, subject: subject, message: message
      };

      if (!$form[0].checkValidity()) {
        return;
      }
      e.preventDefault();
      $.ajax(
        CONTACT_SUBMIT_URL, {method: 'POST', data: data, dataType: 'jsonp'}
      ).success(function (success) {
        successMessage(name);
      }).error(function (error) {
        errorMessage(name);
      });

    });
  });


})(jQuery);
