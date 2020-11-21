<?php
    header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type');
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json, charset=utf-8');

    include_once '../clases/conexion.php';

    $datos = json_decode(file_get_contents("php://input"),true);
    
    $conexion=new Conexion();
    $query="INSERT INTO motivos_es_gt(motivo, des_motivo, estado, tipo)
            VALUES(".$datos['motivo'].", '".$datos['des_motivo']."', '".$datos['estado']."', '".$datos['tipo']."')";
    $res=pg_query( $conexion->getConexion(), $query );
    if($res){
        echo json_encode(array('exito'=>true, 'mensaje'=>'Guardado con exito'));
    }else{
        echo json_encode(array('exito'=>false, 'mensaje'=>'Error guardando'));
    }
    
?>