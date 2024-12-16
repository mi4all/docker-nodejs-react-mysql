(function($) {
  'use strict';
  $(function() {
    $(".nav-settings").on("click", function() {
      $("#right-sidebar").toggleClass("open");
    });
    $(document).on("click" ,".settings-close" , function(){
 
      $("#right-sidebar,#theme-settings").removeClass("open");
    });


   $(document).on("click" ,"#settings-trigger" , function(){
      $("#theme-settings").toggleClass("open");
    });
    var navbar_classes = "navbar-danger navbar-success navbar-warning navbar-dark navbar-light navbar-primary navbar-info navbar-pink";
    var sidebar_classes = "sidebar-light sidebar-dark";
    var $body = $("body");
    var theme = localStorage.getItem('sidebarTheme');
    var theme1 = localStorage.getItem('navbarTheme');
    if (theme) {
      $body.removeClass(sidebar_classes);
      $body.addClass(theme);
    }
    if (theme1) {
      $(".navbar").removeClass(navbar_classes);
      $(".navbar").addClass(theme1);
    }
    //background constants
    

    //sidebar backgrounds
    $(document).on("click" ,"#sidebar-light-theme" , function(){
      $body.removeClass(sidebar_classes);
      $body.addClass("sidebar-light");
      $(".sidebar-bg-options").removeClass("selected");
      $(this).addClass("selected");

      localStorage.setItem('sidebarTheme', 'sidebar-light');
    });
    $(document).on("click" ,"#sidebar-dark-theme" , function(){
      $body.removeClass(sidebar_classes);
      $body.addClass("sidebar-dark");
      $(".sidebar-bg-options").removeClass("selected");
      $(this).addClass("selected");

      localStorage.setItem('sidebarTheme', 'sidebar-dark');
    });


    //Navbar Backgrounds
    $(document).on("click" ,".tiles.primary" , function(){
      $(".navbar").removeClass(navbar_classes);
      $(".navbar").addClass("navbar-primary");
      $(".tiles").removeClass("selected");
      $(this).addClass("selected");

      localStorage.setItem('navbarTheme', 'navbar-primary');
    });
    $(document).on("click" ,".tiles.success" , function(){
      $(".navbar").removeClass(navbar_classes);
      $(".navbar").addClass("navbar-success");
      $(".tiles").removeClass("selected");
      $(this).addClass("selected");

      localStorage.setItem('navbarTheme', 'navbar-success');
    });
    $(document).on("click" ,".tiles.warning" , function(){
      $(".navbar").removeClass(navbar_classes);
      $(".navbar").addClass("navbar-warning");
      $(".tiles").removeClass("selected");
      $(this).addClass("selected");

      localStorage.setItem('navbarTheme', 'navbar-warning');
    });
    $(document).on("click" ,".tiles.danger" , function(){
      $(".navbar").removeClass(navbar_classes);
      $(".navbar").addClass("navbar-danger");
      $(".tiles").removeClass("selected");
      $(this).addClass("selected");

      localStorage.setItem('navbarTheme', 'navbar-danger');
    });
    $(document).on("click" ,".tiles.light" , function(){
      $(".navbar").removeClass(navbar_classes);
      $(".navbar").addClass("navbar-light");
      $(".tiles").removeClass("selected");
      $(this).addClass("selected");

      localStorage.setItem('navbarTheme', 'navbar-light');
    });
    $(document).on("click" ,".tiles.info" , function(){
      $(".navbar").removeClass(navbar_classes);
      $(".navbar").addClass("navbar-info");
      $(".tiles").removeClass("selected");
      $(this).addClass("selected");

      localStorage.setItem('navbarTheme', 'navbar-info');
    });
    $(document).on("click" ,".tiles.dark" , function(){
      $(".navbar").removeClass(navbar_classes);
      $(".navbar").addClass("navbar-dark");
      $(".tiles").removeClass("selected");
      $(this).addClass("selected");

      localStorage.setItem('navbarTheme', 'navbar-dark');
    });
    $(document).on("click" ,".tiles.default" , function(){
    
      $(".navbar").removeClass(navbar_classes);
      $(".navbar").addClass("navbar-default");
      $(".tiles").removeClass("selected");
      $(this).addClass("selected");

      localStorage.setItem('navbarTheme', 'navbar-default');
    });
  });
})(jQuery);
