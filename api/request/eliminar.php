<?php
    header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json, charset=utf-8');

    include_once '../clases/conexion.php';

    $datos = json_decode(file_get_contents("php://input"),true);
    
    $conexion=new Conexion();
    $query="DELETE FROM motivos_es_gt
            WHERE motivo=".$datos['motivo'];
    $res=pg_query( $conexion->getConexion(), $query );
    if($res){
        echo json_encode(array('exito'=>true, 'mensaje'=>'Editado con exito'));
    }else{
        echo json_encode(array('exito'=>false, 'mensaje'=>'Error editando'));
    }
    
?>