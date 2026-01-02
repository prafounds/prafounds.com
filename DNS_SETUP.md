# DNS Configuration Guide for prafounds.com

## Overview
This guide explains how to configure your Hostinger DNS settings to properly point to GitHub Pages with HTTPS support.

## Why the Mobile Redirect Issue Occurred

The mobile redirect to Hostinger's default page happens when DNS is not properly configured for GitHub Pages. This typically occurs when:
1. DNS records point to Hostinger's servers instead of GitHub Pages
2. HTTPS is not properly enforced
3. The `www` subdomain is not configured

## Step-by-Step DNS Configuration in Hostinger

### 1. Log into Hostinger Control Panel
- Go to [Hostinger Control Panel](https://hpanel.hostinger.com/)
- Select your domain: `prafounds.com`

### 2. Navigate to DNS Settings
- Click on **DNS / Name Servers**
- You should see your DNS zone editor

### 3. Delete Existing Records (if any)
Remove these if they exist:
- Any `A` records pointing to Hostinger IPs (like `185.x.x.x`)
- Any `CNAME` records for `@` or root domain
- Parking page redirects

### 4. Add GitHub Pages DNS Records

#### For the Root Domain (@):
Add **FOUR** `A` records pointing to GitHub Pages IPs:

```
Type: A
Name: @ (or leave blank for root)
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

#### For the WWW Subdomain:
Add a `CNAME` record:

```
Type: CNAME
Name: www
Value: prafounds.github.io
TTL: 3600
```

### 5. Verify CNAME File
The repository already has a CNAME file with:
```
www.prafounds.com
```

This tells GitHub Pages which custom domain to serve.

### 6. Enable HTTPS in GitHub Pages

After DNS propagates (15 minutes to 48 hours):

1. Go to your GitHub repository: [https://github.com/prafounds/prafounds.com](https://github.com/prafounds/prafounds.com)
2. Click **Settings** → **Pages**
3. Under "Custom domain", you should see `www.prafounds.com`
4. Check the box: **Enforce HTTPS**

## Expected DNS Configuration Summary

| Type  | Name | Value                    | TTL  |
|-------|------|--------------------------|------|
| A     | @    | 185.199.108.153         | 3600 |
| A     | @    | 185.199.109.153         | 3600 |
| A     | @    | 185.199.110.153         | 3600 |
| A     | @    | 185.199.111.153         | 3600 |
| CNAME | www  | prafounds.github.io     | 3600 |

## Verification

### Check DNS Propagation
Use these tools to verify DNS is configured correctly:
- [https://dnschecker.org/](https://dnschecker.org/) - Check `www.prafounds.com`
- [https://www.whatsmydns.net/](https://www.whatsmydns.net/)

### Expected Results:
- `prafounds.com` should resolve to one of the GitHub Pages IPs
- `www.prafounds.com` should resolve to `prafounds.github.io`

### Test in Browser:
After DNS propagates, test:
1. **http://prafounds.com** - Should redirect to **https://www.prafounds.com**
2. **https://www.prafounds.com** - Should load your site with HTTPS
3. **Mobile browser** - Should work the same as desktop

## Troubleshooting

### Site Still Shows Hostinger Page
- Wait 24-48 hours for full DNS propagation
- Clear browser cache (Ctrl+Shift+Del / Cmd+Shift+Del)
- Try incognito/private browsing mode
- Clear DNS cache:
  - **macOS**: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
  - **Windows**: `ipconfig /flushdns`
  - **Linux**: `sudo systemd-resolve --flush-caches`

### HTTPS Not Available
- Wait for DNS to fully propagate (up to 48 hours)
- GitHub Pages needs to issue SSL certificate (automatic, takes 10-20 minutes after DNS is correct)
- Ensure "Enforce HTTPS" is checked in GitHub Pages settings

### Mobile Still Redirects
- Confirm DNS is propagated globally using dnschecker.org
- Mobile networks may cache DNS longer - try WiFi vs mobile data
- Wait 24-48 hours for mobile carrier DNS to update

## Performance Improvements in New Design

### Removed:
- ❌ Heavy Three.js WebGL animations (~500KB)
- ❌ Complex 3D particle systems
- ❌ Mobile WebGL fallbacks

### Added:
- ✅ Lightweight CSS animations
- ✅ Modern, clean design inspired by trae.ai and portworx.com
- ✅ Mobile-first responsive layout
- ✅ Better accessibility
- ✅ Faster page load (< 1s vs 3-5s)
- ✅ Better SEO with semantic HTML

## Support

If issues persist after 48 hours:
1. Contact Hostinger support with this guide
2. Verify GitHub Pages deployment is active
3. Check GitHub repository settings

## Additional Resources
- [GitHub Pages Custom Domain Documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Hostinger DNS Documentation](https://support.hostinger.com/en/articles/1696646-how-to-manage-dns-records)
