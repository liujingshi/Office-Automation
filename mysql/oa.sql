/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100410
 Source Host           : localhost:3306
 Source Schema         : oa

 Target Server Type    : MySQL
 Target Server Version : 100410
 File Encoding         : 65001

 Date: 14/04/2020 19:56:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cont
-- ----------------------------
DROP TABLE IF EXISTS `cont`;
CREATE TABLE `cont`  (
  `cont_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `cont_user_id` int(11) NOT NULL,
  PRIMARY KEY (`cont_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Table structure for dep
-- ----------------------------
DROP TABLE IF EXISTS `dep`;
CREATE TABLE `dep`  (
  `dep_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `dep_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`dep_id`) USING BTREE,
  UNIQUE INDEX `only`(`dep_name`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dep
-- ----------------------------
INSERT INTO `dep` VALUES (1, '总系统');

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `file_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `file_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`file_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for info
-- ----------------------------
DROP TABLE IF EXISTS `info`;
CREATE TABLE `info`  (
  `info_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `info_datetime` datetime(0) NOT NULL,
  `info_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `info_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `file_id` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`info_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of info
-- ----------------------------
INSERT INTO `info` VALUES (1, 1, '2020-04-14 15:15:07', '这是一个公告', '公告 公告公告公告公告公告公告 公告公告公告公告公告公告 公告公告公告公告公告公告 公告公告公告公告公告', 0);
INSERT INTO `info` VALUES (2, 1, '2020-04-14 15:16:06', '超级公告', '超级公告超级公告超级公告超级公告超级公告超级公告超级公告超级公告超级公告超级公告', 0);
INSERT INTO `info` VALUES (3, 1, '2020-04-14 16:50:53', '这是一个啦啦啦公告', '这是一个啦啦啦公告', 0);
INSERT INTO `info` VALUES (4, 1, '2020-04-14 17:09:38', '震惊！24岁小伙在公园竟然对80岁大妈做出这样的事情...', '哈哈哈哈，你没有猜错，我就是UC震惊部的！', 0);
INSERT INTO `info` VALUES (5, 1, '2020-04-14 19:51:42', '震惊！', '震惊！！！', 0);
INSERT INTO `info` VALUES (6, 1, '2020-04-14 19:53:59', '21341212', '421342342', 0);
INSERT INTO `info` VALUES (7, 1, '2020-04-14 19:54:58', '2435435', '345635', 0);
INSERT INTO `info` VALUES (8, 1, '2020-04-14 19:55:30', '678967997', '67868766', 0);

-- ----------------------------
-- Table structure for msg
-- ----------------------------
DROP TABLE IF EXISTS `msg`;
CREATE TABLE `msg`  (
  `msg_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `from_user_id` int(11) NOT NULL,
  `to_user_id` int(11) NOT NULL,
  `msg_text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `msg_datetime` datetime(0) NOT NULL,
  `msg_read` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`msg_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for pos
-- ----------------------------
DROP TABLE IF EXISTS `pos`;
CREATE TABLE `pos`  (
  `pos_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `pos_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`pos_id`) USING BTREE,
  UNIQUE INDEX `only`(`pos_name`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pos
-- ----------------------------
INSERT INTO `pos` VALUES (1, '系统管理员');

-- ----------------------------
-- Table structure for power
-- ----------------------------
DROP TABLE IF EXISTS `power`;
CREATE TABLE `power`  (
  `power_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `power_level` int(11) NOT NULL DEFAULT 0,
  `power_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`power_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of power
-- ----------------------------
INSERT INTO `power` VALUES (1, 0, '普通用户');
INSERT INTO `power` VALUES (2, 1, '系统管理员');

-- ----------------------------
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task`  (
  `task_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `from_user_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT 0,
  `task_status_no` int(11) NOT NULL DEFAULT 0,
  `task_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `task_file_id` int(11) NOT NULL DEFAULT 0,
  `task_ok_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `task_ok_file_id` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`task_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `open_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `user_head` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `power_level` int(11) NOT NULL DEFAULT 0,
  `dep_id` int(11) NOT NULL,
  `pos_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'oH2t55PU9U4um_VfDBAmaNm0fGh8', 'Handsome grows old quickly', 'https://wx.qlogo.cn/mmopen/vi_32/9SHJBXhNkvOW04uoqboOnBeibv7W454usnGhkySapAIJHEbdNj3XE45ia4SzjicnCFjL8jCf6l1I0wqkfXXiceVgibw/132', 1, 1, 1);

SET FOREIGN_KEY_CHECKS = 1;
