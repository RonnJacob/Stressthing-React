var $ = require('jquery');
var jQuery = require('jquery');
$(document).ready(function () {
    "use strict";

    var window_width = $(window).width(),
        window_height = window.innerHeight,
        header_height = $(".default-header").height(),
        header_height_static = $(".site-header.static").outerHeight(),
        fitscreen = window_height - header_height;

    $(".fullscreen").css("height", window_height);
    $(".fitscreen").css("height", fitscreen);

    // -------------------------------------------------

    //Navigate to home page
    $('#save-recipe').on('click', function () {
        window.location.href = './home.html'
    });


    //----------------------------------------------------

    //Scroll to div when clicked on button
    $('#prepare').on('click', function () {
        $('html, body').animate({
            scrollTop: $("#main-wrapper").offset().top
        }, 1000);
    });

    //----------------------------------------------------


    //Register User
    $('#sign_up').on('click', function () {
        // var user_array = [];
        var username = $('#register_username').val();
        var email = $('#register_email').val();
        var password = $('#register_password').val();
        var verify_password = $('#register_verify_password').val();
        if (password !== verify_password) {
            return false;
        }
        else if (!username || !password || !verify_password || !email) {
            return false;
        }
        else {
            var user_array = JSON.parse(localStorage.getItem("user")) || [];
            user_array.push({'username': username, 'password': password, 'email': email});
            localStorage.setItem('user', JSON.stringify(user_array));
            window.location.href = './index.html';
        }
    });

    //----------------------------------------------------

    var storedUsers = JSON.parse(localStorage.getItem('user'));
    console.log(storedUsers);

    //----------------------------------------------------
    //Login User and get Username
    $('#login_user').on('click', function () {
        var username = $('#username').val();
        var password = $('#password').val();

        for (var i = 0; i < storedUsers.length; i++) {
            if (username === storedUsers[i].username &&
                password === storedUsers[i].password) {

                $('#loading').css('display', 'block');
                $('#loading').html('Loading...');

                //Creating a new localStorage to get User details
                var profileCred = {
                    'username': storedUsers[i].username,
                    'password': storedUsers[i].password,
                    'email': storedUsers[i].email
                };
                localStorage.setItem('profileCred', JSON.stringify(profileCred));
                window.location.href = './home.html?username=' + username;
            }
        }

        //If username or password is incorrect then display error message
        setTimeout(function () {
            $('#loading').css('display', 'block');
            $('#loading').html('Incorrect Username or Password');
            return false;
        }, 0);
    });

    //----------------------------------------------------




    //----------------------------------------------------

    //Dismiss time model
    $('#submit_time').on('click', function () {
        setTimeout(function () {
            $('#add_time').modal('hide');
        }, 1700);
    });

    //----------------------------------------------------

    // ------- Datepicker  js --------//  

    //------- Niceselect  js --------//  

    if (document.getElementById("default-select")) {
        $('select').niceSelect();
    }
    ;
    if (document.getElementById("default-select2")) {
        $('select').niceSelect();
    }
    ;
    if (document.getElementById("service-select")) {
        $('select').niceSelect();
    }
    ;




    //------- Mobile Nav  js --------//  

    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({
            id: 'mobile-nav'
        });
        $mobile_nav.find('> ul').attr({
            'class': '',
            'id': ''
        });
        $('body .main-menu').append($mobile_nav);
        $('body .main-menu').prepend('<span class="menu-title">Menu</span> <button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>');
        $('body .main-menu').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="lnr lnr-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function (e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function (e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
            $('#mobile-body-overly').toggle();
        });

        $(document).on('click', function (e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('lnr-cross lnr-menu');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    //------- Smooth Scroll  js --------//  

    // $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function () {
    //     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    //         var target = $(this.hash);
    //         if (target.length) {
    //             var top_space = 0;
    //
    //             if ($('#header').length) {
    //                 top_space = $('#header').outerHeight();
    //
    //                 if (!$('#header').hasClass('header-fixed')) {
    //                     top_space = top_space;
    //                 }
    //             }
    //
    //             $('html, body').animate({
    //                 scrollTop: target.offset().top - top_space
    //             }, 1500, 'easeInOutExpo');
    //
    //             if ($(this).parents('.nav-menu').length) {
    //                 $('.nav-menu .menu-active').removeClass('menu-active');
    //                 $(this).closest('li').addClass('menu-active');
    //             }
    //
    //             if ($('body').hasClass('mobile-nav-active')) {
    //                 $('body').removeClass('mobile-nav-active');
    //                 $('#mobile-nav-toggle i').toggleClass('lnr-times lnr-bars');
    //                 $('#mobile-body-overly').fadeOut();
    //             }
    //             return false;
    //         }
    //     }
    // });

    $(document).ready(function () {

        $('html, body').hide();

        if (window.location.hash) {

            setTimeout(function () {

                $('html, body').scrollTop(0).show();

                $('html, body').animate({

                    scrollTop: $(window.location.hash).offset().top - 108

                }, 1000)

            }, 0);

        } else {

            $('html, body').show();

        }

    });


    jQuery(document).ready(function ($) {
        // Get current path and find target link
        var path = window.location.pathname.split("/").pop();

        // Account for home page with empty path
        if (path == '') {
            path = 'home.html';
        }

        var target = $('nav a[href="' + path + '"]');
        // Add active class to target link
        target.addClass('menu-active');
    });

    $(document).ready(function () {
        if ($('.menu-has-children ul>li a').hasClass('menu-active')) {
            $('.menu-active').closest("ul").parentsUntil("a").addClass('parent-active');
        }
    });


    //------- Header Scroll Class  js --------//

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });


});
