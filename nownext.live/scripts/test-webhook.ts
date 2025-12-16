
import crypto from 'crypto'

const secret = 'test-secret' // Use a dummy secret for local testing
const webhookUrl = 'http://localhost:3000/api/webhooks/lemon-squeezy'

// Mock User ID - REPLACE THIS WITH A REAL USER ID FROM YOUR DB
const userId = 'REPLACE_WITH_REAL_USER_ID'

async function sendWebhook(eventName: string, payloadData: any) {
    const payload = {
        meta: {
            event_name: eventName,
            custom_data: {
                user_id: userId
            }
        },
        data: payloadData
    }

    const rawBody = JSON.stringify(payload)
    const hmac = crypto.createHmac('sha256', secret)
    const signature = hmac.update(rawBody).digest('hex')

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Signature': signature
            },
            body: rawBody
        })

        const responseText = await response.text()
        console.log(`Event: ${eventName} - Status: ${response.status} - Response: ${responseText}`)
    } catch (error) {
        console.error(`Error sending ${eventName}:`, error)
    }
}

async function runTests() {
    console.log('Starting Webhook Tests...')
    console.log('NOTE: Ensure your local server is running and LEMONSQUEEZY_WEBHOOK_SECRET is set to "test-secret" in .env for this test.')

    // Test 1: Subscription Created
    await sendWebhook('subscription_created', {
        id: 'sub_123',
        attributes: {
            status: 'active',
            variant_name: 'Pro Plan',
            customer_id: 101,
            variant_id: 201,
            renews_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            ends_at: null
        }
    })

    // Test 2: One-time Order Created
    await sendWebhook('order_created', {
        id: 'ord_456',
        attributes: {
            first_subscription_item: null, // Indicates one-time
            status: 'paid',
            variant_name: '30 Day Pass',
            customer_id: 102,
            variant_id: 202
        }
    })
}

runTests()
