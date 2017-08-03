package com.lunaboiler;

/**
 * Created by jongwoomoon on 2017. 8. 1..
 */

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Collections;
import java.util.List;

public class WebViewAdrPackage implements ReactPackage {

    @Override
    public List<NativeModule>
    createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

//    @Override
//    public List<Class<? extends JavaScriptModule>> createJSModules() {
//        return Collections.emptyList();
//    }

    @Override
    public List<ViewManager>
    createViewManagers(ReactApplicationContext reactContext) {
        return Collections.<ViewManager>singletonList(
                new WebViewAdrManager()
        );
    }
}