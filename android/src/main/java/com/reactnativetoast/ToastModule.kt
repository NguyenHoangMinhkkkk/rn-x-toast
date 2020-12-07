package com.reactnativetoast

import android.util.Log
import android.view.Gravity
import android.widget.Toast
import com.facebook.react.bridge.*


class ToastModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener {

    private var mostRecentToast: Toast? = null
    private var isPaused = false

    override fun getName(): String {
        return "Toast"
    }

    @ReactMethod
    @Throws(Exception::class)
    fun show(options: ReadableMap) {
      // Listen for activityLifeCycle, if lifeCycle is isPaused, return and not showing toast
      if (this.isPaused) return

      // if a recent Toast is showing, replace it with new toast immediately.
      if(mostRecentToast != null) mostRecentToast?.cancel()

      val message = options.getString("message")
      val duration = options.getString("duration")
      val position = options.getString("position")

      UiThreadUtil.runOnUiThread(Runnable {
        val toast = Toast.makeText(
          reactApplicationContext,
          message,
          if ("SHORT" == duration) Toast.LENGTH_SHORT else Toast.LENGTH_LONG)
        if ("TOP" == position) {
          toast.setGravity(Gravity.TOP or Gravity.CENTER_HORIZONTAL, 0, 40)
        } else if ("BOTTOM" == position) {
          toast.setGravity(Gravity.BOTTOM or Gravity.CENTER_HORIZONTAL, 0, 40)
        } else if ("CENTER" == position) {
          toast.setGravity(Gravity.CENTER_VERTICAL or Gravity.CENTER_HORIZONTAL, 0, 0)
        } else {
          Log.d("RNToast", "invalid toast param passed to native-module")
          return@Runnable
        }
        toast.show()
        mostRecentToast = toast
      })
    }

    @ReactMethod
    @Throws(Exception::class)
    fun hide() {
      // Immediately hide recent toast.
      if(mostRecentToast != null)  mostRecentToast?.cancel()
    }

    override fun initialize() {
      reactApplicationContext.addLifecycleEventListener(this)
    }

    override fun onHostPause() {
      mostRecentToast?.cancel()
      this.isPaused = true
    }

    override fun  onHostResume() {
      this.isPaused = false
    }

    override fun  onHostDestroy() {
      this.isPaused = true
    }
}
