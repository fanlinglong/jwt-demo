package com.videtek.jwt.demo.common;

import com.auth0.jwt.JWTSigner;
import com.auth0.jwt.JWTVerifier;

import java.util.HashMap;
import java.util.Map;

public class JWT {

    private static String PAYLOAD = "payload";
    private static String EXP = "exp";
    private static String SECRET = "sdf23421sdfsdfcc.;h4.]2.'4234[{]1]12314781`1`22`";

    //加密
    public static <T> String sign(T object, long maxAge) {
        try {
            final JWTSigner signer = new JWTSigner(SECRET);
            final Map<String, Object> claims = new HashMap<String, Object>();
            String jsonString = GsonUtils.toJson(object);
            claims.put(PAYLOAD, jsonString);
            claims.put(EXP, System.currentTimeMillis() + maxAge);
            return signer.sign(claims);
        } catch (Exception e) {
            return null;
        }
    }

    //解密
    public static <T> T unsign(String jwt, Class<T> classT) {
        final JWTVerifier verifier = new JWTVerifier(SECRET);
        try {
            final Map<String, Object> claims = verifier.verify(jwt);
            if (claims.containsKey(EXP) && claims.containsKey(PAYLOAD)) {
                String json = (String) claims.get(PAYLOAD);
                return GsonUtils.json2Obj(json, classT);
            }
            return null;
        } catch (Exception e) {
            return null;
        }
    }
}
