package com.videtek.jwt.demo.shiro.credentialsMatcher;

import com.videtek.jwt.demo.base.redis.RedisManager;
import com.videtek.jwt.demo.common.SerializeUtil;
import com.videtek.jwt.demo.shiro.cache.RedisShiroCache;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.cache.Cache;
import org.apache.shiro.cache.CacheManager;

public class RetryLimitHashedCredentialsMatcher extends HashedCredentialsMatcher {

    private Cache<String, Integer> passwordRetryCache;

    private RedisManager redisManager;

    public RetryLimitHashedCredentialsMatcher(CacheManager cacheManager, RedisManager redisManager) {
        this.passwordRetryCache = cacheManager.getCache("passwordRetryCache");
        this.redisManager = redisManager;
    }

    @Override
    public boolean doCredentialsMatch(AuthenticationToken token,
                                      AuthenticationInfo info) {
        String username = token.getPrincipal().toString();

        // 尝试登录次数+1
        Integer retryCount = passwordRetryCache.get(username);
        if (retryCount == null) {
            retryCount = new Integer(0);
            if (passwordRetryCache instanceof RedisShiroCache) {
                try {
                    redisManager.saveValueByKey(RedisShiroCache.DB_INDEX, ((RedisShiroCache<String, Integer>) passwordRetryCache).generateCacheKey(username).getBytes(), SerializeUtil.serialize(retryCount), 600);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }
            } else {
                passwordRetryCache.put(username, retryCount);
            }
        }

        if (retryCount.intValue() >= 100) {
            throw new LockedAccountException();
        } else if (++retryCount >= 100) {
            // 如果尝试登录次数大于5
            throw new ExcessiveAttemptsException();
        }

        if (passwordRetryCache instanceof RedisShiroCache) {
            try {
                redisManager.saveValueByKey(RedisShiroCache.DB_INDEX, ((RedisShiroCache<String, Integer>) passwordRetryCache).generateCacheKey(username).getBytes(), SerializeUtil.serialize(retryCount), 600);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        } else {
            passwordRetryCache.put(username, retryCount);
        }

        boolean matches = super.doCredentialsMatch(token, info);

        if (matches) {
            //从缓存中移除该用户的登录记录
            passwordRetryCache.remove(username);
        }

        return matches;
    }
}