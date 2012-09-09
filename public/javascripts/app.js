(function($){  
  $(function(){
    $(document).foundationMediaQueryViewer();

    $(document).foundationAlerts();
    $(document).foundationAccordion();
    $(document).tooltips();
    $('input, textarea').placeholder();
    $(document).foundationButtons();
    $(document).foundationNavigation();
    $(document).foundationCustomForms();

    $('#send_email').click(function(event) {
      event.preventDefault();

      var email = $("#email").val();

      $.post('/email', { email: email }, function(res) {

        $('#email_form').html("<p class='center'><strong>Success! Check your inbox for a <em>hilarious</em> Emilio Estevez joke.</strong></p>");

      });
    });
  });
  
})(jQuery);
