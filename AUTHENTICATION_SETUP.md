# Authentication Setup Guide

## User Credentials

The following user accounts have been configured:

### 1. Jose Morales

- **Email:** jose@summitmarinedevelopment.com
- **Password:** Summit2025!Marine
- **Role:** ADMIN

### 2. Kirk

- **Email:** kirk@zincdigital.co
- **Password:** Zinc2025!Digital
- **Role:** ADMIN

## Login Methods

Users can login at: **https://fusion.summitmarinedevelopment.com/auth/login**

### Method 1: Password Login

1. Go to the login page
2. Click "Password" tab
3. Enter email and password from above
4. Click "Sign In"

### Method 2: Magic Link (Passwordless)

1. Go to the login page
2. Click "Magic Link" tab
3. Enter your email
4. Click "Send Magic Link"
5. Check your email for the login link (expires in 15 minutes)

## Setup Instructions

### For Production (Vercel)

1. **Set up the database users** - Open `setup-users.html` in a browser and click the button to create users with passwords.

2. **Configure Email Service (for Magic Links)**

   Option A - Using Resend (Recommended):

   ```
   RESEND_API_KEY=your_resend_api_key
   RESEND_FROM=Summit Marine <noreply@summitmarinedevelopment.com>
   MAIL_REPLY_TO=hello@summitmarinedevelopment.com
   ```

   Option B - Using SMTP:

   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   SMTP_FROM=Summit Marine <your_email@gmail.com>
   MAIL_REPLY_TO=hello@summitmarinedevelopment.com
   ```

3. **Configure Security**
   ```
   JWT_SECRET=your_secure_jwt_secret_here
   ADMIN_SEED_TOKEN=your_admin_token_here
   ```

### Fallback Mode (No Email Service)

If email is not configured, the system will work in fallback mode for allowed emails:

- jose@summitmarinedevelopment.com
- kirk@zincdigital.co

In fallback mode, the magic link URL will be displayed directly on the login page.

## Testing Authentication

1. **Test Password Login:**
   - Go to https://fusion.summitmarinedevelopment.com/auth/login
   - Use credentials above
   - Should redirect to dashboard after successful login

2. **Test Magic Link:**
   - Go to https://fusion.summitmarinedevelopment.com/auth/login
   - Click "Magic Link" tab
   - Enter email
   - If email is configured: Check inbox for link
   - If fallback mode: Click the displayed link

## Environment Variables Summary

Required for production:

```env
# Database
POSTGRES_PRISMA_URL=your_database_url

# Authentication
JWT_SECRET=your_secure_jwt_secret

# Email (choose one)
# Option 1: Resend
RESEND_API_KEY=your_resend_api_key
RESEND_FROM=Summit Marine <noreply@summitmarinedevelopment.com>

# Option 2: SMTP
SMTP_HOST=smtp.provider.com
SMTP_PORT=587
SMTP_USER=email@example.com
SMTP_PASS=password
SMTP_FROM=Summit Marine <email@example.com>

# Optional
ADMIN_SEED_TOKEN=your_admin_token
FALLBACK_MAGIC_ALLOWLIST=jose@summitmarinedevelopment.com,kirk@zincdigital.co
```

## Security Notes

1. **Passwords are secure:**
   - Contains uppercase, lowercase, numbers, and special characters
   - Stored as bcrypt hashes in the database

2. **Magic Links are secure:**
   - Expire in 15 minutes
   - Single-use tokens
   - Only sent to registered users

3. **Sessions:**
   - JWT tokens with 30-day expiration
   - HttpOnly cookies for security
   - Secure flag enabled in production

## Troubleshooting

### Magic Link Not Sending

1. Check email service configuration in Vercel environment variables
2. Verify RESEND_API_KEY or SMTP credentials are correct
3. Check allowed emails list if in fallback mode

### Password Login Not Working

1. Ensure users were created using setup-users.html
2. Verify database connection is working
3. Check browser console for errors

### Forgot Password

- Use the "Forgot password?" link on the login page
- Requires email service to be configured

## API Endpoints

- `POST /api/auth/password` - Password login
- `POST /api/auth/login` - Send magic link
- `GET /api/auth/callback?token=xxx` - Magic link callback
- `POST /api/auth/logout` - Logout
- `POST /api/auth/forgot` - Password reset request
- `POST /api/auth/reset` - Reset password with token
- `POST /api/admin/setup-passwords` - Create/update user passwords (requires admin token)
