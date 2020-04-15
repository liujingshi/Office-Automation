<?php
namespace app\download\controller;

use think\Db;
use think\Request;



class Index {

    public function index() {
        $fileId = request()->param()['file_id'];
        $fileDb = Db::table("file")->where("file_id", $fileId)->select();
        $filePath = ROOT_PATH . 'public' . DS . 'files' . DS . $fileDb[0]['file_path'];
        $file = fopen($filePath, "rb");
        Header ( "Content-type: application/octet-stream" ); 
        Header ( "Accept-Ranges: bytes" );
        Header ( "Accept-Length: " . filesize ( $filePath ) );
        Header ( "Content-Disposition: attachment; filename=" . $fileDb[0]['file_name'] );
        echo fread ( $file, filesize ( $filePath ) );
        fclose ( $file );    
        // redirect($filePath);
    }

}
