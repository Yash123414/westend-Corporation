# ⚡ QUICK FIX - Run These Commands Now

## Problem: Old Westend branding showing, HTTPS not working, backend not running

---

## Step 1: Force Fresh Build and Deploy

```bash
cd /var/www/westend-Corporation

# Remove old build
rm -rf dist/

# Fresh build
npm run build

# Verify new files were created (should show today's date/time)
ls -lh dist/

# Check if new branding is in the build
grep -i "acornpensy" dist/index.html
# Should see "Acornpensy Exports" multiple times

# If you still see "Westend", the build failed - check for errors
```

---

## Step 2: Restart Nginx Completely

```bash
# Full restart (not just reload)
sudo systemctl restart nginx

# Verify it's running
sudo systemctl status nginx
```

---

## Step 3: Test in Fresh Browser

```bash
# From your laptop:
# Open INCOGNITO/PRIVATE window
# Visit: http://acornpensyexports.com

# Should now show Acornpensy Exports branding
```

---

## Step 4: Install SSL Certificate

```bash
# Install certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d acornpensyexports.com -d www.acornpensyexports.com

# Follow prompts:
# - Enter your email
# - Agree to terms
# - Choose YES to redirect HTTP to HTTPS

# Test HTTPS
curl -I https://acornpensyexports.com
```

---

## Step 5: Start Backend API

```bash
cd /var/www/westend-Corporation/backend

# Check if virtual environment exists
ls -la venv/

# If venv exists, activate it
source venv/bin/activate

# Run migrations
python manage.py migrate

# Start backend (development mode)
python manage.py runserver 0.0.0.0:8000

# Test it works
# Open new terminal and run:
curl http://localhost:8000/api/
```

---

## Step 6: Make Backend Run Permanently

If you want backend to run in background:

```bash
# Install screen or tmux
sudo apt install screen -y

# Start a screen session
screen -S backend

# Inside screen, start backend
cd /var/www/westend-Corporation/backend
source venv/bin/activate
python manage.py runserver 0.0.0.0:8000

# Detach from screen: Press Ctrl+A, then D

# To reattach later: screen -r backend
```

---

## Verification Checklist

Run these to verify everything works:

```bash
# ✅ Check frontend shows new branding
curl http://acornpensyexports.com | grep -i "acornpensy"

# ✅ Check HTTPS works
curl -I https://acornpensyexports.com

# ✅ Check backend is running
curl http://localhost:8000/api/

# ✅ Check nginx is serving right files
curl http://acornpensyexports.com | head -50
```

---

## Still Showing Old Branding?

If old Westend branding still shows:

```bash
# Check if build actually has new branding
grep -i "westend" /var/www/westend-Corporation/dist/index.html
# Should return NOTHING if rebranding worked

grep -i "acornpensy" /var/www/westend-Corporation/dist/index.html
# Should return MULTIPLE matches if rebranding worked

# If you see "Westend" in dist/index.html, the build didn't work
# Check the SOURCE file:
cat /var/www/westend-Corporation/index.html | head -30

# If source file is correct but build is wrong:
# Clear node cache and rebuild
rm -rf node_modules/.vite
npm run build
```

---

## Pro Tip: Check Which Config Nginx is Using

```bash
# See what nginx is actually serving for your domain
sudo nginx -T | grep -A 30 "acornpensyexports.com"

# Make sure the root path is correct:
# root /var/www/westend-Corporation/dist;
```

---

## Summary

1. **Fresh build**: `rm -rf dist/ && npm run build`
2. **Restart nginx**: `sudo systemctl restart nginx`
3. **Clear browser cache**: Test in Incognito mode
4. **Install SSL**: `sudo certbot --nginx -d acornpensyexports.com -d www.acornpensyexports.com`
5. **Start backend**: `cd backend && python manage.py runserver 0.0.0.0:8000`

All code changes are committed to git. The issue is deployment, not code.
