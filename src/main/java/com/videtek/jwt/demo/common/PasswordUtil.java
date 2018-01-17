package com.videtek.jwt.demo.common;


import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.util.ByteSource;

/**
 * @ClassName: PasswordUtil
 * @Description: 密码加密工具类
 */
public class PasswordUtil {

    /**
     * 对密码进行md5加密,并返回密文
     *
     * @param username       用户名
     * @param password       密码
     * @param hashIterations 迭代次数
     * @return 密文
     */
    public static String customMd5Password(String username, String password, int hashIterations) {
        //使用ByteSource.Util.bytes()来计算盐值
        ByteSource credentialsSalt = ByteSource.Util.bytes(username);

        //组合username,多次迭代，对密码进行加密
        Md5Hash md5Hash = new Md5Hash(password, credentialsSalt, hashIterations);
        String password_cryto = md5Hash.toHex();
        return password_cryto;
    }


    public static void main(String[] args) {
        String username = "admin";
        String password = "admin";
        String password_cryto = customMd5Password(username, password, 3);
        System.out.println(password_cryto);
    }
}
