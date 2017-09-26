<?php 

  header("Content-Type:text/html;charset=utf-8");

  if(isset($_REQUEST['code_char'])){
    session_start();
    if(strtolower($_REQUEST['code_char'])== $_SESSION['helloweba_num']){
      echo "1";

    }else{
      echo "0";

    }
    exit();
  }
?>