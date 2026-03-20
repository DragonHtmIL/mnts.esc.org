package av.mnts.eventscreator

import android.Manifest
import android.annotation.SuppressLint
import android.app.AlarmManager
import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Color
import android.graphics.drawable.Drawable
import android.graphics.drawable.GradientDrawable
import android.graphics.drawable.StateListDrawable
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.PowerManager
import android.provider.Settings
import android.util.Log
import android.view.Gravity
import android.view.View
import android.webkit.JavascriptInterface
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import android.widget.ImageButton
import androidx.activity.ComponentActivity
import androidx.activity.OnBackPressedCallback
import androidx.activity.SystemBarStyle
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.content.ContextCompat
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.updatePadding

class MainActivity : ComponentActivity() {

    private var filePathCallback: ValueCallback<Array<Uri>>? = null
    private var pendingFileName: String? = null
    private var pendingFileContent: String? = null
    private lateinit var webView: WebView
    private lateinit var rootLayout: FrameLayout
    private lateinit var homeButton: ImageButton
    private var isDarkMode = true

    private val requestPermissionLauncher =
        registerForActivityResult(ActivityResultContracts.RequestPermission()) { isGranted: Boolean ->
            if (isGranted) {
                Log.d("MainActivity", "Notification permission granted")
            }
        }

    private val fileChooserLauncher =
        registerForActivityResult(ActivityResultContracts.GetMultipleContents()) { uris ->
            filePathCallback?.onReceiveValue(uris.toTypedArray())
            filePathCallback = null
        }

    private val createFileLauncher =
        registerForActivityResult(ActivityResultContracts.CreateDocument("application/json")) { uri ->
            uri?.let {
                saveContentToUri(it, pendingFileContent ?: "")
            }
            pendingFileName = null
            pendingFileContent = null
        }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        enableEdgeToEdge()
        super.onCreate(savedInstanceState)
        createNotificationChannels()
        requestBatteryOptimizationExemption()

        rootLayout = FrameLayout(this)
        webView = WebView(this)
        rootLayout.addView(webView)
        
        setupNativeHomeButton()
        rootLayout.addView(homeButton)

        setContentView(rootLayout)

        ViewCompat.setOnApplyWindowInsetsListener(rootLayout) { v, insets ->
            val systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars())
            v.updatePadding(
                left = systemBars.left,
                top = systemBars.top,
                right = systemBars.right,
                bottom = systemBars.bottom
            )
            insets
        }

        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            allowFileAccess = true
            allowContentAccess = true
            cacheMode = WebSettings.LOAD_DEFAULT
        }

        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                runOnUiThread { updateHomeButtonVisibility(url) }
            }
            
            override fun doUpdateVisitedHistory(view: WebView?, url: String?, isReload: Boolean) {
                super.doUpdateVisitedHistory(view, url, isReload)
                runOnUiThread { updateHomeButtonVisibility(url) }
            }

            override fun shouldOverrideUrlLoading(view: WebView?, request: WebResourceRequest?): Boolean {
                val url = request?.url.toString()
                if (url.startsWith("file:///android_asset/")) {
                    return false
                }
                view?.loadUrl(url)
                return true
            }
        }

        webView.webChromeClient = object : WebChromeClient() {
            override fun onShowFileChooser(
                webView: WebView?,
                filePathCallback: ValueCallback<Array<Uri>>?,
                fileChooserParams: FileChooserParams?
            ): Boolean {
                this@MainActivity.filePathCallback = filePathCallback
                fileChooserLauncher.launch("application/json")
                return true
            }
        }
        
        webView.addJavascriptInterface(WebAppInterface(this), "Android")

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(
                    this,
                    Manifest.permission.POST_NOTIFICATIONS
                ) != PackageManager.PERMISSION_GRANTED
            ) {
                requestPermissionLauncher.launch(Manifest.permission.POST_NOTIFICATIONS)
            }
        }

        onBackPressedDispatcher.addCallback(this, object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                if (webView.canGoBack()) {
                    webView.goBack()
                } else {
                    val url = webView.url
                    if (url != null && !url.startsWith("file:///android_asset/index.html")) {
                        webView.loadUrl("file:///android_asset/index.html")
                    } else {
                        finish()
                    }
                }
            }
        })

        webView.loadUrl("file:///android_asset/index.html")
    }

    private fun setupNativeHomeButton() {
        val density = resources.displayMetrics.density
        homeButton = ImageButton(this).apply {
            val size = (50 * density).toInt()
            layoutParams = FrameLayout.LayoutParams(size, size).apply {
                gravity = Gravity.BOTTOM or Gravity.END
                bottomMargin = (10 * density).toInt()
                rightMargin = (10 * density).toInt()
            }
            
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                elevation = 25 * density
            }
            
            scaleType = android.widget.ImageView.ScaleType.FIT_CENTER
            val padding = (12 * density).toInt()
            setPadding(padding, padding, padding, padding)
            
            visibility = View.GONE
            
            setOnClickListener {
                webView.loadUrl("file:///android_asset/index.html")
            }
        }
        applyHomeButtonStyling()
        updateHomeButtonIcon()
    }

    private fun applyHomeButtonStyling() {
        val density = resources.displayMetrics.density
        
        // Android Colors are #AARRGGBB
        val normalBg = Color.parseColor("#80007BFF") // 50% opacity blue
        val pressedBg = Color.parseColor("#FF0056B3") // Solid darker blue
        val strokeColor = Color.parseColor("#FF007AFF") // Solid border blue
        
        val normalShape = GradientDrawable().apply {
            shape = GradientDrawable.RECTANGLE
            cornerRadius = 5 * density
            setColor(normalBg)
            setStroke((2 * density).toInt(), strokeColor)
        }
        
        val pressedShape = GradientDrawable().apply {
            shape = GradientDrawable.RECTANGLE
            cornerRadius = 5 * density
            setColor(pressedBg)
            setStroke((2 * density).toInt(), strokeColor)
        }
        
        val states = StateListDrawable().apply {
            addState(intArrayOf(android.R.attr.state_pressed), pressedShape)
            addState(intArrayOf(), normalShape)
        }
        
        homeButton.background = states
        
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            homeButton.clipToOutline = true
        }
    }

    private fun updateHomeButtonIcon() {
        val themeDir = if (isDarkMode) "dark" else "light"
        val defaultPath = "index_data/textures/$themeDir/home.png"
        val hoverPath = "index_data/textures/$themeDir/home_filled.png"
        
        try {
            val stateList = StateListDrawable()
            
            val pressedStream = assets.open(hoverPath)
            val pressedDrawable = Drawable.createFromStream(pressedStream, null)
            stateList.addState(intArrayOf(android.R.attr.state_pressed), pressedDrawable)
            
            val defaultStream = assets.open(defaultPath)
            val defaultDrawable = Drawable.createFromStream(defaultStream, null)
            stateList.addState(intArrayOf(), defaultDrawable)
            
            homeButton.setImageDrawable(stateList)
        } catch (e: Exception) {
            Log.e("MainActivity", "Error loading home icons", e)
        }
    }

    private fun updateHomeButtonVisibility(url: String?) {
        runOnUiThread {
            if (url == null || url.startsWith("file:///android_asset/index.html")) {
                homeButton.visibility = View.GONE
            } else {
                homeButton.visibility = View.VISIBLE
                homeButton.bringToFront()
            }
        }
    }

    private fun requestBatteryOptimizationExemption() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val intent = Intent()
            val packageName = packageName
            val pm = getSystemService(Context.POWER_SERVICE) as PowerManager
            if (!pm.isIgnoringBatteryOptimizations(packageName)) {
                intent.action = Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS
                intent.data = Uri.parse("package:$packageName")
                startActivity(intent)
            }
        }
    }

    private fun saveContentToUri(uri: Uri, content: String) {
        try {
            contentResolver.openOutputStream(uri)?.use { outputStream ->
                outputStream.write(content.toByteArray())
            }
        } catch (e: Exception) {
            Log.e("MainActivity", "Error saving file", e)
        }
    }

    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val notificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            
            val channel = NotificationChannel("EVENT_CHANNEL", "Event Notifications", NotificationManager.IMPORTANCE_HIGH).apply {
                description = "Notifications for started events"
                enableVibration(true)
                setShowBadge(true)
            }
            notificationManager.createNotificationChannel(channel)

            val importantChannel = NotificationChannel("IMPORTANT_EVENT_CHANNEL", "Important Event Alerts", NotificationManager.IMPORTANCE_HIGH).apply {
                description = "Critical alerts that bypass silence and DND"
                enableVibration(true)
                setBypassDnd(true)
                lockscreenVisibility = android.app.Notification.VISIBILITY_PUBLIC
            }
            notificationManager.createNotificationChannel(importantChannel)
        }
    }

    inner class WebAppInterface(private val context: Context) {
        @JavascriptInterface
        fun scheduleNotification(title: String, message: String, timestamp: Long, isImportant: Boolean) {
            val intent = Intent(context, NotificationReceiver::class.java).apply {
                putExtra("title", title)
                putExtra("message", message)
                putExtra("important", isImportant)
            }
            
            val requestCode = (title.hashCode() xor timestamp.toInt()).coerceAtLeast(0)
            val pendingIntent = PendingIntent.getBroadcast(
                context, requestCode, intent,
                PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
            )
            
            val alarmManager = context.getSystemService(Context.ALARM_SERVICE) as AlarmManager
            
            try {
                val info = AlarmManager.AlarmClockInfo(timestamp, pendingIntent)
                alarmManager.setAlarmClock(info, pendingIntent)
            } catch (e: Exception) {
                Log.e("WebAppInterface", "Error scheduling alarm", e)
                alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, timestamp, pendingIntent)
            }
        }

        @JavascriptInterface
        fun saveFile(fileName: String, content: String) {
            pendingFileName = fileName
            pendingFileContent = content
            createFileLauncher.launch(fileName)
        }

        @JavascriptInterface
        fun closeApp() {
            (context as? ComponentActivity)?.finishAffinity()
        }

        @JavascriptInterface
        fun restartApp() {
            val intent = context.packageManager.getLaunchIntentForPackage(context.packageName)
            val mainIntent = Intent.makeRestartActivityTask(intent?.component)
            context.startActivity(mainIntent)
            Runtime.getRuntime().exit(0)
        }

        @JavascriptInterface
        fun setSystemBarsColor(isDark: Boolean) {
            runOnUiThread {
                isDarkMode = isDark
                updateHomeButtonIcon()
                applyHomeButtonStyling()

                val backgroundColor = if (isDark) Color.parseColor("#0B0B0B") else Color.parseColor("#F0F0F0")
                rootLayout.setBackgroundColor(backgroundColor)
                
                if (isDark) {
                    enableEdgeToEdge(
                        statusBarStyle = SystemBarStyle.dark(backgroundColor),
                        navigationBarStyle = SystemBarStyle.dark(backgroundColor)
                    )
                } else {
                    enableEdgeToEdge(
                        statusBarStyle = SystemBarStyle.light(backgroundColor, backgroundColor),
                        navigationBarStyle = SystemBarStyle.light(backgroundColor, backgroundColor)
                    )
                }
            }
        }
    }
}
