import 'package:flutter/material.dart';
// import 'package:font_awesome_flutter/font_awesome_flutter.dart'; // مكتبة أيقونات احترافية سنضيفها لاحقاً
import '../services/auth_service.dart'; // استيراد خدمة المصادقة

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // 1. اللوقو أو الأيقونة المعبرة
              Container(
                height: 150,
                width: 150,
                decoration: BoxDecoration(
                  color: Colors.blue.shade50,
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  Icons.receipt_long_rounded,
                  size: 80,
                  color: Colors.blue.shade800,
                ),
              ),
              SizedBox(height: 40),

              // 2. النصوص الترحيبية
              Text(
                'مرحباً بك!',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                  fontFamily: 'Cairo', // سنضيف الخط لاحقاً
                ),
              ),
              SizedBox(height: 10),
              Text(
                'سجل فواتيدك، وريح بالك.\nكل مشترياتك في مكان واحد آمن.',
                textAlign: TextAlign.center,
                style: TextStyle(
                  fontSize: 16,
                  color: Colors.grey[600],
                  height: 1.5,
                  fontFamily: 'Cairo',
                ),
              ),
              SizedBox(height: 60),

              // 3. زر الدخول عبر جوجل
              _isLoading
                  ? Center(child: CircularProgressIndicator())
                  : ElevatedButton.icon(
                      onPressed: () async {
                        setState(() => _isLoading = true);
                        // هنا نستدعي دالة الدخول من ملف auth_service
                        // await AuthService().signInWithGoogle();
                        // بعد النجاح نوجهه للصفحة الرئيسية
                        setState(() => _isLoading = false);
                      },
                      icon: Icon(Icons.login, color: Colors.white), // مؤقتاً أيقونة عادية
                      label: Text(
                        'تسجيل الدخول عبر Google',
                        style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.blue.shade700,
                        foregroundColor: Colors.white,
                        padding: EdgeInsets.symmetric(vertical: 16),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                        ),
                        elevation: 2,
                      ),
                    ),
              
              SizedBox(height: 20),
              
              // 4. خيار الدخول كضيف (اختياري)
              TextButton(
                onPressed: () {
                  // كود الدخول كضيف
                },
                child: Text(
                  'تخطى والدخول كزائر',
                  style: TextStyle(color: Colors.grey),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
