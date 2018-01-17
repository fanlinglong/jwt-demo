package com.videtek.jwt.demo.shiro.cache;

import com.videtek.jwt.demo.base.redis.RedisManager;
import org.apache.shiro.cache.Cache;

public class RedisShiroCacheManager implements ShiroCacheManager {

    private RedisManager cacheManager;

    public RedisManager getCacheManager() {
        return cacheManager;
    }

    public void setCacheManager(RedisManager cacheManager) {
        this.cacheManager = cacheManager;
    }

    @Override
    public <K, V> Cache<K, V> getCache(String name) {
        return new RedisShiroCache<K, V>(name, getCacheManager());
    }

    @Override
    public void destroy() {
        //做一些需要释放资源的操作
    }

}
