# DNS Configuration Guide for Acornpensy Exports

## Your VPS Details
- **VPS IP Address**: 157.173.221.140
- **Domain**: acornpensy.com
- **Website Location**: /var/www/westend-Corporation/

---

## Step 1: Configure DNS Records at Your Domain Registrar

Log in to your domain registrar (where you purchased acornpensy.com) and add the following DNS records:

### A Records (Required)
```
Type: A
Name: @
Value: 157.173.221.140
TTL: 3600 (or Auto)

Type: A
Name: www
Value: 157.173.221.140
TTL: 3600 (or Auto)
```

### Optional: Add these for email (if needed later)
```
Type: MX
Name: @
Value: (your mail server - add later when email is set up)
Priority: 10
```

---

## Step 2: Configure Nginx on VPS

Once DNS is configured, run these commands on your VPS via SSH:

### 2.1 Enable the new site configuration
```bash
sudo ln -s /var/www/westend-Corporation/acornpensy.com.conf /etc/nginx/sites-enabled/acornpensy.com.conf
```

### 2.2 Test nginx configuration
```bash
sudo nginx -t
```

### 2.3 Reload nginx
```bash
sudo systemctl reload nginx
```

---

## Step 3: Install SSL Certificate (Recommended - Do this after DNS propagates)

Wait 30-60 minutes for DNS to propagate, then install Let's Encrypt SSL certificate:

### 3.1 Install Certbot (if not already installed)
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
```

### 3.2 Get SSL certificate
```bash
sudo certbot --nginx -d acornpensy.com -d www.acornpensy.com
```

Follow the prompts:
- Enter your email address
- Agree to terms of service
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

### 3.3 Test auto-renewal
```bash
sudo certbot renew --dry-run
```

---

## Step 4: Verify Everything Works

### 4.1 Check DNS propagation (wait 30-60 minutes after DNS setup)
Visit: https://dnschecker.org
Enter: acornpensy.com
Check if it resolves to 157.173.221.140

### 4.2 Test the website
- http://acornpensy.com
- http://www.acornpensy.com
- After SSL: https://acornpensy.com

---

## Common DNS Registrars - Where to Add Records

### GoDaddy
1. Log in to GoDaddy
2. Go to "My Products" → "Domains"
3. Click "DNS" next to your domain
4. Click "Add" to add new records

### Namecheap
1. Log in to Namecheap
2. Go to "Domain List"
3. Click "Manage" next to your domain
4. Go to "Advanced DNS" tab
5. Add the A records

### Google Domains
1. Log in to Google Domains
2. Click on your domain
3. Go to "DNS" in the left menu
4. Scroll to "Custom resource records"
5. Add the A records

### Cloudflare
1. Log in to Cloudflare
2. Select your domain
3. Go to "DNS" tab
4. Click "Add record"
5. Add the A records
6. **Important**: Set Proxy status to "DNS only" (gray cloud) initially

---

## Troubleshooting

### DNS not resolving?
- Wait 30-60 minutes for DNS propagation
- Check DNS with: `nslocalhost acornpensy.com`
- Use https://dnschecker.org to verify global propagation

### Website not loading?
```bash
# Check if nginx is running
sudo systemctl status nginx

# Check nginx error logs
sudo tail -f /var/log/nginx/error.log

# Check if port 80 is open
sudo ufw status
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### SSL certificate issues?
```bash
# Check certificate status
sudo certbot certificates

# Renew certificate manually
sudo certbot renew --force-renewal
```

---

## Summary Checklist

- [ ] Add A record for @ pointing to 157.173.221.140
- [ ] Add A record for www pointing to 157.173.221.140
- [ ] Wait 30-60 minutes for DNS propagation
- [ ] Enable nginx site configuration
- [ ] Test and reload nginx
- [ ] Install SSL certificate with certbot
- [ ] Test website at http://acornpensy.com
- [ ] Test website at https://acornpensy.com

---

## Need Help?

If you encounter any issues:
1. Check nginx error logs: `sudo tail -f /var/log/nginx/error.log`
2. Check DNS propagation: https://dnschecker.org
3. Verify firewall allows ports 80 and 443
4. Make sure the site configuration is linked correctly

## Current Status
✅ Website files are ready at: /var/www/westend-Corporation/dist
✅ Nginx configuration created: acornpensy.com.conf
✅ Backend API running on port 8000
⏳ Waiting for: DNS configuration at registrar
⏳ Waiting for: SSL certificate installation
</contents>