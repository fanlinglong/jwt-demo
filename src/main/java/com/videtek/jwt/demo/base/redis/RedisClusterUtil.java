package com.videtek.jwt.demo.base.redis;

import com.alibaba.fastjson.JSONObject;
import com.videtek.jwt.demo.common.GsonUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.HostAndPort;
import redis.clients.jedis.JedisCluster;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.io.IOException;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 * RedisClusterUtil redis 集群工具类
 **/
public class RedisClusterUtil {

    private static Logger LOG = LoggerFactory.getLogger(RedisClusterUtil.class);

    private static JedisCluster jedisCluster = null;
    private static int DEFAULT_EXPIRED_TIME_SECONDS_OBJECT = 1296000;

    static {
        init();
    }

    public static void init() {
        JedisPoolConfig config = new JedisPoolConfig();

        //最大连接数, 默认8个
        config.setMaxTotal(1000);

        //大空闲连接数, 默认8个
        config.setMaxIdle(10);

        //获取连接时的最大等待毫秒数(如果设置为阻塞时BlockWhenExhausted),如果超时就抛异常, 小于零:阻塞不确定的时间,  默认-1
        config.setMaxWaitMillis(3000);

        //--------以下配置默认就可以-----------

        //最小空闲连接数, 默认0
        config.setMinIdle(0);

        //是否启用pool的jmx管理功能, 默认true
        config.setJmxEnabled(true);

        //是否启用后进先出, 默认true
        config.setLifo(true);

        //在获取连接的时候检查有效性, 默认false
        config.setTestOnBorrow(false);

        //在空闲时检查有效性, 默认false
        config.setTestWhileIdle(false);

        //设置节点IP端口，建议所有节点都配
        Set<HostAndPort> hps = new HashSet<>();
        Set<String> redisClusterIps = new HashSet<>();
        redisClusterIps.add("192.168.32.128:7000");
        redisClusterIps.add("192.168.32.128:7001");
        redisClusterIps.add("192.168.32.128:7002");
        redisClusterIps.add("192.168.32.128:7003");
        redisClusterIps.add("192.168.32.128:7004");
        redisClusterIps.add("192.168.32.128:7005");
        redisClusterIps.forEach(redisClusterIp -> {
            String[] ip = redisClusterIp.split(":");
            int port = Integer.valueOf(ip[1]);
            hps.add(new HostAndPort(ip[0], port));
        });

        jedisCluster = new JedisCluster(hps, config);

        LOG.info("JedisPoolConfig:{}", JSONObject.toJSONString(config));

        Map<String, JedisPool> nodes = jedisCluster.getClusterNodes();

        LOG.info("Get the redis thread pool:{}", nodes.toString());
    }

    public static JedisCluster getJedisCluster() {
        return jedisCluster;
    }

    /**
     * 将数据存入缓存
     *
     * @param key
     * @param val
     * @return
     */
    public static boolean setString(String key, String val) {
        return setString(key, val, DEFAULT_EXPIRED_TIME_SECONDS_OBJECT);
    }

    /**
     * 从缓存中取得字符串数据
     *
     * @param key
     * @return 数据
     */
    public static String getString(String key) {
        // 暂时从缓存中取得
        return jedisCluster.get(key);
    }

    public static boolean setString(String key, String val, int expiredInSeconds) {
        boolean result = false;
        if (StringUtils.isBlank(key)) {
            return result;
        }

        if (jedisCluster != null) {
            jedisCluster.set(key, val);
            if (expiredInSeconds > 0) {
                jedisCluster.expire(key, expiredInSeconds);
            }
            result = true;
        }
        return result;
    }

    public static void remove(String sKey) {
        if (StringUtils.isBlank(sKey)) {
            return;
        }

        if (jedisCluster != null)
            jedisCluster.del(sKey);
    }

    public static void close() {
        if (jedisCluster == null)
            return;
        try {
            jedisCluster.close();
        } catch (IOException localIOException) {
        }
    }

    public static void restart() {
        init();
    }

    public static boolean setObj(String key, Object obj) {
        String data = GsonUtils.toJson(obj);
        return setString(key, data);
    }

    public static <T> T getObj(String key, Class<T> clz) {
        String data = getString(key);
        return GsonUtils.json2Obj(data, clz);
    }

    public static boolean setObj(String key, Object obj, int expiredInSeconds) {
        return setString(key, GsonUtils.toJson(obj), expiredInSeconds);
    }

    public static void main(String[] args) {

    }

}
