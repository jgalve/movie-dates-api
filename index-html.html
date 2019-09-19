<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous">

    <link href="https://fonts.googleapis.com/css?family=Lato:400,900&amp;display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Oswald&amp;display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.standalone.min.css" integrity="sha256-jO7D3fIsAq+jB8Xt3NI5vBf3k4tvtHwzp8ISLQG4UWU=" crossorigin="anonymous" />

    <title>MOVIE RELEASE DATES</title>
</head>

<style>
    body {background: #252525;}
    p {line-height: 20px; color: #ccc;}
    h1 {color: #f78926; font-family: 'Oswald', sans-serif;  text-shadow: 2px 2px 3px #000;}
    .title {font-weight: bold; font-size: 25px; line-height: 27px; border-bottom: 1px solid #909090; padding: 2px 0px 7px 0px; margin-bottom: 5px;}
    .release-date {font-size: 13px; font-style: italic;}
    .search-bar {align-items: center;  padding: 0px 15px; display: flex; flex-direction: row;
        height: auto;}
    .centered {align-content:center; height: calc(100vh - 40px); flex-direction: column;justify-content: center;}
    #datepicker {background: #000000;
        color: #d0b141;
        border: 1px solid #e0cfcf;
        font-weight: bold;
        font-size: 23px;
        padding: 5px;
        letter-spacing: 5px;
        line-height: 14px;
        box-shadow: none !important;
        height: 45.5px;}
    #submit {padding: 10px 17px; 
        font-weight: bold;
        background: #545454;
        border: #545454;
        box-shadow: none !important;}
    #imdb {background: rgba(0, 0, 0, 0.7); padding: 0px 15px;}
    .main-container {background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        padding-bottom: 40px;
    }
    .movie-box {display:inline-block; vertical-align: top; width: 33.333%;padding: 0px 15px;}
    .poster {    width: 100%;
        background: #000;
        min-height: 348px;
        padding-left: 0px;
        box-shadow: 1px 1px 5px #000;
        padding-right: 0px;}
</style>

<body>
    <main class="main-container">
        <div class="search-bar centered">

            <div class="pt-1  text-center">
                <h1 class="ml-3 mr-3">MOVIE RELEASE DATES</h1>
            </div>

            <form class="form-inline text-center align-items-center justify-content-center">
                <input type="text" class="form-control mr-2 text-center" id="datepicker" value="">
                <button type="submit" id="submit" class="btn btn-primary ">SEARCH</button>
            </form>


        </div>

        <div id="imdb"></div>

    </main>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js" integrity="sha256-bqVeqGdJ7h/lYPq6xrPv/YGzMEb6dNxlfiTUHSgRCp8=" crossorigin="anonymous"></script>
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
        crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
        crossorigin="anonymous"></script>

    <script type="text/javascript">
        $(document).ready(function () {

            initialize();
            let today = new Date().toISOString().substr(0, 10);
            document.querySelector("#datepicker").value = today;

            //datepicker
            $('#datepicker').datepicker({format: "yyyy-mm-dd"});
            $('#datepicker').on('changeDate', function() {
                $(this).val(
                    $(this).datepicker('getFormattedDate')
                );
                //$('#imdb').empty();
                console.log("datepicker: " + $(this).val());
            });

            //get imdb
            $('#submit').on('click', function (e) {
                e.preventDefault();
                $('.search-bar').removeClass('centered');
                $('.main-container').css({
                    'background-repeat':'repeat-y',
                    'background-size':'cover',
                    'background-position':'center top '
                });
                $('#imdb').empty().css('min-height', 'calc(100vh - 60px)');
                getMovie();
            });

            // get movie
            function getMovie() {
                var releaseDate = $('#datepicker').val();
                
                $.ajax({
                    dataType: 'json',
                    async: true,
                    url: "https://api.themoviedb.org/4/discover/movie?page=1&include_video=true&include_adult=true&sort_by=release_date.desc&language=en-US&api_key=c4a7e818fe724bcddb380f1c88cb8464&release_date.lte=" + releaseDate,
                    success: function (discover, status) {
                        console.log("releaseDate: " + releaseDate);
                        console.log(discover);
                        
                        for (i = 0; i < discover.results.length; i++) {
                            $('#imdb').append(
                                '<section class="movie-box">' +
                                    '<div class=\"row\">' +
                                        '<div class="col-lg-6 col-sm-6 col-xs-12 mt-4 pl-0 pr-0">' +
                                            '<div class="poster">' +
                                                '<img class="img-fluid" src=\"https://image.tmdb.org/t/p/w342' + discover.results[i].poster_path + '\" />' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="col-lg-6 col-sm-6 col-xs-12 pr-4 mt-4 movie-details">' +
                                            '<p class=\"title\">' + discover.results[i].original_title + '</p>' +
                                            '<p class=\"release-date\"><b>RELEASE DATE:</b> ' + discover.results[i].release_date + '</p>' +
                                            '<p class=\"overview\"><b>OVERVIEW:</b> ' + discover.results[i].overview + '</p>' +
                                        '</div>' +
                                    '</div>' +
                                '</section>'
                            );  
                        };
                    },
                    error: function(status) {
                        alert('error: ' + status);
                    }
                });
            };

            //initial movie
            function initialize() {
                var releaseDate = $('#datepicker').val();

                $.ajax({
                    dataType: 'json',
                    async: true,
                    url: "https://api.themoviedb.org/4/discover/movie?page=1&include_video=true&include_adult=true&sort_by=popularity.desc&language=en-US&api_key=c4a7e818fe724bcddb380f1c88cb8464&release_date.lte=" + releaseDate,
                    success: function (discover, status) {                      
                        //alert('asd');
                        for (i = 0; i < discover.results.length; i++) {
                            $('.main-container').css('background-image', 'url(\"https://image.tmdb.org/t/p/original' + discover.results[0].poster_path + '\")');
                        };

                    },
                    error: function(status) {
                        alert('error: ' + status);
                    }
                });
            };

            // get credits
            function getCredits() {
                //var creditId = discover.results.id;
                
                $.ajax({
                    dataType: 'json',
                    url: "https://api.themoviedb.org/4/credit/&api_key=9afcbfc4caf1d317295d6506444725ca" + creditId,
                    success: function (credit, status) {
                        console.log("creditId: " + credit);
                        console.log(credit);
                        
                        for (i = 0; i < credit.results.length; i++) {
                            $('.movie-details').append(
                                '<p><b>RELEASE DATE:<\/b> ' + credit.credit_type + '</p>'
                            );
                        }
                    },
                    error: function(status) {
                        console.log('error: ' + status);
                    }
                });
            };
        });

    </script>

</body>

</html>