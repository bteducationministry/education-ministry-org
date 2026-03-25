# SSL & Branch Protection Management

This directory contains comprehensive documentation and scripts for managing SSL certificates and branch protection for the Education Ministry infrastructure.

## 📋 Quick Links

- **[SSL Management Runbook](SSL_MANAGEMENT_RUNBOOK.md)** - Complete SSL certificate management guide
- **[Branch Protection Test Results](BRANCH_PROTECTION_TEST_RESULTS.md)** - Branch protection testing documentation
- **[Implementation Scripts](scripts/)** - Ready-to-use automation scripts

## 🚨 Immediate Actions Required

### Critical SSL Issues

1. **btpma.org certificate EXPIRED** (9 days ago)
   ```bash
   ssh root@72.62.80.207
   cd /path/to/scripts
   ./immediate-ssl-fixes.sh
   ```

2. **Branch protection NOT configured**
   - Manual configuration required via GitHub web interface
   - See [Branch Protection Test Results](BRANCH_PROTECTION_TEST_RESULTS.md)

## 📁 Directory Structure

```
docs/ssl-management/
├── README.md                           # This file
├── SSL_MANAGEMENT_RUNBOOK.md           # Complete SSL management guide
├── BRANCH_PROTECTION_TEST_RESULTS.md   # Branch protection test results
└── scripts/
    ├── immediate-ssl-fixes.sh          # Emergency SSL fixes
    ├── setup-ssl-monitoring.sh         # Setup monitoring
    └── check-ssl-status.sh             # Quick status check
```

## 🔧 Quick Start

### 1. Fix Expired Certificates (URGENT)

```bash
# SSH into VPS
ssh root@72.62.80.207

# Download and run the fix script
# (Or manually copy the script from scripts/immediate-ssl-fixes.sh)
bash immediate-ssl-fixes.sh
```

### 2. Setup Monitoring

```bash
# On VPS
bash setup-ssl-monitoring.sh
```

### 3. Configure Branch Protection

Branch protection must be configured manually via GitHub:

1. Go to: https://github.com/bteducationministry/education-ministry-org/settings/branches
2. Add protection rules for `main` and `develop` branches
3. See [BRANCH_PROTECTION_TEST_RESULTS.md](BRANCH_PROTECTION_TEST_RESULTS.md) for detailed instructions

### 4. Check Status Anytime

```bash
# From your local machine (requires sshpass)
bash check-ssl-status.sh
```

## 📊 Current Status

### SSL Certificates

| Domain | Status | Expires | Action |
|--------|--------|---------|--------|
| educationministry.org | ✅ Valid | Jun 20, 2026 | None |
| btpma.org | ❌ Expired | Mar 16, 2026 | **RENEW NOW** |
| aemp-dashboard.btpma.org | ✅ Valid | Jun 14, 2026 | None |
| platform.btpma.org | ⚠️ Expiring | Mar 28, 2026 | Monitor |

### Branch Protection

| Branch | Status | Action |
|--------|--------|--------|
| main | ❌ Not Protected | **Configure manually** |
| develop | ❌ Not Protected | **Configure manually** |

## 🔐 Server Access

- **Host**: 72.62.80.207
- **User**: root
- **Password**: @Trustee23//

## 📚 Documentation

### SSL Management Runbook

The [SSL Management Runbook](SSL_MANAGEMENT_RUNBOOK.md) contains:

- Complete certificate inventory
- SSL management strategy and recommendations
- Auto-renewal configuration
- Monitoring and alerting setup
- Security best practices
- Operational procedures
- Troubleshooting guide
- Emergency procedures

### Branch Protection

The [Branch Protection Test Results](BRANCH_PROTECTION_TEST_RESULTS.md) contains:

- Test methodology and results
- Why API configuration failed
- Manual configuration instructions
- Verification steps

## 🛠️ Scripts

### immediate-ssl-fixes.sh

**Purpose**: Fix critical SSL issues immediately

**What it does**:
- Verifies Nginx status
- Renews expired certificates
- Sets up post-renewal hooks
- Tests renewal process
- Verifies certbot timer

**Usage**:
```bash
ssh root@72.62.80.207
bash immediate-ssl-fixes.sh
```

### setup-ssl-monitoring.sh

**Purpose**: Setup automated SSL certificate monitoring

**What it does**:
- Creates monitoring script
- Adds daily cron job
- Configures email alerts (optional)
- Tests monitoring

**Usage**:
```bash
ssh root@72.62.80.207
bash setup-ssl-monitoring.sh
```

### check-ssl-status.sh

**Purpose**: Quick SSL status check from anywhere

**What it does**:
- Checks all certificate expiry dates
- Shows certbot timer status
- Displays recent renewal activity

**Usage**:
```bash
# From local machine (requires sshpass)
bash check-ssl-status.sh
```

## 🎯 Recommended SSL Strategy

**Continue using individual certificates per domain** (current setup)

**Why?**
- ✅ Free with Let's Encrypt
- ✅ Independent management
- ✅ Better security isolation
- ✅ Simpler troubleshooting
- ✅ Works with HTTP-01 validation

**Alternatives considered and rejected**:
- ❌ Wildcard certificates (requires DNS-01, more complex)
- ❌ Multi-domain certificates (all-or-nothing renewal)

## 📈 Monitoring Recommendations

### Automated (Already Configured)

- ✅ Certbot timer (twice daily)
- ✅ Auto-renewal (30 days before expiry)
- ✅ Post-renewal hooks (Nginx reload)

### To Be Implemented

- 📊 Daily expiry check script (via setup-ssl-monitoring.sh)
- 📧 Email alerts for expiring certificates
- 🌐 External monitoring (UptimeRobot, SSL Labs)

### External Services (Recommended)

1. **UptimeRobot** (https://uptimerobot.com)
   - Free SSL expiry monitoring
   - Email/SMS alerts
   - 50 monitors on free tier

2. **SSL Labs** (https://www.ssllabs.com/ssltest/)
   - Comprehensive SSL testing
   - Security grade (A+ to F)
   - Use monthly for audits

3. **Healthchecks.io** (https://healthchecks.io)
   - Monitor certbot cron job
   - Alert if renewal fails

## 🔒 Security Best Practices

### Implemented

- ✅ Let's Encrypt SSL certificates
- ✅ Auto-renewal configured
- ✅ Nginx with SSL

### To Be Implemented

- 🔐 Strong SSL configuration (TLS 1.2+, strong ciphers)
- 🔐 HSTS headers
- 🔐 OCSP stapling
- 🔐 Security headers (X-Frame-Options, etc.)

See [SSL Management Runbook](SSL_MANAGEMENT_RUNBOOK.md) for detailed configuration.

## 📞 Support

### Documentation

- Let's Encrypt: https://letsencrypt.org/docs/
- Certbot: https://certbot.eff.org/docs/
- Nginx SSL: https://nginx.org/en/docs/http/configuring_https_servers.html

### Testing Tools

- SSL Labs: https://www.ssllabs.com/ssltest/
- SSL Checker: https://www.sslshopper.com/ssl-checker.html

### Community

- Let's Encrypt Community: https://community.letsencrypt.org/
- Nginx Forum: https://forum.nginx.org/

## 📝 Maintenance Schedule

### Daily (Automated)
- Certbot timer runs twice daily
- SSL expiry check (after setup-ssl-monitoring.sh)

### Weekly (Manual)
- Review certbot logs
- Verify all certificates >21 days validity

### Monthly (Manual)
- Run SSL Labs tests
- Review Nginx configuration
- Check for updates

### Quarterly (Manual)
- Review SSL best practices
- Audit certificate inventory
- Test emergency procedures

## 🚀 Next Steps

1. **Immediate** (Today):
   - [ ] Run `immediate-ssl-fixes.sh` to renew expired certificate
   - [ ] Configure branch protection manually via GitHub UI
   - [ ] Run `setup-ssl-monitoring.sh` to enable monitoring

2. **This Week**:
   - [ ] Set up external monitoring (UptimeRobot)
   - [ ] Configure email alerts
   - [ ] Review and strengthen Nginx SSL configuration
   - [ ] Test emergency procedures

3. **This Month**:
   - [ ] Run SSL Labs tests on all domains
   - [ ] Document team procedures
   - [ ] Schedule quarterly reviews

---

**Last Updated**: March 25, 2026
**Maintained By**: Education Ministry IT Team
**Version**: 1.0
