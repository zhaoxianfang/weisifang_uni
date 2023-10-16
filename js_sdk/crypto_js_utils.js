// 对 CryptoJS 3.3 函数封装
// npm install crypto-js@3.3.0
// 引用：import CryptoJsUtil from '@/js_sdk/crypto_js_utils';

import CryptoJS from 'crypto-js';

const secretAesKey = 'WEISIFANG_AES_KEY_01234567ABCDEF' // 32字节的密钥
const secretAesIv = 'WEISIFANG_AES_IV' // 16字节的向量

const CryptoJsUtil = {
    toString: function(stringOrObj) {
        return typeof stringOrObj === 'string' ? stringOrObj : JSON.stringify(stringOrObj);
    },
    toObj: function(stringOrObj) {
        try {
            return typeof stringOrObj === 'string' ? JSON.parse(stringOrObj) : stringOrObj;
        } catch (e) {
            return stringOrObj
        }
    },
    MD5: function(string) {
        return CryptoJS.MD5(this.toString(string)).toString();
    },
    SHA1: function(string) {
        return CryptoJS.SHA1(this.toString(string)).toString();
    },
    SHA256: function(string) {
        return CryptoJS.SHA256(this.toString(string)).toString();
    },
    SHA512: function(string) {
        return CryptoJS.SHA512(this.toString(string)).toString();
    },
    SHA3: function(string, length = 512) {
        return CryptoJS.SHA3(this.toString(string), {
            outputLength: length
        }).toString();
    },
    RIPEMD160: function() {
        return CryptoJS.RIPEMD160(this.toString(string)).toString();
    },
    /**
     * AES 加密函数
     * @param string string 需加密的json字符串或对象
     * @param key_hash string 加密key_hash(16位)
     * @param iv string 加密向量(16位)
     * @return string 加密密文字符串
     */
    aesEncrypt: function(string, key_hash = '', _iv = '') {
        if (!string) {
            return string;
        }
        // 要加密的数据  
        var data = this.toString(string);

        // 密钥（key）和初始化向量（iv） 
        const key = CryptoJS.enc.Utf8.parse(key_hash || secretAesKey); // 16字节的密钥
        const iv = CryptoJS.enc.Utf8.parse(_iv || secretAesIv); // 16字节的初始向量

        // 加密
        var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), key, {
            keySize: 256 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    },
    /**
     * AES 解密函数
     * @param encrypted string 已加密密文
     * @param key_hash string 加密key_hash
     * @param _iv string 加密向量
     * @returns {*|string} 解密之后的json字符串
     */
    aesDecrypt: function(encrypted, key_hash, _iv = '') {
        if (!encrypted) {
            return encrypted;
        }

        // 密钥（key）和初始化向量（iv） 
        const key = CryptoJS.enc.Utf8.parse(key_hash || secretAesKey); // 16字节的密钥
        const iv = CryptoJS.enc.Utf8.parse(_iv || secretAesIv); // 16字节的初始向量

        // 解密
        var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            keySize: 256 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return this.toObj(decrypted.toString(CryptoJS.enc.Utf8));
    }
};
export default CryptoJsUtil;