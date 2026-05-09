#!/bin/bash
# ============================================================
# WAHA Setup Script — MULTIBRAWN
# ============================================================
# Run this on your server (the same machine as n8n):
#   chmod +x waha-setup.sh && sudo ./waha-setup.sh
# ============================================================

set -e

DOMAIN="waha.multibrawn.co.il"
COMPOSE_FILE="docker-compose.waha.yml"

echo "🚀 Starting WAHA setup for $DOMAIN..."

# ── 1. Make sure Docker is running ──────────────────────────
if ! command -v docker &>/dev/null; then
  echo "❌ Docker not found. Install Docker first: https://docs.docker.com/engine/install/"
  exit 1
fi

if ! command -v docker-compose &>/dev/null && ! docker compose version &>/dev/null 2>&1; then
  echo "❌ docker-compose not found."
  exit 1
fi

# ── 2. SSL cert (certbot) ───────────────────────────────────
if [ ! -d "/etc/letsencrypt/live/$DOMAIN" ]; then
  echo "📜 Requesting SSL certificate for $DOMAIN..."
  if command -v certbot &>/dev/null; then
    certbot certonly --standalone -d "$DOMAIN" --non-interactive --agree-tos -m admin@multibrawn.co.il
  else
    echo "⚠️  certbot not installed. Install: apt install certbot"
    echo "   Then run: certbot certonly --standalone -d $DOMAIN"
  fi
fi

# ── 3. Copy nginx config ────────────────────────────────────
if [ -f "waha-nginx.conf" ]; then
  cp waha-nginx.conf /etc/nginx/sites-available/waha
  ln -sf /etc/nginx/sites-available/waha /etc/nginx/sites-enabled/waha
  nginx -t && systemctl reload nginx
  echo "✅ Nginx configured for $DOMAIN"
fi

# ── 4. Start WAHA via Docker ────────────────────────────────
echo "🐳 Starting WAHA container..."
docker compose -f "$COMPOSE_FILE" pull
docker compose -f "$COMPOSE_FILE" up -d
echo "✅ WAHA is running on port 3000"

# ── 5. Wait for WAHA to be ready ───────────────────────────
echo "⏳ Waiting for WAHA to start..."
sleep 5

# ── 6. Start a WhatsApp session ────────────────────────────
echo "📱 Starting WhatsApp session..."
SESSION_RESPONSE=$(curl -s -X POST "http://localhost:3000/api/sessions/start" \
  -H "Content-Type: application/json" \
  -d '{"name":"default"}' 2>/dev/null || echo "")

echo "Session response: $SESSION_RESPONSE"

# ── 7. Print QR code ────────────────────────────────────────
echo ""
echo "══════════════════════════════════════════════"
echo "📲 To connect WhatsApp, scan the QR code:"
echo "   → Open: http://localhost:3000/dashboard"
echo "   OR: curl http://localhost:3000/api/sessions/default/auth/qr/image --output qr.png"
echo "══════════════════════════════════════════════"
echo ""
echo "✅ WAHA URL: https://$DOMAIN"
echo ""
echo "📝 Add to your .env.local:"
echo "   WAHA_API_URL=https://$DOMAIN"
echo "   ARDIT_WHATSAPP_NUMBER=972523983394"
echo ""
echo "🔄 After scanning QR, test with:"
echo "   curl -X POST https://$DOMAIN/api/sendText \\"
echo "     -H 'Content-Type: application/json' \\"
echo "     -d '{\"chatId\":\"972523983394@c.us\",\"text\":\"Test!\",\"session\":\"default\"}'"
