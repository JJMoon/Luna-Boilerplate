package com.lunaboiler;

import android.Manifest;
import android.annotation.TargetApi;
import android.app.Activity;
import android.app.FragmentManager;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.text.TextUtils;
import android.util.Log;
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebView;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.permissionrequest.SimpleWebServer;

import java.io.File;

import static com.facebook.react.common.ReactConstants.TAG;

public class MainActivity extends ReactActivity {
    public static MainActivity Inst;
    public static String mCameraPhotoPath;
    public final static int FILECHOOSER_RESULTCODE = 1;

    public static ValueCallback<Uri[]> mFilePathCallback = null;
    public static ValueCallback<Uri> mUploadMessage;
    private final static int PERMISSIONS_REQUEST_CODE = 100;

    private static final int INPUT_FILE_REQUEST_CODE = 1;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Inst = this;
        permissionProcess();
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "lunaBoiler";
    }

    void permissionProcess() {
        //Toast.makeText(MainActivity.this, "permissionProcess", Toast.LENGTH_SHORT).show();
        if (getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA)) {

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) { //API 23 이상이면 런타임 퍼미션 처리 필요
                // Toast.makeText(MainActivity.this, "Permission Need", Toast.LENGTH_LONG).show();

                int hasCameraPermission = ContextCompat.checkSelfPermission(this,
                        android.Manifest.permission.CAMERA);

                int hasVideoPermission = ContextCompat.checkSelfPermission(this,
                        Manifest.permission.CAPTURE_VIDEO_OUTPUT);

                int hasWriteExternalStoragePermission =
                        ContextCompat.checkSelfPermission(this,
                                android.Manifest.permission.WRITE_EXTERNAL_STORAGE);

                if (hasCameraPermission == PackageManager.PERMISSION_GRANTED
                        && hasWriteExternalStoragePermission == PackageManager.PERMISSION_GRANTED) {
                    ;//이미 퍼미션을 가지고 있음

                     //Toast.makeText(MainActivity.this, "Have Permission", Toast.LENGTH_LONG).show();
                } else {
                    //퍼미션 요청
                    ActivityCompat.requestPermissions(this,
                            new String[]{android.Manifest.permission.CAMERA,
                                    android.Manifest.permission.WRITE_EXTERNAL_STORAGE},
                            PERMISSIONS_REQUEST_CODE);
                }
            } else {
                //Toast.makeText(this, "M 하위 버전임", Toast.LENGTH_SHORT).show();
            }
        } else {
            //Toast.makeText(this, "Camera not supported", Toast.LENGTH_LONG).show();
        }
    }



    private Uri getResultUri(Intent data) {
        Uri result = null;
        if(data == null || TextUtils.isEmpty(data.getDataString())) {
            // If there is not data, then we may have taken a photo
            if(mCameraPhotoPath != null) {
                result = Uri.parse(mCameraPhotoPath);
            }
        } else {
            String filePath = "";
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                filePath = data.getDataString();
            } else {
                // filePath = "file:" + RealPathUtil.getRealPath(this, data.getData());
            }
            result = Uri.parse(filePath);
        }

        return result;
    }



    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M) { //API 23 이상이면 런타임 퍼미션 처리 필요
            if (null == mUploadMessage)
                return;

            // Use MainActivity.RESULT_OK if you're implementing WebView inside Fragment
            // Use RESULT_OK only if you're implementing WebView inside an Activity
            Uri result = intent == null || resultCode != MainActivity.RESULT_OK ? null : intent.getData();
            mUploadMessage.onReceiveValue(result);
            mUploadMessage = null;
            return;
        }
        if (requestCode == FILECHOOSER_RESULTCODE) {
            if(mFilePathCallback == null) {
                super.onActivityResult(requestCode, resultCode, intent);
                return;
            }

            Uri[] results = null;

            Log.e(TAG, "photo path : result code " + resultCode + "  OK ? " + Activity.RESULT_OK );

            // Check that the response is a good one
            if(resultCode == Activity.RESULT_OK) {
                if (intent == null || intent.getDataString() == null) {
                    // If there is not data, then we may have taken a photo
                    if (mCameraPhotoPath != null) {
                        results = new Uri[]{Uri.parse(mCameraPhotoPath)};
                    }
                } else {
                    String dataString = intent.getDataString();
                    if (dataString != null) {
                        results = new Uri[]{Uri.parse(dataString)};
                    }
                }
//                if(intent == null) {
//                    // If there is not data, then we may have taken a photo
//                    if(mCameraPhotoPath != null) {
//                        results = new Uri[]{ Uri.parse(mCameraPhotoPath) };
//                    }
//                } else {
//                    String dataString = intent.getDataString();
//
//                    if (dataString != null) {
//                        results = new Uri[]{Uri.parse(dataString)};
//                    }
//                }
            }

            Log.e(TAG, " result num : " + results.length );

            if (results.length == 1) {
                Log.d(TAG, "   results... " + results[0].getAuthority());
                Log.d(TAG, "   results... " + results[0].getEncodedPath());
                Log.d(TAG, "   results... " + results[0].getEncodedSchemeSpecificPart());
                Log.d(TAG, "   results... " + results[0].getHost());
            }

            //mFilePathCallback.onReceiveValue(new Uri[]{Uri.parse(theImgFile.getAbsolutePath())});

            mFilePathCallback.onReceiveValue(results);
            mFilePathCallback = null;
            return;
        }
    }
}



/*

 if (requestCode == INPUT_FILE_REQUEST_CODE && resultCode == RESULT_OK) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                if (mFilePathCallback == null) {
                    super.onActivityResult(requestCode, resultCode, intent);
                    return;
                }
                Uri[] results = new Uri[]{getResultUri(intent)};

                Log.e(TAG, " result num : " + results[0]);



                mFilePathCallback.onReceiveValue(results);
                mFilePathCallback = null;
            } else {
                if (mUploadMessage == null) {
                    super.onActivityResult(requestCode, resultCode, intent);
                    return;
                }
                Uri result = getResultUri(intent);

                Log.d(getClass().getName(), "openFileChooser : " + result);
                mUploadMessage.onReceiveValue(result);
                mUploadMessage = null;
            }
        } else {
            if (mFilePathCallback != null) mFilePathCallback.onReceiveValue(null);
            if (mUploadMessage != null) mUploadMessage.onReceiveValue(null);
            mFilePathCallback = null;
            mUploadMessage = null;
            super.onActivityResult(requestCode, resultCode, intent);
        }




* */
