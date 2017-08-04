package com.lunaboiler;


import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.os.Message;
import android.os.Parcelable;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebMessage;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.permissionrequest.MessageDialogFragment;
import com.permissionrequest.SimpleWebServer;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by jongwoomoon on 2017. 8. 1..
 *
 * https://developer.android.com/reference/android/webkit/PermissionRequest.html
 */

public class WebViewAdrManager extends SimpleViewManager<WebView> {

    private static final String TYPE_IMAGE = "image/*";
    private static final int INPUT_FILE_REQUEST_CODE = 1;

    private ValueCallback<Uri> mUploadMessage;
    private ValueCallback<Uri[]> mFilePathCallback;
    private String mCameraPhotoPath;

    private SimpleWebServer mWebServer;
    private WebView mWebView;

    private PermissionRequest mPermissionRequest; //mPermissionRequest.grant(resources);

    public static final String REACT_CLASS = "WebViewAdr";


    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected WebView createViewInstance(ThemedReactContext reactContext) {




        final int port = 8080;
        mWebServer = new SimpleWebServer(port, MainActivity.Inst.getResources().getAssets());
        mWebServer.start();
        // This is for runtime permission on Marshmallow and above; It is not directly related to
        // PermissionRequest API.

        mWebView = new WebView(reactContext);

        mWebView.setWebViewClient(new WebViewClient() {

            public void onPageFinished(WebView view, String url) {
                Toast.makeText(MainActivity.Inst, "Web View : onPageFinished", Toast.LENGTH_SHORT).show();

                String jsn = "'{ \"type\": \"EMAIL_LOGIN\", \"data\": { \"email\": \"hyochan.test@themoin.com\", \"password\": \"password12\" } }'";
                String msg = "document.postMessage(" + jsn + ");";

                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.KITKAT) {
                    mWebView.evaluateJavascript(msg, null);
                } else {
                    mWebView.loadUrl(msg);
                }
            }
        });



        mWebView.addJavascriptInterface(new RNWebViewInterface(MainActivity.Inst), "Android");

//
//        MainActivity.Inst.enforcePermission(Manifest.permission.CAMERA, );
//                new String[]{PermissionRequest.RESOURCE_VIDEO_CAPTURE}));
//
//        = PackageManager.PERMISSION_GRANTED;

        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.getSettings().setAllowContentAccess(true);
        mWebView.getSettings().setAllowFileAccess(true);
        mWebView.getSettings().setAllowUniversalAccessFromFileURLs(true);
        mWebView.getSettings().setAllowFileAccessFromFileURLs(true);
        mWebView.getSettings().setNeedInitialFocus(true);
        mWebView.getSettings().setAppCacheEnabled(true);
        mWebView.getSettings().setBlockNetworkImage(false);
        mWebView.getSettings().setBlockNetworkLoads(false);
        mWebView.getSettings().setDomStorageEnabled(true);

        //mWebView.loadUrl("file:///android_asset/index__.html");
        mWebView.loadUrl("http://localhost:" + port + "/index__.html");

        //mWebView.postWebMessage();


        //WebView myWeb = new WebView(reactContext);


//        myWeb.setWebChromeClient(new WebChromeClient() {
//            @Override
//            public void onCloseWindow(WebView w) {
//                super.onCloseWindow(w);
//
//            }
//
//            @Override
//            public boolean onCreateWindow(WebView view, boolean dialog, boolean userGesture, Message resultMsg) {
//                final WebSettings settings = view.getSettings();
//                settings.setDomStorageEnabled(true);
//                settings.setJavaScriptEnabled(true);
//                settings.setAllowFileAccess(true);
//                settings.setAllowContentAccess(true);
//                view.setWebChromeClient(this);
//                WebView.WebViewTransport transport = (WebView.WebViewTransport) resultMsg.obj;
//                transport.setWebView(view);
//                resultMsg.sendToTarget();
//                return false;
//            }
//
//            public boolean onShowFileChooser(WebView webView,
//                                          ValueCallback<Uri[]> filePathCallback, FileChooserParams fileChooserParams) {
//             System.out.println("WebViewActivity A>5, OS Version : " + Build.VERSION.SDK_INT + "\t onSFC(WV,VCUB,FCP), n=3");
//             if (mFilePathCallback != null) {
//                 mFilePathCallback.onReceiveValue(null);
//             }
//             mFilePathCallback = filePathCallback;
//             imageChooser();
//             return true;
//            }
//
//            private void imageChooser() {
//                Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
//                if (takePictureIntent.resolveActivity(MainActivity.Inst.getPackageManager()) != null) {
//                    // Create the File where the photo should go
//                    File photoFile = null;
//                    try {
//                     photoFile = createImageFile();
//                        takePictureIntent.putExtra("PhotoPath", mCameraPhotoPath);
//                    } catch (IOException ex) {
//                        // Error occurred while creating the File
//                        Log.e(getClass().getName(), "Unable to create Image File", ex);
//                    }
//
//                    // Continue only if the File was successfully created
//                    if (photoFile != null) {
//                        mCameraPhotoPath = "file:" + photoFile.getAbsolutePath();
//                        takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT,
//                                Uri.fromFile(photoFile));
//                    } else {
//                        takePictureIntent = null;
//                    }
//                }
//            }
//
//            private File createImageFile() throws IOException {
//                // Create an image file name
//                String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
//                String imageFileName = "JPEG_" + timeStamp + "_";
//                File storageDir = Environment.getExternalStoragePublicDirectory(
//                        Environment.DIRECTORY_PICTURES);
//                File imageFile = File.createTempFile(
//                        imageFileName,  /* prefix */
//                        ".jpg",         /* suffix */
//                        storageDir      /* directory */
//                );
//                return imageFile;
//            }
//
//
//
//        });


//
//
//        String base = Environment.getExternalStorageDirectory().getAbsolutePath().toString();
//        String url = "file://"+ base + "/index.html";
//
//        Log.d("JAVA", "theurl :: " + base);
//        Log.d("JAVA", "theurl :: " + url);
//
//        File f = new File(reactContext.getFilesDir(), url);
//
//        if (f.exists()) {
//            Log.d("FILE", "  OK ");
//        } else {
//            Log.d("FILE", "  No .....  ");
//        }



        //myWeb.loadUrl("file:///android_asset/index__.html");

//        myWeb.loadUrl("https://www.google.co.kr/");


//        String html = "<!DOCTYPE html><html><head></head>  <body> <h1> Title </h1>  <h2> Another </h2> </body></html>";
//        myWeb.loadDataWithBaseURL("", html, "text/html","utf-8", "");

        return mWebView;
    }

//    private void requestCameraPermission() {
//        if (shouldShowRequestPermissionRationale(Manifest.permission.CAMERA)) {
//            MessageDialogFragment.newInstance(R.string.permission_message)
//                    .show(getChildFragmentManager(), FRAGMENT_DIALOG);
//        } else {
//            requestPermissions(new String[]{Manifest.permission.CAMERA}, REQUEST_CAMERA_PERMISSION);
//        }
//    }

//    public void onReceiveNativeEvent(final ThemedReactContext reactContext, final MaterialCalendarView materialCalendarView) {
//        materialCalendarView.setOnDateChangedListener(new OnDateSelectedListener() {
//            @Override
//            public void onDateSelected(@NonNull MaterialCalendarView widget, @NonNull CalendarDay date, boolean selected) {
//                WritableMap event = Arguments.createMap();
//                event.putString("date", date.getDate().toString());
//                event.putInt("day", date.getDay());
//                event.putInt("month", date.getMonth());
//                event.putInt("year", date.getYear());
//                reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(materialCalendarView.getId(), "topChange", event);
//            }
//        });
//    }


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
