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

 Date: 17/04/2020 20:23:14
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
INSERT INTO `pos` VALUES (2, '无职业');
INSERT INTO `pos` VALUES (3, '特级教师');
INSERT INTO `pos` VALUES (4, '教授');
INSERT INTO `pos` VALUES (5, '普通教师');
INSERT INTO `pos` VALUES (6, '后勤管理员');
INSERT INTO `pos` VALUES (7, '保洁');

SET FOREIGN_KEY_CHECKS = 1;
