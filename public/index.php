<?php

$action = trim($_SERVER['REQUEST_URI'], '/');

ob_start();

if($action == 'play') {
    require('../actions/play.php');
    $title = 'Play Tangle';
}

$content = ob_get_clean();

require '../layout.php';