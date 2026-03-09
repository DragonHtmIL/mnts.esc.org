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
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.PowerManager
import android.provider.Settings
import android.util.Log
import android.webkit.JavascriptInterface
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import androidx.activity.ComponentActivity
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

        webView.webViewClient = WebViewClient()

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

        webView.loadUrl("file:///android_asset/index.html")
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
            
            // Standard Channel
            val channel = NotificationChannel("EVENT_CHANNEL", "Event Notifications", NotificationManager.IMPORTANCE_HIGH).apply {
                description = "Notifications for started events"
                enableVibration(true)
                setShowBadge(true)
            }
            notificationManager.createNotificationChannel(channel)

            // Important Channel (Bypass DND)
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
            Log.d("WebAppInterface", "Scheduling notification: $title at $timestamp, Important: $isImportant")
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
                // Use AlarmClock for absolute precision and zero delay
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
        fun setSystemBarsColor(isDark: Boolean) {
            runOnUiThread {
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
