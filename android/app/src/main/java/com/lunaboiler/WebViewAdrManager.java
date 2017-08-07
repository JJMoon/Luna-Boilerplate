package com.lunaboiler;

import android.annotation.TargetApi;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;


import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by jongwoomoon on 2017. 8. 1..
 *
 * https://developer.android.com/reference/android/webkit/PermissionRequest.html
 */

public class WebViewAdrManager extends SimpleViewManager<WebView> {

    private final String TAG = "WebViewAdrManager";
    private static final String TYPE_IMAGE = "image/*";

    private WebView mWebView;

    private PermissionRequest mPermissionRequest; //mPermissionRequest.grant(resources);

    public static final String REACT_CLASS = "WebViewAdr";

    private File createImageFile() throws IOException {
        // Create an image file name
        String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
        String imageFileName = "JPEG_" + timeStamp + "_";
        File storageDir = Environment.getExternalStoragePublicDirectory(
                Environment.DIRECTORY_PICTURES);
        File imageFile = File.createTempFile(
                imageFileName,  /* prefix */
                ".jpg",         /* suffix */
                storageDir      /* directory */
        );
        return imageFile;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }



    @Override
    protected WebView createViewInstance(ThemedReactContext reactContext) {
        // This is for runtime permission on Marshmallow and above; It is not directly related to
        // PermissionRequest API.

        mWebView = new WebView(reactContext);

        setUpWebViewDefaults(mWebView);

        mWebView.setWebChromeClient(new WebChromeClient() {
            // For Android 5.1
            public boolean onShowFileChooser(
                    WebView webView, ValueCallback<Uri[]> filePathCallback,
                    WebChromeClient.FileChooserParams fileChooserParams) {
                if(MainActivity.mFilePathCallback != null) {
                    MainActivity.mFilePathCallback.onReceiveValue(null);
                }
                MainActivity.mFilePathCallback = filePathCallback;

                Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                if (takePictureIntent.resolveActivity(MainActivity.Inst.getPackageManager()) != null) {
                    // Create the File where the photo should go
                    File photoFile = null;
                    try {
                        photoFile = createImageFile();
                        takePictureIntent.putExtra("PhotoPath", MainActivity.mCameraPhotoPath);
                    } catch (IOException ex) {
                        // Error occurred while creating the File
                        Log.e(TAG, "Unable to create Image File", ex);
                    }

                    // Continue only if the File was successfully created
                    if (photoFile != null) {
                        MainActivity.mCameraPhotoPath = "file:" + photoFile.getAbsolutePath();
                        takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT,
                                Uri.fromFile(photoFile));
                    } else {
                        takePictureIntent = null;
                    }
                }

                Intent contentSelectionIntent = new Intent(Intent.ACTION_GET_CONTENT);
                contentSelectionIntent.addCategory(Intent.CATEGORY_OPENABLE);
                contentSelectionIntent.setType("image/*");

                Intent[] intentArray;
                if(takePictureIntent != null) {
                    intentArray = new Intent[]{takePictureIntent};
                } else {
                    intentArray = new Intent[0];
                }

                Intent chooserIntent = new Intent(Intent.ACTION_CHOOSER);
                chooserIntent.putExtra(Intent.EXTRA_INTENT, contentSelectionIntent);
                chooserIntent.putExtra(Intent.EXTRA_TITLE, "Image Chooser");
                chooserIntent.putExtra(Intent.EXTRA_INITIAL_INTENTS, intentArray);

                MainActivity.Inst.startActivityForResult(chooserIntent, MainActivity.FILECHOOSER_RESULTCODE);

                return true;
            }

        });


        mWebView.setWebViewClient(new WebViewClient() {
            public void onPageFinished(WebView view, String url) {
                String jsn = "{ \"type\": \"EMAIL_LOGIN\", \"data\": { \"email\": \"hyochan.test@themoin.com\", \"password\": \"password12\" } }";

                //final String msg = "document.postMessage(" + jsn + ");";
                final String msg = "javascript:getAppMessage(" + jsn + ");";  // { "\"data\" : %@ }"
                //final String msg = "javascript:showAlert()"; // javascript

                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.KITKAT) {
                    mWebView.evaluateJavascript(msg, null); // evaluateJavascript

//                    runOnUiThread(new Runnable()
//                    {
//                        public void run()
//                        {
//                            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.KITKAT) {
//                                //Toast.makeText(MainActivity.Inst, "onPageFinished > KitKat", Toast.LENGTH_SHORT).show();
//                                mWebView.evaluateJavascript(msg, null); // evaluateJavascript
//                            }
//                        }
//                    });
                } else {
                    mWebView.loadUrl(msg);
                }
            }
        });



        mWebView.addJavascriptInterface(new RNWebViewInterface(MainActivity.Inst), "JSInterface");
        mWebView.getSettings().setUserAgentString("Mozilla/5.0 (Linux; U;` Android 2.0; en-us; Droid Build/ESD20) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17");
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.getSettings().setAllowContentAccess(true);
        mWebView.getSettings().setAllowFileAccess(true);
        mWebView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        mWebView.getSettings().setAllowFileAccessFromFileURLs(true);
        mWebView.getSettings().setNeedInitialFocus(true);
        mWebView.getSettings().setAppCacheEnabled(true);
        mWebView.getSettings().setBlockNetworkImage(false);
        mWebView.getSettings().setBlockNetworkLoads(false);

        mWebView.loadUrl("file:///android_asset/index.html"); // "https://devfront.themoin.com"

        mWebView.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.MATCH_PARENT));
        return mWebView;
    }

    @TargetApi(Build.VERSION_CODES.HONEYCOMB)
    private void setUpWebViewDefaults(WebView webView) {
        WebSettings settings = webView.getSettings();

        // Enable Javascript
        settings.setJavaScriptEnabled(true);

        // Use WideViewport and Zoom out if there is no viewport defined
        settings.setUseWideViewPort(true);
        settings.setLoadWithOverviewMode(true);

        // Enable pinch to zoom without the zoom buttons
        settings.setBuiltInZoomControls(true);

        if(Build.VERSION.SDK_INT > Build.VERSION_CODES.HONEYCOMB) {
            // Hide the zoom controls for HONEYCOMB+
            settings.setDisplayZoomControls(false);
        }

        // Enable remote debugging via chrome://inspect
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            WebView.setWebContentsDebuggingEnabled(true);
        }

        // We set the WebViewClient to ensure links are consumed by the WebView rather
        // than passed to a browser if it can
        mWebView.setWebViewClient(new WebViewClient());
    }


    @ReactProp(name = "type")
    public void setType(WebView view, String tp) {
        Log.d("JAVA", "the string :: " + tp);

        //Toast.makeText(MainActivity.Inst, "OK  Web View", Toast.LENGTH_SHORT).show();
    }

    @ReactProp(name = "loadUrl")
    public void setLoadUrl(WebView view, String ul) {
        Log.d("JAVA", "the string :: " + ul);
        //view.loadUrl(ul);

//        String html = "<!DOCTYPE html><html><head></head>  <body> <h1> Title </h1>  <h2> Another </h2> </body></html>";
//        view.loadDataWithBaseURL("", html, "text/html","utf-8", "");

    }

}
