/*
Navicat MySQL Data Transfer

Source Server         : localhost_1706
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : dionly

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-09-29 12:07:15
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `identifier` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) unsigned DEFAULT NULL COMMENT '商品原价',
  `sale_price` decimal(10,2) unsigned DEFAULT NULL COMMENT '商品销售价',
  `imgurl` varchar(255) DEFAULT NULL COMMENT '商品图片地址',
  `diamond_qty` int(10) unsigned DEFAULT NULL COMMENT '镶嵌的钻石数量',
  `weight` decimal(4,2) unsigned DEFAULT NULL,
  `type` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '商品类型',
  `add_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=41 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '梦帘', 'DRW010229D', '17951.00', '9448.00', '../images/goods2.jpg', '120', '1.00', '女戒', '2017-09-28 10:27:32');
INSERT INTO `goods` VALUES ('2', '金玉良缘', 'DRW010282D', '13533.00', '7123.00', '../images/goods4.jpg', '35', '0.60', '女戒', '2017-09-28 10:32:38');
INSERT INTO `goods` VALUES ('3', '苹果情缘', 'DRW010485D', '13504.00', '7107.00', '../images/goods5.jpg', '122', '0.57', '女戒', '2017-09-28 10:33:31');
INSERT INTO `goods` VALUES ('4', '心路铭记', 'DMW011850D', '16497.00', '8682.00', '../images/goods3.jpg', '44', '0.40', '男戒', '2017-09-28 10:35:08');
INSERT INTO `goods` VALUES ('5', '爱情手镯', 'DBW134533D', '19841.00', '10443.00', '../images/goods1.jpg', '166', '0.60', '手链/手镯', '2017-09-29 11:05:28');
INSERT INTO `goods` VALUES ('6', '美丽诱惑', 'DRW010494D', '12451.00', '6553.00', '../images/goods6.jpg', '32', '0.48', '女戒', '2017-09-28 10:44:14');
INSERT INTO `goods` VALUES ('7', '艳露凝香', 'DRW010217D', '12066.00', '6350.00', '../images/goods7.jpg', '58', '0.68', '女戒', '2017-09-28 10:45:26');
INSERT INTO `goods` VALUES ('8', '镜花缘', 'DPW011960D', '11788.00', '6266.00', '../images/goods8.jpg', '60', '0.42', '吊坠', '2017-09-28 11:02:23');
INSERT INTO `goods` VALUES ('9', '雪天使', 'DRW010264D', '11639.00', '6126.00', '../images/goods9.jpg', '40', '0.45', '女戒', '2017-09-28 10:48:17');
INSERT INTO `goods` VALUES ('10', '盛世', 'DRW010269D', '11093.00', '5839.00', '../images/goods10.jpg', '31', '0.38', '女戒', '2017-09-28 10:50:51');
INSERT INTO `goods` VALUES ('11', '爱的絮语', 'DRW010490D', '10661.00', '5611.00', '../images/goods11.jpg', '32', '0.48', '女戒', '2017-09-28 10:51:37');
INSERT INTO `goods` VALUES ('12', '宠爱', 'DRW010490D', '10461.00', '5511.00', '../images/goods12.jpg', '32', '0.48', '女戒', '2017-09-28 10:52:01');
INSERT INTO `goods` VALUES ('13', '花样', 'DRW010490D', '10361.00', '5411.00', '../images/goods13.jpg', '5', '0.50', '女戒', '2017-09-28 10:52:33');
INSERT INTO `goods` VALUES ('14', '百媚生', 'DRW010490D', '10119.00', '5299.00', '../images/goods14.jpg', '5', '0.50', '女戒', '2017-09-28 10:52:57');
INSERT INTO `goods` VALUES ('15', '花醉', 'DRW010490D', '10181.00', '5358.00', '../images/goods15.jpg', '31', '0.38', '吊坠', '2017-09-28 11:11:10');
INSERT INTO `goods` VALUES ('16', '繁花流年', 'DRW010822D', '9960.00', '5256.00', '../images/goods16.jpg', '31', '0.38', '女戒', '2017-09-28 10:55:16');
INSERT INTO `goods` VALUES ('17', '独依吾爱', 'DRW010822D', '9689.00', '4942.00', '../images/goods20.jpg', '5', '0.50', '女戒', '2017-09-28 11:00:55');
INSERT INTO `goods` VALUES ('18', '让爱闪耀', 'DRW010822D', '9683.00', '4948.00', '../images/goods21.jpg', '5', '0.50', '女戒', '2017-09-28 11:00:51');
INSERT INTO `goods` VALUES ('19', '名士物语', 'DMW011845D', '9960.00', '5424.00', '../images/goods17.jpg', '8', '0.80', '男戒', '2017-09-28 11:00:47');
INSERT INTO `goods` VALUES ('20', '气质非凡', 'DMW014845D', '9860.00', '5656.00', '../images/goods18.jpg', '88', '0.66', '男戒', '2017-09-28 11:00:43');
INSERT INTO `goods` VALUES ('21', '清辉荡漾', 'DMW014845D', '6243.00', '4823.00', '../images/goods22.jpg', '88', '0.66', '吊坠', '2017-09-28 11:03:38');
INSERT INTO `goods` VALUES ('22', '守护神之星', 'DMW014845D', '8243.00', '4323.00', '../images/goods23.jpg', '48', '0.46', '吊坠', '2017-09-28 11:04:08');
INSERT INTO `goods` VALUES ('23', '布拉格之春', 'DM3514845D', '6432.00', '3623.00', '../images/goods24.jpg', '46', '0.86', '吊坠', '2017-09-28 11:04:57');
INSERT INTO `goods` VALUES ('24', '坠流星', 'DM3514845D', '6132.00', '3523.00', '../images/goods25.jpg', '126', '0.86', '吊坠', '2017-09-28 11:05:44');
INSERT INTO `goods` VALUES ('25', '皓质呈露', 'DM3514845D', '4835.00', '2683.00', '../images/goods26.jpg', '26', '0.56', '吊坠', '2017-09-28 11:12:06');
INSERT INTO `goods` VALUES ('26', '白马王子', 'DM3514845D', '17835.00', '9683.00', '../images/goods27.jpg', '126', '0.20', '男戒', '2017-09-28 11:13:10');
INSERT INTO `goods` VALUES ('27', '淳朴气质', 'DM3514845D', '13835.00', '7683.00', '../images/goods28.jpg', '108', '0.48', '男戒', '2017-09-28 11:14:06');
INSERT INTO `goods` VALUES ('28', '神采奕奕', 'DM3514845D', '11835.00', '7283.00', '../images/goods29.jpg', '100', '0.48', '男戒', '2017-09-28 11:14:54');
INSERT INTO `goods` VALUES ('29', '俊朗才意', 'DM3514845D', '10835.00', '6988.00', '../images/goods30.jpg', '66', '0.68', '男戒', '2017-09-28 11:15:38');
INSERT INTO `goods` VALUES ('30', '王者之光', 'DM3514845D', '9888.00', '6888.00', '../images/goods31.jpg', '68', '0.68', '男戒', '2017-09-28 11:16:19');
INSERT INTO `goods` VALUES ('31', '刚柔并济', 'DM3514845D', '9468.00', '6588.00', '../images/goods32.jpg', '4', '0.48', '男戒', '2017-09-28 11:16:54');
INSERT INTO `goods` VALUES ('32', '朴实无华', 'DMW011918D', '7468.00', '5588.00', '../images/goods33.jpg', '47', '0.48', '男戒', '2017-09-28 11:18:03');
INSERT INTO `goods` VALUES ('33', '夜来香', 'DMW531918D', '2468.00', '1588.00', '../images/goods34.jpg', '6', '0.28', '耳饰', '2017-09-29 11:04:17');
INSERT INTO `goods` VALUES ('34', '缠绕', 'DMW531918D', '2368.00', '1488.00', '../images/goods35.jpg', '6', '0.24', '耳饰', '2017-09-29 11:04:19');
INSERT INTO `goods` VALUES ('35', '玫瑰爱语', 'DMW532918D', '2168.00', '1468.00', '../images/goods36.jpg', '4', '0.24', '耳饰', '2017-09-29 11:04:21');
INSERT INTO `goods` VALUES ('36', '花田故事', 'DMW532918D', '2068.00', '1428.00', '../images/goods37.jpg', '4', '0.24', '耳饰', '2017-09-29 11:04:23');
INSERT INTO `goods` VALUES ('37', '心之魅影', 'DMW532918D', '1668.00', '1228.00', '../images/goods38.jpg', '4', '0.24', '耳饰', '2017-09-29 11:04:24');
INSERT INTO `goods` VALUES ('38', '比翼', 'DMW533918D', '1568.00', '1128.00', '../images/goods39.jpg', '4', '0.24', '耳饰', '2017-09-29 11:04:25');
INSERT INTO `goods` VALUES ('39', '恋恋花情', 'DMW533918D', '1558.00', '1157.00', '../images/goods40.jpg', '4', '0.24', '耳饰', '2017-09-29 11:04:28');
INSERT INTO `goods` VALUES ('40', '一心一意项链', 'DMW533218D', '1558.00', '1157.00', '../images/goods41.jpg', '56', '1.24', '项链/链牌', '2017-09-29 11:05:40');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `username` varchar(30) CHARACTER SET utf8 NOT NULL,
  `password` varchar(255) NOT NULL DEFAULT '123456',
  `add_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('000001', '15555555555', '6addaf7ecc02c1e5903520029e750937', '2017-09-28 09:47:59');
SET FOREIGN_KEY_CHECKS=1;
