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

 Date: 17/04/2020 20:25:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `open_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'USER',
  `user_head` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `power_level` int(11) NOT NULL DEFAULT 0,
  `dep_id` int(11) NOT NULL DEFAULT 2,
  `pos_id` int(11) NOT NULL DEFAULT 2,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'oH2t55PU9U4um_VfDBAmaNm0fGh8', 'Handsome grows old quickly', 'https://wx.qlogo.cn/mmopen/vi_32/9SHJBXhNkvOW04uoqboOnBeibv7W454usnGhkySapAIJHEbdNj3XE45ia4SzjicnCFj4R3SHwrS92jfH17MlrBr9Q/132', 2, 1, 1);

SET FOREIGN_KEY_CHECKS = 1;
