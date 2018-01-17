package com.videtek.jwt.demo.common;

import com.videtek.jwt.demo.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class JedisCacheUtil {

    @Resource(name = "redisTemplate")
    public RedisTemplate redisTemplate;

    @Autowired
    private UserService userService;

    public String getString(String key) {
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        String data = ops.get(key);
        return data == null ? null : data.trim();
    }

    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public <T> T getToPojo(String key, Class<T> clz) {
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
        redisTemplate.opsForValue();
        redisTemplate.opsForValue().set(key, data, expireTime);
    }
}
