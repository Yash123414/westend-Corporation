# Quick DNS Setup for Acornpensy.com

## 🎯 What You Need to Do at Your Domain Registrar

Go to your domain registrar's DNS management page and add these 2 records:

### Record 1:
```
Type: A
Name: @
Value: 157.173.221.140
TTL: 3600
```

### Record 2:
```
Type: A
Name: www
Value: 157.173.221.140
TTL: 3600
```

---

## 🖥️ What to Run on Your VPS (After DNS is set)

### Step 1: Enable the site
```bash
sudo ln -s /var/www/westend-Corporation/acornpensy.com.conf /etc/nginx/sites-enabled/acornpensy.com.conf
```

### Step 2: Test nginx
```bash
sudo nginx -t
```

### Step 3: Reload nginx
```bash
sudo systemctl reload nginx
```

### Step 4: Open firewall (if needed)
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload
```

---

## 🔒 Install SSL Certificate (Wait 1 hour after DNS setup)

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d acornpensy.com -d www.acornpensy.com
```

---

## ✅ Test Your Site

After 30-60 minutes, visit:
- http://acornpensy.com
- http://www.acornpensy.com

After SSL:
- https://acornpensy.com
- https://www.acornpensy.com

---

## 📊 Check DNS Propagation

Visit: https://dnschecker.org
Enter: acornpensy.com
Should show: 157.173.221.140

---

## Common Registrars - Where to Find DNS Settings

**GoDaddy**: My Products → Domains → DNS
**Namecheap**: Domain List → Manage → Advanced DNS
**Google Domains**: Your Domain → DNS → Custom resource records
**Cloudflare**: Your Domain → DNS → Add record
**Hostinger**: Domains → Manage → DNS/Nameservers

---

**Your VPS IP**: 157.173.221.140
**Your New Domain**: acornpensy.com
</contents>