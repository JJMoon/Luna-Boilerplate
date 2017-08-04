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
import android.webkit.PermissionRequest;
import android.webkit.ValueCallback;
import android.webkit.WebView;
import android.widget.Toast;

import com.facebook.react.ReactActivity;
import com.permissionrequest.SimpleWebServer;

public class MainActivity extends ReactActivity {

    public static MainActivity Inst;
    public static String mCameraPhotoPath;

    private FragmentManager fragmentMan;

    private SimpleWebServer mWebServer;

    private ValueCallback<Uri> mUploadMessage;
    private PermissionRequest mPermissionRequest;

    private final static int PERMISSIONS_REQUEST_CODE = 100;
    public final static int FILECHOOSER_RESULTCODE=1;
    public static ValueCallback<Uri[]> mFilePathCallback = null;
    // private static final int REQUEST_CAMERA = 0;
    // private static final int REQUEST_CAMERA_PERMISSION = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Inst = this; // singletone

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

        Toast.makeText(MainActivity.this, "permissionProcess", Toast.LENGTH_SHORT).show();

        if (getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA)) {

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) { //API 23 이상이면
                // 런타임 퍼미션 처리 필요


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

                    // Toast.makeText(MainActivity.this, "Have Permission", Toast.LENGTH_LONG).show();
                } else {
                    //퍼미션 요청
                    ActivityCompat.requestPermissions(this,
                            new String[]{android.Manifest.permission.CAMERA,
                                    android.Manifest.permission.WRITE_EXTERNAL_STORAGE},
                            PERMISSIONS_REQUEST_CODE);
                }
            } else {
                Toast.makeText(MainActivity.this, "M 하위 버전임", Toast.LENGTH_SHORT).show();
            }
        } else {
            Toast.makeText(MainActivity.this, "Camera not supported", Toast.LENGTH_LONG).show();
        }
    }


    @Override
    public void onActivityResult(int requestCode, int resultCode,
                                    Intent intent) {
        if (requestCode==FILECHOOSER_RESULTCODE) {
            if(mFilePathCallback == null) {
                super.onActivityResult(requestCode, resultCode, intent);
                return;
            }

            Uri[] results = null;

            // Check that the response is a good one
            if(resultCode == Activity.RESULT_OK) {
                if(intent == null) {
                    // If there is not data, then we may have taken a photo
                    if(mCameraPhotoPath != null) {
                        results = new Uri[]{Uri.parse(mCameraPhotoPath)};
                    }
                } else {
                    String dataString = intent.getDataString();
                    if (dataString != null) {
                        results = new Uri[]{Uri.parse(dataString)};
                    }
                }
            }

            mFilePathCallback.onReceiveValue(results);
            mFilePathCallback = null;
            return;
        }
    }
}
