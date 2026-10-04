# 🚨 Handoff Document - Acornpensy Exports Website Issues & Solutions

## Current Problems

### 1. ❌ Old Westend Corporation Branding Still Showing
**Problem**: The website is displaying old Westend Corporation logo and branding instead of Acornpensy Exports.

**Root Cause**: Browser is serving cached version OR nginx is serving wrong directory/old files.

**Solutions to Try**:

#### Solution A: Hard refresh browser cache
```bash
# On your laptop browser:
# Chrome/Edge: Ctrl + Shift + R (Windows) or Cmd + Shift + R (Mac)
# Firefox: Ctrl + F5
# Or open in Incognito/Private mode
```

#### Solution B: Clear nginx cache and verify files
```bash
# SSH into VPS and run:
cd /var/www/westend-Corporation

# Verify the dist folder has NEW files (should show today's date)
ls -lh dist/

# If files are old, rebuild:
npm run build

# Clear any nginx cache
sudo systemctl restart nginx

# Force clear browser cache on server side
# Add no-cache headers temporarily
```

#### Solution C: Check if wrong site is being served
```bash
# Check what nginx is actually serving
curl -v http://acornpensyexports.com 2>&1 | grep "< "

# Verify nginx is reading the right config
sudo nginx -T | grep -A 20 "acornpensyexports.com"

# Make sure westendcorporation.in config isn't interfering
cat /etc/nginx/sites-enabled/westendcorporation.in.conf
```

---

### 2. ❌ HTTPS Not Working (Only HTTP works)
**Problem**: Site only loads on http://acornpensyexports.com, not https://

**Root Cause**: No SSL certificate configured for acornpensyexports.com domain yet.

**Solution**: Install Let's Encrypt SSL Certificate

```bash
# SSH into VPS and run:

# Install certbot (if not already installed)
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate for your domain
sudo certbot --nginx -d acornpensyexports.com -d www.acornpensyexports.com

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (recommended: Yes)

# Verify certificate is installed
sudo certbot certificates

# Test auto-renewal
sudo certbot renew --dry-run
```

**After SSL is installed**, your nginx config will be automatically updated with SSL settings.

---

### 3. ❌ Database Not Running / Backend API Not Working
**Problem**: Backend API and database are not started.

**Root Cause**: Django backend server is not running.

**Solution**: Start the Backend Server

```bash
# SSH into VPS
cd /var/www/westend-Corporation/backend

# Activate virtual environment (if you have one)
source venv/bin/activate  # or wherever your venv is

# Check if database needs migration
python manage.py migrate

# Start the Django development server
python manage.py runserver 0.0.0.0:8000

# OR if you're using gunicorn (production):
gunicorn core.wsgi:application --bind 0.0.0.0:8000 --daemon
```

**Better Solution - Run as Systemd Service (recommended)**:

Create a systemd service file:
```bash
sudo nano /etc/systemd/system/acornpensy-backend.service
```

Add this content:
```ini
[Unit]
Description=Acornpensy Exports Backend
After=network.target

[Service]
User=root
Group=root
WorkingDirectory=/var/www/westend-Corporation/backend
Environment="PATH=/var/www/westend-Corporation/backend/venv/bin"
ExecStart=/var/www/westend-Corporation/backend/venv/bin/gunicorn core.wsgi:application --bind 0.0.0.0:8000

[Install]
WantedBy=multi-user.target
```

Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable acornpensy-backend
sudo systemctl start acornpensy-backend
sudo systemctl status acornpensy-backend
```

---

## 🔍 Diagnostic Commands

Run these to identify issues:

```bash
# Check what's actually in the dist folder
ls -lah /var/www/westend-Corporation/dist/
cat /var/www/westend-Corporation/dist/index.html | head -30

# Check nginx is serving the right files
curl -I http://acornpensyexports.com

# Check if backend is running
curl http://localhost:8000/api/
netstat -tuln | grep 8000

# Check nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check which nginx configs are active
ls -la /etc/nginx/sites-enabled/
```

---

## 🎯 Complete Setup Checklist

### Frontend
- [x] Code rebranded to Acornpensy Exports
- [x] Logo updated
- [x] Contact info updated
- [x] Domain updated in configs
- [ ] **Fresh build deployed to dist folder**
- [ ] **Browser cache cleared**
- [ ] **Nginx serving correct files**

### Nginx & SSL
- [x] Nginx config created for acornpensyexports.com
- [x] Config symlinked to sites-enabled
- [x] Nginx reloaded
- [ ] **SSL certificate installed**
- [ ] **HTTPS working**

### Backend & Database
- [ ] **Backend server started**
- [ ] **Database migrations run**
- [ ] **API responding on port 8000**
- [ ] **Systemd service created (optional but recommended)**

### DNS
- [x] A record @ → 157.173.221.140
- [x] CNAME www → acornpensyexports.com
- [x] DNS propagated

---

## 🔧 Quick Fix Commands (Run These Now)

```bash
# 1. Rebuild frontend with correct branding
cd /var/www/westend-Corporation
npm run build

# 2. Restart nginx completely (not just reload)
sudo systemctl restart nginx

# 3. Start backend
cd /var/www/westend-Corporation/backend
python manage.py runserver 0.0.0.0:8000 &

# 4. Install SSL
sudo certbot --nginx -d acornpensyexports.com -d www.acornpensyexports.com

# 5. Check everything is running
curl http://acornpensyexports.com
curl http://localhost:8000/api/
```

---

## 🎨 What Was Completed

### ✅ Code Changes (All Committed to Git)
- Company name: Westend Corporation → **Acornpensy Exports**
- Email: support@westendcorporation.in → **Export@acornpensy.com**
- Phone: +91 93119 33481 → **+91 9599042226**
- Address: Updated to **B-106, Phase-1, Okhla, New Delhi 110020**
- Logo: Updated to new Acornpensy Exports logo
- Domain: acornpensy.com → **acornpensyexports.com**
- Founded: 2010 → **2014**

### ✅ Files Updated (35+ files)
- All frontend components (Navbar, Footer, Contact, Hero)
- All pages (Home, About, Products, Contact, Privacy, Terms)
- SEO component with schema.org data
- Backend models and configurations
- Nginx configuration file
- index.html meta tags

---

## 📞 Next Steps

1. **Run the Quick Fix Commands above**
2. **Clear your browser cache** or test in Incognito mode
3. **Verify the site shows Acornpensy branding**
4. **Install SSL certificate** for HTTPS
5. **Start and verify backend API** is working

---

## 🆘 If Still Not Working

If old branding still shows after following all steps:

1. Check if there's another nginx config interfering:
```bash
cat /etc/nginx/sites-enabled/westendcorporation.in.conf
# If this is serving as default, it might be catching requests
```

2. Verify the build actually updated:
```bash
grep -r "Westend Corporation" /var/www/westend-Corporation/dist/
# Should return NO results if rebranding worked
```

3. Check if files are being cached by nginx:
```bash
# Add this to your nginx config temporarily:
# add_header Cache-Control "no-cache, no-store, must-revalidate";
```

---

**Summary**: The rebranding is complete in the code, but the production build needs to be properly deployed, SSL needs to be installed, and the backend needs to be started. Follow the Quick Fix Commands section to resolve all issues.
</contents>