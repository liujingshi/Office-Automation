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

 Date: 17/04/2020 13:47:07
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
  `up_dep_id` int(11) NOT NULL,
  PRIMARY KEY (`dep_id`) USING BTREE,
  UNIQUE INDEX `only`(`dep_name`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dep
-- ----------------------------
INSERT INTO `dep` VALUES (1, '总系统', 0);
INSERT INTO `dep` VALUES (2, '沈阳工业大学', 1);
INSERT INTO `dep` VALUES (3, '学生会', 2);
INSERT INTO `dep` VALUES (4, '校部', 2);
INSERT INTO `dep` VALUES (5, '社会实践部', 3);

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file`  (
  `file_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `file_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `file_path` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`file_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of file
-- ----------------------------
INSERT INTO `file` VALUES (1, '个人简历.docx', '20200415\\07ef9eea1b1ff6475976f197f5c25362.docx');
INSERT INTO `file` VALUES (2, '文件啦.txt', '20200415\\e9b4a9d2046e8ec0873303e2782fa657.txt');
INSERT INTO `file` VALUES (3, '又是新文件.jpg', '20200415\\5c52f301090ca800126759e0d5dd5f9f.jpg');
INSERT INTO `file` VALUES (4, '就是这个附件了.pdf', '20200415\\cb162d1b9682ac70d4c6d2c803f888ea.pdf');
INSERT INTO `file` VALUES (5, '阅读简历已完成.docx', '20200416\\e77dbda5ae81d177b46501ee3684c2e7.docx');

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
) ENGINE = MyISAM AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pos
-- ----------------------------
INSERT INTO `pos` VALUES (1, '系统管理员');
INSERT INTO `pos` VALUES (2, '校长');
INSERT INTO `pos` VALUES (3, '特级教师');
INSERT INTO `pos` VALUES (4, '教授');
INSERT INTO `pos` VALUES (5, '普通教师');
INSERT INTO `pos` VALUES (6, '后勤管理员');
INSERT INTO `pos` VALUES (7, '保洁');

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
  `task_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `task_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `task_file_id` int(11) NOT NULL DEFAULT 0,
  `task_ok_text` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `task_ok_file_id` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`task_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES (1, 1, 1, 3, '发布一个任务', '这个任务很重要一定要加紧完成', 0, '已经完成 请检查', 5);
INSERT INTO `task` VALUES (2, 1, 1, 3, '阅读简历', '把这篇简历读了\n非常好', 1, '该简历堪称完美', 5);

-- ----------------------------
-- Table structure for task_status
-- ----------------------------
DROP TABLE IF EXISTS `task_status`;
CREATE TABLE `task_status`  (
  `task_status_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `task_status_no` int(11) NOT NULL DEFAULT 0,
  `task_status_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`task_status_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of task_status
-- ----------------------------
INSERT INTO `task_status` VALUES (1, 0, '未领取');
INSERT INTO `task_status` VALUES (2, 1, '进行中');
INSERT INTO `task_status` VALUES (3, 2, '检查中');
INSERT INTO `task_status` VALUES (4, 3, '已完成');

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
INSERT INTO `user` VALUES (1, 'oH2t55PU9U4um_VfDBAmaNm0fGh8', 'Handsome grows old quickly', 'https://wx.qlogo.cn/mmopen/vi_32/9SHJBXhNkvOW04uoqboOnBeibv7W454usnGhkySapAIJHEbdNj3XE45ia4SzjicnCFj4R3SHwrS92jfH17MlrBr9Q/132', 2, 1, 1);

SET FOREIGN_KEY_CHECKS = 1;
