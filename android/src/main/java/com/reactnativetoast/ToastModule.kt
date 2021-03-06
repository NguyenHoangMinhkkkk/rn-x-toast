package com.reactnativetoast

import android.util.Log
import android.view.Gravity
import android.widget.Toast
import android.widget.TextView;
import com.facebook.react.bridge.*
import android.os.Handler;

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

        val toastDuration = (if ("LONG" == duration) Toast.LENGTH_LONG else Toast.LENGTH_SHORT)
        val toast = Toast.makeText(reactApplicationContext, message, toastDuration)

        if ("TOP" == position) {
          toast.setGravity(Gravity.TOP, 0, 40)
        } else if ("BOTTOM" == position) {
          toast.setGravity(Gravity.BOTTOM, 0, 40)
        } else if ("CENTER" == position) {
          toast.setGravity(Gravity.CENTER, 0, 0)
        } else {
          Log.d("rn-x-toast", "invalid toast param passed to native-module")
          return@Runnable
        }

        // workarount for alignment text message
        try {
          // :D i think these line of code should be place in try{}
          val view = toast.view.findViewById<TextView>(android.R.id.message)
          view?.let { view.gravity = Gravity.CENTER }
        } catch(e: Exception) {
          Log.d("rn-x-toast", "Toast cannot be set gravity")
        }

        toast.show()
        mostRecentToast = toast

        // Hide toast after 1000ms if duration is short
        if ("SHORT" == duration && mostRecentToast != null) {
          val handler = Handler()
          handler.postDelayed({ mostRecentToast?.cancel() }, 1000)
        }
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
