package com.edtoast;
import android.view.Gravity;

import com.facebook.common.logging.FLog;
import com.facebook.react.bridge.*;

class ToastModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

    private android.widget.Toast mostRecentToast;

    // note that webView.isPaused() is not Xwalk compatible, so tracking it poor-man style
    private boolean isPaused;

    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "EDToast";
    }

    @ReactMethod
    public void show(ReadableMap options) throws Exception {
        if (this.isPaused) {
            return;
        }


        final String message = options.getString("message");
        final String duration = options.getString("duration");
        final String position = options.getString("position");

        UiThreadUtil.runOnUiThread(new Runnable() {
            public void run() {
                android.widget.Toast toast = android.widget.Toast.makeText(
                        getReactApplicationContext(),
                        message,
                        "SHORT".equals(duration) ? android.widget.Toast.LENGTH_SHORT : android.widget.Toast.LENGTH_LONG);

                if ("TOP".equals(position)) {
                    toast.setGravity(Gravity.TOP | Gravity.CENTER_HORIZONTAL, 0, 40);
                } else if ("BOTTOM".equals(position)) {
                    toast.setGravity(Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL, 0, 40);
                } else if ("CENTER".equals(position)) {
                    toast.setGravity(Gravity.CENTER_VERTICAL | Gravity.CENTER_HORIZONTAL, 0, 0);
                } else {
                    FLog.e("RCTToast", "invalid position. valid options are 'top', 'center' and 'bottom'");
                    return;
                }

                toast.show();
                mostRecentToast = toast;
            }
        });
    }

    @ReactMethod
    public void hide() throws Exception {
        if (mostRecentToast != null) {
            mostRecentToast.cancel();
        }
    }

    @Override
    public void initialize() {
        getReactApplicationContext().addLifecycleEventListener(this);
    }

    @Override
    public void onHostPause() {
        if (mostRecentToast != null) {
            mostRecentToast.cancel();
        }
        this.isPaused = true;
    }

    @Override
    public void onHostResume() {
        this.isPaused = false;
    }

    @Override
    public void onHostDestroy() {
        this.isPaused = true;
    }
}