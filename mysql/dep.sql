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

 Date: 17/04/2020 20:23:07
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
INSERT INTO `dep` VALUES (2, '无部门', 1);
INSERT INTO `dep` VALUES (3, '沈阳工业大学', 2);
INSERT INTO `dep` VALUES (4, '校部', 3);
INSERT INTO `dep` VALUES (5, '学生会', 3);

SET FOREIGN_KEY_CHECKS = 1;
