package com.videtek.jwt.demo.base.redis;

import com.videtek.jwt.demo.common.GsonUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

/**
 * RedisTemplateUtil工具类（使用spring-data-redis包）
 */
public class RedisTemplateUtil {

    public RedisTemplate redisTemplate;

    /**
     * 使用配置文件注入
     * @param redisTemplate
     */
    public void setRedisTemplate(RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public String getString(String key) {
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        String data = ops.get(key);
        return data == null ? null : data.trim();
    }

    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public <T> T getToObj(String key, Class<T> clz) {
        String data = getString(key);
        if (StringUtils.isBlank(data)) {
            return null;
        }
        return GsonUtils.json2Obj(data, clz);
    }

    public void set(String key, Object obj, int expireTime) {
        String data = GsonUtils.toJson(obj);
        setForString(key, data, expireTime);
    }

    public void setForString(String key, String data, int expireTime) {
        redisTemplate.opsForValue().set(key, data, expireTime);
    }
}
