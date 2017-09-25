<?php
/**
 * @Author: Marte
 * @Date:   2017-09-25 20:54:57
 * @Last Modified by:   Marte
 * @Last Modified time: 2017-09-25 21:10:22
 */

  header("Content-Type:text/html;charset=utf-8");      //设置头部信息
  //isset()检测变量是否设置
  echo "yes";
  if(isset($_REQUEST['helloweba_num'])){
    session_start();
    //strtolower()小写函数
    if(strtolower($_REQUEST['helloweba_num'])== $_SESSION['helloweba_num']){
      //跳转页面
      echo "yes";

    }else{
      //提示以及跳转页面
      echo "no";

    }
    exit();
  
?>