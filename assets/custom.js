$(document).ready(function() {

    console.log('jquery working!');

    initialize();

    //get url params
    function getParams() {
        var url = window.location.href;
        var releaseParam = url.split('=');
        releaseParam.shift();
        console.log('releaseParam: ' + releaseParam)

        if (url.indexOf('?release=') > 0) {
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
    $('#datepicker').datepicker({ format: "yyyy-mm-dd" });
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
    $('#submit').on('click', function(e) {
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
            'background-repeat': 'repeat-y',
            'background-size': '100%',
            'background-position': 'center top',
            'padding-bottom': '0px'
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
        $('.main-title').addClass('mini');

        

        $.ajax({
            dataType: 'json',
            async: true,
            url: "https://api.themoviedb.org/4/discover/movie?page=1&include_video=true&include_adult=true&sort_by=release_date.desc&language=en-US&api_key=c4a7e818fe724bcddb380f1c88cb8464&release_date.lte=" + releaseDate + '&page=' + page,
            success: function(discover, status) {
                console.log("releaseDate: " + releaseDate);
                console.log(discover);

                var releaseYear = releaseDate.slice(0, 4);

                for (i = 0; i < discover.results.length; i++) {
                    $('#imdb').append(
                        '<section class=\"movie-box animated fadeIn slow\" id=\"' + discover.results[i].id + '\">' +
                        '<div class=\"row\">' +
                        '<div class="col-lg-5 col-sm-4 col-12 pl-0 pr-0">' +
                            '<a href=\"http://www.youtube.com/results?search_query=' + discover.results[i].original_title + ' ' + releaseYear + ' movie full\" target="_blank"><div class="poster">' +
                                '<img class="img-fluid" src=\"https://image.tmdb.org/t/p/w500' + discover.results[i].poster_path + '\" />' +
                            '</div> </a>' +
                        '</div>' +
                        '<div class="col-lg-7 col-sm-8 col-12 pr-4 movie-details">' +
                            '<p class=\"title\">' + discover.results[i].original_title + '</p>' +
                            '<p class=\"release-date\"><span class="bday-cake"><i class="fas fa-birthday-cake d-none mr-2"></i></span><b>RELEASE DATE:</b> <time>' + discover.results[i].release_date + '</time></span></p>' +
                            '<p class=\"overview\"><b>OVERVIEW:</b> ' + discover.results[i].overview + '</p>' +
                            // '<p class=\"movie-id\"> ID: ' + discover.results[i].id + '</p>' +
                            '<p class=\"movie-cast\"><b>CAST:<\/b> </p>' +
                            '<p class=\"movie-crew\"><b>DIRECTOR:</b> </p>' +
                            '<a class="text-bold" href=\"http://www.youtube.com/results?search_query=' + discover.results[i].original_title + ' ' + releaseYear + ' movie full\" target="_blank"> <i class="fas fa-film"></i> WATCH MOVIE</a>' +
                            '</div>' +
                        '</div>' +
                        '</section>'
                    );

                    //bday cake
                    $('.release-date').each(function(i) {
                        //console.log('index' + i);
                        if ($(this).text().indexOf(releaseDate) > 0) {
                            $(this).find('.fa-birthday-cake').removeClass('d-none');
                            //console.log('bday today!!!!');
                        } else {
                            //console.log('no bday today!!!!');
                        }
                    });
                };

                getCasting();

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
            success: function(discover, status) {

                //now showing
                $.ajax({
                    dataType: 'json',
                    async: true,
                    url: "https://api.themoviedb.org/4/discover/movie?page=1&include_video=true&include_adult=true&sort_by=release_date.desc&language=en-US&api_key=c4a7e818fe724bcddb380f1c88cb8464&release_date.lte=" + releaseDate,
                    success: function(discover, status) {

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
        

        var releaseDate = $('#datepicker').val();
        getMovie(releaseDate);

        //$('html, body').animate({scrollTop: '+=350px'}, 800);
    });

    //scroll top
    $('.btn-backsearch').on('click', function(e) {
        e.preventDefault();
        $(window).scrollTop(0);
    });

    // get casting
    function getCasting() {
        $('.movie-box').each(function(y) {
            //console.log('y ' + y);
            var movieId = $(this).attr('id');
            $('#' + movieId).each(function(z) {
                //console.log('z ' + z);

                //get cast
                $.ajax({
                    dataType: 'json',
                    url: "https://api.themoviedb.org/3/movie/" + movieId + "/credits?api_key=9afcbfc4caf1d317295d6506444725ca",
                    success: function(movie, status) {
                        //console.log(movie);
                        //console.log('movieId ' + movieId);

                        for (x = 0; x < 5; x++) {
                            $('#' + movieId).find('.movie-cast').append(
                                movie.cast[x].name + ', '
                            );  
                        };

                        var json = movie.crew[0].name;
                        var newJson = json.replace(undefined, "Not Available")
                        $('#' + movieId).find('.movie-crew').append(newJson);

                        console.log('crew ' + movie.crew[x].name);


                    },
                    error: function(status) {
                        console.log('error status: ' + status);
                    }
                });
                //end cast

            });
        });
    };

});