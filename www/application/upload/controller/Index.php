<?php
namespace app\upload\controller;

use think\Db;
use think\Request;

header('Content-Type: text/html;charset=utf-8');
header('Access-Control-Allow-Origin:*'); // *代表允许任何网址请求
header('Access-Control-Allow-Methods:POST,GET,OPTIONS,DELETE'); // 允许请求的类型
header('Access-Control-Allow-Credentials: true'); // 设置是否允许发送 cookies
header('Access-Control-Allow-Headers: Content-Type,Content-Length,Accept-Encoding,X-Requested-with, Origin'); // 设置允许自定义请求头的字段

class Index {

    public function index() {
        $file = request()->file('file');
        if ($file) {
            $info = $file->move(ROOT_PATH . 'public' . DS . 'files');
            if ($info) {
                $data = [
                    "file_name" => request()->param()['title'] . '.' . explode(".", $info->getSaveName())[count(explode(".", $info->getSaveName())) - 1],
                    "file_path" => $info->getSaveName()
                ];
                Db::table("file")->insert($data);
                return '{"code": 1}';
            } else {
                return '{"code": 0}';
            }
        }
    }

}
