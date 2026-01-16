# Sanity Webhook Setup for On-Demand Revalidation

This guide explains how to configure Sanity to trigger instant content updates on the live site.

## 1. Generate a Webhook Secret

Create a random secret string (e.g., use a password generator, 32+ characters).

Example: `hhnb-revalidate-2024-xK9mP7qR3sT6wZ`

## 2. Add Secret to Netlify

1. Go to **Netlify** → Your Site → **Site configuration** → **Environment variables**
2. Add:
   - **Key**: `SANITY_REVALIDATE_SECRET`
   - **Value**: Your generated secret
   - **Scopes**: All
   - **Deploy contexts**: All

## 3. Create Webhook in Sanity

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Select project **fnj6du1o**
3. Navigate to **API** → **Webhooks** → **Create webhook**
4. Configure:

| Field | Value |
|-------|-------|
| **Name** | Netlify Revalidate |
| **URL** | `https://YOUR-SITE.netlify.app/api/revalidate` |
| **Dataset** | production |
| **Trigger on** | ✅ Create, ✅ Update, ✅ Delete |
| **HTTP method** | POST |
| **HTTP Headers** | `x-sanity-webhook-secret: YOUR_SECRET_HERE` |
| **Projection** | `{_type, _id}` |

### Filter (optional but recommended)
```
_type in ["pageHome", "pageAbout", "pagePrograms", "pageStories", "pageResources", "pageVolunteer", "pageDonate", "program", "testimonial", "siteSettings"]
```

## 4. Deploy and Test

1. Push changes to GitHub (triggers Netlify build)
2. After deploy, edit any content in Sanity Studio
3. Publish the change
4. Check Netlify Functions log for revalidation
5. Verify live site updates within seconds

## How It Works

```
Sanity Publish → Webhook POST → /api/revalidate → revalidatePath() → ISR Cache Cleared
```

## Document Type → Path Mapping

| Document Type | Revalidates |
|---------------|-------------|
| `pageHome` | `/` |
| `pageAbout` | `/about` |
| `pagePrograms` | `/programs` |
| `pageStories` | `/stories` |
| `pageResources` | `/resources` |
| `pageVolunteer` | `/volunteer` |
| `pageDonate` | `/donate` |
| `program` | `/`, `/programs` |
| `testimonial` | `/`, `/stories` |
| `siteSettings` | All pages |
