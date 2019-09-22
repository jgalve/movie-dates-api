$(document).ready(function () {

    console.log('jquery working!');

    initialize();

    //get url params
    function getParams() {
        var url = window.location.href;
        var releaseParam = url.split('=');
        releaseParam.shift();
        console.log('releaseParam: ' + releaseParam)

        if (url.indexOf('?release=') > 0 ) {
            $('#datepicker').val(releaseParam);
            console.log('datepicker' + $('#datepicker').val());

            getMovie(releaseParam);
        } else {
            setToday();
            //$('#datepicker').val('');
        }
    };

    //set date today
    function setToday() {
        //set date today
        let today = new Date().toISOString().substr(0, 10);
        document.querySelector("#datepicker").value = today;
        console.log('today is ' + today);

        return today;
    }

    //datepicker
    $('#datepicker').datepicker({format: "yyyy-mm-dd"});
    $('#datepicker').on('changeDate', function() {
        $(this).val(
            $(this).datepicker('getFormattedDate')
        );
        //$('#imdb').empty();
        console.log("datepicker: " + $(this).val());
    });

    //click now showing
    $('.btn-nowshowing').on('click', function(e) {
        e.preventDefault();
        getMovie(setToday());
    })

    //submit button imdb
    $('#submit').on('click', function (e) {
        e.preventDefault();
        
        $('#imdb').attr('data-page', '1');

        removeInitialize();

        var releaseDate = $('#datepicker').val();
        getMovie(releaseDate);
    });

    //remove initial style {
    function removeInitialize() {
        $('.search-bar').removeClass('centered').css({
            'background': 'rgba(0, 0, 0, 0.8)',
            'height': '80px'
        });
        $('.main-container').css({
            'background-repeat':'repeat-y',
            'background-size':'100%',
            'background-position':'center top',
            'padding-bottom' : '0px'
        });
        
        $('#imdb').empty().css('min-height', 'calc(100vh - 60px)');
        
        $('.now-showing').hide();
        $('.bottom').removeClass('d-none');  
    }


    // get movie
    function getMovie(releaseDate) {
        console.log('getMovie!!!!')

        if ($('.centered').length > 0) {
            removeInitialize();
        };

        //show results bar
        $('.dateResult').fadeIn(300);
        $('.dateResult i').text(releaseDate);

        //var releaseDate = $('#datepicker').val();
        var page = $('#imdb').attr('data-page');
        $('.main-title').css({
            'font-size': '52px',
            'margin-bottom': '8px',
            'margin-right': '35px !important'
        });
        
        $.ajax({
            dataType: 'json',
            async: true,
            url: "https://api.themoviedb.org/4/discover/movie?page=1&include_video=true&include_adult=true&sort_by=release_date.desc&language=en-US&api_key=c4a7e818fe724bcddb380f1c88cb8464&release_date.lte=" + releaseDate + '&page=' + page,
            success: function (discover, status) {
                console.log("releaseDate: " + releaseDate);
                console.log(discover);
                
                for (i = 0; i < discover.results.length; i++) {
                    $('#imdb').append(
                        '<section class=\"movie-box animated fadeIn slow\" id=\"' + discover.results[i].id + '\">' +
                            '<div class=\"row\">' +
                                '<div class="col-lg-6 col-sm-6 col-xs-12 pl-0 pr-0">' +
                                    '<div class="poster">' +
                                        '<img class="img-fluid" src=\"https://image.tmdb.org/t/p/w342' + discover.results[i].poster_path + '\" />' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-lg-6 col-sm-6 col-xs-12 pr-4 movie-details">' +
                                    '<p class=\"title\">' + discover.results[i].original_title + '</p>' +
                                    '<p class=\"release-date\"><b>RELEASE DATE:</b> ' + discover.results[i].release_date + '</p>' +
                                    '<p class=\"overview\"><b>OVERVIEW:</b> ' + discover.results[i].overview + '</p>' +
                                    '<p class=\"movie-id\"> ID: ' + discover.results[i].id + '</p>' +
                                    '<p class=\"movie-cast\"><b>CAST:<\/b> </p>' +
                                '</div>' +
                            '</div>' +
                        '</section>' 
                    );  
                };

                getCredits();

                window.history.replaceState(null, null, "?release=" + releaseDate);
                //$('#datepicker').val('');

            },
            error: function(status) {
                alert('error: ' + status);
            }
        });
    };

    //initial movie
    function initialize() {
        console.log('initialize!!!!')
        getParams();

        var releaseDate = $('#datepicker').val();

        $.ajax({
            dataType: 'json',
            async: true,
            url: "https://api.themoviedb.org/4/discover/movie?page=1&include_video=true&include_adult=true&sort_by=popularity.desc&language=en-US&api_key=c4a7e818fe724bcddb380f1c88cb8464&release_date.lte=" + releaseDate,
            success: function (discover, status) {                      
               
                //now showing
                $.ajax({
                    dataType: 'json',
                    async: true,
                    url: "https://api.themoviedb.org/4/discover/movie?page=1&include_video=true&include_adult=true&sort_by=release_date.desc&language=en-US&api_key=c4a7e818fe724bcddb380f1c88cb8464&release_date.lte=" + releaseDate,
                    success: function (discover, status) {                      
                       
                        for (i = 0; i < 4; i++) {
                            $('.now-showing').append(
                                '<div class="list">' +
                                    '<img class="img-fluid" src=\"https://image.tmdb.org/t/p/w342' + discover.results[i].poster_path + '\" />' +
                                    '<p class=\"title\">' + discover.results[i].original_title + '</p>' +
                                    '<p class=\"release-date\"><b>RELEASE DATE:</b> ' + discover.results[i].release_date + '</p>' +
                                '</div>'
                            );   
                        };

                        //wallpaper
                        var shuffle = Math.floor(Math.random() * 10)
                        for (i = 0; i < discover.results.length; i++) {
                            $('.main-container').css('background-image', 'url(\"https://image.tmdb.org/t/p/original' + discover.results[shuffle].poster_path + '\")');
                        };

                    }
                });


            },
            error: function(status) {
                alert('error: ' + status);
            }
        });
    };

    //next page
    $('.btn-showmore').on('click', function(e) {
        e.preventDefault();
        var page = $('#imdb').attr('data-page');
        page = Number(page);
        page = page + 1;
        $('#imdb').attr('data-page', page);
        //alert('current page' + $('#imdb').attr('data-page'));

        var releaseDate = $('#datepicker').val();
        getMovie(releaseDate);
    });

    //scroll top
    $('.btn-backsearch').on('click', function(e) {
        e.preventDefault();
        $(window).scrollTop(0);
    });

    // get credits
    function getCredits() {
        
        var movieBox = $('.movie-box .movie-cast');    
        var movieId = $('.movie-box').attr('id');
        console.log(movieBox.length);

        $.ajax({
            dataType: 'json',
            url: "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=9afcbfc4caf1d317295d6506444725ca",
            success: function (movie, status) {
                console.log(movie)
                
                for (i = 0; i < $('.movie-box').length; i++) {

                    var movieId = $($('.movie-box')[2]).attr('id');
                    console.log(movieId);

                    $(movieBox).append(
                        movie.cast[i].name + ', '
                    );

                }
            },
            error: function(status) {
                console.log('error: ' + status);
            }
        });
    };
});