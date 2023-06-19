// 插件地址 ：https://ext.dcloud.net.cn/plugin?id=3869
// 根据官方或网友分享收集的Nativejs调用原生函数案例
/**
 * 目前提供的功能（目前都是Android版)
 * 1、打开系统设置openSetting
 * 2、打开应用设置openAppSetting
 * 3、根据包名启动第三方应用openApp
 * 4、根据包名发送广播broadCast
 * 5、获取本机的所有安装的包名和应用程序名getApplication
 */


var isIos
// #ifdef APP-PLUS
isIos = (plus.os.name == "iOS")
// #endif

// https://ext.dcloud.net.cn/plugin?id=13097
// 判断推送权限是否开启
function judgeIosPermissionPush() {
    var result = false;
    var UIApplication = plus.ios.import("UIApplication");
    var app = UIApplication.sharedApplication();
    var enabledTypes = 0;
    if (app.currentUserNotificationSettings) {
        var settings = app.currentUserNotificationSettings();
        enabledTypes = settings.plusGetAttribute("types");
        console.log("enabledTypes1:" + enabledTypes);
        if (enabledTypes == 0) {
            console.log("推送权限没有开启");
        } else {
            result = true;
            console.log("已经开启推送功能!")
        }
        plus.ios.deleteObject(settings);
    } else {
        enabledTypes = app.enabledRemoteNotificationTypes();
        if (enabledTypes == 0) {
            console.log("推送权限没有开启!");
        } else {
            result = true;
            console.log("已经开启推送功能!")
        }
        console.log("enabledTypes2:" + enabledTypes);
    }
    plus.ios.deleteObject(app);
    plus.ios.deleteObject(UIApplication);
    return result;
}

// Android权限查询
function requestAndroidPermission(permissionID) {
    return new Promise((resolve, reject) => {
        plus.android.requestPermissions(
            [permissionID], // 理论上支持多个权限同时查询，但实际上本函数封装只处理了一个权限的情况。有需要的可自行扩展封装
            function(resultObj) {
                var result = 0;
                for (var i = 0; i < resultObj.granted.length; i++) {
                    var grantedPermission = resultObj.granted[i];
                    console.log('已获取的权限：' + grantedPermission);
                    result = 1
                }
                for (var i = 0; i < resultObj.deniedPresent.length; i++) {
                    var deniedPresentPermission = resultObj.deniedPresent[i];
                    console.log('拒绝本次申请的权限：' + deniedPresentPermission);
                    result = 0
                }
                for (var i = 0; i < resultObj.deniedAlways.length; i++) {
                    var deniedAlwaysPermission = resultObj.deniedAlways[i];
                    console.log('永久拒绝申请的权限：' + deniedAlwaysPermission);
                    result = -1
                }
                resolve(result);
                // 若所需权限被拒绝,则打开APP设置界面,可以在APP设置界面打开相应权限
                // if (result != 1) {
                //    openSetting()
                // }
            },
            function(error) {
                console.log('申请权限错误：' + error.code + " = " + error.message);
                resolve({
                    code: error.code,
                    message: error.message
                });
            }
        );
    });
}

// 检查系统的设备服务是否开启
// var checkSystemEnableLocation = async function () {
function checkSystemEnableLocation() {
    if (isIos) {
        var result = false;
        var cllocationManger = plus.ios.import("CLLocationManager");
        var result = cllocationManger.locationServicesEnabled();
        console.log("系统定位开启:" + result);
        plus.ios.deleteObject(cllocationManger);
        return result;
    } else {
        var context = plus.android.importClass("android.content.Context");
        var locationManager = plus.android.importClass("android.location.LocationManager");
        var main = plus.android.runtimeMainActivity();
        var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
        var result = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER);
        console.log("系统定位开启:" + result);
        return result
    }
}

// ===============================================
// https://ext.dcloud.net.cn/plugin?id=13097  end
// ===============================================

/**
 * 打开系统设置页面
 * @param {String} setting 设置页面标识
 * 参考Android原生android.provider.Settings类中定义的常量
 * https://ext.dcloud.net.cn/plugin?id=1061
 * https://ask.dcloud.net.cn/question/14732
 * 在页面中引用此模块
 * import wxy from "@/common/wxy-android.js"
 * 调用模块的方法
 * wxy.open(wxy.SETTINGS);
 */
function openSetting(setting = '') {
    try {
        let os = plus.os.name;
        if ('Android' == os) {
            // const main = plus.android.runtimeMainActivity();
            // let intent = plus.android.newObject('android.content.Intent', setting);
            // main.startActivity(intent);
            var Intent = plus.android.importClass("android.content.Intent");
            var Settings = plus.android.importClass("android.provider.Settings");
            var Uri = plus.android.importClass("android.net.Uri");
            var mainActivity = plus.android.runtimeMainActivity();
            var intent = new Intent();
            intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
            var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
            intent.setData(uri);
            mainActivity.startActivity(intent);
        } else {
            //unsupport, nothing to do.
            var UIApplication = plus.ios.import("UIApplication");
            var application2 = UIApplication.sharedApplication();
            var NSURL2 = plus.ios.import("NSURL");
            // var setting2 = NSURL2.URLWithString("prefs:root=LOCATION_SERVICES");		
            var setting2 = NSURL2.URLWithString("app-settings:");
            application2.openURL(setting2);

            plus.ios.deleteObject(setting2);
            plus.ios.deleteObject(NSURL2);
            plus.ios.deleteObject(application2);
        }
    } catch (e) {
        console.error('error @openSettings!!');
    }
}

/**
 * 打开应用设置页面
 * https://ext.dcloud.net.cn/plugin?id=1061
 */
function openAppSetting() {
    try {
        let os = plus.os.name;
        if ('Android' == os) {
            const main = plus.android.runtimeMainActivity();
            let intent = plus.android.newObject('android.content.Intent',
                'android.settings.APPLICATION_DETAILS_SETTINGS');
            let uri = plus.android.invoke('android.net.Uri', 'fromParts', 'package', main.getPackageName(), null);
            plus.android.invoke(intent, 'setData', uri);
            main.startActivity(intent);
        } else {
            //unsupport, nothing to do.
        }
    } catch (e) {
        console.error('error @openAppSetting!!');
    }
}

// 参考DCloud官方提供的H5+APP中runtime.html调用第三方应用案例
// 根据包名从应用市场下载
function androidMarket(pname) {
    plus.runtime.openURL("market://details?id=" + pname);
}
/**
 * 根据包名启动第三方应用
 * @param {String} pname 包名，如微信是com.tencent.mm
 * @param {String} pnamestr 应用名称，如微信
 */
function openApp(pname, pnamestr) {
    try {
        const os = plus.os.name;
        if ('Android' == os) {
            plus.runtime.launchApplication({
                pname: pname
            }, function(e) {
                let str = `检查到您未安装"${pnamestr}",是否到商城搜索下载？`;
                plus.nativeUI.confirm(str, function(i) {
                    if (i.index == 0) {
                        androidMarket(pname);
                    }
                });
            });
        } else {
            //unsupport, nothing to do.
        }
    } catch (e) {
        console.error('error @openApp!!');
    }
}

/**
 * 根据包名和行为向第三方应用发送广播
 * @param {String} pname 包名，如微信是com.tencent.mm
 * @param {String} action 行为
 * @param {Object} data   参数，由于js没索引数组，所以以对象的形式传递参数
 * 关于Nativejs的常规API和高级API区别见https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/88
 */
function broadCast(pname, action, data = {}) {
    try {
        const os = plus.os.name;
        if ('Android' == os) {
            const main = plus.android.runtimeMainActivity();
            // 常规Nativejs API
            // let Intent = plus.android.importClass("android.content.Intent");
            // let intent = new Intent();
            // intent.setPackage(pname);
            // intent.setAction(action);			
            // for (let [key, value] of Object.entries(data)) {
            //   intent.putExtra(key, value);
            // }
            // 高级Nativejs API
            let intent = plus.android.newObject('android.content.Intent');
            plus.android.invoke(intent, 'setPackage', pname);
            plus.android.invoke(intent, 'setAction', action);
            for (let [key, value] of Object.entries(data)) {
                plus.android.invoke(intent, 'putExtra', key, value);
            }
            main.sendBroadcast(intent);
        } else {
            //unsupport, nothing to do.
        }
    } catch (e) {
        console.error('error @broadCast!!');
    }
}

/**
 * 获取本机的所有安装的包名和应用程序名
 * //下面是Java实现代码
 * //获取PackageManager
 * PackageManager packageManager = context.getPackageManager();
 * //获取所有已安装程序的包信息
 * List <PackageInfo> packageInfos = packageManager.getInstalledPackages(0);
 * // 遍历所有安装程序的包信息和应用程序名
 * ApplicationInfo applicationInfo = null;
 * if (packageInfos != null) {
 * 	for (int i = 0; i < packageInfos.size(); i++) {
 * 		String packName = packageInfos.get(i).packageName;
 * 		applicationInfo = packageManager.getApplicationInfo(packName, 0);
 * 		String appName=(String)((applicationInfo != null) ? packageManager.getApplicationLabel(applicationInfo) : "???");
 * 		Log.e(TAG, "PackageName:" + packName+",ApplicationName:"+appName);
 * 	}
 * }
 */
function getApplication() {
    // NativeJS实现代码
    try {
        // const os = plus.os.name;
        // if ('Android' == os) {
        // 	const main = plus.android.runtimeMainActivity();
        // 	let pManager = plus.android.invoke(main, 'getPackageManager');
        // 	let pInfo = plus.android.invoke(pManager, 'getInstalledPackages', 0);
        // 	let total = plus.android.invoke(pInfo, 'size');
        // 	let packName = '';
        // 	let appName = '';
        // 	let obj = null;
        // 	let appArr = new Array();
        // 	// 遍历获取包名和应用名称
        // 	for (let i = 0; i < total; i++) {
        // 		// 获取包名
        // 		packName = plus.android.getAttribute(plus.android.invoke(pInfo, 'get', i), 'packageName');
        // 		// 获取包名对应的应用名
        // 		obj = plus.android.invoke(pManager, 'getApplicationInfo', packName, 0);
        // 		appName = plus.android.invoke(pManager, 'getApplicationLabel', obj);
        // 		// console.log(packName, appName);
        // 		obj = {};
        // 		obj.packName = packName;
        // 		obj.appName = appName;
        // 		// console.log(obj);
        // 		appArr.push(obj);
        // 	}
        // 	return appArr;
        // } else {
        // 	//unsupport, nothing to do.
        // }

        // 方法二
        // plus.android.importClass('java.util.ArrayList');  
        //     plus.android.importClass('android.content.pm.PackageInfo');    
        //     plus.android.importClass('android.content.pm.PackageManager');  
        //     var ApplicationInfo = plus.android.importClass('android.content.pm.ApplicationInfo');  
        //     var MainActivity = plus.android.runtimeMainActivity();        
        //     var PackageManager = MainActivity.getPackageManager();    
        //     var pinfo = plus.android.invoke(PackageManager, 'getInstalledPackages', 0)    
        //     if (pinfo != null) {  
        //         var apklist = []      
        //         for (var i = 0; i < pinfo.size(); i++) {    
        //             var pkginfo = pinfo.get(i);
        //             var issysapk = ((pkginfo.plusGetAttribute("applicationInfo").plusGetAttribute("flags") & ApplicationInfo.FLAG_SYSTEM) != 0) ? true : false  
        //             if(issysapk == false){  
        //                 const apkinfo = {  
        //                     appName:pkginfo.plusGetAttribute("applicationInfo").loadLabel(PackageManager).toString(),  
        //                     packageName:pkginfo.plusGetAttribute("packageName"),  
        //                     versionName:pkginfo.plusGetAttribute("versionName"),  
        //                     versionCode:pkginfo.plusGetAttribute("versionCode"),

        //                     appIco:pkginfo.plusGetAttribute("applicationInfo").loadIcon(PackageManager)
        //                 }
        //                 apklist.push(apkinfo)  
        //             }  

        //         }  
        //         //this.appList = apklist  
        //         //打印出所有的APP名称，包名，版本  
        //         console.log(JSON.stringify(apklist))  
        //     }  

        plus.android.importClass('android.graphics.drawable.BitmapDrawable');
        var BitmapFactory = plus.android.importClass("android.graphics.BitmapFactory");
        var Base64 = plus.android.importClass("android.util.Base64");

        var Bitmap = plus.android.importClass('android.graphics.Bitmap');
        var ByteArrayOutputStream = plus.android.importClass("java.io.ByteArrayOutputStream");
        var Canvas = plus.android.importClass('android.graphics.Canvas');
        plus.android.importClass('java.util.ArrayList');
        plus.android.importClass('android.content.pm.PackageInfo');
        plus.android.importClass('android.content.pm.PackageManager');
        var ApplicationInfo = plus.android.importClass('android.content.pm.ApplicationInfo');
        var MainActivity = plus.android.runtimeMainActivity();
        var PackageManager = MainActivity.getPackageManager();

        var pinfo = plus.android.invoke(PackageManager, 'getInstalledPackages', 0)
        var apklist = []
        if (pinfo != null) {

            for (var i = 0; i < pinfo.size(); i++) {
                //PackageInfo{4b45699f9d com.tencent.mobileqq}
                var pkginfo = pinfo.get(i);
                var issysapk = ((pkginfo.plusGetAttribute("applicationInfo").plusGetAttribute("flags") & ApplicationInfo
                    .FLAG_SYSTEM) != 0) ? true : false
                if (issysapk == false) {
                    const apkinfo = {
                        appName: pkginfo.plusGetAttribute("applicationInfo").loadLabel(PackageManager).toString(),
                        packageName: pkginfo.plusGetAttribute("packageName"),
                        versionName: pkginfo.plusGetAttribute("versionName"),
                        versionCode: pkginfo.plusGetAttribute("versionCode"),
                        appIco: pkginfo.plusGetAttribute("applicationInfo").loadIcon(PackageManager)
                    };
                    // var bimp=null;
                    // try{
                    //   bimp=apkinfo.appIco.getBitmap();
                    // }catch(e){
                    //   bimp = Bitmap.createBitmap(apkinfo.appIco.getIntrinsicWidth(), apkinfo.appIco.getIntrinsicHeight(), Bitmap.Config.ARGB_8888);
                    //   var canvas = new Canvas(bimp);
                    //   apkinfo.appIco.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
                    //   apkinfo.appIco.draw(canvas);
                    // }
                    // var baos = new ByteArrayOutputStream();
                    // // 压缩 0-100
                    // // bimp.compress(Bitmap.CompressFormat.PNG, 20, baos);
                    // bimp.compress(Bitmap.CompressFormat.JPEG, 20, baos);
                    // baos.flush();
                    // baos.close();
                    // var bitmapBytes = baos.toByteArray();
                    // // var result = "data:image/png;base64,"+Base64.encodeToString(bitmapBytes, Base64.DEFAULT);
                    // var result = "data:image/jpg;base64,"+Base64.encodeToString(bitmapBytes, Base64.DEFAULT);
                    // if(apkinfo.packageName =='com.weisifang'){

                    //   console.log(apkinfo.appIco.getIntrinsicWidth(),apkinfo.appIco.getIntrinsicHeight(), canvas.getWidth(), canvas.getHeight())
                    //   console.log('icon==========',result)
                    // }
                    // apkinfo.appIcon=result;
                    apklist.push(apkinfo);
                };

            };
        };
        return apklist
        // console.log(JSON.stringify(apklist))  
    } catch (e) {
        console.error('error @getApplication!!', e);
    }
}

module.exports = {
    SETTINGS: 'android.settings.SETTINGS',
    APN_SETTINGS: 'android.settings.APN_SETTINGS',
    LOCATION_SOURCE_SETTINGS: 'android.settings.LOCATION_SOURCE_SETTINGS',
    USER_SETTINGS: 'android.settings.USER_SETTINGS',
    WIRELESS_SETTINGS: 'android.settings.WIRELESS_SETTINGS',
    SECURITY_SETTINGS: 'android.settings.SECURITY_SETTINGS',
    PRIVACY_SETTINGS: 'android.settings.PRIVACY_SETTINGS',
    WIFI_SETTINGS: 'android.settings.WIFI_SETTINGS',
    WIFI_IP_SETTINGS: 'android.settings.WIFI_IP_SETTINGS',
    BLUETOOTH_SETTINGS: 'android.settings.BLUETOOTH_SETTINGS',
    CAST_SETTINGS: 'android.settings.CAST_SETTINGS',
    DATE_SETTINGS: 'android.settings.DATE_SETTINGS',
    SOUND_SETTINGS: 'android.settings.SOUND_SETTINGS',
    DISPLAY_SETTINGS: 'android.settings.DISPLAY_SETTINGS',
    LOCALE_SETTINGS: 'android.settings.LOCALE_SETTINGS',
    VOICE_INPUT_SETTINGS: 'android.settings.VOICE_INPUT_SETTINGS',
    INPUT_METHOD_SETTINGS: 'android.settings.INPUT_METHOD_SETTINGS',
    MANAGE_APPLICATIONS_SETTINGS: 'android.settings.MANAGE_APPLICATIONS_SETTINGS',
    DEVICE_INFO_SETTINGS: 'android.settings.DEVICE_INFO_SETTINGS',
    NOTIFICATION_SETTINGS: 'android.settings.NOTIFICATION_SETTINGS',
    open: openSetting,
    openAppSetting: openAppSetting,
    openApp: openApp,
    broadCast: broadCast,
    getApplication: getApplication,

    // https://ext.dcloud.net.cn/plugin?id=13097
    requestAndroidPermission: requestAndroidPermission,
    checkSystemEnableLocation: checkSystemEnableLocation
}