//android/src/main/java/com/rnswebview/www/ CustomWebViewManager.kt 
package com.rnswebview.www

import android.content.Context
import android.graphics.Bitmap
import android.util.AttributeSet
import android.view.KeyEvent
import android.view.inputmethod.EditorInfo
import android.view.inputmethod.InputConnection
import android.webkit.JsPromptResult
import android.webkit.JsResult
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.events.RCTEventEmitter

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.NativeModule
import com.facebook.react.uimanager.ViewManager

class CustomWebViewManager : SimpleViewManager<WebView>() {

    // Custom WebView with improved keyboard stability
    class StableWebView @JvmOverloads constructor(
        context: Context,
        attrs: AttributeSet? = null,
        defStyleAttr: Int = 0
    ) : WebView(context, attrs, defStyleAttr) {

        override fun onCreateInputConnection(outAttrs: EditorInfo): InputConnection? {
            val inputConnection = super.onCreateInputConnection(outAttrs)
            // Prevent fullscreen editing mode that causes flickering
            outAttrs.imeOptions = outAttrs.imeOptions or EditorInfo.IME_FLAG_NO_FULLSCREEN
            return inputConnection
        }

        override fun onCheckIsTextEditor(): Boolean {
            // Ensure WebView is treated as text editor when needed
            return true
        }
    }

    // Suppress dialogs
    class CustomWebChromeClient : WebChromeClient() {
        override fun onJsAlert(view: WebView?, url: String?, message: String?, result: JsResult): Boolean {
            result.cancel()
            return true
        }

        override fun onJsConfirm(view: WebView?, url: String?, message: String?, result: JsResult): Boolean {
            result.cancel()
            return true
        }

        override fun onJsPrompt(view: WebView?, url: String?, message: String?, defaultValue: String?, result: JsPromptResult): Boolean {
            result.cancel()
            return true
        }
    }

    override fun getName(): String {
        return "MyRaiidrWebView"
    }

    // Register JS event name
    override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
        return mutableMapOf(
            "topNavigationStateChange" to mutableMapOf("registrationName" to "onNavigationStateChange")
        )
    }

    // Create WebView and dispatch navigation events
    override fun createViewInstance(reactContext: ThemedReactContext): WebView {
        val webView = StableWebView(reactContext)

        webView.webViewClient = object : WebViewClient() {
            private var lastUrl: String? = null
            override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                if (url != null && url != lastUrl) {
                    lastUrl = url
                    val event = Arguments.createMap()
                    event.putString("url", url)

                    reactContext
                        .getJSModule(RCTEventEmitter::class.java)
                        .receiveEvent(webView.id, "topNavigationStateChange", event)
                }
            }
        }

        webView.webChromeClient = CustomWebChromeClient()
        webView.settings.javaScriptEnabled = true
        
        // Enable DOM storage for better input handling
        webView.settings.domStorageEnabled = true
        
        // Default focus settings for keyboard stability
        webView.isFocusable = true
        webView.isFocusableInTouchMode = true
        webView.descendantFocusability = WebView.FOCUS_AFTER_DESCENDANTS

        return webView
    }

    // Bridge the 'source' prop from JS to native
    @ReactProp(name = "source")
    fun setSource(webView: WebView, source: ReadableMap?) {
        source?.getString("uri")?.let {
            webView.loadUrl(it)
        }
    }

    @ReactProp(name = "suppressNavigationEvents")
    fun setSuppressNavigationEvents(webView: WebView, suppress: Boolean) {
          webView.setTag(suppress) // ✅ correct if you don’t use the key
       // webView.setTag(R.id.suppress_nav_events, suppress)
    }

    // Prop to control descendant focus
    @ReactProp(name = "descendantFocusability")
    fun setDescendantFocusability(webView: WebView, focusability: String) {
        when (focusability) {
            "blockDescendants" -> webView.descendantFocusability = WebView.FOCUS_BLOCK_DESCENDANTS
            "beforeDescendants" -> webView.descendantFocusability = WebView.FOCUS_BEFORE_DESCENDANTS
            else -> webView.descendantFocusability = WebView.FOCUS_AFTER_DESCENDANTS
        }
    }
}