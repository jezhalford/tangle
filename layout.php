<!DOCTYPE html>
<html>
  <head>
    <title><?php echo $title?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/css/bootstrap-combined.min.css" rel="stylesheet">
    <link href="/style.css" rel="stylesheet">
    <script src="//code.jquery.com/jquery-1.9.1.min.js"></script>
  </head>
  <body>
    <div class="navbar navbar-inverse">
      <div class="navbar-inner">
        <div class="container">
          <a class="brand" href="/">Tangle</a>
        </div>
      </div>
    </div>

    <div class="container">
      <?php
        echo $content;
      ?>
    </div> <!-- /container -->
    <script src="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/js/bootstrap.min.js"></script>
  </body>
</html>