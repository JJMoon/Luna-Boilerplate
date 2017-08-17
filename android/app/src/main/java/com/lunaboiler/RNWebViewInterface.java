package com.lunaboiler;

import android.content.Context;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

/**
 * Created by jongwoomoon on 2017. 8. 2..
 */

public class RNWebViewInterface {
    Context mContext;

    /** Instantiate the interface and set the context */
    public RNWebViewInterface(Context c) {
        mContext = c;
    }

    /** Show a toast from the web page */
    @JavascriptInterface
    public void showToast(String toast) {
        Log.d("JAVA", "  show toast ...  :: " + toast);
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
    }

    /** Log Out from the web page */
    @JavascriptInterface
    public void logout(String ttt) {
        Log.d("JAVA", " Received :: " + ttt);
        Toast.makeText(mContext, ttt, Toast.LENGTH_SHORT).show();
    }
}
