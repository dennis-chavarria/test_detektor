<?php
    header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json, charset=utf-8');

    include_once '../clases/conexion.php';

    $motivos=array();
    $conexion=new Conexion();
    $query='select *
            from motivos_es_gt';

    $res=pg_query( $conexion->getConexion(), $query );

    if ($res) {
        if( pg_num_rows($res) > 0 ){
          while( $obj = pg_fetch_object($res) ){
            array_push($motivos,$obj);
          }
        }
    }

    echo json_encode($motivos);
?>