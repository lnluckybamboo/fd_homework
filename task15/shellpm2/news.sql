-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-05-12 10:07:05
-- 服务器版本： 10.1.10-MariaDB
-- PHP Version: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phplesson`
--

-- --------------------------------------------------------

--
-- 表的结构 `news`
--

CREATE TABLE `news` (
  `newsid` int(11) NOT NULL,
  `newstitle` varchar(100) NOT NULL,
  `newsimg` varchar(200) DEFAULT NULL,
  `newscontent` text NOT NULL,
  `addtime` date NOT NULL,
  `newstype` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='新闻表';

--
-- 转存表中的数据 `news`
--

INSERT INTO `news` (`newsid`, `newstitle`, `newsimg`, `newscontent`, `addtime`, `newstype`) VALUES
(1, '2022年冬奥会张家口主场馆设计方案公布', 'http://imgpolitics.gmw.cn/attachement/jpg/site2/20160423/d02788d8dd6b1885669147.jpg', '本报讯（京报集团记者耿诺）张家口市政府昨天与北京市建筑设计研究院有限公司举行了张家口市奥体中心签约仪式。今年年初，张家口市城乡规划局公布了该市奥体中心最终入围的5个设计方案，为提升设计方案的合理性和群众满意度，启动了网友投票。由北京市建筑设计研究院有限公司报送的“活力冰雪、激情四射”主题获得了超过8万票，最终中标。', '2016-04-23', 0),
(2, '公务员省考招考人数超14万 城管成最热岗位之一', 'http://www.vistastory.com/uploads/20160423/1461374165961188.jpg', '中新网北京4月23日电今天，全国25个省份将举行2016年公务员招录笔试，总招考人数超过14万，一些岗位的竞争程度高达“千里挑一”。今年，多省份明确在职公务员不得报考，公务员招录仅向“体制外”开放。此外，部分省份还放宽了报考的户籍限制。', '2016-04-23', 0),
(3, '香港裁定阿里收购中信21交易违规', '', '针对香港收购和并购委员会的裁定，阿里巴巴称阿里健康业务不受影响，正在考虑提起司法复核可能性。此前阿里健康卷入药品监管码数据倒卖风波，其代理运营权被收回', '2016-04-26', 1),
(4, '科技公司国企化，还是国企科技公司化？', 'http://e.hiphotos.baidu.com/news/q=100/sign=8f1d576465d9f2d3261120ef99ee8a53/023b5bb5c9ea15cec23a888cb1003af33b87b25b.jpg', '国企能具有企业家精神的前提，是中国向着更市场化，更法治化的方向走。在此之前，国企很难变得像互联网公司。反过来说，如果互联网企业躲在了牌照与行政许可的庇护之下，那对本身的企业精神的伤害是巨大的。', '2016-04-26', 0),
(5, '苹果拐点到了吗？', '', '苹果在产品上依旧保持着领先性。', '2016-04-28', 1),
(6, '苹果拐点到了吗？', 'http://b.hiphotos.baidu.com/news/q=100/sign=0e8ba669d600baa1bc2c43bb7711b9b1/faedab64034f78f06680f1767e310a55b2191caf.jpg', '苹果在产品上依旧保持着领先性。', '2016-04-28', 0),
(7, '000', 'https://www.baidu.com/img/bd_logo1.png', '000', '2016-05-12', 1),
(8, '111', 'https://www.baidu.com/img/bd_logo1.png', '111', '2016-05-12', 0),
(9, '222', 'https://www.baidu.com/img/bd_logo1.png', '222', '2016-05-12', 0),
(10, '333', 'https://www.baidu.com/img/bd_logo1.png', '333', '2016-05-12', 0),
(11, 'qqq', 'https://www.baidu.com/img/bd_logo1.png', 'qqq', '2016-05-12', 1),
(12, '2022年冬奥会张家口主场馆设计方案公布', 'http://imgpolitics.gmw.cn/attachement/jpg/site2/20160423/d02788d8dd6b1885669147.jpg', '本报讯（京报集团记者耿诺）张家口市政府昨天与北京市建筑设计研究院有限公司举行了张家口市奥体中心签约仪式。今年年初，张家口市城乡规划局公布了该市奥体中心最终入围的5个设计方案，为提升设计方案的合理性和群众满意度，启动了网友投票。由北京市建筑设计研究院有限公司报送的“活力冰雪、激情四射”主题获得了超过8万票，最终中标。', '2016-04-23', 0),
(13, '2022年冬奥会张家口主场馆设计方案公布', 'http://imgpolitics.gmw.cn/attachement/jpg/site2/20160423/d02788d8dd6b1885669147.jpg', '本报讯（京报集团记者耿诺）张家口市政府昨天与北京市建筑设计研究院有限公司举行了张家口市奥体中心签约仪式。今年年初，张家口市城乡规划局公布了该市奥体中心最终入围的5个设计方案，为提升设计方案的合理性和群众满意度，启动了网友投票。由北京市建筑设计研究院有限公司报送的“活力冰雪、激情四射”主题获得了超过8万票，最终中标。', '2016-04-23', 0),
(14, '2022年冬奥会张家口主场馆设计方案公布', 'http://imgpolitics.gmw.cn/attachement/jpg/site2/20160423/d02788d8dd6b1885669147.jpg', '本报讯（京报集团记者耿诺）张家口市政府昨天与北京市建筑设计研究院有限公司举行了张家口市奥体中心签约仪式。今年年初，张家口市城乡规划局公布了该市奥体中心最终入围的5个设计方案，为提升设计方案的合理性和群众满意度，启动了网友投票。由北京市建筑设计研究院有限公司报送的“活力冰雪、激情四射”主题获得了超过8万票，最终中标。', '2016-04-23', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`newsid`),
  ADD KEY `newstitle` (`newstitle`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `news`
--
ALTER TABLE `news`
  MODIFY `newsid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
